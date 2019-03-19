export const difference = (a, b) => {
    return b.filter(c => !a.includes(c));
}

export const drop = keys => (model) => Object.entries(model).reduce((accum, [key, value]) => 

    keys.includes(key) ? accum : {...accum, [key]: value}

    , {})

    export const take = keys => (model) => Object.entries(model).reduce((accum, [key, value]) => 
    
        keys.includes(key) ?  {...accum, [key]: value} :accum
    
        , {})