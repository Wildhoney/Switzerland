/**
 * @function defaultController
 * ---
 * Default controller for setting up the shadow boundary, passing all attributes as string
 * values, and the history object.
 */
export default function defaultController({ adapter }) {
    adapter.attachShadow();

    const attrs = adapter.useAttrs();
    const history = adapter.useHistory();

    return { attrs, history };
}
