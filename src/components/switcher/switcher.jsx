import React, { useEffect, useState } from "react";
import "./styles.sass";

const Switcher = ({
    leftIcon,
    leftColor,
    rightColor,
    rightIcon,
    onSwitch,
    value,
    vertical
}) => {
    const [active, setActive] = useState(value);

    useEffect(() => {
        setActive(value);
    }, [value]);

    return (
        <div
            className={`switcher ${vertical ? "vertical" : ""}`}
            onClick={() => {
                setActive((a) => {
                    const _active = !a;
                    if (onSwitch) onSwitch(_active);
                    return _active;
                });
            }}
        >
            <span
                class={`icon left material-symbols-outlined ${
                    !active ? "active" : ""
                }`}
            >
                {leftIcon ?? "light_mode"}
            </span>
            <span
                class={`icon right material-symbols-outlined ${
                    active ? "active" : ""
                }`}
            >
                {rightIcon ?? "dark_mode"}
            </span>
            <div
                className={`background-select-effect ${active ? "active" : ""}`}
            />
        </div>
    );
};

export default Switcher;
