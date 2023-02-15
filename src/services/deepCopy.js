export const deepCopy = aObject => {
    if (!aObject) {
        return aObject
    }

    let v
    const bObject = Array.isArray(aObject) ? [] : {}
    Object.keys(aObject).forEach(k => {
        v = aObject[k]
        bObject[k] = typeof v === 'object' ? deepCopy(v) : v
    })

    return bObject
}
