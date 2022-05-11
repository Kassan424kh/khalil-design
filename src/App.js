import React, { useState } from "react";
import "./styles.sass";
import messagesHooksStore from "./hooks-store/configs/messagesHooksStore";
import selectOptionsHooksStore from "./hooks-store/configs/selectOptionsHooksStore";
import Select from "./components/select/select";
import Button from "./components/button/button";
import SelectOptions from "./components/select/select-options/selectOptions";
import Textfield from "./components/textfield/textfield";
import Headline from "./components/headline/headline";
import Checkbox from "./components/checkbox/checkbox";

messagesHooksStore();
selectOptionsHooksStore();

export default function App() {
    const [toggleSelectOptions, setToggleSelectOptions] = useState("");

    return (
        <div className="App">
            <Headline icon={"check"} text={"Editable Headline"} />
            <Button> click me </Button>
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
        </div>
    );
}
