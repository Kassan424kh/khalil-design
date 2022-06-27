import React from "react";
import "./styles.sass";

const Button = ({
  className,
  primary,
  outlined,
  text,
  disabled,
  withShadow,
  loading,
  children,
  leftIcon,
  rightIcon,
  green,
  grey,
  red,
  blue,
  yellow,
  onClick,
  args
}) => {
  return (
    <div
      className={`button disable-selecting${(() => {
        let _classes = "";
        if (primary) _classes += " primary";
        if (outlined) _classes += " outlined";
        if (className) _classes += ` ${className}`;
        if (disabled) _classes += " disabled";
        if (withShadow) _classes += " with-shadow";
        if (loading) _classes += " loading";
        if (text) _classes += " text";
        if (!children && (leftIcon || rightIcon)) _classes += " icon-button";
        // colors
        if (green) _classes += " green";
        else if (grey) _classes += " grey";
        else if (red) _classes += " red";
        else if (blue) _classes += " blue";
        else if (yellow) _classes += " yellow";

        return _classes;
      })()}`}
      style={{
        padding: text
          ? `0 ${rightIcon ? "8px" : "0"} 0 ${leftIcon ? "8px" : "0"}`
          : null
      }}
      onClick={!disabled && !loading ? onClick : null}
      {...args}
    >
      {leftIcon ? (
        <span className="button-icon left material-symbols-outlined">
          {leftIcon}
        </span>
      ) : null}
      {children ? (
        <div
          className={"button-content"}
          style={{
            padding: `0 ${rightIcon ? "15px" : "0"} 0 ${
              leftIcon ? "15px" : "0"
            }`
          }}
        >
          {children}
        </div>
      ) : null}
      {rightIcon ? (
        <span className="button-icon right material-symbols-outlined">
          {rightIcon}
        </span>
      ) : null}
      {loading ? <div className="loading-effect" /> : null}
    </div>
  );
};

export default Button;
