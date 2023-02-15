import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../hooks-store/store'

const SelectOptionsDataTransmitter = ({
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
    enableCloseButton,
    closeButtonText,
    setShow,
    options,
    additionalFilterInformation,
    multiSelect,
    selectedOption,
    setSelectedOption,
    lastTimeUpdatedSelectedOptions,
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
    const [state, dispatch] = useStore()
    const [openDirections, setOpenDirections] = useState({
        top: top !== undefined ? top : true,
        bottom: bottom !== undefined ? bottom : true,
        left: left !== undefined ? left : !right,
        right: right !== undefined ? right : !left
    })

    const currentSelectId = useRef()
    useEffect(() => {
        currentSelectId.current = state.selectOptions.selectId
    }, [state])

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
    const currentAndNextSelectIds = useRef(false)
    useEffect(() => {
        showSelectOptions.current = selectId !== currentSelectId.current ? true : show
        currentAndNextSelectIds.current = { current: currentSelectId.current, next: selectId }

        dispatch('UPDATE_DATA', {
            selectId: selectId,
            showSelectedParallel: showSelectedParallel,
            className: className,
            headerText: headerText,
            enableSearch: enableSearch,
            filterOnly: filterOnly,
            searchPlaceHolder: searchPlaceHolder,
            enableSelectAllButton: enableSelectAllButton,
            enableCloseButton: enableCloseButton,
            closeButtonText: closeButtonText,
            setShow: setShow,
            options: options,
            additionalFilterInformation: additionalFilterInformation,
            multiSelect: multiSelect,
            selectedOption: selectedOption,
            setSelectedOption: setSelectedOption,
            defaultOption: defaultOption,
            defaultOptionText: defaultOptionText,
            clearSelectedOptions: clearSelectedOptions,
            disableSelecting: disableSelecting,
            setDisableSelecting: setDisableSelecting,
            lastUpdate: clicked,
            sort: sort,
            index: index
        })
    }, [
        selectId,
        selectedOption,
        lastTimeUpdatedSelectedOptions,
        options,
        additionalFilterInformation,
        clearSelectedOptions,
        disableSelecting,
        clicked,
        showSelectedParallel,
        show
    ])

    const showTimeout = useRef()
    useEffect(() => {
        showTimeout.current = setTimeout(() => {
            dispatch('UPDATE_DATA', {
                show: showSelectOptions.current,
                lastUpdate: clicked,
                index: index
            })
        }, 150)

        return () => clearTimeout(showTimeout.current)
    }, [show, clicked, showSelectOptions])

    useEffect(() => {
        dispatch('UPDATE_DATA', {
            selectButtonProperties: selectButtonProperties,
            openDirections: openDirections,
            lastUpdate: selectMouseEnter,
            index: index
        })
    }, [selectButtonProperties, clicked, updatePosition, selectMouseEnter, updateOptionsProperties, openDirections])

    return <></>
}

export default SelectOptionsDataTransmitter
