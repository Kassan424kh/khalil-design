import React, { useCallback, useEffect, useRef, useState } from 'react'
import { defaultSelectOptionsData } from '../../../hooks-store/configs/selectOptionsHooksStore'
import { useStore } from '../../../hooks-store/store'
import { getDimensions, useContainerDimensions } from '../../../services/useContainerDimensions'
import Button from '../../button/button'
import TextField from '../../textfield/textfield'
import SelectOption from './select-option/selectOption'
import './styles.sass'
import { useClickOutside } from '../../../services/useClickOutside'
import $ from 'jquery'
import _ from 'underscore'
import gsap from 'gsap'

const SelectOptions = ({ index = "0" }) => {
    const [{selectOptions: selectOptionsOnStore}, dispatch] = useStore()
    const selectOptionsDataAfterIndex = selectOptionsOnStore[index]
    const lengthAllSelectOptions = Object.values(selectOptionsOnStore).length
    const thisSelectIsActiveNow = String(lengthAllSelectOptions - 1) <= index
    const [selectOptionsData, setSelectOptionsData] = useState(defaultSelectOptionsData.selectOptions[0])
    const [updateSelectOptionsTimes, setUpdateSelectOptionsTimes] = useState(0)

    const closeSelectOptions = () => {
        if (index === "0") {
            dispatch('CLOSE_SELECT_OPTION', index)
        }
        else dispatch('DELETE_SUB_SELECT_OPTIONS', index)
    }

    const [searchText, setSearchText] = useState('')

    const [searchTextSelectedTail, setSearchTextSelectedTail] = useState('')
    const [searchTextUnselectedTail, setSearchTextUnselectedTail] = useState('')

    const [selectButtonProperties, setSelectButtonProperties] = useState(defaultSelectOptionsData.selectOptions[0])

    const [maxOptionTextWidth, setMaxOptionTextWidth] = useState(0)
    const optionTextRefs = useRef({})

    useEffect(() => {
        const t = setTimeout(() => {
            Object.entries(optionTextRefs.current).forEach(([key, value]) => {
                setMaxOptionTextWidth(oldWidth =>
                    value && value.scrollWidth > oldWidth ? value.scrollWidth : oldWidth
                )
            })
        }, 10)
        return () => clearTimeout(t)
    }, [selectOptionsData.options])

    useEffect(() => {
        setMaxOptionTextWidth(0)
        optionTextRefs.current = {}
    }, [selectOptionsData.options])

    const [updateOffset, setUpdateOffset] = useState()
    const updateOffsetTimeout = useRef()
    useEffect(() => {
        clearTimeout(updateOffsetTimeout.current)

        updateOffsetTimeout.current = setTimeout(() => {
            setUpdateOffset(Date.now())
        }, 100)
        return () => clearTimeout(updateOffsetTimeout.current)
    }, [selectOptionsData.options])

    const myRef = useRef()

    const foundOptions = useCallback(
        (searchText, option, searchEveryWare = false) => {
            return !searchText
                .toUpperCase()
                .split(' ')
                .filter(word => word)
                .some(r => {
                    const optionWasSelected = selectOptionsData.selectedOption.filter(
                        selectedOption => selectedOption[0] === option[0]
                    ).length

                    if (
                        selectOptionsData.multiSelect &&
                        selectOptionsData.showSelectedParallel &&
                        selectOptionsData.filterOnly
                    )
                        if (
                            (!optionWasSelected && selectOptionsData.filterOnly === 'selected') ||
                            (optionWasSelected && selectOptionsData.filterOnly === 'unselected')
                        )
                            return true

                    // return true if there are matching parts in the publisher name which is passed as additional filter information
                    if (
                        selectOptionsDataAfterIndex.additionalFilterInformation &&
                        option[0] in selectOptionsDataAfterIndex.additionalFilterInformation
                    )
                        if (
                            selectOptionsDataAfterIndex.additionalFilterInformation[option[0]]
                                .toString()
                                .toUpperCase()
                                .split(' ')
                                .filter(word => {
                                    if (searchEveryWare) {
                                        const regex = new RegExp(r, 'g')
                                        return word && word.match(regex)
                                    } else {
                                        return word.startsWith(r) ? word : ''
                                    }
                                }).length
                        )
                            return true

                    // return true if there are matching parts of the media name
                    return option[1]
                        .toString()
                        .toUpperCase()
                        .split(' ')
                        .filter(word => {
                            if (searchEveryWare) {
                                const regex = new RegExp(r, 'g')
                                return word && word.match(regex)
                            } else {
                                return word.startsWith(r) ? word : ''
                            }
                        }).length
                })
        },
        [selectOptionsData.selectedOption]
    )

    const moveVertikal = (
        optionsProperties,
        topPosition,
        bottomPosition = 15,
        defaultPosition = 0,
        effectUsage = false
    ) => {
        if (selectButtonProperties.offset) {
            const // directions
                directions = selectOptionsData.openDirections,
                directionTop = selectOptionsData.openDirections.top,
                directionBottom = selectOptionsData.openDirections.bottom,
                // window
                windowHeight = window.innerHeight,
                // select
                selectHeight = selectButtonProperties.height,
                selectTop = selectButtonProperties.offset.top,
                selectBottom = selectButtonProperties.offset.bottom,
                // selectOptions
                selectOptionsHeight = optionsProperties.height,
                selectOptionsTop = optionsProperties.top,
                selectOptionsBottom = optionsProperties.bottom

            if ((directions && directionTop && directionBottom) || !directions) {
                if (
                    // show on bottom if there is place in top and bottom
                    selectTop - selectOptionsHeight > 0 &&
                    selectBottom + selectOptionsHeight < windowHeight
                ) {
                    return topPosition
                } else if (
                    // show on bottom the window if bottom of selectElement is smaller then top of window
                    selectBottom - 15 <
                    0
                ) {
                    return effectUsage ? topPosition : 15
                } else if (
                    // show on top the window if top of selectElement is bigger then bottom of window
                    selectTop + 15 >
                    windowHeight
                ) {
                    return effectUsage ? bottomPosition : windowHeight - selectOptionsHeight - 15
                } else if (
                    // show on bottom if there is no place on top only if there is place on bottom
                    selectTop - selectOptionsHeight < 0 &&
                    selectBottom + selectOptionsHeight < windowHeight
                ) {
                    return topPosition
                } else if (
                    // show on top if there is no more place on bottom only if there is a place on top
                    selectBottom - selectOptionsHeight < windowHeight &&
                    selectTop - selectOptionsHeight > 0
                ) {
                    return bottomPosition
                } else {
                    // otherwise show on top
                    return topPosition
                }
            } else if (directions && directionTop) {
                if (
                    // show on top of screen if there is no place on top
                    selectTop - selectOptionsHeight <
                    0
                ) {
                    return effectUsage ? topPosition : 15
                } else if (
                    // show on bottom of screen if the top of selectElement bigger then the screen end
                    selectTop + 15 >
                    windowHeight
                ) {
                    return effectUsage ? bottomPosition : windowHeight - selectOptionsHeight - 15
                } else {
                    // otherwise show on top
                    return bottomPosition
                }
            } else if ((directions && directionBottom) || (directions && !directionTop && !directionBottom)) {
                if (
                    // show on bottom of the screen if there is no place more on bottom
                    selectBottom + selectOptionsHeight >
                    windowHeight
                ) {
                    return effectUsage ? bottomPosition : windowHeight - selectOptionsHeight - 15
                } else if (
                    // show on top of the screen if the bottom of the selectElement smaller then the top of the screen
                    selectBottom + 15 <
                    0
                ) {
                    return effectUsage ? topPosition : 15
                } else {
                    // otherwise show on bottom
                    return topPosition
                }
            } else {
                return defaultPosition
            }
        } else {
            return 0
        }
    }

    const moveHorizontal = (
        optionsProperties,
        leftPosition,
        rightPosition = 15,
        centerPosition = null,
        effectUsage = false
    ) => {
        if (selectButtonProperties.offset) {
            const // directions
                directions = selectOptionsData.openDirections,
                directionLeft = selectOptionsData.openDirections.left,
                directionRight = selectOptionsData.openDirections.right,
                // window
                windowWidth = window.innerWidth,
                // select
                selectWidth = selectButtonProperties.width,
                selectLeft = selectButtonProperties.offset.left,
                selectRight = selectButtonProperties.offset.right,
                // selectOptions
                selectOptionsWidth = optionsProperties.width,
                selectOptionsLeft = optionsProperties.left,
                selectOptionsRight = optionsProperties.right

            if (
                // can in center Position full show then show it in center of the element
                (directions && directionLeft && directionRight) ||
                !directions
            ) {
                if (
                    selectLeft + selectWidth / 2 - selectOptionsWidth / 2 > 0 &&
                    selectRight - selectWidth / 2 + selectOptionsWidth / 2 < windowWidth
                ) {
                    return centerPosition
                } else if (
                    // show selectOptions on left of the window if the right of the selectElement is too much scrolled to left
                    selectRight < 0
                ) {
                    return effectUsage ? leftPosition : 15
                } else if (
                    // show selectOptions on right of the window if the left of the selectElement is too much scrolled to right
                    selectLeft > windowWidth
                ) {
                    return effectUsage ? rightPosition : windowWidth - selectOptionsWidth - 15
                } else if (
                    // show selectOptions on right of selectElement if there is no place in the left Position
                    selectLeft - selectOptionsWidth < 0 &&
                    selectRight + selectOptionsWidth < windowWidth
                ) {
                    return leftPosition
                } else if (
                    // show selectOptions on left of selectElement if there is no place in the right Position
                    selectRight + selectOptionsWidth > windowWidth &&
                    selectLeft - selectOptionsWidth > 0
                ) {
                    return rightPosition
                } else if (
                    // show on left of screen if there is no place more
                    selectLeft + selectWidth / 2 - selectOptionsWidth / 2 <
                    0
                ) {
                    return effectUsage ? leftPosition : 15
                } else if (
                    // show on right of screen if there is no place more
                    selectRight - selectWidth / 2 + selectOptionsWidth / 2 >
                    windowWidth
                ) {
                    if (
                        // show on left of screen if the selectOptions is bigger then the screen width
                        selectOptionsWidth > windowWidth
                    ) {
                        return effectUsage ? leftPosition : 15
                    } else {
                        return effectUsage ? leftPosition : windowWidth - selectOptionsWidth - 15
                    }
                } else {
                    return centerPosition
                }
            } else if (directions && directionLeft) {
                // show selectOptions only in left position
                if (selectLeft - selectOptionsWidth > 0) {
                    return selectLeft > windowWidth
                        ? effectUsage
                            ? rightPosition
                            : windowWidth - selectOptionsWidth - 15 // show on right of the screen if the selectElement left position was bigger then the screen
                        : rightPosition // show on left of the selectElement
                } else if (selectRight < 0) {
                    // show on right of the screen if the selectElement right position was smaller then the screen beginn
                    return effectUsage ? leftPosition : 15
                } else {
                    // show on right of the screen when there is no place for the selectOptions in the left position on the window
                    return effectUsage ? rightPosition : 15
                }
            } else if (directions && directionRight) {
                // show selectOptions only in right position
                if (selectRight + selectOptionsWidth < windowWidth) {
                    return selectRight < 0
                        ? effectUsage
                            ? leftPosition
                            : 15 // show on right of the screen if the selectElement left position was bigger then the screen
                        : leftPosition // show on left of the selectElement
                } else if (selectLeft > windowWidth) {
                    // show on right of the screen if the selectElement right position was smaller then the screen beginn
                    return effectUsage ? rightPosition : windowWidth - selectOptionsWidth - 15
                } else {
                    // show on right of the screen when there is no place for the selectOptions in the left position on the window
                    return effectUsage ? rightPosition : windowWidth - selectOptionsWidth - 15
                }
            } else if (directions && !selectLeft && !directionRight) {
                return centerPosition
            } else {
                if (
                    // show on left of screen if there is no place more
                    selectLeft + selectWidth / 2 - selectOptionsWidth / 2 <
                    0
                ) {
                    return effectUsage ? leftPosition : 15
                } else if (
                    // show on right of screen if there is no place more
                    selectRight - selectWidth / 2 + selectOptionsWidth / 2 >
                    windowWidth
                ) {
                    if (
                        // show on left of screen if the selectOptions is bigger then the screen width
                        selectOptionsWidth > windowWidth
                    ) {
                        return effectUsage ? leftPosition : 15
                    } else {
                        return effectUsage ? leftPosition : windowWidth - selectOptionsWidth - 15
                    }
                } else {
                    return centerPosition
                }
            }
        } else {
            return centerPosition
        }
    }

    useEffect(() => {
        setSelectButtonProperties({
            ...selectOptionsData.selectButtonProperties
        })
    }, [selectOptionsData])

    // update selectOptionsData state after check if there is a real change
    const prevLengthAllSelectOptions = useRef(1)
    useEffect(() => {
        setSelectOptionsData(currentSelectOptionsData => {
            if (JSON.stringify({
                ...selectOptionsDataAfterIndex,
                lastUpdate: 0,
                headerText: '',
                selectButtonProperties: {
                    ...selectOptionsDataAfterIndex.selectButtonProperties,
                    offset: null
                }
            }) !== JSON.stringify({
                ...currentSelectOptionsData,
                lastUpdate: 0,
                headerText: '',
                selectButtonProperties: {
                    ...currentSelectOptionsData.selectButtonProperties,
                    offset: null
                }
            }) || lengthAllSelectOptions != prevLengthAllSelectOptions.current) {
                if (selectOptionsData.selectId !== selectOptionsDataAfterIndex.selectId || !selectOptionsDataAfterIndex.show) {
                    setSearchText('')
                }
                console.log(selectOptionsOnStore)
                console.log(prevLengthAllSelectOptions.current, lengthAllSelectOptions)
                prevLengthAllSelectOptions.current = lengthAllSelectOptions
                return selectOptionsDataAfterIndex
            }
            return currentSelectOptionsData
        })
        
    }, [selectOptionsDataAfterIndex, lengthAllSelectOptions])

    const searchFieldRef = useRef()
    useEffect(() => {
        if (searchFieldRef.current && selectOptionsData.show && selectOptionsData.selectId) {
            searchFieldRef.current && searchFieldRef.current.focus()
        }
    }, [searchFieldRef, selectOptionsData])

    useClickOutside(myRef, e => {
        const $selectOptions = $('.select')

        // if the target of the click isn't the container nor a descendant of the container
        if (!$selectOptions.is(e.target) && $selectOptions.has(e.target).length === 0) {
            //closeSelectOptions()
        }
    })

    const animateTimeout = useRef()
    const prevData = useRef({
        closed: true,
        showSelectedParallel: false,
        x: 0,
        y: 0
    })

    useEffect(() => {
        if (animateTimeout.current) clearTimeout(animateTimeout.current)

        animateTimeout.current = setTimeout(() => {
            const $header = $(`.select-options[index="${index}"] .select-options-headline`)
            const headerChildHeight = $header.children().first().prop('scrollHeight')
            gsap.to(`.select-options[index="${index}"] .select-options-headline`, {
                minHeight: selectOptionsData.headerText ? Math.max(headerChildHeight, 35) : 0,
                maxHeight: selectOptionsData.headerText ? Math.max(headerChildHeight, 35) : 0,
                opacity: selectOptionsData.headerText ? 1 : 0,
                marginBottom: selectOptionsData.headerText ? -15 : 0,
                duration: 0.15
            })

            const $el = $(`.select-options[index="${index}"] .select-options-actions`)
            const selectOptionsActionsScrollHeight = $el.prop('scrollHeight')
            const wasShown = selectOptionsData.show

            const enableSelectAllButton = selectOptionsData.enableSearch && selectOptionsData.enableSelectAllButton

            gsap.to(`.select-options[index="${index}"] .select-options-actions`, {
                minHeight: selectOptionsData.enableSearch ? selectOptionsActionsScrollHeight : 0,
                maxHeight: selectOptionsData.enableSearch ? selectOptionsActionsScrollHeight : 0,
                opacity: selectOptionsData.enableSearch ? 1 : 0,
                paddingTop: selectOptionsData.enableSearch ? 1 : 0,
                pointerEvents: wasShown && selectOptionsData.enableSearch && thisSelectIsActiveNow ? 'auto' : 'none',
                duration: 0.15,
                delay: 0.05
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field input`, {
                width: !enableSelectAllButton ? 'calc(100%)' : '100%',
                paddingLeft: enableSelectAllButton ? 95 : 10,
                duration: 0
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field input`, {
                opacity: selectOptionsData.showSelectedParallel ? 0 : 1,
                pointerEvents: !wasShown || selectOptionsData.showSelectedParallel || !thisSelectIsActiveNow ? 'none' : 'auto',
                duration: 0.15,
                delay: 0.05,
            })

            gsap.to(
                `.select-options[index="${index}"] .select-options-actions .select-options-search-field .select-all-buttons`,
                {
                    borderColor: selectOptionsData.showSelectedParallel ? 'var(--grey)' : 'transparent',
                    borderTopRightRadius: selectOptionsData.showSelectedParallel ? 10 : 0,
                    borderBottomRightRadius: selectOptionsData.showSelectedParallel ? 10 : 0,
                    pointerEvents: wasShown && enableSelectAllButton && thisSelectIsActiveNow ? 'auto' : 'none',
                    opacity: enableSelectAllButton ? 1 : 0,
                    translateX: enableSelectAllButton ? 0 : -20,
                    duration: 0.15,
                    delay: 0.05,
                    onComplete: () => {
                        setUpdateSelectOptionsTimes(_ => _ + 1)
                    }
                }
            )
        }, 20)
        return () => clearTimeout(animateTimeout.current)
    }, [selectButtonProperties, selectOptionsData, lengthAllSelectOptions])

    const getNextXY = () => {
        const optionsProperties = getDimensions({
            ref: myRef
        })
        const x = moveHorizontal(
            optionsProperties,
            `${
                selectButtonProperties.offset ? selectButtonProperties.offset.left + selectButtonProperties.width : 0
            }px`,
            `${selectButtonProperties.offset ? selectButtonProperties.offset.left - optionsProperties.width : 0}px`,
            selectButtonProperties.offset
                ? selectButtonProperties.offset.left - optionsProperties.width / 2 + selectButtonProperties.width / 2
                : 0
        )

        const y = moveVertikal(
            optionsProperties,
            `${
                selectButtonProperties.offset ? selectButtonProperties.offset.top + selectButtonProperties.height : 0
            }px`,
            `${selectButtonProperties.offset ? selectButtonProperties.offset.top - optionsProperties.height : 0}px`,
            `${selectButtonProperties.top}px`
        )
        return { x, y }
    }

    const firstTimeRender = useRef(true)
    useEffect(() => {
        const { x: prevX, y: prevY, showSelectedParallel: prevShowSelectedParallel } = prevData.current
        let nextXY = getNextXY()

        if (prevShowSelectedParallel) {
            gsap.to(`.select-options[index="${index}"]`, {
                minWidth: Math.max(maxOptionTextWidth + 10, 250),
                duration: 0,
                onComplete: () => {
                    setTimeout(() => {
                        nextXY = getNextXY()
                        const { x, _ } = nextXY
                        gsap.to(`.select-options[index="${index}"]`, {
                            x: x,
                            duration: 0.1
                        })
                    }, 20)
                }
            })
        }

        const { x, y } = nextXY

        const t = setTimeout(
            () => {
                const distance = Math.sqrt(
                    Math.pow(parseFloat(prevX) - parseFloat(x), 2) + Math.pow(parseFloat(prevY) - parseFloat(y), 2)
                )
                const distanceToSeconds = Math.min(Math.max((distance / 50) * 0.04, 0.1), 0.25)

                gsap.to(`.select-options[index="${index}"]`, {
                    x: x,
                    y: y,
                    minWidth: Math.max(maxOptionTextWidth + 10, 250),
                    duration: selectOptionsData.show ? distanceToSeconds : 0,
                    onComplete: () => {
                        gsap.to(`.select-options[index="${index}"]`, {
                            opacity: selectOptionsData.show ? thisSelectIsActiveNow ? 1 : .8 : 0,
                            filter: `blur(${selectOptionsData.show  && thisSelectIsActiveNow ? 0 : 2}px)`,
                            pointerEvents: selectOptionsData.show && thisSelectIsActiveNow ? 'auto' : 'none',
                            duration: selectOptionsData.show ? distanceToSeconds : 0,
                            delay: .35,
                            onComplete: () => {
                                prevData.current = {
                                    closed: !selectOptionsData.show,
                                    showSelectedParallel: selectOptionsData.showSelectedParallel,
                                    x: x,
                                    y: y
                                }
                                firstTimeRender.current = false
                            }
                        })
                    }
                })
            },
            prevShowSelectedParallel ? 100 : 0
        )
        return () => clearTimeout(t)
    }, [updateSelectOptionsTimes, lengthAllSelectOptions])

    return (
        <div
            ref={myRef}
            className={`select-options disable-selecting${
                selectOptionsData.headerText || selectOptionsData.enableSearch ? ' show-gradient-effect' : ''
            } ${selectOptionsData.className ?? ''}${
                selectOptionsData.showSelectedParallel ? ' show-selected-parallel' : ''
            }${selectOptionsData.multiSelect ? ' multi-select' : ' single-select'}`}
            index={index}
        >
            <div>
                <div className={`select-options-headline`} index={index}>
                    <span>{selectOptionsData.headerText ?? '-'}</span>
                </div>

                <div
                    className={`select-options-actions${
                        selectOptionsData.enableSearch
                            ? ` with-search${
                                  selectOptionsData.enableSelectAllButton ? ' with-select-all-buttons' : ''
                              }${selectOptionsData.enableCloseButton ? ' with-close-button' : ''}`
                            : ''
                    }`}
                    index={index}
                >
                    <TextField
                        inputRef={selectOptionsData.showSelectedParallel || !selectOptionsData.enableSearch || !thisSelectIsActiveNow ? null : r => r && r.focus()}
                        className={`select-options-search-field`}
                        beforeComponent={
                            <div className={'select-all-buttons'}>
                                <Button
                                    className={'select-all-button'}
                                    leftIcon={'done_all'}
                                    onClick={() => {
                                        selectOptionsData.setSelectedOption(
                                            Object.entries(selectOptionsData.options).filter(option => {
                                                const _searchedText = selectOptionsData.showSelectedParallel
                                                    ? searchTextUnselectedTail
                                                    : searchText

                                                return _searchedText !== ''
                                                    ? !foundOptions(_searchedText, option) ||
                                                          selectOptionsData.selectedOption
                                                              .map(o => o[0])
                                                              .includes(option[0])
                                                    : true
                                            })
                                        )
                                    }}
                                />
                                <Button
                                    className={'select-all-button'}
                                    leftIcon={'remove_done'}
                                    onClick={() => {
                                        selectOptionsData.setSelectedOption(
                                            selectOptionsData.showSelectedParallel && searchTextSelectedTail !== ''
                                                ? selectOptionsData.selectedOption.filter(_selectedOption =>
                                                      foundOptions(searchTextSelectedTail, _selectedOption)
                                                  )
                                                : []
                                        )
                                    }}
                                />
                            </div>
                        }
                        afterComponent={
                            <Button className={'close-button'} onClick={() => {
                                closeSelectOptions()
                            }}>
                                {selectOptionsData.closeButtonText ?? 'done'}
                            </Button>
                        }
                        value={searchText}
                        placeholder={selectOptionsData.searchPlaceHolder ?? 'finde options'}
                        onChange={setSearchText}
                    />
                </div>
                <div
                    className={`select-options-body${
                        !selectOptionsData.headerText ? ' header-text-is-not-enabled' : ''
                    }`}
                    data-cy={'select-options-body'}
                >
                    {(selectOptionsData.showSelectedParallel ? [1, 2, 3] : [1]).map(viewport => {
                        return viewport !== 2 ? (
                            <div key={viewport} className={`content ${viewport}-ct`}>
                                {selectOptionsData.showSelectedParallel ? (
                                    <div
                                        className={`empty-listview-background-image ${
                                            (selectOptionsData.selectedOption &&
                                                selectOptionsData.selectedOption.length !==
                                                    Object.entries(selectOptionsData.options).length &&
                                                viewport === 1) ||
                                            (selectOptionsData.selectedOption.length && viewport === 3)
                                                ? 'hide'
                                                : ''
                                        }`}
                                    >
                                        <span className={'material-icons-outlined'}>
                                            {viewport === 3 ? 'done_all' : 'remove_done'}
                                        </span>
                                    </div>
                                ) : null}
                                {selectOptionsData.showSelectedParallel ? (
                                    <TextField
                                        className="search-field-parallel-view"
                                        inputRef={viewport === 3 || !selectOptionsData.enableSearch || !thisSelectIsActiveNow ? null : r => (searchFieldRef.current = r)}
                                        value={viewport === 1 ? searchTextUnselectedTail : searchTextSelectedTail}
                                        placeholder={selectOptionsData.searchPlaceHolder ?? 'finde options'}
                                        onChange={_searchText => {
                                            if (viewport === 1) {
                                                setSearchTextUnselectedTail(_searchText)
                                                setSearchTextSelectedTail('')
                                            } else {
                                                setSearchTextSelectedTail(_searchText)
                                                setSearchTextUnselectedTail('')
                                            }
                                        }}
                                    />
                                ) : null}
                                {selectOptionsData.defaultOption && viewport === 1 ? (
                                    <SelectOption
                                        options={selectOptionsData.options}
                                        id={''}
                                        disableSelecting={selectOptionsData.disableSelecting}
                                        setDisableSelecting={selectOptionsData.setDisableSelecting}
                                        selectedOption={selectOptionsData}
                                        setShowOptions={selectOptionsData.setShowOptions}
                                        setSelectedOption={selectOptionsData.setSelectedOption}
                                        hide={selectOptionsData.searchText}
                                        defaultOption
                                    >
                                        {selectOptionsData.defaultOptionText ?? 'Select a option'}
                                    </SelectOption>
                                ) : null}
                                <div>
                                    {(() => {
                                        const optionsListNotSorted = Object.entries(selectOptionsData.options)
                                        try {
                                            const DescSorted = _.sortBy(optionsListNotSorted, o => o[1]?.toUpperCase())

                                            switch (selectOptionsData.sort) {
                                                case 'DESC':
                                                    return DescSorted
                                                case 'ASC':
                                                    return DescSorted.reverse()
                                                default:
                                                    return optionsListNotSorted
                                            }
                                        } catch (e) {
                                            return optionsListNotSorted
                                        }
                                    })().map((option, oIndex) => {
                                        const wasSelected =
                                            selectOptionsData.selectedOption &&
                                            (() => {
                                                if (selectOptionsData.selectedOption.length)
                                                    return selectOptionsData.multiSelect
                                                        ? (() => {
                                                              const foundSelectedOption =
                                                                  selectOptionsData.selectedOption.filter(_option => {
                                                                      return _option[0] === option[0]
                                                                  })[0]
                                                              return foundSelectedOption
                                                                  ? foundSelectedOption[0] === option[0]
                                                                  : false
                                                          })()
                                                        : selectOptionsData.selectedOption[0] === option[0]
                                                else return false
                                            })()

                                        return (
                                            <SelectOption
                                                options={selectOptionsData.options}
                                                selectOptionsIndex={index}
                                                textRef={ref => (optionTextRefs.current[`${oIndex}`] = ref)}
                                                key={option[0]}
                                                id={option[0]}
                                                disableSelecting={selectOptionsData.disableSelecting}
                                                setDisableSelecting={selectOptionsData.setDisableSelecting}
                                                multiSelect={selectOptionsData.multiSelect}
                                                selectedOption={selectOptionsData.selectedOption}
                                                setShowOptions={closeSelectOptions}
                                                //setSelectedOption={selectOptionsData.setSelectedOption}
                                                hide={
                                                    (selectOptionsData.showSelectedParallel
                                                        ? viewport === 1
                                                            ? searchTextUnselectedTail
                                                            : searchTextSelectedTail
                                                        : searchText) ||
                                                    (selectOptionsData.showSelectedParallel &&
                                                        ((wasSelected && viewport === 1) ||
                                                            (!wasSelected && viewport === 3)))
                                                        ? (foundOptions(
                                                              selectOptionsData.showSelectedParallel
                                                                  ? viewport === 1
                                                                      ? searchTextUnselectedTail
                                                                      : searchTextSelectedTail
                                                                  : searchText,
                                                              option,
                                                              selectOptionsData.searchEveryWare
                                                          ) &&
                                                              (selectOptionsData.showSelectedParallel
                                                                  ? viewport === 1
                                                                      ? !wasSelected
                                                                      : wasSelected
                                                                  : true)) ||
                                                          (selectOptionsData.showSelectedParallel &&
                                                              ((wasSelected && viewport === 1) ||
                                                                  (!wasSelected && viewport === 3)))
                                                        : false
                                                }
                                            >
                                                {option[1]}
                                            </SelectOption>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div key={viewport} className={'vertical-rule'} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SelectOptions
