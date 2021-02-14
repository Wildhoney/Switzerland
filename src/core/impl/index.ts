import { Attributes } from '../../types';

export interface Swiss {
    render(attributes: Attributes): Promise<HTMLElement>;
}
