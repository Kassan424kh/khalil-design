import React, { useRef } from "react";
import "./styles.sass";

const SelectOption = (props) => {
  const pauseClickTime = useRef(Date.now());

  return (
    <div
      className={`select-option${props.defaultOption ? " default-option" : ""}${
        props.hide ? " hide-option" : ""
      }${
        props.selectedOption &&
        (() => {
          if (props.selectedOption.length)
            return props.multiSelect
              ? (() => {
                  const foundSelectedOption = props.selectedOption.filter(
                    (option) => {
                      return option[0] === props.id;
                    }
                  )[0];
                  return foundSelectedOption
                    ? foundSelectedOption[0] === props.id
                    : false;
                })()
              : props.selectedOption[0] === props.id;
          else return false;
        })() &&
        !props.defaultOption
          ? " selected"
          : ""
      }`}
      onClick={() => {
        if (Date.now() > pauseClickTime.current) {
          if (!props.defaultOption) {
            props.setSelectedOption(
              props.multiSelect
                ? props.selectedOption.filter(
                    (option) => option[0] === props.id
                  ).length
                  ? props.selectedOption.filter(
                      (option) => option[0] !== props.id
                    )
                  : [...props.selectedOption, [props.id, props.children]]
                : [props.id, props.children]
            );
          }
          props.setDisableSelecting(true);
          if (!props.multiSelect) {
            setTimeout(() => {
              props.setShowOptions(false);
            }, 450);
          }
          pauseClickTime.current = Date.now() + 2000;
        }
      }}
    >
      <span className={"select-option-icon material-symbols-outlined"}>
        arrow_right
      </span>
      <pre ref={props.textRef}>{props.children}</pre>
    </div>
  );
};

export default SelectOption;
