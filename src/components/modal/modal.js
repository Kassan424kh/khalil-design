import React from "react";
import Button from "../button/button";
import "./styles.sass";

const Modal = ({
    className,
    show,
    style,
    headline,
    children,
    cancelIcon,
    onCancel,
    cancelText,
    submitLoading,
    submitIcon,
    onSubmit,
    submitText
}) => {
    return (
        <div
            className={`modal disable-selecting ${className ? className : ""} ${
                show ? "open" : ""
            }`}
            style={style}
        >
            <div className={`modal-content`}>
                <div className={"modal-headline"}>
                    {headline ?? "Copy Past Forecast Columns"}
                </div>

                <div className={"modal-body"}>{children}</div>

                <div className={"modal-bottom-buttons"}>
                    <Button
                        className={"submit-button"}
                        leftIcon={cancelIcon ?? "clear"}
                        red
                        onClick={onCancel}
                    >
                        {cancelText ?? "Cancel"}
                    </Button>
                    <Button
                        className={"cancle-button"}
                        loading={submitLoading}
                        leftIcon={submitIcon ?? "check"}
                        green
                        onClick={onSubmit}
                    >
                        {submitText ?? "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
