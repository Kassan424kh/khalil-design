//import ErrorImageLight from '/static/error/error_light.png'
//import ErrorImageDark from '/static/error/error_dark.png'

export default class Theme {
    static updateColorVariable = (key, newColor) =>
        document.documentElement.style.setProperty(key, newColor);

    static themes = (dark) => {
        // Selected Theme
        Theme.updateColorVariable("--theme", dark ? "" : "light");

        // HEX Codes
        Theme.updateColorVariable("--white", dark ? "#050f23" : "#EBEBEB");
        Theme.updateColorVariable("--black", dark ? "#c9d1d9" : "#333");

        Theme.updateColorVariable("--grey", dark ? "#30363d" : "#939393");
        Theme.updateColorVariable("--green", dark ? "#00d980" : "#00C071");
        Theme.updateColorVariable("--red", dark ? "#ff5a68" : "#FF4553");
        Theme.updateColorVariable("--blue", dark ? "#007aef" : "#0066C9");
        Theme.updateColorVariable("--yellow", dark ? "#ffb624" : "#ffab00");
        Theme.updateColorVariable("--orange", dark ? "#ff8724" : "#ff7300");

        Theme.updateColorVariable("--grey-light", dark ? "#070707" : "#c3c3c3");
        Theme.updateColorVariable(
            "--green-light",
            dark ? "#002315" : "#dbe9e3"
        );
        Theme.updateColorVariable("--red-light", dark ? "#3b0003" : "#e3c9d1");
        Theme.updateColorVariable("--blue-light", dark ? "#001123" : "#cfdce6");
        Theme.updateColorVariable(
            "--yellow-light",
            dark ? "#211600" : "#e7e1d5"
        );
        Theme.updateColorVariable(
            "--orange-light",
            dark ? "#1a0b00" : "#dfd4cb"
        );

        Theme.updateColorVariable("--grey-dark", dark ? "#c3c3c3" : "#3e3e3e");
        Theme.updateColorVariable("--green-dark", dark ? "#dbe9e3" : "#00492c");
        Theme.updateColorVariable("--red-dark", dark ? "#e3c9d1" : "#67010a");
        Theme.updateColorVariable("--blue-dark", dark ? "#cfdce6" : "#01376e");
        Theme.updateColorVariable(
            "--yellow-dark",
            dark ? "#e7e1d5" : "#312100"
        );
        Theme.updateColorVariable(
            "--orange-dark",
            dark ? "#dfd4cb" : "#401b00"
        );

        // RGB
        Theme.updateColorVariable(
            "--white-rgb",
            dark ? "1, 4, 9" : "235, 235, 235"
        );
        Theme.updateColorVariable(
            "--black-rgb",
            dark ? "201, 209, 217" : "51, 51, 51"
        );

        Theme.updateColorVariable(
            "--grey-rgb",
            dark ? "48, 54, 61" : "234, 237, 238"
        );
        Theme.updateColorVariable(
            "--green-rgb",
            dark ? "0, 217, 128" : "0, 192, 113"
        );
        Theme.updateColorVariable(
            "--red-rgb",
            dark ? "255, 90, 104" : "255, 69, 83"
        );
        Theme.updateColorVariable(
            "--blue-rgb",
            dark ? "0, 122, 239" : "0, 102, 201"
        );
        Theme.updateColorVariable(
            "--yellow-rgb",
            dark ? "255, 182, 36" : "255, 171, 0"
        );
        Theme.updateColorVariable(
            "--orange-rgb",
            dark ? "255, 135, 36" : "255, 115, 0"
        );

        Theme.updateColorVariable(
            "--grey-light-rgb",
            dark ? "7, 7, 7" : "237, 237, 237"
        );
        Theme.updateColorVariable(
            "--green-light-rgb",
            dark ? "0, 35, 21" : "243, 255, 250"
        );
        Theme.updateColorVariable(
            "--red-light-rgb",
            dark ? "59, 0, 3" : "255, 225, 234"
        );
        Theme.updateColorVariable(
            "--blue-light-rgb",
            dark ? "0, 17, 35" : "230, 244, 255"
        );
        Theme.updateColorVariable(
            "--yellow-light-rgb",
            dark ? "33, 22, 0" : "255, 249, 241"
        );
        Theme.updateColorVariable(
            "--orange-light-rgb",
            dark ? "26, 11, 0" : "255, 244, 235"
        );

        Theme.updateColorVariable(
            "--grey-dark-rgb",
            dark ? "237, 237, 237" : "97, 97, 97"
        );
        Theme.updateColorVariable(
            "--green-dark-rgb",
            dark ? "243, 255, 250" : "0, 37, 44"
        );
        Theme.updateColorVariable(
            "--red-dark-rgb",
            dark ? "255, 235, 240" : "103, 1, 10"
        );
        Theme.updateColorVariable(
            "--blue-dark-rgb",
            dark ? "255, 235, 240" : "1, 55, 110"
        );
        Theme.updateColorVariable(
            "--yellow-dark-rgb",
            dark ? "255, 249, 241" : "49, 33, 0"
        );
        Theme.updateColorVariable(
            "--orange-dark-rgb",
            dark ? "255, 244, 235" : "64, 27, 0"
        );

        // Else Colors
        Theme.updateColorVariable("--base-color", dark ? "#f893ba" : "#FF728C");
        Theme.updateColorVariable(
            "--base-color-accent",
            dark ? "#34081c" : "#efdfe4"
        );
        Theme.updateColorVariable(
            "--base-color-rgb",
            dark ? "248, 147, 186" : "255, 114, 140"
        );
        Theme.updateColorVariable(
            "--base-color-accent-rgb",
            dark ? "52, 8, 28" : "239, 223, 228"
        );

        Theme.updateColorVariable("--selection-color", "#FFC3D4");
        Theme.updateColorVariable(
            "--border-color",
            dark ? "#30363d" : "#C8C8C8"
        );
        Theme.updateColorVariable(
            "--filter-text-background-color",
            dark ? "#30363d" : "#E0E0E066"
        );
        Theme.updateColorVariable(
            "--filter-text-color",
            dark ? "#c9d1d9" : "#333"
        );
        Theme.updateColorVariable(
            "--border-color-dark",
            dark ? "#2d2d2d" : "#bbbbbb"
        );
        Theme.updateColorVariable(
            "--nav-background-color",
            dark ? "#010409" : "#EBEBEB"
        );
        Theme.updateColorVariable(
            "--nav-box-shadow-color",
            dark ? "0, 122, 239" : "0, 0, 0"
        );
        Theme.updateColorVariable(
            "--nav-border-color",
            dark ? "#FFC3D4" : "#C8C8C8"
        );
        Theme.updateColorVariable(
            "--text-field-button-border-color",
            dark ? "0, 122, 239" : "0, 0, 0"
        );
        Theme.updateColorVariable(
            "--text-field-button-border-alpha",
            dark ? "0.5" : "0"
        );

        //Theme.updateColorVariable('--error-page-image', `url(${dark ? ErrorImageDark : ErrorImageLight})`)
    };

    static lightTheme = () => Theme.themes();
    static darkTheme = () => Theme.themes(true);

    static setDarkTheme = (setDark) => {
        if (setDark) {
            Theme.darkTheme();
        } else {
            Theme.lightTheme();
        }
    };

    static toggleTheme = () => {
        const selectedTheme = localStorage.getItem("selected-theme");
        if (selectedTheme)
            if (selectedTheme === "light") {
                Theme.darkTheme(false);
                localStorage.setItem("selected-theme", "dark");
            } else if (selectedTheme === "dark") {
                Theme.lightTheme();
                localStorage.setItem("selected-theme", "light");
            }
    };

    constructor() {
        const selectedTheme = localStorage.getItem("selected-theme");
        if (selectedTheme) {
            if (selectedTheme === "light") {
                Theme.themes(false);
            } else if (selectedTheme === "dark") {
                Theme.themes(true);
            }
        } else {
            localStorage.setItem("selected-theme", "light");
            Theme.themes(false);
        }
    }
}
