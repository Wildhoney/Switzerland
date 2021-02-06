import * as server from './server';

export function create(name: string): server.Swiss {
    return server.create(name);
}

export async function render(component: server.Swiss): Promise<string> {
    const node = await component.render();

    return node.outerHTML;
}
