import React, { useState } from "react";
import "./styles.sass";
import messagesHooksStore from "./hooks-store/configs/messagesHooksStore";
import selectOptionsHooksStore from "./hooks-store/configs/selectOptionsHooksStore";
import Select from "./components/select/select";
import Button from "./components/button/button";
import SelectOptions from "./components/select/select-options/selectOptions";

messagesHooksStore();
selectOptionsHooksStore();

export default function App() {
    const [toggleSelectOptions, setToggleSelectOptions] = useState("");

    return (
        <div className="App">
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

            <Select options={["Hello", "Name", "Is", "Khalil"]}>
                <p key="adfdasdf">click me</p>
                <p key="adfsasdf">click me</p>
                <p key="adfasdf">click me</p>
            </Select>
            <div className={"another-position"}>
                <Select
                    options={["Hello", "Name", "Is", "Khalil"]}
                    headerText={"test"}
                    enableSearch
                    searchPlaceHolder={"search me"}
                    enableSelectAllButton
                    left={false}
                    right={false}
                    top={false}
                    bottom={false}
                >
                    <p key="adfdasdf">click me</p>
                    <p key="adfsasdf">click me</p>
                    <p key="adfasdf">click me</p>
                </Select>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "end"
                }}
            >
                <Select
                    multiSelect
                    showSelectedParallel
                    headerText={"test"}
                    options={{
                        l:
                            "Hello asdfasdf asdf asdf asdf asdf asdf  asdfa sdf asdf ",
                        s: "My",
                        k:
                            "64_Winter Verlängerung Oktober Display Programmatic 2139VAW asdf asdf asdf ",
                        h: "Is",
                        o: "Khalil",
                        ls: "ssssa ",
                        sd: "asfffMy",
                        kd: "kjhgName",
                        hd: "uttrIs",
                        od: "poooKhalil"
                    }}
                    enableSearch
                    searchPlaceHolder={"search me"}
                    enableSelectAllButton
                    enableCloseButton
                >
                    <p key="adfdasdf">click me</p>
                    <p key="adfsasdf">click me</p>
                    <p key="adfasdf">click me</p>
                </Select>
                <Select options={["Hello", "Name", "Is", "Khalil"]}>
                    <p key="adfdasdf">click me</p>
                    <p key="adfsasdf">click me</p>
                    <p key="adfasdf">click me</p>
                </Select>
            </div>

            <div id={"outside"} />
            <SelectOptions />
        </div>
    );
}
