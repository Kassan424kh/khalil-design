import React, { useState } from "react";
import "./styles.sass";
import FloatingActionButtons from "../../components/floating-action-buttons/floating-action-buttons";
import Modal from "../../components/modal/modal";

const ModalPage = () => {
    const [show, setShow] = useState(true);

    const actionButtons = [
        {
            icon: "edit",
            onClick: () => {
                console.log("edit");
                setShow(true);
            }
        },
        {
            icon: "delete",
            onClick: () => {
                console.log("delete");
                setShow(true);
            }
        },
        {
            icon: "add",
            onClick: () => {
                console.log("add");
                setShow(true);
            }
        }
    ];

    return (
        <div className="page infos-card-page">
            <FloatingActionButtons actionButtons={actionButtons} />
            <Modal
                headline="Neuen Forecast erstellen"
                className={`create-new-fc`}
                show={show}
                //submitText={"Erstellen"}
                submitIcon={"check"}
                onSubmit={async () => {}}
                submitLoading={false}
                //cancelText={"Abbrechen"}
                cancelIcon={"clear"}
                onCancel={() => {
                    setShow(false);
                }}
            >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam{" "}
                <strong>
                    nonumy eirmod tempor invidunt ut labore et dolore
                </strong>{" "}
                magna aliquyam erat.
            </Modal>
        </div>
    );
};

export default ModalPage;
