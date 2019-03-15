import * as u from './utils.js';

/**
 * @function state ∷ void → (p → p)
 * ---
 * Provides a local state that is very similar to React's `useState` hook.
 */
export default function state() {
    return props => ({ ...props, state: u.useState(props) });
}
