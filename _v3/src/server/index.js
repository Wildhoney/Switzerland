/**
 * @function render ∷ ∀ a. [String, [(p → p)]]|String → Object String a → String
 */
export async function render(component, props = {}) {
    const node = await component.render(props);
    return node.outerHTML;
}
