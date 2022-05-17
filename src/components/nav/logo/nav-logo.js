import "./styles.sass";
import React from "react";

const NavLogo = (props) => {
    return (
        <div className={`cht-logo ${props.open ? "open" : ""}`}>
            <LogoSvg />
        </div>
    );
};

export default NavLogo;

const LogoSvg = (props) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 54 35"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-miterlimit:1.5;".styleStringToJsObject()}
        >
            <g transform="matrix(1,0,0,1,-643.014,-922.584)">
                <g transform="matrix(0.128107,0,0,0.0766793,546.894,898.181)">
                    <path
                        d="M1131.09,368.91C1089.45,319.16 830.779,319.503 788.91,368.91C748.175,416.978 748.222,662.56 788.91,711.09C830.821,761.079 1089.52,761.952 1131.09,711.09C1171.24,661.968 1171.65,417.368 1131.09,368.91Z"
                        style={"fill:var(--nav-background-color);".styleStringToJsObject()}
                    />
                    <clipPath id="_clip1">
                        <path d="M1131.09,368.91C1089.45,319.16 830.779,319.503 788.91,368.91C748.175,416.978 748.222,662.56 788.91,711.09C830.821,761.079 1089.52,761.952 1131.09,711.09C1171.24,661.968 1171.65,417.368 1131.09,368.91Z" />
                    </clipPath>
                    <g clipPath="url(#_clip1)">
                        <g transform="matrix(0.61307,0,0,1,376.369,-5.68434e-14)">
                            <g>
                                <g transform="matrix(1.30854,0,0,0.636611,-296.239,196.345)">
                                    <path
                                        d="M1133.54,372.141C1132.74,370.983 1131.92,369.905 1131.09,368.91C1123.55,359.897 1108.88,352.529 1089.67,346.798C1076.85,342.973 1062.01,339.877 1045.9,337.51"
                                        style={"fill:none;stroke:var(--black);stroke-width:25.51px;".styleStringToJsObject()}
                                    />
                                </g>
                                <path
                                    d="M1129.64,663.859L1129.64,422.231"
                                    style={"fill:none;stroke:var(--black);stroke-width:26.44px;".styleStringToJsObject()}
                                />
                            </g>
                            <g>
                                <path
                                    d="M913.409,407.526L913.409,673.11"
                                    style={"fill:none;stroke:var(--black);stroke-width:26.44px;".styleStringToJsObject()}
                                />
                                <g transform="matrix(1,0,0,1,113.677,0)">
                                    <path
                                        d="M913.409,407.526L913.409,673.11"
                                        style={"fill:none;stroke:var(--black);stroke-width:26.44px;".styleStringToJsObject()}
                                    />
                                </g>
                                <g transform="matrix(2.6209e-17,-1,0.428025,6.12323e-17,738.978,1453.73)">
                                    <path
                                        d="M913.409,407.526L913.409,673.11"
                                        style={"fill:none;stroke:var(--black);stroke-width:34.67px;".styleStringToJsObject()}
                                    />
                                </g>
                            </g>
                            <g transform="matrix(1.30854,0,0,0.636611,-296.239,196.345)">
                                <path
                                    d="M876.548,410.703L876.548,410.687C876.549,390.455 872.309,371.254 864.962,358.214C857.615,345.174 847.909,339.623 838.437,343.045C814.256,349.515 795.429,357.136 788.91,368.91C762.296,416.978 762.669,662.56 788.91,711.09C795.598,723.46 815.633,731.718 841.243,737.336C849.963,740.245 858.849,734.934 865.543,722.814C872.236,710.694 876.059,692.99 875.997,674.404C876.402,674.38 876.402,674.37 876.402,674.37"
                                    style={"fill:none;stroke:var(--black);stroke-width:25.51px;".styleStringToJsObject()}
                                />
                            </g>
                        </g>
                    </g>
                    <path
                        d="M1131.09,368.91C1089.45,319.16 830.779,319.503 788.91,368.91C748.175,416.978 748.222,662.56 788.91,711.09C830.821,761.079 1089.52,761.952 1131.09,711.09C1171.24,661.968 1171.65,417.368 1131.09,368.91Z"
                        style={"fill:none;stroke:var(--black);stroke-width:19.58px;stroke-linecap:round;stroke-linejoin:round;".styleStringToJsObject()}
                    />
                </g>
            </g>
        </svg>
    );
};

String.prototype.styleStringToJsObject = function () {
    const text = this;
    return Object.fromEntries(
        text.split(";").map((s) => {
            const _s = s.split(":");
            let key = _s[0];
            const value = _s[1];

            key = key
                .split("-")
                .map((n, i) => (i === 0 ? n : n[0].toUpperCase() + n.slice(1)))
                .join("");

            return [key, value];
        })
    );
};
