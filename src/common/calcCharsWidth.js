export const getTextWidth = (text, font) => {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')
    context.font = font
    const metrics = context.measureText(text)
    return metrics.width
}

const chars = "abcdefghijklmnopqrstuvwxyz #()=<>/&%$§!+*'`^°|€?~.,;:-_@"

export const charsWidth = () => {
    return (chars + chars.toUpperCase())
        .split('')
        .map(char => [char, getTextWidth(char, '14px "Roboto", sans-serif')])
        .reduce((obj, item) => {
            return !Object.keys(obj).includes(item[0])
                ? {
                      ...obj,
                      [item[0]]: item[1]
                  }
                : obj
        }, {})
}
