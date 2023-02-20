import { initStore } from '../store'
import { deepCopy } from '../../services/deepCopy'
import _ from "underscore"

export const defaultSelectOptionsData = {
    selectOptions: {
        "0": {
            index: 0,
            selectId: undefined,
            mainSelectId: undefined,
            parentSelectId: undefined,
            className: undefined,
            headerText: undefined,
            enableSearch: false,
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
            sort: '',
            lastUpdate: 0
        }
    }
}

const configureStore = () => {
    const actions = {
        UPDATE_DATA: (prevState, data) => {
            const dataIncludeIndex = Object.keys(data).includes("index")
            if (!dataIncludeIndex) {
                console.error("`selectOptionsHooksStore.js` => `UPDATE_DATA` data object don't incluedes `index` key")
                return prevState
            }

            const nextState = _.clone(prevState)
            nextState.selectOptions[data.index] = {
                ...(nextState.selectOptions[data.index] ?? {}),
                ...data
            }

            const newDataNotEqualToOldData = JSON.stringify({
                ...nextState.selectOptions[data.index],
                lastUpdate: 0,
                headerText: '',
                selectButtonProperties: {
                    ...nextState.selectOptions[data.index].selectButtonProperties,
                    offset: null
                }
            }) !==
                JSON.stringify({
                    ...prevState.selectOptions[data.index],
                    lastUpdate: 0,
                    headerText: '',
                    selectButtonProperties: {
                        ...prevState.selectOptions[data.index].selectButtonProperties,
                        offset: null
                    }
                })

            return newDataNotEqualToOldData
                ? nextState
                : prevState
        },
        CLOASE_ALL_SELECT_OPTIONS: prevState => {
            const nextState = deepCopy(prevState)
            Object.keys(nextState.selectOptions).map(soKey => {
                if (soKey !== "0") {
                    delete nextState.selectOptions[soKey]
                    return
                }

                nextState.selectOptions[soKey]["show"] = false
                nextState.selectOptions[soKey]["lastUpdate"] = Date.now()
            })
            return nextState
        },
        CLOSE_SELECT_OPTION: (prevState, index) => {
            const nextState = deepCopy(prevState)
            Object.keys(nextState.selectOptions).forEach(soKey => {
                if (soKey === index ) {
                    nextState.selectOptions[index]["show"] = false
                    nextState.selectOptions[index]["lastUpdate"] = Date.now()
                }
            })
            return nextState
        },
        DELETE_SUB_SELECT_OPTIONS: (prevState, index) => {
            if (index !== "0") delete prevState.selectOptions[index]
            return prevState
        },
        DELETE_ALL_SUB_SELECT_OPTIONS: (prevState) => {
            Object.keys(prevState.selectOptions).forEach(soIndex => {
                if (soIndex !== "0") delete prevState.selectOptions[soIndex]
            })
            return prevState
        }
    }
    initStore(actions, defaultSelectOptionsData)
}

export default configureStore
