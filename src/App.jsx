import React, { useEffect, useReducer, useState } from "react";
import "./styles.sass";
import messagesUpdaterConfig from "./hooks-store/configs/messages";
import selectOptionsHooksStore from "./hooks-store/configs/selectOptionsHooksStore";
import Select from "./components/select/select";
import Button from "./components/button/button";
import Textfield from "./components/textfield/textfield";
import Headline from "./components/headline/headline";
import Checkbox from "./components/checkbox/checkbox";
import { useStore } from "./hooks-store/store";
import Messages from "./components/messages/messages";
import PaginationBar from "./components/pagination-bar/paginationBar";
import Modal from "./components/modal/modal";
import Nav from "./components/nav/nav";
import Theme from "./_themes";
import Switcher from "./components/switcher/switcher";
import Pages from "./pages/pages";
import SelectOptions from "./components/select/select-options/selectOptions";

messagesUpdaterConfig();
selectOptionsHooksStore();

export default function App() {
    const [{ showLoadingSpinner, selectOptions }, dispatch] = useStore()
    
    // set Theme
    useEffect(() => {
        new Theme()
    }, [])
    const alertMessage = async ({
        message,
        status,
        dismissible = true,
        timeoutInMilliseconds = 10000,
        id = "_",
        MID = undefined,
        onClose = undefined
    }) => {
        const messageProperties = {
            message: message,
            id: id,
            uuid: MID,
            type: status.toUpperCase(), // success, or warning, or danger
            dismissible: dismissible,
            timeoutInMilliseconds: timeoutInMilliseconds,
            onClose: onClose
        };
        dispatch("ADD_NEW_MESSAGE", messageProperties);
    };

    return (
        <div className="App">
            <Pages />
            <SelectOptions />
            {Object.keys(selectOptions).length > 1
                ? Object.keys(selectOptions).map((_, selectOptionsIndex) =>
                      selectOptionsIndex !== 0 ? (
                          <SelectOptions key={selectOptionsIndex} index={String(selectOptionsIndex)} />
                      ) : null
                  )
                : null}
        </div>
    );
}