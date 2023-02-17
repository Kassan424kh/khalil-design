import "./styles.sass";
import Select from "../../components/select/select";

const SelectPage = () => {
    return (
        <div className="page">
            <Select
                enableSearch
                filterOnly={"unselected"}
                multiSelect
                showSelectedParallel
                enableCloseButton
                enableSelectAllButton
                options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            >
                click me to open select options
            </Select>
            <Select
                enableSearch
                enableSelectAllButton
                headerText={"asdfasdf"}
                options={{ "1": "asdf1", "2": "asdf2", "3": ["asdf3", [1, 2, [3, [55, 55, 66]]]] }}
            >
                click me to open select options
            </Select>
        </div>
    );
};

export default SelectPage;
