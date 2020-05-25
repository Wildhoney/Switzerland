import { Attributes } from '../middleware/attrs/index';

export type InitialProperties = { [key: string]: any } | { [key: string]: { [key: string]: any } };

export type Properties = {
    node: HTMLElement;
    server: boolean;
    lifecycle: 'mount' | 'update' | 'unmount';
    render: ((props?: Properties) => Properties | Promise<Properties>) | (() => null);
    attrs?: Attributes;
    [key: string]: any;
};

export type Middleware = (props: Properties) => Properties | Promise<Properties>;

export type Swiss = {
    name: string;
    middleware: Middleware[];
    render: (props: InitialProperties) => Promise<Properties>;
};

export class SwissComponent {
    name: string;
    middleware: Middleware[];

    constructor(name: string, middleware: Middleware[]) {
        this.name = name;
        this.middleware = middleware;
    }

    async render(props: Properties): Promise<Properties> {
        async function cycle(props: Properties | Promise<Properties>, middleware: Middleware) {
            return middleware(await props);
        }

        const defaultProps = { server: true, render: () => null, lifecycle: 'mount' };
        return this.middleware.reduce(cycle, { ...defaultProps, ...props });
    }
}

export default function create(name: string, ...middleware: Middleware[]): Swiss {
    const component = new SwissComponent(name, middleware);
    const hasCustomElements = typeof window?.customElements !== 'undefined';

    hasCustomElements &&
        window.customElements.define(
            name,
            class SwissComponent extends HTMLElement {
                initialProps: Properties;

                connectedCallback(): Promise<Properties> {
                    return this.render({ lifecycle: 'mount' });
                }

                disconnectedCallback(): Promise<Properties> {
                    return this.render({ lifecycle: 'unmount' });
                }

                render(props: InitialProperties = {}): Promise<Properties> {
                    return component.render({
                        lifecycle: 'update',
                        ...props,
                        node: this,
                        server: false,
                        render: this.render.bind(this),
                    });
                }
            }
        );

    return component;
}
