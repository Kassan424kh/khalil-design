import React, { useState } from "react";
import "./styles.sass";
import messagesUpdaterConfig from "./hooks-store/configs/messages";
import selectOptionsHooksStore from "./hooks-store/configs/selectOptionsHooksStore";
import Select from "./components/select/select";
import Button from "./components/button/button";
import SelectOptions from "./components/select/select-options/selectOptions";
import Textfield from "./components/textfield/textfield";
import Headline from "./components/headline/headline";
import Checkbox from "./components/checkbox/checkbox";
import { useStore } from "./hooks-store/store";
import Messages from "./components/messages/messages";

messagesUpdaterConfig();
selectOptionsHooksStore();

export default function App() {
    const [toggleSelectOptions, setToggleSelectOptions] = useState("");

    const dispatch = useStore(true)[1];
    const alert = async ({
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
            <Headline icon={"check"} text={"Editable Headline"} />
            <Button
                onClick={() => {
                    alert({
                        message: "test",
                        status: "success"
                    });
                }}
            >
                {" "}
                click me{" "}
            </Button>
            <Select
                enableSelectedStatusDot
                multiSelect
                options={{
                    l: "D",
                    s: "DB",
                    k: "DA",
                    h: "C",
                    o: "AB",
                    ls: "b ",
                    sd: "5",
                    kd: "___",
                    hd: "---",
                    od: "###"
                }}
                sort={"DESC"} // or "ASC"
                enableSearch
                searchPlaceHolder={"search me"}
                enableSelectAllButton
                enableCloseButton
                left={false}
            >
                <p key="adfdasdf">click me</p>
                <p key="adfsasdf">click me</p>
                <p key="adfasdf">click me</p>
            </Select>
            <Textfield />
            <Checkbox>test</Checkbox>

            <div id={"outside"} />
            <SelectOptions />
            <Messages />
        </div>
    );
}
