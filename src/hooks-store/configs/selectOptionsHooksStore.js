import { initStore } from "../store";
import { deepCopy } from "../../services/deepCopy";

export const defaultSelectOptionsData = {
    selectOptions: {
        selectId: undefined,
        className: undefined,
        headerText: undefined,
        enableSearch: false,
        filterOnly: undefined,
        searchPlaceHolder: null,
        enableSelectAllButton: false,
        selectButtonProperties: {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            leftHidden: false,
            rightHidden: false,
            topHidden: false,
            bottomHidden: false,
            offset: undefined
        },
        show: false,
        setShow: undefined,
        openDirections: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },
        updateOptionsProperties: [],
        options: [],
        multiSelect: false,
        selectedOption: undefined,
        setSelectedOption: undefined,
        defaultOption: false,
        defaultOptionText: undefined,
        updatePosition: [],
        clearSelectedOptions: undefined,
        disableSelecting: false,
        setDisableSelecting: undefined,
        sort: "",
        lastUpdate: 0
    }
};

const configureStore = () => {
    const actions = {
        UPDATE_DATA: (oldState, data) => {
            const newSelectOptionsData = (() => ({
                ...oldState.selectOptions,
                ...data
            }))();

            const newDataNotEqualToOldData =
                JSON.stringify({
                    ...newSelectOptionsData,
                    lastUpdate: 0,
                    headerText: "",
                    selectButtonProperties: {
                        ...newSelectOptionsData.selectButtonProperties,
                        offset: null
                    }
                }) !==
                JSON.stringify({
                    ...oldState.selectOptions,
                    lastUpdate: 0,
                    headerText: "",
                    selectButtonProperties: {
                        ...oldState.selectOptions.selectButtonProperties,
                        offset: null
                    }
                });

            return newDataNotEqualToOldData
                ? {
                      ...oldState,
                      selectOptions: newSelectOptionsData
                  }
                : oldState;
        }
    };
    initStore(actions, defaultSelectOptionsData);
};

export default configureStore;
