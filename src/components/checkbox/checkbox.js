import React, { useEffect, useState } from "react";
import "./styles.sass";

const Checkbox = (props) => {
    const [checked, isChecked] = useState(false);
    const [firstTime, isFirstTime] = useState(true);

    useEffect(() => {
        if (props.onCheck && !firstTime)
            props.onCheck(props.check !== undefined ? props.check : checked);

        isFirstTime(false);
    }, [checked, props.check]);

    return (
        <div
            className={`checkbox disable-selecting ${props.className ?? ""}${
                props.primary ? " primary" : ""
            }${props.disabled ? " disabled" : ""}`}
            onClick={() => {
                if (props.onCheck) props.onCheck(!props.check);
                isChecked(!checked);
            }}
        >
            {props.right && !props.left ? (
                <div className={"children right"}>{props.children}</div>
            ) : null}
            <span
                className={`checkbox-icon${
                    props.check !== undefined
                        ? props.check && !props.disabled
                            ? " checked"
                            : ""
                        : checked && !props.disabled
                        ? " checked"
                        : ""
                }`}
            >
                <span className={"material-symbols-outlined"}>check</span>
            </span>
            {props.left || (!props.left && !props.right) ? (
                <div className={"children left"}>{props.children}</div>
            ) : null}
        </div>
    );
};

export default Checkbox;
