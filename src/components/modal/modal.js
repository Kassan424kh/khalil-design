import React, { useEffect, useState } from "react";
import Button from "../button/button";
import "./styles.sass";

const Modal = (props) => {
    return (
        <div
            className={`modal disable-selecting ${
                props.className ? props.className : ""
            } ${props.show ? "open" : ""}`}
            style={props.style}
        >
            <div className={`modal-content`}>
                <div className={"modal-headline"}>
                    {props.headline ?? "Copy Past Forecast Columns"}
                </div>

                <div className={"modal-body"}>{props.children}</div>

                <div className={"modal-bottom-buttons"}>
                    <Button
                        leftIcon={props.cancelIcon ?? "clear"}
                        red
                        onClick={props.onCancel}
                    >
                        {props.cancelText ?? "Cancel"}
                    </Button>
                    <Button
                        loading={props.submitLoading}
                        leftIcon={props.submitIcon ?? "check"}
                        green
                        onClick={props.onSubmit}
                    >
                        {props.submitText ?? "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
