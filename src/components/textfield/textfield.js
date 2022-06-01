import React, { memo, useState } from "react";
import Button from "../button/button";
import "./styles.sass";
import NumberFormat from "react-number-format";

const TextField = ({
    leftIconButton,
    rightIconButton,
    value,
    isInvalid,
    invalidText,
    className,
    beforeComponent,
    textFieldProps,
    onChange,
    suffix,
    decimalScale,
    type,
    afterComponent
}) => {
    const _leftIconButton = leftIconButton ?? false;
    const _rightIconButton = rightIconButton ?? false;
    const [_value, setValue] = useState("");

    const inputValue = typeof value === "undefined" ? _value : value;

    return (
        <div
            className={`textfield ${className ?? ""} ${
                isInvalid ? "is-invalid" : ""
            }`}
        >
            {beforeComponent ?? null}
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
            {textFieldProps && textFieldProps.type === "number" ? (
                <NumberFormat
                    value={value ?? ""}
                    onValueChange={({ floatValue: value }) => {
                        if (onChange) onChange(value);
                        setValue(value);
                    }}
                    placeholder={textFieldProps.placeholder}
                    className={`textfield-input ${
                        _leftIconButton
                            ? _leftIconButton.onClick
                                ? "with-left-icon-button"
                                : "with-left-icon"
                            : ""
                    } ${
                        _rightIconButton
                            ? _rightIconButton.onClick
                                ? "with-right-icon-button"
                                : "with-right-icon"
                            : ""
                    }`}
                    inputMode="numeric"
                    suffix={suffix}
                    decimalScale={decimalScale}
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return (
                            formattedValue === "" ||
                            floatValue <= (textFieldProps.maxInt ?? 10000)
                        );
                    }}
                />
            ) : (
                <input
                    type={type}
                    onWheel={(event) => event.target.blur()}
                    {...textFieldProps}
                    value={inputValue ?? ""}
                    className={`textfield-input ${
                        _leftIconButton
                            ? _leftIconButton.onClick
                                ? "with-left-icon-button"
                                : "with-left-icon"
                            : ""
                    } ${
                        _rightIconButton
                            ? _rightIconButton.onClick
                                ? "with-right-icon-button"
                                : "with-right-icon"
                            : ""
                    }`}
                    onChange={({ target }) => {
                        if (target.value !== value) {
                            if (onChange) onChange(target.value);
                            setValue(target.value);
                        }
                    }}
                />
            )}
            {_rightIconButton ? (
                <Button
                    className={`icon-button right ${
                        !_rightIconButton.onClick ? "only-icon" : ""
                    }`}
                    withShadow
                    leftIcon={_rightIconButton.icon}
                    onClick={_rightIconButton.onClick}
                />
            ) : null}
            {afterComponent ?? null}
            {isInvalid && invalidText ? (
                <p className={"textfield-invalid-feedback-text"}>
                    {invalidText}
                </p>
            ) : null}
        </div>
    );
};

export default memo(TextField);
