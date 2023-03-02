/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "14px verdana").
 *
 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
    var context = canvas.getContext('2d')
    context.font = font
    var metrics = context.measureText(text)
    return metrics.width
}

const chars = "abcdefghijklmnopqrstuvwxyz #()=<>/&%$§!+*'`^°|€?~.,;:-_@"

export const charsWidth = () => {
    const _charsWidthObject = (chars + chars.toUpperCase())
        .split('')
        .map(char => [char, getTextWidth(char, '15px "Roboto", sans-serif')])
        .reduce((obj, item) => {
            return !Object.keys(obj).includes(item[0])
                ? {
                      ...obj,
                      [item[0]]: item[1]
                  }
                : obj
        }, {})

    console.log(_charsWidthObject)

    return _charsWidthObject
}

//console.log(getTextWidth('hello there!', 'bold 12pt arial')) // close to 86
