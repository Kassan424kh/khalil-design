import React, { memo, useState } from "react";
import Button from "../button/button";
import "./styles.sass";
import NumberFormat from "react-number-format";

const TextField = (props) => {
    const leftIconButton = props.leftIconButton ?? false;
    const rightIconButton = props.rightIconButton ?? false;
    const [value, setValue] = useState("");

    const inputValue = typeof props.value === "undefined" ? value : props.value;

    const withValueLimit = ({ floatValue }) =>
        !floatValue || (floatValue >= 0.0 && floatValue <= 999.9999);

    return (
        <div
            className={`textfield ${props.className ?? ""} ${
                props.isInvalid ? "is-invalid" : ""
            }`}
        >
            {props.beforeComponent ?? null}
            {leftIconButton ? (
                <Button
                    className={`icon-button left ${
                        !leftIconButton.onClick ? "only-icon" : ""
                    }`}
                    withShadow
                    leftIcon={leftIconButton.icon}
                    onClick={leftIconButton.onClick}
                />
            ) : null}
            {props.textFieldProps && props.textFieldProps.type === "number" ? (
                <NumberFormat
                    value={value ?? ""}
                    onValueChange={({ floatValue: value }) => {
                        if (props.onChange) props.onChange(value);
                        console.log(value);
                        setValue(value);
                    }}
                    placeholder={props.textFieldProps.placeholder}
                    className={`textfield-input ${
                        leftIconButton
                            ? leftIconButton.onClick
                                ? "with-left-icon-button"
                                : "with-left-icon"
                            : ""
                    } ${
                        rightIconButton
                            ? rightIconButton.onClick
                                ? "with-right-icon-button"
                                : "with-right-icon"
                            : ""
                    }`}
                    inputMode="numeric"
                    suffix={props.suffix}
                    decimalScale={props.decimalScale}
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return (
                            formattedValue === "" ||
                            floatValue <= (props.textFieldProps.maxInt ?? 10000)
                        );
                    }}
                />
            ) : (
                <input
                    type={props.type}
                    onWheel={(event) => event.target.blur()}
                    {...props.textFieldProps}
                    value={inputValue ?? ""}
                    className={`textfield-input ${
                        leftIconButton
                            ? leftIconButton.onClick
                                ? "with-left-icon-button"
                                : "with-left-icon"
                            : ""
                    } ${
                        rightIconButton
                            ? rightIconButton.onClick
                                ? "with-right-icon-button"
                                : "with-right-icon"
                            : ""
                    }`}
                    onChange={({ target }) => {
                        if (target.value !== props.value) {
                            if (props.onChange) props.onChange(target.value);
                            setValue(target.value);
                        }
                    }}
                />
            )}
            {rightIconButton ? (
                <Button
                    className={`icon-button right ${
                        !rightIconButton.onClick ? "only-icon" : ""
                    }`}
                    withShadow
                    leftIcon={rightIconButton.icon}
                    onClick={rightIconButton.onClick}
                />
            ) : null}
            {props.afterComponent ?? null}
            {props.isInvalid && props.invalidText ? (
                <p className={"textfield-invalid-feedback-text"}>
                    {props.invalidText}
                </p>
            ) : null}
        </div>
    );
};

export default memo(TextField);
