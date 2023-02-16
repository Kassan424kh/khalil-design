import React, { useEffect, useRef, useState } from 'react'
import SelectOptionsDataTransmitter from './select-options/_selectOptionsDataTransmitter'
import './styles.sass'
import $ from 'jquery'
import { useContainerDimensions } from '../../services/useContainerDimensions'
import { v4 as uuidv4 } from 'uuid'
import { useClickOutside } from '../../services/useClickOutside'
import _ from 'underscore'
import { useStore } from '../../hooks-store/store'

/**
 * <b>options:</b> Should be a list of (Strings) e.g. ["1", ...], or object with keys and values of (Strings) e.g. {"0": "1", ...}
 *
 * <b>selected:</b> the value can be a single option (e.g. ["key", "value"]) or multible options (e.g. [["key", "values"], ...])
 *
 * <b>onSelect:</b> Return a single option (e.g. ["key", "value"]) or multible options (e.g. [["key", "values"], ...])
 * <br/> . . . . called only if there was option/s selected/deselected
 *
 * <b>onActive:</b> Return a status of the current SelectOptions window if it is open/closed
 * <br/> . . . . called only if SelectOptions window was opened or closed
 *
 * <b>multiSelect:</b> Convert Select component to support multible options selection
 */
const Select = ({
    className,
    getSelectId,
    open,
    close,
    multiSelect,
    defaultAllSelected,
    options,
    additionalFilterInformation,
    updatePosition,
    onActive,
    onSelect,
    selected,
    clearAllOptions,
    toggleAllOptions,
    selectAllOptions,
    enableSelectedStatusDot,
    showSelectedParallel,
    selectOptionsClassName,
    headerText,
    enableSearch,
    filterOnly,
    searchPlaceHolder,
    enableSelectAllButton,
    enableCloseButton,
    closeButtonText,
    top,
    bottom,
    left,
    right,
    searchEveryWare,
    defaultOption,
    defaultOptionText,
    sort,
    children,
    index = "0", // used only for submenus
    ...props
}) => {
    const selectId = useState(uuidv4())[0]

    // hook store
    const [{ selectOptions }, dispatch] = useStore()
    const {show: showOnStore, selectId: selectIdOnStore} = selectOptions[index] ?? {show: false, selectId: uuidv4()}


    // useState variables
    const [_options, _setOptions] = useState([])
    const [_additionalFilterInformation, _setAdditionalFilterInformation] = useState([])
    const [click, setClick] = useState()
    const [hover, setHover] = useState()
    const [showOptions, setShowOptions] = useState(false)

    // get select component id from outside
    useEffect(() => {
        if (getSelectId) getSelectId(selectId)
    }, [])

    // open selectOptions window
    useEffect(() => {
        if (open) {
            setClick(Date.now())
            setHover(Date.now())
            setShowOptions(true)
        }
    }, [open])

    // close selectOptions window
    useEffect(() => {
        if (close) {
            dispatch('CLOASE_ALL_SELECT_OPTIONS')
            setShowOptions(false)
            const t = setTimeout(() => {
                dispatch('CLOASE_ALL_SELECT_OPTIONS')
                dispatch('DELETE_ALL_SUB_SELECT_OPTIONS')
            }, 150)

            return () => clearTimeout(t)
        }
    }, [close])

    // close selectOptions window
    // if the id of now clicked select component
    // is not the same like the id of this component
    useEffect(() => {
        if (selectIdOnStore !== selectId) {
            setClick()
            setShowOptions(false)
        }
    }, [selectIdOnStore])

    const [lastTimeUpdatedSelectedOptions, setLastTimeUpdatedSelectedOptions] = useState()
    const myRef = useRef([])
    const [selectedOption, setSelectedOption] = useState(
        multiSelect && defaultAllSelected ? Object.entries(_options).map(option => [option[0], option[1]]) : []
    )
    const [selectMouseEnter, setSelectMouseEnter] = useState(false)
    const selectButtonProperties = useContainerDimensions({
        ref: myRef,
        id: 0,
        update: [updatePosition, selectMouseEnter]
    })

    // set options locally
    // this useEffect is usefull to update state after only realy new object
    useEffect(() => {
        _setOptions(_currentOptions => {
            if (options && !_.isEqual(options, _currentOptions)) return options
            return _currentOptions
        })
    }, [options])

    // set additionalFilterInformation locally
    // this useEffect is usefull to update state of additionalFilterInformation
    // after only realy new object values
    useEffect(() => {
        _setAdditionalFilterInformation(_currentAdditionalFilterInformation => {
            if (
                additionalFilterInformation &&
                !_.isEqual(additionalFilterInformation, _currentAdditionalFilterInformation)
            )
                return additionalFilterInformation
            return _currentAdditionalFilterInformation
        })
    }, [additionalFilterInformation])

    // get status of showOptions from outside using onActive attribute
    const showSelectOptionsRef = useRef()
    useEffect(() => {
        if (onActive) onActive(showOptions)
        showSelectOptionsRef.current = showOptions
    }, [showOptions])

    // set selectOption/s if the selected attribute was updated
    useEffect(() => {
        setSelectedOption(_currentSelectedOption => {
            if (selected && !_.isEqual(_currentSelectedOption, selected)) {
                setLastTimeUpdatedSelectedOptions(Date.now())
                return selected
            }
            return _currentSelectedOption
        })
    }, [selected])

    // clear all selected options from outside
    const firstLoading2 = useRef(true)
    useEffect(() => {
        if (!firstLoading2.current) {
            setSelectedOption([])
        } else firstLoading2.current = false
    }, [clearAllOptions])

    // toggle all options from outside
    const firstLoading3 = useRef(true)
    useEffect(() => {
        if (!firstLoading3.current && multiSelect) {
            setSelectedOption(
                selectedOption.length === Object.entries(options).length
                    ? []
                    : Object.entries(options).map(option => [option[0], option[1]])
            )
        }
        if (firstLoading3.current) firstLoading3.current = false
    }, [toggleAllOptions])

    // select all options from outside
    const firstLoading4 = useRef(true)
    useEffect(() => {
        if (!firstLoading4.current && multiSelect) {
            setSelectedOption(Object.entries(options).map(option => [option[0], option[1]]))
        }
        if (firstLoading4.current) firstLoading4.current = false
    }, [selectAllOptions])

    // close selectOptions if clicked outside this select component
    useClickOutside({ current: myRef.current[0] }, e => {
        const $selectOptions = $(`.select-options`)

        // if the target of the click isn't the container nor a descendant of the container
        if (!$selectOptions.is(e.target) && $selectOptions.has(e.target).length === 0) {
            dispatch('DELETE_ALL_SUB_SELECT_OPTIONS')
            dispatch('CLOSE_SELECT_OPTION', index)
        }
    })

    const hoverTimeout = useRef()
    const [updateOptionsProperties, setUpdateOptionsProperties] = useState(1)
    return (
        <div
            {...props}
            ref={ele => (myRef.current[0] = ele)}
            className={`select disable-selecting ${className ? className : ''} ${showOptions ? ' active' : ''} ${selectedOption.length &&
                    Object.keys(_options).filter(_optionKey => _optionKey === selectedOption[0]).length &&
                    enableSelectedStatusDot
                    ? 'options-selected'
                    : ''
                }`}
            id={selectId}
            index={index}
            onMouseEnter={() => {
                setSelectMouseEnter(true)
                setHover(Date.now())
            }}
            onMouseMove={() => {
                setSelectMouseEnter(true)

                clearTimeout(hoverTimeout.current)
                hoverTimeout.current = setTimeout(() => {
                    setHover(Date.now())
                }, 350)
            }}
            onMouseLeave={() => {
                setSelectMouseEnter(false)
            }}
            onClick={() => {
                setHover(Date.now())
            }}
            onMouseDown={() => {
                setClick(Date.now())
            }}
            onMouseUp={() => {
                setClick(Date.now())
            }}
        >
            <div
                ref={ele => (myRef.current[1] = ele)}
                onClick={() => {
                    setShowOptions(!showOptions)
                    setTimeout(() => {
                        setUpdateOptionsProperties(updateOptionsProperties + 1)
                    }, 150)
                }}
            >
                {children}{' '}
            </div>
            {click ? (
                <SelectOptionsDataTransmitter
                    selectId={selectId}
                    showSelectedParallel={showSelectedParallel && multiSelect}
                    selectMouseEnter={hover}
                    clicked={click}
                    className={selectOptionsClassName}
                    headerText={headerText}
                    enableSearch={enableSearch}
                    filterOnly={filterOnly}
                    searchPlaceHolder={searchPlaceHolder}
                    enableSelectAllButton={enableSelectAllButton}
                    enableCloseButton={enableCloseButton}
                    closeButtonText={closeButtonText}
                    selectButtonProperties={selectButtonProperties}
                    show={showOptions && !close}
                    setShow={setShowOptions}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    updateOptionsProperties={updateOptionsProperties}
                    options={_options}
                    additionalFilterInformation={_additionalFilterInformation}
                    multiSelect={multiSelect}
                    selectedOption={selectedOption}
                    setSelectedOption={_so => {
                        if (!_.isEqual(_so, selectedOption)) {
                            setSelectedOption(_so)
                            if (onSelect) {
                                onSelect(_so)
                                if (selected === null) setSelectedOption([])
                            }
                        }
                    }}
                    searchEveryWare={searchEveryWare}
                    lastTimeUpdatedSelectedOptions={lastTimeUpdatedSelectedOptions}
                    defaultOption={defaultOption}
                    defaultOptionText={defaultOptionText}
                    updatePosition={updatePosition}
                    clearSelectedOptions={''}
                    sort={sort}
                    index={index}
                />
            ) : null}
        </div>
    )
}

export default Select
