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
 * <br/> to active submenu/s mode, you should set the options to this formats:
 * <br/> . . . . Object: { 1: 'test1', 2: 'test2', 3: ['test3', ["subTest1", ["subSubTest1", "subSubTest2"]]] }
 * <br/> . . . . Array:  ['test1', 'test2', ['test3', ["subTest1", ["subSubTest1", "subSubTest2"]]]]
 * 
 *
 * <b>selected:</b> the value can be a single option (e.g. ["key", "value"]) or multible options (e.g. [["key", "values"], ...])
 *
 * <b>selected includes submenu/s:</b> ["parentOptionKey", ["submenuOptionKey", ["optionKey", "optionKey"]]]
 *
 * <b>onSelect(selectedOption/s, flatSelectedOption=undefined):</b> Return a single option (e.g. ["key", "value"]) or multible options (e.g. [["key", "values"], ...])
 * <br/> . . . . called only if there was option/s selected/deselected
 * <br/> . . . . with submenu selected it return the selected option with this format ["parentOptionKey", ["submenuOptionKey", ["optionKey", "optionKey"]]]
 * <br/> . . . . flatSelectedOption => ["key", "value"], this attribute give you the submenu selected option without his parents, if the selected option donot has a selected submenu option it would be undefined
 *
 * <b>onActive:</b> Return a status of the current SelectOptions window if it is open/closed
 * <br/> . . . . called only if SelectOptions window was opened or closed
 *
 * <b>multiSelect:</b> Convert Select component to support multible options selection
 */
const Select = ({
    className,
    getSelectId,
    mainSelectId,
    parentSelectId,
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
    top,
    bottom,
    left,
    right,
    defaultOption,
    defaultOptionText,
    sort,
    children,
    index = '0', // used only for submenus
    ...props
}) => {
    const selectId = useState(uuidv4())[0]

    // hook store
    const [{ selectProps }, dispatch] = useStore()
    const { selectId: selectIdParentSelectElement } = selectProps[0] ?? { selectId: uuidv4() }
    const { selectId: selectIdOnStore } = selectProps[index] ?? { show: false, selectId: uuidv4() }

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
            dispatch('CLOASE_ALL_SELECT')
            setShowOptions(false)
            const t = setTimeout(() => {
                dispatch('CLOASE_ALL_SELECT')
                dispatch('DELETE_ALL_SUB_SELECT')
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
        multiSelect && defaultAllSelected ? _options.map(option => [option[0], option[1]]) : []
    )
    const [selectMouseEnter, setSelectMouseEnter] = useState(false)
    const selectButtonProperties = useContainerDimensions({
        ref: myRef,
        id: 0,
        withoutResize: true,
        withoutScroll: true,
        update: [updatePosition, selectMouseEnter]
    })

    // set options locally
    // this useEffect is usefull to update state after only realy new object
    const prevSelectOptions = useRef()
    useEffect(() => {
        if (options && !_.isEqual(options, prevSelectOptions.current)) {
            prevSelectOptions.current = options
            _setOptions(Object.entries(options))
        }
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
                selectedOption.length === _options.length ? [] : _options.map(option => [option[0], option[1]])
            )
        }
        if (firstLoading3.current) firstLoading3.current = false
    }, [toggleAllOptions])

    // select all options from outside
    const firstLoading4 = useRef(true)
    useEffect(() => {
        if (!firstLoading4.current && multiSelect) {
            setSelectedOption(_options.map(option => [option[0], option[1]]))
        }
        if (firstLoading4.current) firstLoading4.current = false
    }, [selectAllOptions])

    // close selectOptions if clicked outside this select component
    useClickOutside({ current: myRef.current[0] }, e => {
        const $select = $(`.select`)
        const $selectOptions = $(`.select-options`)

        // if the target of the click isn't the container nor a descendant of the container
        if (
            !$selectOptions.is(e.target) &&
            $selectOptions.has(e.target).length === 0 &&
            !$select.is(e.target) &&
            $select.has(e.target).length === 0
        ) {
            dispatch('DELETE_ALL_SUB_SELECT')
            dispatch('CLOSE_SELECT', index)
        }
    })

    useEffect(() => {
        if (selectIdParentSelectElement !== (mainSelectId ?? selectId)) {
            dispatch('DELETE_ALL_SUB_SELECT')
        }
    }, [click])

    const hoverTimeout = useRef()
    const [updateOptionsProperties, setUpdateOptionsProperties] = useState(1)
    return (
        <div
            {...props}
            ref={ele => (myRef.current[0] = ele)}
            className={`select disable-selecting ${className ? className : ''} ${showOptions ? ' active' : ''} ${
                selectedOption.length &&
                _options.filter(([_optionKey, _]) => _optionKey === selectedOption[0]).length &&
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
                setClick(Date.now())
                setShowOptions(true)
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
                    mainSelectId={mainSelectId}
                    parentSelectId={parentSelectId}
                    showSelectedParallel={showSelectedParallel && multiSelect}
                    selectMouseEnter={hover}
                    clicked={click}
                    className={selectOptionsClassName}
                    headerText={headerText}
                    enableSearch={enableSearch}
                    filterOnly={filterOnly}
                    searchPlaceHolder={searchPlaceHolder}
                    enableSelectAllButton={enableSelectAllButton}
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
                                const _submenuValue = Array.isArray(_so[1]) && _so[1].length === 2
                                const getSubmenuSelectedOption = _selectedOption => {
                                    if (!_selectedOption) return
                                    const childOfSelectedOptionIsArray =
                                        Array.isArray(_selectedOption[1]) && _selectedOption[1].length === 2
                                    if (childOfSelectedOptionIsArray) {
                                        return getSubmenuSelectedOption(_selectedOption[1])
                                    }
                                    return _selectedOption
                                }
                                onSelect(_so, _submenuValue && !multiSelect ? getSubmenuSelectedOption(_so) : undefined)
                                if (selected === null) setSelectedOption([])
                            }
                        }
                    }}
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
