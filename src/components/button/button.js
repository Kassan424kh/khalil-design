import React from "react";
import "./styles.sass";

const Button = (props) => {
    return (
        <div
            className={`button disable-selecting${(() => {
                let _classes = "";
                if (props.primary) _classes += " primary";
                if (props.outlined) _classes += " outlined";
                if (props.className) _classes += ` ${props.className}`;
                if (props.disabled) _classes += " disabled";
                if (props.withShadow) _classes += " with-shadow";
                if (props.loading) _classes += " loading";
                // colors
                if (props.green) _classes += " green";
                else if (props.grey) _classes += " grey";
                else if (props.red) _classes += " red";
                else if (props.blue) _classes += " blue";
                else if (props.yellow) _classes += " yellow";

                return _classes;
            })()}`}
            style={{
                padding: `${
                    props.children && (props.leftIcon || props.rightIcon)
                        ? "12px"
                        : "15px"
                } ${props.children && props.rightIcon ? "22px" : "15px"} ${
                    props.children && (props.leftIcon || props.rightIcon)
                        ? "12px"
                        : "15px"
                } ${props.children && props.leftIcon ? "20px" : "15px"}`
            }}
            onClick={!props.disabled && !props.loading ? props.onClick : null}
            {...props.args}
        >
            {props.leftIcon ? (
                <span className="button-icon left material-symbols-outlined">
                    {props.leftIcon}
                </span>
            ) : null}
            {props.children ? (
                <div
                    className={"button-content"}
                    style={{
                        padding: `0 ${props.rightIcon ? "15px" : "0"} 0 ${
                            props.leftIcon ? "15px" : "0"
                        }`
                    }}
                >
                    {props.children}
                </div>
            ) : null}
            {props.rightIcon ? (
                <span className="button-icon right material-symbols-outlined">
                    {props.rightIcon}
                </span>
            ) : null}
            {props.loading ? <div className="loading-effect" /> : null}
        </div>
    );
};

export default Button;
