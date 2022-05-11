import React, { useEffect, useRef, useState } from "react";
import "./styles.sass";
import $ from "jquery";
import { useClickOutside } from "../../services/useClickOutside";

const Headline = (props) => {
    const myRef = useRef();
    const [inputRef, setInputRef] = useState();
    const [oldText, setOldText] = useState(props.text ?? "");
    const [text, editText] = useState(props.text ?? "");
    const [focused, setFocused] = useState(false);
    const [submitted, isSubmitted] = useState(true);
    const [firstTime, isFirstTime] = useState(true);

    const focusInput = () => {
        setFocused(true);
        setTimeout(() => {
            if (inputRef) {
                inputRef.focus();
                inputRef.select();
            }
        }, 10);
    };

    useEffect(() => {
        setOldText(props.oldText);
    }, [props.oldText]);

    useEffect(() => {
        if (props.onChange) props.onChange(text);
    }, [text]);

    useEffect(() => {
        if (props.text) editText(props.text);
    }, [props.text]);

    useEffect(() => {
        setOldText(props.oldText);
        isSubmitted(true);
    }, [props.reset]);

    useEffect(() => {
        if (!firstTime) {
            setOldText(text);
            setTimeout(() => {
                if (props.onSubmit) props.onSubmit();
                isSubmitted(true);
            }, 50);
        }
        isFirstTime(false);
    }, [props.save]);

    useClickOutside(myRef, () => {
        if (text !== oldText && submitted) {
            isSubmitted(false);
        }
        setFocused(false);
    });

    return (
        <div
            ref={myRef}
            onDoubleClick={
                props.focusOnDoubleClick && !focused ? focusInput : null
            }
            className={`tv-tool-headline disable-selecting ${
                props.editable && focused ? "editable" : ""
            } ${props.error ? "danger" : ""} ${focused ? "focused" : ""} ${
                props.className ? props.className : ""
            }`}
        >
            {props.icon ? (
                <span className={`header-icon material-symbols-outlined`}>
                    {props.icon}
                </span>
            ) : null}
            <div className={"tv-tool-headline-text-input"}>
                <div className={`hint-text ${props.error ? "show" : ""}`}>
                    &#x200B;
                    {props.error ? props.hintText ?? "Enter name" : props.text}
                </div>
                <input
                    className={`${
                        !props.editable || !focused ? "disabled" : ""
                    } ${(() => {
                        if (props.h1) return "h1";
                        else if (props.h2) return "h2";
                        else if (props.h3) return "h3";
                        else if (props.h4) return "h4";
                        else if (props.h5) return "h5";
                        else if (props.h6) return "h6";
                        else return "";
                    })()}`}
                    ref={setInputRef}
                    disabled={!props.editable || !focused}
                    type={"text"}
                    value={text ?? ""}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    placeholder={""}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            $(e.target).blur();
                            setOldText(props.text);
                            if (props.onSubmit) props.onSubmit();
                            if (!props.error) isSubmitted(true);
                        }
                    }}
                    onChange={(e) => {
                        const newText = e.target.value;

                        if (
                            (props.maxLength &&
                                props.maxLength >= newText.length) ||
                            newText <= text
                        ) {
                            editText(newText);
                            isSubmitted(false);
                        }
                    }}
                />
            </div>

            <div
                className={`edit-icons ${props.editable ? "show" : ""} ${
                    props.onSubmit && !submitted && props.enableCheckButton
                        ? "with-check"
                        : ""
                }`}
            >
                {props.onSubmit && props.enableCheckButton ? (
                    <span
                        className={`edit-icon ${
                            !submitted ? "show" : ""
                        }  check material-symbols-outlined`}
                        onClick={async () => {
                            setOldText(props.text);
                            await props.onSubmit();
                            if (!props.error) isSubmitted(true);
                        }}
                    >
                        check
                    </span>
                ) : null}
                <span
                    className={`edit-icon undo ${
                        !submitted ? "show" : ""
                    } material-symbols-outlined`}
                    onClick={() => {
                        editText(oldText);
                        setTimeout(() => {
                            isSubmitted(true);
                        }, 150);
                    }}
                >
                    undo
                </span>
                <span
                    className={`edit-icon edit  ${
                        submitted ? "show" : ""
                    }  material-symbols-outlined`}
                    onClick={focusInput}
                >
                    edit
                </span>
            </div>
        </div>
    );
};

export default Headline;
