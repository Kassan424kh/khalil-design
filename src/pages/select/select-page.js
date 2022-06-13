import "./styles.sass";
import Select from "../../components/select/select";

const SelectPage = () => {
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="page infos-card-page">
            <Select
                enableSearch
                filterOnly={"unselected"}
                multiSelect
                showSelectedParallel
                enableCloseButton
                enableSelectAllButton
                options={options}
            >
                click me to open select options
            </Select>
        </div>
    );
};

export default SelectPage;
