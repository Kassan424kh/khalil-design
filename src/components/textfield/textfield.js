import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import Button from "../button/button";
import "./styles.sass";
import NumberFormat from "react-number-format";

const TextField = ({
  leftIconButton,
  rightIconButton,
  value,
  className,
  isInvalid,
  beforeComponent,
  isPercent,
  type,
  onChange,
  afterComponent,
  invalidText,
  inputRef,
  suffix,
  decimalScale,
  ...props
}) => {
  const _leftIconButton = leftIconButton ?? false;
  const _rightIconButton = rightIconButton ?? false;
  const [_value, setValue] = useState("");

  const inputValue = typeof value === "undefined" ? _value : value;

  const withValueLimit = ({ floatValue }) =>
    !floatValue || (floatValue >= 0.0 && floatValue <= 999.9999);

  return (
    <div
      className={`textfield ${className ?? ""} ${
        isInvalid ? "is-invalid" : ""
      }`}
    >
      {beforeComponent ?? null}
      {_leftIconButton ? (
        <Button
          className={`icon-button left ${
            !_leftIconButton.onClick ? "only-icon" : ""
          }`}
          withShadow
          leftIcon={_leftIconButton.icon}
          onClick={_leftIconButton.onClick}
        />
      ) : null}
      {type === "number" ? (
        <NumberFormat
          {...props}
          ref={inputRef}
          value={value ?? ""}
          onValueChange={({ floatValue: value }) => {
            if (onChange) onChange(value);
            setValue(value);
          }}
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
              formattedValue === "" || floatValue <= (props.maxInt ?? 10000)
            );
          }}
        />
      ) : type === "textarea" ? (
        <textarea
          {...props}
          ref={(r) => {
            if (r) {
              if (r && inputRef) inputRef(r);
              r.style.height = "inherit";
              r.style.height = `${Math.min(r.scrollHeight - 20, 350)}px`;
            }
          }}
          rows={1}
          onWheel={(event) => event.target.blur()}
          value={inputValue ?? ""}
          className={`textfield-input textarea ${
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
              target.style.height = "inherit";
              target.style.height = `${Math.min(
                target.scrollHeight - 20,
                350
              )}px`;
              onChange(target.value);
              setValue(target.value);
            }
          }}
        />
      ) : (
        <input
          {...props}
          ref={inputRef}
          type={type}
          onWheel={(event) => event.target.blur()}
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
              onChange(target.value);
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
      {afterComponent ?? null}
      {isInvalid && invalidText ? (
        <p className={"textfield-invalid-feedback-text"}>{invalidText}</p>
      ) : null}
    </div>
  );
};

export default memo(TextField);
