import { SwissInterface } from '../interface';

export class SwissBase implements SwissInterface {
    async render(): Promise<HTMLElement> {
        return document.createElement('x-swiss');
    }
}
