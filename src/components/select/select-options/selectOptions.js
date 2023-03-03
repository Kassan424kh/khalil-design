import React, { useCallback, useEffect, useRef, useState } from 'react'
import { defaultSelectsProps } from '../../../hooks-store/configs/selectOptionsHooksStore'
import { useStore } from '../../../hooks-store/store'
import { getDimensions } from '../../../services/useContainerDimensions'
import { charsWidth } from '../../../services/calcCharsWidth'
import Button from '../../button/button'
import TextField from '../../textfield/textfield'
import SelectOption from './select-option/selectOption'
import './styles.sass'
import $ from 'jquery'
import _ from 'underscore'
import gsap from 'gsap'

const SelectOptions = ({ index = '0' }) => {
    const [{ selectProps: selectPropsFromStore, selectOptions: selectOptionsFromStore }, dispatch] = useStore()
    const selectOptionsGetByIndex = selectOptionsFromStore[index]
    const selectPropsGetByIndex = selectPropsFromStore[index]
    const lengthAllSelects = Object.values(selectPropsFromStore).length
    const thisSelectIsActiveNow = lengthAllSelects - 1 <= index
    const [selectProps, setSelectProps] = useState(defaultSelectsProps.selectProps[0])
    const [selectOptions, setSelectOptions] = useState([])
    const [updateSelectPropsTimes, setUpdateSelectPropsTimes] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [searchTextSelectedTail, setSearchTextSelectedTail] = useState('')
    const [searchTextUnselectedTail, setSearchTextUnselectedTail] = useState('')
    const _charsWidth = useState(charsWidth())[0]
    const initListTilesInView = {
        1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(String), // key is the viewport on parallel view, item is list of options indexes can render in view
        3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(String) // same ^
    }
    const [listTilesInView, setListTilesInView] = useState(initListTilesInView)

    // handle select closing
    const closeSelectOptions = () => {
        if (index === '0') {
            dispatch('CLOSE_SELECT', index)
        } else dispatch('DELETE_SUB_SELECT', index)
    }

    // check if option was selected
    const wasSelected = option => {
        return (
            selectProps.selectedOption &&
            (() => {
                if (selectProps.selectedOption.length)
                    return selectProps.multiSelect
                        ? (() => {
                              const foundSelectedOption = selectProps.selectedOption.filter(_option => {
                                  return _option[0] === option[0]
                              })[0]
                              return foundSelectedOption ? foundSelectedOption[0] === option[0] : false
                          })()
                        : selectProps.selectedOption[0] === option[0]
                else return false
            })()
        )
    }

    // finde optinos after modify search text
    const myRef = useRef()
    const foundOptions = useCallback(
        (__searchText, option) => {
            const optionWasSelected = wasSelected(option)

            if (selectProps.multiSelect && selectProps.showSelectedParallel && selectProps.filterOnly)
                if (
                    (!optionWasSelected && selectProps.filterOnly === 'selected') ||
                    (optionWasSelected && selectProps.filterOnly === 'unselected')
                )
                    return false

            const regex = new RegExp(__searchText.toUpperCase(), 'g')

            const isOptionSubmenu = Array.isArray(option[1]) && option[1].length === 2
            let optionText = isOptionSubmenu ? option[1][0] : option[1]

            // return true if there are matching parts in the publisher name which is passed as additional filter information
            if (
                selectPropsGetByIndex.additionalFilterInformation &&
                option[0] in selectPropsGetByIndex.additionalFilterInformation
            )
                optionText = selectPropsGetByIndex.additionalFilterInformation[option[0]]

            return !String(optionText ?? '')
                .toUpperCase()
                .match(regex)
        },
        [selectProps.selectedOption, searchText, searchTextSelectedTail, searchTextUnselectedTail]
    )

    const moveVertikal = (
        optionsProperties,
        topPosition,
        bottomPosition = 15,
        defaultPosition = 0,
        effectUsage = false
    ) => {
        if (selectProps.selectButtonProperties.offset) {
            const // directions
                directions = selectProps.openDirections,
                directionTop = selectProps.openDirections.top,
                directionBottom = selectProps.openDirections.bottom,
                // window
                windowHeight = window.innerHeight,
                // select
                selectHeight = selectProps.selectButtonProperties.height,
                selectTop = selectProps.selectButtonProperties.offset.top,
                selectBottom = selectProps.selectButtonProperties.offset.bottom,
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
        if (selectProps.selectButtonProperties.offset) {
            const // directions
                directions = selectProps.openDirections,
                directionLeft = selectProps.openDirections.left,
                directionRight = selectProps.openDirections.right,
                // window
                windowWidth = window.innerWidth,
                // select
                selectWidth = selectProps.selectButtonProperties.width,
                selectLeft = selectProps.selectButtonProperties.offset.left,
                selectRight = selectProps.selectButtonProperties.offset.right,
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

    // update select props
    const prevLengthAllSelectOptions = useRef(1)
    useEffect(() => {
        setSelectProps(currentSelectOptionsData => {
            if (
                JSON.stringify({
                    ...selectPropsGetByIndex,
                    lastUpdate: 0,
                    headerText: '',
                    selectButtonProperties: {
                        ...selectPropsGetByIndex.selectButtonProperties,
                        offset: null
                    }
                }) !==
                    JSON.stringify({
                        ...currentSelectOptionsData,
                        lastUpdate: 0,
                        headerText: '',
                        selectButtonProperties: {
                            ...currentSelectOptionsData.selectButtonProperties,
                            offset: null
                        }
                    }) ||
                lengthAllSelects != prevLengthAllSelectOptions.current
            ) {
                if (selectProps.selectId !== selectPropsGetByIndex.selectId || !selectPropsGetByIndex.show) {
                    setSearchText('')
                }
                prevLengthAllSelectOptions.current = lengthAllSelects

                return selectPropsGetByIndex
            }
            return currentSelectOptionsData
        })

        return () => {
            setSearchText('')
        }
    }, [selectPropsGetByIndex, lengthAllSelects])

    const [optionsListWidth, setOptionsListWidth] = useState(0)
    const calcOptionsListWidth = options => {
        // get options-list width
        let _width = 0
        if (options.length) {
            for (const _option of options) {
                let _optionText = _option[1]
                const isOptionSubmenu = Array.isArray(_optionText) && _optionText.length === 2
                _optionText = String(isOptionSubmenu ? _optionText[0] : _optionText)
                const _textWidth = _optionText
                    .split('')
                    .reduce(
                        (width, char) => width + (Object.keys(_charsWidth).includes(char) ? _charsWidth[char] : 7),
                        0
                    )
                if (_textWidth > _width) _width = _textWidth
            }
        }
        setOptionsListWidth(_width)
        return _width
    }

    // update options
    const prevSelectOptions = useRef()
    useEffect(() => {
        const _options = selectOptionsGetByIndex.options
        if (!_.isEqual(prevSelectOptions.current, _options)) {
            prevSelectOptions.current = _options
            calcOptionsListWidth(_options)
            setSelectOptions(_options)
            setSortedOptions(sortOptions(_options))
            setListTilesInView(initListTilesInView)
        }
    }, [selectOptionsGetByIndex.options])

    // set search field focused after change selector
    const searchFieldRef = useRef()
    useEffect(() => {
        if (searchFieldRef.current && selectProps.show && selectProps.selectId) {
            searchFieldRef.current && searchFieldRef.current.focus()
        }
    }, [searchFieldRef, selectProps])

    const animateTimeout = useRef()
    const prevData = useRef({
        wasClosed: true,
        showSelectedParallel: false,
        x: 0,
        y: 0,
        lengthAllSelects: 0
    })
    const parsePixel = number => {
        return number + 'px'
    }

    // animate other components before move the selectOptions window to another selector
    useEffect(() => {
        if (animateTimeout.current) clearTimeout(animateTimeout.current)

        animateTimeout.current = setTimeout(() => {
            const $header = $(`.select-options[index="${index}"] .select-options-headline`)
            const headerChildHeight = $header.children().first().prop('scrollHeight')
            gsap.to(`.select-options[index="${index}"] .select-options-headline`, {
                minHeight: parsePixel(selectProps.headerText ? Math.max(headerChildHeight, 35) : 0),
                maxHeight: parsePixel(selectProps.headerText ? Math.max(headerChildHeight, 35) : 0),
                opacity: selectProps.headerText ? 1 : 0,
                marginBottom: parsePixel(selectProps.headerText ? -15 : 0),
                duration: 0.2
            })

            const $el = $(`.select-options[index="${index}"] .select-options-actions`)
            const selectOptionsActionsScrollHeight = $el.prop('scrollHeight')
            const wasShown = selectProps.show

            const enableSelectAllButton =
                selectProps.multiSelect && selectProps.enableSearch && selectProps.enableSelectAllButton

            gsap.to(`.select-options[index="${index}"] .disable-pointer-events-layer`, {
                pointerEvents: thisSelectIsActiveNow ? 'none' : 'auto',
                duration: 0
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions`, {
                minHeight: parsePixel(selectProps.enableSearch ? selectOptionsActionsScrollHeight : 0),
                maxHeight: parsePixel(selectProps.enableSearch ? selectOptionsActionsScrollHeight : 0),
                opacity: selectProps.enableSearch ? 1 : 0,
                paddingTop: parsePixel(selectProps.enableSearch ? 1 : 0),
                //pointerEvents: wasShown && selectProps.enableSearch && thisSelectIsActiveNow ? 'auto' : 'none',
                duration: 0.2,
                delay: 0.2
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field input`, {
                width: !enableSelectAllButton ? 'calc(100%)' : '100%',
                paddingLeft: parsePixel(enableSelectAllButton ? 95 : 10),
                duration: 0.2,
                delay: 0.2
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field input`, {
                opacity: selectProps.showSelectedParallel ? 0 : 1,
                //pointerEvents: !wasShown || selectProps.showSelectedParallel || !thisSelectIsActiveNow ? 'none' : 'auto',
                duration: 0.2,
                delay: 0.2
            })

            gsap.to(
                `.select-options[index="${index}"] .select-options-actions .select-options-search-field .clear-button`,
                {
                    opacity: selectProps.showSelectedParallel ? 0 : 1,
                    //pointerEvents: !wasShown || selectProps.showSelectedParallel || !thisSelectIsActiveNow ? 'none' : 'auto',
                    duration: 0.2,
                    delay: 0.2
                }
            )

            gsap.to(
                `.select-options[index="${index}"] .select-options-actions .select-options-search-field .select-all-buttons`,
                {
                    borderTopRightRadius: parsePixel(selectProps.showSelectedParallel ? 10 : 0),
                    borderBottomRightRadius: parsePixel(selectProps.showSelectedParallel ? 10 : 0),
                    //pointerEvents: wasShown && enableSelectAllButton && thisSelectIsActiveNow ? 'auto' : 'none',
                    opacity: enableSelectAllButton ? 1 : 0,
                    translateX: parsePixel(enableSelectAllButton ? 0 : -20),
                    duration: 0.2,
                    delay: 0.2,
                    onComplete: () => {
                        setUpdateSelectPropsTimes(_ => _ + 1)
                    }
                }
            )
        }, 150)
        return () => clearTimeout(animateTimeout.current)
    }, [selectProps, lengthAllSelects, selectOptions])

    const getNextXY = () => {
        const optionsProperties = getDimensions({
            ref: myRef
        })
        const x = moveHorizontal(
            optionsProperties,
            `${
                selectProps.selectButtonProperties.offset
                    ? selectProps.selectButtonProperties.offset.left + selectProps.selectButtonProperties.width
                    : 0
            }px`,
            `${
                selectProps.selectButtonProperties.offset
                    ? selectProps.selectButtonProperties.offset.left - optionsProperties.width
                    : 0
            }px`,
            selectProps.selectButtonProperties.offset
                ? selectProps.selectButtonProperties.offset.left -
                      optionsProperties.width / 2 +
                      selectProps.selectButtonProperties.width / 2
                : 0
        )

        const y = moveVertikal(
            optionsProperties,
            `${
                selectProps.selectButtonProperties.offset
                    ? selectProps.selectButtonProperties.offset.top + selectProps.selectButtonProperties.height
                    : 0
            }px`,
            `${
                selectProps.selectButtonProperties.offset
                    ? selectProps.selectButtonProperties.offset.top - optionsProperties.height
                    : 0
            }px`,
            `${selectProps.selectButtonProperties.top}px`
        )
        return { x, y }
    }

    // update selectOptions Component size and dimentions
    const firstRenderTimeout = useRef()
    const firstTimeRender = useRef(true)
    useEffect(() => {
        if (firstRenderTimeout.current) clearTimeout(firstRenderTimeout.current)
        const {
            x: prevX,
            y: prevY,
            showSelectedParallel: prevShowSelectedParallel,
            wasClosed,
            lengthAllSelects: prevLengthAllSelects
        } = prevData.current

        const selectLengthWasDownscalled = lengthAllSelects < prevLengthAllSelects

        // min width 250px if optionsListWidth is smaller then that
        const optionWidth = Math.max(optionsListWidth + 10, 250)

        gsap.to(`.select-options[index="${index}"] .select-options-column .options-list`, {
            width: optionWidth + 75,
            duration: 0.2
        })

        firstRenderTimeout.current = setTimeout(() => {
            let nextXY = getNextXY()
            const { x, y } = nextXY
            const distance = Math.sqrt(
                Math.pow(parseFloat(prevX) - parseFloat(x), 2) + Math.pow(parseFloat(prevY) - parseFloat(y), 2)
            )
            const distanceToSeconds = Math.min(Math.max((distance / 50) * 0.04, 0.1), 0.25)

            const _toggleSelectOptions = () => {
                gsap.to(`.select-options[index="${index}"]`, {
                    opacity: selectProps.show ? 1 : 0,
                    filter: `blur(${selectProps.show && thisSelectIsActiveNow ? 0 : 1}px)`,
                    pointerEvents: selectProps.show ? 'auto' : 'none',
                    duration: selectLengthWasDownscalled ? 0.05 : distanceToSeconds,
                    onComplete: () => {
                        prevData.current = {
                            wasClosed: !selectProps.show,
                            showSelectedParallel: selectProps.showSelectedParallel,
                            x: x,
                            y: y,
                            lengthAllSelects: lengthAllSelects
                        }
                        firstTimeRender.current = false
                    }
                })
            }

            if (prevShowSelectedParallel || wasClosed || !selectProps.showSelectedParallel) {
                gsap.to(`.select-options[index="${index}"] .select-options-column .options-list`, {
                    width: optionWidth + 75,
                    duration: 0,
                    onComplete: () => {
                        nextXY = getNextXY()
                        const { x, y } = nextXY
                        gsap.to(`.select-options[index="${index}"]`, {
                            x: selectProps.show ? x : prevX,
                            y: selectProps.show ? y : prevY,
                            duration: 0.35,
                            delay: 0.15,
                            onComplete: () => {
                                _toggleSelectOptions()
                            }
                        })
                    }
                })
            } else {
                gsap.to(`.select-options[index="${index}"]`, {
                    x: selectProps.show ? x : prevX,
                    y: selectProps.show ? y : prevY,
                    delay: 0.15,
                    duration: selectProps.show && !wasClosed ? distanceToSeconds : 0,
                    onComplete: () => {
                        _toggleSelectOptions()
                    }
                })
            }
        }, 150)

        return () => clearTimeout(firstRenderTimeout.current)
    }, [updateSelectPropsTimes, selectProps.show, lengthAllSelects, optionsListWidth])

    // change headline to empty after 1 second if the next one is empty
    // this is for more stabile animation
    const [headline, setHeadline] = useState(selectProps.headerText)
    useEffect(() => {
        const t = setTimeout(
            () => {
                setHeadline(selectProps.headerText)
            },
            selectProps.headerText ? 0 : 1000
        )
        return () => clearTimeout(t)
    }, [selectProps.headerText])

    // sort options function
    const [sortedOptions, setSortedOptions] = useState([])
    const sortOptions = _options => {
        try {
            const DescSorted = _.sortBy(_options, o => String(o[1]).toUpperCase())

            switch (selectProps.sort) {
                case 'DESC':
                    return DescSorted
                case 'ASC':
                    return DescSorted.reverse()
                default:
                    return _options
            }
        } catch (e) {
            return _options
        }
    }

    // check if option should hide `only with parallel view`
    const hideOption = (option, viewport) => {
        const _searchText =
            selectProps.multiSelect && selectProps.showSelectedParallel
                ? {
                      1: searchTextUnselectedTail,
                      3: searchTextSelectedTail
                  }[viewport]
                : searchText

        return _searchText ? foundOptions(_searchText, option) : false
    }

    // this handler is used to preduce performance lag if there is a large list of options
    // it would be claculated wich options are in view, a list of indexes would be saved in `listTilesInView`
    // and used later to allow option to be renderd or not
    const handleScrollingOptionsList = (e, viewport, viewportOptionsIds) => {
        const _scrollTop = $(e.target).scrollTop() // px
        const _height = $(e.target).height() // px
        const _optionHeight = 40 // px
        const _cacheExtent = 5 * 40
        const _dimensions = {
            top: Math.round(_scrollTop),
            bottom: Math.round(_scrollTop + _height)
        }

        setListTilesInView(currentListTilesInView => {
            currentListTilesInView[viewport] = [...Array(viewportOptionsIds.length).keys()]
                .filter(oIndex => {
                    const _optionDimensions = {
                        top: oIndex * _optionHeight,
                        bottom: oIndex * _optionHeight + _optionHeight
                    }
                    return (
                        _optionDimensions.top >= _dimensions.top - _cacheExtent &&
                        _optionDimensions.bottom <= _dimensions.bottom + _cacheExtent
                    )
                })
                .map(String)

            return { ...currentListTilesInView }
        })
    }

    // hide options
    const [viewportOptionsIds, setViewportOptionsIds] = useState({ 1: [], 3: [] })
    const viewportOptionsIdsTimeout = useRef()
    useEffect(() => {
        if (viewportOptionsIdsTimeout.current) clearTimeout(viewportOptionsIdsTimeout.current)
        viewportOptionsIdsTimeout.current = setTimeout(() => {
            const nextViewportOptionsIds = { 1: [], 3: [] }

            for (const option of sortedOptions) {
                const optionId = String(option[0])
                const optionWasSelected = wasSelected(option)
                if (selectProps.multiSelect && selectProps.showSelectedParallel) {
                    let pushToViewport = !optionWasSelected ? '1' : '3'

                    if (!hideOption(option, pushToViewport)) nextViewportOptionsIds[pushToViewport].push(optionId)
                } else {
                    if (!hideOption(option, '1')) nextViewportOptionsIds['1'].push(optionId)
                }
            }

            setViewportOptionsIds(nextViewportOptionsIds)
        }, 50)
        return () => clearTimeout(viewportOptionsIdsTimeout.current)
    }, [
        sortedOptions,
        selectProps.selectedOption,
        selectProps.multiSelect,
        selectProps.showSelectedParallel,
        searchText,
        searchTextSelectedTail,
        searchTextUnselectedTail
    ])

    // reset options view after modifysearchText
    const resetListTileInViewsTimeout = useRef()
    useEffect(() => {
        if (resetListTileInViewsTimeout.current) clearTimeout(resetListTileInViewsTimeout.current)
        resetListTileInViewsTimeout.current = setTimeout(() => {
            handleScrollingOptionsList({ target: '.options-list' }, '1', viewportOptionsIds['1'])
        }, 50)
        return () => clearTimeout(resetListTileInViewsTimeout.current)
    }, [searchText, searchTextSelectedTail, searchTextUnselectedTail, viewportOptionsIds, selectProps.selectedOption])

    return (
        <div
            ref={myRef}
            className={`select-options disable-selecting${
                selectProps.headerText || selectProps.enableSearch ? ' show-gradient-effect' : ''
            } ${selectProps.className ?? ''}${selectProps.showSelectedParallel ? ' show-selected-parallel' : ''}${
                selectProps.multiSelect ? ' multi-select' : ' single-select'
            }${selectProps.headerText ? ' with-header-text' : ''}${
                selectProps.enableSearch
                    ? ` with-search${selectProps.enableSelectAllButton ? ' with-select-all-buttons' : ''}`
                    : ''
            }`}
            index={index}
        >
            <div>
                <div className={`select-options-headline`} index={index}>
                    <span>{headline}</span>
                </div>

                <div className={`select-options-actions`} index={index}>
                    <TextField
                        inputRef={
                            selectProps.showSelectedParallel || !selectProps.enableSearch || !thisSelectIsActiveNow
                                ? null
                                : r => r && r.focus()
                        }
                        className={`select-options-search-field`}
                        beforeComponent={
                            <div className={'select-all-buttons'}>
                                <Button
                                    className={'select-all-button'}
                                    leftIcon={'done_all'}
                                    onClick={() => {
                                        selectProps.setSelectedOption(
                                            selectOptions.filter(option => {
                                                const _searchedText = selectProps.showSelectedParallel
                                                    ? searchTextUnselectedTail
                                                    : searchText

                                                return Boolean(_searchedText)
                                                    ? !foundOptions(_searchedText, option) || wasSelected(option)
                                                    : true
                                            })
                                        )
                                    }}
                                />
                                <Button
                                    className={'select-all-button'}
                                    leftIcon={'remove_done'}
                                    onClick={() => {
                                        selectProps.setSelectedOption(
                                            selectProps.showSelectedParallel && searchTextSelectedTail !== ''
                                                ? selectProps.selectedOption.filter(_selectedOption =>
                                                      foundOptions(searchTextSelectedTail, _selectedOption)
                                                  )
                                                : []
                                        )
                                    }}
                                />
                            </div>
                        }
                        afterComponent={
                            <Button
                                className={'clear-button'}
                                leftIcon={'backspace'}
                                onClick={() => {
                                    setSearchText('')
                                }}
                            />
                        }
                        value={searchText}
                        placeholder={selectProps.searchPlaceHolder ?? 'finde options'}
                        onChange={setSearchText}
                    />
                    <Button
                        className={'close-button'}
                        leftIcon={'close'}
                        onClick={() => {
                            closeSelectOptions()
                        }}
                    />
                </div>
                <div
                    className={`select-options-body${!selectProps.headerText ? ' header-text-is-not-enabled' : ''}`}
                    data-cy={'select-options-body'}
                >
                    {(selectProps.showSelectedParallel ? [1, 2, 3] : [1]).map(viewport => {
                        return viewport !== 2 ? (
                            <div className={'select-options-column'}>
                                {selectProps.showSelectedParallel ? (
                                    <TextField
                                        className="search-field-parallel-view"
                                        inputRef={
                                            viewport === 3 || !selectProps.enableSearch || !thisSelectIsActiveNow
                                                ? null
                                                : r => (searchFieldRef.current = r)
                                        }
                                        value={viewport === 1 ? searchTextUnselectedTail : searchTextSelectedTail}
                                        placeholder={selectProps.searchPlaceHolder ?? 'finde options'}
                                        onChange={_searchText => {
                                            if (viewport === 1) {
                                                setSearchTextUnselectedTail(_searchText)
                                                setSearchTextSelectedTail('')
                                            } else {
                                                setSearchTextSelectedTail(_searchText)
                                                setSearchTextUnselectedTail('')
                                            }
                                        }}
                                        afterComponent={
                                            <Button
                                                className={'clear-button'}
                                                leftIcon={'backspace'}
                                                onClick={() => {
                                                    setSearchText('')
                                                    if (viewport === 3) {
                                                        setSearchTextSelectedTail('')
                                                    } else {
                                                        setSearchTextUnselectedTail('')
                                                    }
                                                }}
                                            />
                                        }
                                    />
                                ) : null}

                                {selectProps.showSelectedParallel ? (
                                    <div
                                        className={`empty-listview-background-image ${
                                            (selectProps.selectedOption &&
                                                selectProps.selectedOption.length !== selectOptions.length &&
                                                viewport === 1) ||
                                            (selectProps.selectedOption.length && viewport === 3)
                                                ? 'hide'
                                                : ''
                                        }`}
                                    >
                                        <span className={'material-symbols-outlined'}>
                                            {viewport === 3 ? 'done_all' : 'remove_done'}
                                        </span>
                                    </div>
                                ) : null}

                                {(() => {
                                    return (
                                        <div
                                            key={viewport}
                                            className={`options-list ${viewport}-ct select-index-${index}`}
                                            onScroll={e => {
                                                handleScrollingOptionsList(
                                                    e,
                                                    String(viewport),
                                                    viewportOptionsIds[String(viewport)]
                                                )
                                            }}
                                        >
                                            <div
                                                style={{
                                                    minHeight: parsePixel(
                                                        viewportOptionsIds[String(viewport)].length * 40
                                                    )
                                                }}
                                            >
                                                {selectProps.defaultOption && viewport === 1 ? (
                                                    <SelectOption
                                                        id={''}
                                                        disableSelecting={selectProps.disableSelecting}
                                                        setDisableSelecting={selectProps.setDisableSelecting}
                                                        selectedOption={selectProps}
                                                        setShowOptions={selectProps.setShowOptions}
                                                        setSelectedOption={selectProps.setSelectedOption}
                                                        hide={selectProps.searchText}
                                                        defaultOption
                                                    >
                                                        {selectProps.defaultOptionText ?? 'Select a option'}
                                                    </SelectOption>
                                                ) : null}

                                                {sortedOptions.map(option => {
                                                    const indexOfShownOption = viewportOptionsIds[
                                                        String(viewport)
                                                    ].indexOf(String(option[0]))
                                                    return listTilesInView[String(viewport)].includes(
                                                        String(indexOfShownOption)
                                                    ) ? (
                                                        <SelectOption
                                                            key={option[0]}
                                                            id={option[0]}
                                                            top={
                                                                (indexOfShownOption +
                                                                    (selectProps.defaultOption && viewport === 1
                                                                        ? 1
                                                                        : 0)) *
                                                                40
                                                            }
                                                            mainSelectId={
                                                                selectProps.mainSelectId ?? selectProps.selectId
                                                            }
                                                            parentSelectId={selectProps.selectId}
                                                            selectOptionsIndex={index}
                                                            disableSelecting={selectProps.disableSelecting}
                                                            setDisableSelecting={selectProps.setDisableSelecting}
                                                            multiSelect={selectProps.multiSelect}
                                                            selectedOption={selectProps.selectedOption}
                                                            setSelectedOption={selectProps.setSelectedOption}
                                                            hide={hideOption(option, viewport)}
                                                            searchText={
                                                                selectProps.multiSelect &&
                                                                selectProps.showSelectedParallel
                                                                    ? {
                                                                          1: searchTextUnselectedTail,
                                                                          3: searchTextSelectedTail
                                                                      }[viewport]
                                                                    : searchText
                                                            }
                                                        >
                                                            {option[1]}
                                                        </SelectOption>
                                                    ) : null
                                                })}
                                            </div>
                                        </div>
                                    )
                                })()}
                            </div>
                        ) : (
                            <div key={viewport} className={'vertical-rule'} />
                        )
                    })}
                </div>
            </div>
            <div
                className="disable-pointer-events-layer"
                onClick={() => {
                    dispatch('DELETE_SUB_SELECTS_UP_TARGET_INDEX', index)
                }}
            />
        </div>
    )
}

export default SelectOptions
