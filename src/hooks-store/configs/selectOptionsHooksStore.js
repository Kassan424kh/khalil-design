import { initStore } from '../store'
import { deepCopy } from '../../services/deepCopy'
import _ from "underscore"

export const defaultSelectOptionsData = {
    selectOptions: {
        "0": {
            index: 0,
            selectId: undefined,
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
        CLOASE_ALL_SELECT_OPTIONS: oldState => {
            Object.keys(oldState.selectOptions).map(soKey => {
                oldState.selectOptions[soKey] = {
                    ...oldState.selectOptions[soKey],
                    show: false,
                    lastUpdate: Date.now()
                }
            })
            return oldState
        },
        UPDATE_DATA: (prevState, data) => {
            const dataIncludeIndex = Object.keys(data).includes("index")
            if (!dataIncludeIndex ){
                console.error ("`selectOptionsHooksStore.js` => `UPDATE_DATA` data object don't incluedes `index` key")
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
        }
    }
    initStore(actions, defaultSelectOptionsData)
}

export default configureStore
