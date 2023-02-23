import React, {useState} from "react"
import "./styles.sass";
import Select from "../../components/select/select";
import { faker } from '@faker-js/faker'

const SelectPage = () => {
    const [_fakeList, _]  = useState(new Array(30000).fill().map((value, index) => faker.lorem.words(6)))

    return (
        <div className="page">
            <Select
                enableSearch
                filterOnly={"unselected"}
                multiSelect
                showSelectedParallel
                enableCloseButton
                enableSelectAllButton
                options={_fakeList}
            >
                click me to open select options
            </Select>
            <Select
                enableSearch
                headerText={"asdfasdf"}
                options={{ "1": "asdf1", "2": "asdf2", "3": ["asdf3", [0, [1, _fakeList]]] }}
                onSelect={(selectedOption) => {
                    console.log(selectedOption)
                }}
            >
                click me to open select options
            </Select>
        </div>
    );
};

export default SelectPage;
