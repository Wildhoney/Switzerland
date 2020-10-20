export function toMap(forms) {
    return [...forms].reduce((forms, form) => ({ ...forms, [form.getAttribute('name') ?? 'default']: form }), {});
}
