import { Attributes } from '../../types';

export interface SwissInterface {
    render(attributes: Attributes): Promise<HTMLElement>;
}
