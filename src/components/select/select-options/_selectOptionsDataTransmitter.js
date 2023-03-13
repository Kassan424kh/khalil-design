import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../hooks-store/store'
import _ from 'underscore'

const SelectOptionsDataTransmitter = ({
    mainSelectId,
    parentSelectId,
    show,
    top,
    bottom,
    left,
    right,
    selectId,
    showSelectedParallel,
    className,
    headerText,
    enableSearch,
    filterOnly,
    searchPlaceHolder,
    enableSelectAllButton,
    options,
    additionalFilterInformation,
    multiSelect,
    selectedOption,
    setSelectedOption,
    defaultOption,
    defaultOptionText,
    clearSelectedOptions,
    clicked,
    sort,
    selectButtonProperties,
    updatePosition,
    selectMouseEnter,
    updateOptionsProperties,
    index
}) => {
    const [disableSelecting, setDisableSelecting] = useState(false)
    const [{ selectProps }, dispatch] = useStore()
    const selectOptionsDataAfterIndex = selectProps[index]
    const [openDirections, setOpenDirections] = useState({
        top: top !== undefined ? top : true,
        bottom: bottom !== undefined ? bottom : true,
        left: left !== undefined ? left : !right,
        right: right !== undefined ? right : !left
    })

    const currentSelectId = useRef()
    useEffect(() => {
        currentSelectId.current = selectOptionsDataAfterIndex?.selectId
    }, [selectOptionsDataAfterIndex])

    useEffect(() => {
        const newOpenDirections = {
            top: top !== undefined ? top : true,
            bottom: bottom !== undefined ? bottom : true,
            left: left !== undefined ? left : !right,
            right: right !== undefined ? right : !left
        }
        setOpenDirections({ ...newOpenDirections })
    }, [top, bottom, left, right])

    const showSelectOptions = useRef(false)
    useEffect(() => {
        showSelectOptions.current = selectId !== currentSelectId.current ? true : show

        dispatch('UPDATE_SELECT_PROPS', {
            selectId: selectId,
            showSelectedParallel: showSelectedParallel,
            className: className,
            headerText: headerText,
            enableSearch: enableSearch,
            filterOnly: filterOnly,
            searchPlaceHolder: searchPlaceHolder,
            enableSelectAllButton: enableSelectAllButton,
            additionalFilterInformation: additionalFilterInformation,
            multiSelect: multiSelect,
            setSelectedOption: setSelectedOption,
            defaultOption: defaultOption,
            defaultOptionText: defaultOptionText,
            clearSelectedOptions: clearSelectedOptions,
            disableSelecting: disableSelecting,
            setDisableSelecting: setDisableSelecting,
            lastUpdate: clicked,
            sort: sort,
            index: index,
            ...(mainSelectId && parentSelectId
                ? {
                      mainSelectId: mainSelectId,
                      parentSelectId: parentSelectId
                  }
                : {})
        })
    }, [additionalFilterInformation, showSelectedParallel, clearSelectedOptions, disableSelecting, clicked, show])

    const prevSelectedOption = useRef()
    useEffect(() => {
        if (selectedOption && !_.isEqual(selectedOption, prevSelectedOption.current)) {
            dispatch('UPDATE_SELECT_PROPS', {
                selectedOption: selectedOption,
                index: index
            })
            prevSelectedOption.current = selectedOption
        }
    }, [selectedOption])

    // set and update options
    useEffect(() => {
        dispatch('UPDATE_SELECT_OPTIONS', {
            options: options,
            index: index
        })
    }, [options])

    const showTimeout = useRef()
    useEffect(() => {
        showTimeout.current = setTimeout(() => {
            dispatch('UPDATE_SELECT_PROPS', {
                show: showSelectOptions.current,
                lastUpdate: clicked,
                index: index
            })
        }, 150)

        return () => clearTimeout(showTimeout.current)
    }, [show, clicked, showSelectOptions])

    useEffect(() => {
        dispatch('UPDATE_SELECT_PROPS', {
            selectButtonProperties: selectButtonProperties,
            openDirections: openDirections,
            lastUpdate: selectMouseEnter,
            index: index
        })
    }, [selectButtonProperties, clicked, updatePosition, selectMouseEnter, updateOptionsProperties, openDirections])

    return <></>
}

export default SelectOptionsDataTransmitter
