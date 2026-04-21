import React, { useEffect, useState } from "react";
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
  const [renderModal, setRenderModal] = useState();
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    if (!show) setShowModal(false);
    const t = setTimeout(
      () => {
        setRenderModal(show);
        if (show)
          setTimeout(
            () => {
              setShowModal(show);
            },
            show ? 50 : 0
          );
      },
      show ? 0 : 400
    );

    return () => clearTimeout(t);
  }, [show]);

  return renderModal ? (
    <div
      className={`modal disable-selecting ${className ? className : ""} ${
        showModal ? "open" : ""
      }`}
      style={style}
    >
      <div className={`modal-content`}>
        <div className={"modal-headline"}>
          {headline ?? "Copy Paste Forecast Columns"}
        </div>

        <div className={"modal-body"}>{children}</div>

        <div className={"modal-bottom-buttons"}>
          <Button
            className={"submit-button"}
            leftIcon={cancelIcon ?? "clear"}
            red
            text
            onClick={onCancel}
          >
            {cancelText ?? "Cancel"}
          </Button>
          <Button
            className={"cancel-button"}
            loading={submitLoading}
            leftIcon={submitIcon ?? "check"}
            green
            text
            onClick={onSubmit}
          >
            {submitText ?? "Submit"}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
