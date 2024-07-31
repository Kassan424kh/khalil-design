
const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
    } : null;
}

export default class Theme {
    static updateColorVariable = (key, value, convertToRgb = true) => {
        document.documentElement.style.setProperty(`--${key}`, value)

        if (convertToRgb) {
            // check if the value is a color name
            const isAColorName = Object.keys(allColours).includes(value)
            // if the value is a color name then convert it to hex with helb the hexToRgb function convert it then to rgb
            const convertHexToRGB = hexToRgb(isAColorName ? allColours[value] : value)
            if (convertHexToRGB) document.documentElement.style.setProperty(`--${key}-rgb`, [convertHexToRGB.r, convertHexToRGB.g, convertHexToRGB.b].join(","))
        }
    }

    static themes = dark => {
        // Selected Theme
        Theme.updateColorVariable('theme', dark ? 'dark' : 'light', false)

        // HEX
        Theme.updateColorVariable('white', dark ? '#0e0e0e' : '#fff')
        Theme.updateColorVariable('black', dark ? '#c9d1d9' : '#000')

        Theme.updateColorVariable('grey', dark ? '#30363d' : '#1D1D1F')
        Theme.updateColorVariable('green', dark ? '#00d980' : '#00C071')
        Theme.updateColorVariable('red', dark ? '#ff5a68' : '#FF4553')
        Theme.updateColorVariable('blue', dark ? '#007aef' : '#0066C9')
        Theme.updateColorVariable('yellow', dark ? '#ffb624' : '#ffab00')
        Theme.updateColorVariable('orange', dark ? '#ff8724' : '#ff7300')

        Theme.updateColorVariable('grey-light', dark ? '#070707' : '#ededed')
        Theme.updateColorVariable('green-light', dark ? '#002315' : '#f3fffa')
        Theme.updateColorVariable('red-light', dark ? '#3b0003' : '#ffe1ea')
        Theme.updateColorVariable('blue-light', dark ? '#001123' : '#e6f4ff')
        Theme.updateColorVariable('yellow-light', dark ? '#211600' : '#fff9f1')
        Theme.updateColorVariable('orange-light', dark ? '#1a0b00' : '#fff4eb')

        Theme.updateColorVariable('grey-dark', dark ? '#ededed' : '#616161')
        Theme.updateColorVariable('green-dark', dark ? '#f3fffa' : '#00492c')
        Theme.updateColorVariable('red-dark', dark ? '#ffebf0' : '#67010a')
        Theme.updateColorVariable('blue-dark', dark ? '#e6f4ff' : '#01376e')
        Theme.updateColorVariable('yellow-dark', dark ? '#fff9f1' : '#312100')
        Theme.updateColorVariable('orange-dark', dark ? '#fff4eb' : '#401b00')

        Theme.updateColorVariable('selecting-background-color', "#c0c0c0")
        Theme.updateColorVariable('selecting-text-color', "#000000")
        Theme.updateColorVariable('border-color', dark ? '#14171c' : "#000000")
        Theme.updateColorVariable('background-color', dark ? '#1f2126' : "#ededed")
        Theme.updateColorVariable('hover-background-color', dark ? '#1c1f23' : "#ffffff")
        Theme.updateColorVariable('text-color', dark ? '#ededed' : "#000000")

        //Theme.updateColorVariable('start-page-background-image', `url(${dark ? StartPageBackgroundImageDark : StartPageBackgroundImage})`, false)
        Theme.updateColorVariable('shadow-opacity', dark ? 0.3 : 0.2, false)
    }


    static switchAgencyTheme = (selectedAG = "IPG") => {
        const agThemes = {
            IPG: {
                "ag-primary-color": "white",
                "ag-secondary-color": "white",
                "ag-text-color": "black",
                "ag-headline-color": "white",
            },
            UM: {
                "ag-primary-color": "red",
                "ag-secondary-color": "red",
                "ag-text-color": "red",
                "ag-headline-color": "red",
            },
            INI: {
                "ag-primary-color": "blue",
                "ag-secondary-color": "blue",
                "ag-text-color": "blue",
                "ag-headline-color": "blue",
            }
        }

        Object.entries(agThemes[selectedAG]).forEach(([key, value]) => {
            Theme.updateColorVariable(key, value)
        })
    }


    static lightTheme = () => Theme.themes()
    static darkTheme = () => Theme.themes(true)

    static setDarkTheme = setDark => {
        if (setDark) {
            Theme.darkTheme()
        } else {
            Theme.lightTheme()
        }
    }

    static toggleTheme = () => {
        const selectedTheme = localStorage.getItem('selected-theme')
        if (selectedTheme) if (selectedTheme === 'light') {
            Theme.darkTheme(false)
            localStorage.setItem('selected-theme', 'dark')
        } else if (selectedTheme === 'dark') {
            Theme.lightTheme()
            localStorage.setItem('selected-theme', 'light')
        }
    }

    constructor() {
        Theme.switchAgencyTheme()
        const selectedTheme = localStorage.getItem('selected-theme')
        if (selectedTheme) {
            if (selectedTheme === 'light') {
                Theme.themes(false)
            } else if (selectedTheme === 'dark') {
                Theme.themes(true)
            }
        } else {
            localStorage.setItem('selected-theme', 'light')
            Theme.themes(false)
        }
    }
}


const allColours = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred ": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgrey": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370d8",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#d87093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
};