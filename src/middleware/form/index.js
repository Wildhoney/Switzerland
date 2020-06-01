import html from '../html/index.js';

export default () => {
    return function form(props) {
        if (props.boundary) {
            // Gather all of the rendered forms so we can re-render on first mount.
            const forms = [...props.boundary.querySelectorAll('form')];
            const form = forms.reduce(
                (forms, form) => ({ ...forms, [form.getAttribute('name') ?? 'default']: form }),
                {}
            );

            // Only re-render when there are forms and there's a tree available.
            forms.length > 0 &&
                props.html &&
                html(props.html)({ ...props, form, lifecycle: 'update' });
        }

        return props;
    };
};
