import React, { useState } from "react";
import "./styles.sass";

const Checkbox = ({
  checked,
  className,
  primary,
  disabled,
  children,
  onCheck,
  left,
  right
}) => {
  const [_checked, _isChecked] = useState(checked ?? false);

  return (
    <div
      className={`checkbox disable-selecting ${className ?? ""}${
        primary ? " primary" : ""
      }${disabled ? " disabled" : ""}`}
      onClick={() => {
        if (onCheck) onCheck(!checked);
        _isChecked(!_checked);
      }}
    >
      {right && !left ? (
        <div className={"children right"}>{children}</div>
      ) : null}
      <span
        className={`checkbox-icon${
          checked !== undefined
            ? checked && !disabled
              ? " checked"
              : ""
            : _checked && !disabled
            ? " checked"
            : ""
        }`}
      >
        <span className={"material-icons-outlined"}>check</span>
      </span>
      {left || (!left && !right) ? (
        <div className={"children left"}>{children}</div>
      ) : null}
    </div>
  );
};

export default Checkbox;
