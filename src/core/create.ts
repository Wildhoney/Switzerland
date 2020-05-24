import { Attributes } from '../middleware/attrs';

export type InitialProperties = { [key: string]: any } | { [key: string]: { [key: string]: any } };

export type Properties = {
    node: HTMLElement;
    server: boolean;
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

        return this.middleware.reduce(cycle, { ...props, server: true });
    }
}

export default function create(name: string, ...middleware: Middleware[]): Swiss {
    return new SwissComponent(name, middleware);
}
