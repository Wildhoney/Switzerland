/**
 * @function difference ∷ [String] → [String] → [String]
 */
export const difference = (a, b) => b.filter(c => !a.includes(c));

/**
 * @function drop ∷ ∀ a b. [String] → (Object String a → Object String b)
 */
export const drop = keys => model =>
    Object.entries(model).reduce(
        (accum, [key, value]) =>
            keys.includes(key) ? accum : { ...accum, [key]: value },
        {}
    );

/**
 * @function take ∷ ∀ a b. [String] → (Object String a → Object String b)
 */
export const take = keys => model =>
    Object.entries(model).reduce(
        (accum, [key, value]) =>
            keys.includes(key) ? { ...accum, [key]: value } : accum,
        {}
    );
