import * as impl from '../impl';

export class Swiss implements impl.Swiss {
    async render(): Promise<HTMLElement> {
        return document.createElement('x-swiss');
    }
}
