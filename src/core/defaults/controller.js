export default function defaultController({ adapter }) {
    adapter.attachShadow();

    const attrs = adapter.useAttrs();
    const history = adapter.useHistory();

    return { attrs, history };
}
