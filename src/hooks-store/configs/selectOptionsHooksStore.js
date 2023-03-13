import { initStore } from '../store'
import { deepCopy } from '../../services/deepCopy'
import _ from 'underscore'

export const initSelects = {
    selectProps: {
        0: {
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
            openDirections: {
                top: true,
                bottom: true,
                left: true,
                right: true
            },
            updateOptionsProperties: [],
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
    },
    selectOptions: {
        0: {
            options: [],
            length: 0
        }
    }
}

const configureStore = () => {
    const actions = {
        UPDATE_SELECT_PROPS: (prevState, data) => {
            const dataIncludeIndex = Object.keys(data).includes('index')
            if (!dataIncludeIndex) {
                console.error(
                    "`selectOptionsHooksStore.js` => `UPDATE_SELECT_PROPS` data object don't incluedes `index` key"
                )
                return prevState
            }

            const nextState = _.clone(prevState)
            nextState.selectProps = {
                ...nextState.selectProps,
                [data.index]: {
                    ...(nextState.selectProps[data.index] ?? {}),
                    ...data
                }
            }

            const newDataNotEqualToOldData =
                JSON.stringify({
                    ...nextState.selectProps[data.index],
                    lastUpdate: 0,
                    headerText: '',
                    selectButtonProperties: {
                        ...nextState.selectProps[data.index]?.selectButtonProperties,
                        offset: null
                    }
                }) !==
                JSON.stringify({
                    ...prevState.selectProps[data.index],
                    lastUpdate: 0,
                    headerText: '',
                    selectButtonProperties: {
                        ...prevState.selectProps[data.index]?.selectButtonProperties,
                        offset: null
                    }
                })

            return newDataNotEqualToOldData ? nextState : prevState
        },
        UPDATE_SELECT_OPTIONS: (prevState, data) => {
            const dataIncludeIndex = Object.keys(data).includes('index')
            if (!dataIncludeIndex) {
                console.error(
                    "`selectOptionsHooksStore.js` => `UPDATE_SELECT_OPTIONS` data object don't incluedes `index` key"
                )
                return prevState
            }

            const nextState = _.clone(prevState)
            nextState.selectOptions = {
                ...nextState.selectOptions,
                [data.index]: {
                    ...nextState.selectOptions[data.index],
                    options: data.options,
                    length: data.options.length
                }
            }

            const newDataNotEqualToOldData = !_.isEqual(
                nextState.selectOptions[data.index],
                prevState.selectOptions[data.index]
            )

            return newDataNotEqualToOldData ? nextState : prevState
        },
        CLOASE_ALL_SELECT: prevState => {
            Object.keys(prevState.selectProps).map(soKey => {
                if (soKey !== '0') {
                    delete prevState.selectProps[soKey]
                    delete prevState.selectOptions[soKey]
                    return
                }
                prevState.selectProps = {
                    ...prevState.selectProps,
                    ...{
                        [soKey]: {
                            ...prevState.selectProps[soKey],
                            show: false,
                            lastUpdate: Date.now()
                        }
                    }
                }
                prevState.selectOptions = {
                    ...prevState.selectOptions
                }
            })
            return { ...prevState }
        },
        CLOSE_SELECT: (prevState, index) => {
            const nextState = { ...prevState }
            return {
                ...prevState,
                selectProps: {
                    ...prevState.selectProps,
                    ...{
                        [index]: {
                            ...prevState.selectProps[index],
                            show: false,
                            lastUpdate: Date.now()
                        }
                    }
                }
            }
        },
        OPEN_SELECT: (prevState, index) => {
            const nextState = { ...prevState }
            return {
                ...prevState,
                selectProps: {
                    ...prevState.selectProps,
                    ...{
                        [index]: {
                            ...prevState.selectProps[index],
                            show: true,
                            lastUpdate: Date.now()
                        }
                    }
                }
            }
        },
        TOGGLE_SELECT: (prevState, index) => {
            const nextState = { ...prevState }
            return {
                ...prevState,
                selectProps: {
                    ...prevState.selectProps,
                    ...{
                        [index]: {
                            ...prevState.selectProps[index],
                            show: !prevState.selectProps[index].show,
                            lastUpdate: Date.now()
                        }
                    }
                }
            }
        },
        DELETE_SUB_SELECT: (prevState, index) => {
            if (index !== '0') {
                delete prevState.selectProps[index]
                delete prevState.selectOptions[index]
            }
            return { ...prevState }
        },
        DELETE_SUB_SELECTS_UP_TARGET_INDEX: (prevState, index) => {
            const nextState = _.clone(prevState)
            Object.keys(nextState.selectProps).forEach(soIndex => {
                if (parseInt(soIndex) > parseInt(index)) {
                    delete nextState.selectProps[soIndex]
                    delete nextState.selectOptions[soIndex]
                }
            })
            return nextState
        },
        DELETE_ALL_SUB_SELECT: prevState => {
            Object.keys(prevState.selectProps).forEach(soIndex => {
                if (soIndex !== '0') {
                    delete prevState.selectProps[soIndex]
                    delete prevState.selectOptions[soIndex]
                }
            })
            return { ...prevState }
        }
    }
    initStore(actions, initSelects)
}

export default configureStore
