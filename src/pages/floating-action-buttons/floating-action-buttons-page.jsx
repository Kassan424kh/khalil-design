import React from "react"
import "./styles.sass";
import FloatingActionButtons from "../../components/floating-action-buttons/floating-action-buttons";

const FloatingActionButtonsPage = () => {
    const actionButtons = [
        {
            icon: "edit",
            onClick: () => {
                console.log("edit");
            }
        },
        {
            icon: "delete",
            onClick: () => {
                console.log("delete");
            }
        },
        {
            icon: "add",
            onClick: () => {
                console.log("add");
            }
        }
    ];

    return (
        <div className="page infos-card-page">
            <FloatingActionButtons actionButtons={actionButtons} />
        </div>
    );
};

export default FloatingActionButtonsPage;
