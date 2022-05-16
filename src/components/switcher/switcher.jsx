import { useEffect, useState } from "react";
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
        if (onSwitch) onSwitch(active);
    }, [active]);

    return (
        <div
            className={`switcher ${vertical ? "vertical" : ""}`}
            onClick={() => {
                setActive((a) => !a);
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
