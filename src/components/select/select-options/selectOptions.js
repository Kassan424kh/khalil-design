import React, { useCallback, useEffect, useRef, useState } from 'react'
import { defaultSelectOptionsData } from '../../../hooks-store/configs/selectOptionsHooksStore'
import { useStore } from '../../../hooks-store/store'
import { getDimensions } from '../../../services/useContainerDimensions'
import Button from '../../button/button'
import TextField from '../../textfield/textfield'
import SelectOption from './select-option/selectOption'
import './styles.sass'
import $ from 'jquery'
import _ from 'underscore'
import gsap from 'gsap'

const SelectOptions = ({ index = "0" }) => {
    const [{ selectOptions: selectOptionsOnStore }, dispatch] = useStore()
    const selectOptionsDataAfterIndex = selectOptionsOnStore[index]
    const lengthAllSelectOptions = Object.values(selectOptionsOnStore).length
    const thisSelectIsActiveNow = lengthAllSelectOptions - 1 <= index
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

    const updateOffsetTimeout = useRef()
    useEffect(() => {
        clearTimeout(updateOffsetTimeout.current)

        updateOffsetTimeout.current = setTimeout(() => {
        }, 100)
        return () => clearTimeout(updateOffsetTimeout.current)
    }, [selectOptionsData.options])

    const myRef = useRef()

    const foundOptions = useCallback(
        (__searchText, option, searchEveryWare = false) => {
            return !__searchText
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
                        }).length // TODO: fix search selected on parallel view not works
                })
        },
        [selectOptionsData.selectedOption, searchText, searchTextSelectedTail, searchTextUnselectedTail]
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
    const prevOptions = useRef()
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
                options: prevOptions.current,
                selectButtonProperties: {
                    ...currentSelectOptionsData.selectButtonProperties,
                    offset: null
                }
            }) || lengthAllSelectOptions != prevLengthAllSelectOptions.current) {

                if (selectOptionsData.selectId !== selectOptionsDataAfterIndex.selectId || !selectOptionsDataAfterIndex.show) {
                    setSearchText('')
                }

                prevLengthAllSelectOptions.current = lengthAllSelectOptions
                prevOptions.current = selectOptionsDataAfterIndex.options
                const _options = selectOptionsDataAfterIndex.options
                const _convertedOptionsToObject =  _.isObject(_options) && typeof _options !== "string" ? _options : JSON.parse(_options ?? JSON.stringify([]))
                const _convertedOptionsToEntries = Object.entries(_convertedOptionsToObject)
                console.log(888888, _convertedOptionsToEntries)
            
                return {...selectOptionsDataAfterIndex, options: _convertedOptionsToEntries}
            }
            return currentSelectOptionsData
        })

        return () => {
            setSearchText('')
        }

    }, [selectOptionsDataAfterIndex, lengthAllSelectOptions])

    const searchFieldRef = useRef()
    useEffect(() => {
        if (searchFieldRef.current && selectOptionsData.show && selectOptionsData.selectId) {
            searchFieldRef.current && searchFieldRef.current.focus()
        }
    }, [searchFieldRef, selectOptionsData])

    const animateTimeout = useRef()
    const prevData = useRef({
        wasClosed: true,
        showSelectedParallel: false,
        x: 0,
        y: 0
    })
    const parsePixel = (number) => {
        return number + "px"
    }
    useEffect(() => {
        if (animateTimeout.current) clearTimeout(animateTimeout.current)

        animateTimeout.current = setTimeout(() => {
            const $header = $(`.select-options[index="${index}"] .select-options-headline`)
            const headerChildHeight = $header.children().first().prop('scrollHeight')
            gsap.to(`.select-options[index="${index}"] .select-options-headline`, {
                minHeight: parsePixel(selectOptionsData.headerText ? Math.max(headerChildHeight, 35) : 0),
                maxHeight: parsePixel(selectOptionsData.headerText ? Math.max(headerChildHeight, 35) : 0),
                opacity: selectOptionsData.headerText ? 1 : 0,
                marginBottom: parsePixel(selectOptionsData.headerText ? -15 : 0),
                duration: 0.15
            })

            const $el = $(`.select-options[index="${index}"] .select-options-actions`)
            const selectOptionsActionsScrollHeight = $el.prop('scrollHeight')
            const wasShown = selectOptionsData.show

            const enableSelectAllButton = selectOptionsData.multiSelect && selectOptionsData.enableSearch && selectOptionsData.enableSelectAllButton

            gsap.to(`.select-options[index="${index}"] .select-options-actions`, {
                minHeight: parsePixel(selectOptionsData.enableSearch ? selectOptionsActionsScrollHeight : 0),
                maxHeight: parsePixel(selectOptionsData.enableSearch ? selectOptionsActionsScrollHeight : 0),
                opacity: selectOptionsData.enableSearch ? 1 : 0,
                paddingTop: parsePixel(selectOptionsData.enableSearch ? 1 : 0),
                pointerEvents: wasShown && selectOptionsData.enableSearch && thisSelectIsActiveNow ? 'auto' : 'none',
                duration: 0.15,
                delay: 0.05
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field input`, {
                width: !enableSelectAllButton ? 'calc(100%)' : '100%',
                paddingLeft: parsePixel(enableSelectAllButton ? 95 : 10),
                duration: 0.15,
                delay: 0.05,
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field input`, {
                opacity: selectOptionsData.showSelectedParallel ? 0 : 1,
                pointerEvents: !wasShown || selectOptionsData.showSelectedParallel || !thisSelectIsActiveNow ? 'none' : 'auto',
                duration: 0.15,
                delay: 0.05,
            })

            gsap.to(`.select-options[index="${index}"] .select-options-actions .select-options-search-field .clear-button`, {
                opacity: selectOptionsData.showSelectedParallel ? 0 : 1,
                pointerEvents: !wasShown || selectOptionsData.showSelectedParallel || !thisSelectIsActiveNow ? 'none' : 'auto',
                duration: 0.15,
                delay: 0.05,
            })

            gsap.to(
                `.select-options[index="${index}"] .select-options-actions .select-options-search-field .select-all-buttons`,
                {
                    borderTopRightRadius: parsePixel(selectOptionsData.showSelectedParallel ? 10 : 0),
                    borderBottomRightRadius: parsePixel(selectOptionsData.showSelectedParallel ? 10 : 0),
                    pointerEvents: wasShown && enableSelectAllButton && thisSelectIsActiveNow ? 'auto' : 'none',
                    opacity: enableSelectAllButton ? 1 : 0,
                    translateX: parsePixel(enableSelectAllButton ? 0 : -20),
                    duration: 0.15,
                    delay: 0.05,
                    onComplete: () => {
                        setUpdateSelectOptionsTimes(_ => _ + 1)
                    }
                }
            )
        }, 150)
        return () => clearTimeout(animateTimeout.current)
    }, [selectOptionsData, lengthAllSelectOptions])

    const getNextXY = () => {
        const optionsProperties = getDimensions({
            ref: myRef
        })
        const x = moveHorizontal(
            optionsProperties,
            `${selectButtonProperties.offset ? selectButtonProperties.offset.left + selectButtonProperties.width : 0
            }px`,
            `${selectButtonProperties.offset ? selectButtonProperties.offset.left - optionsProperties.width : 0}px`,
            selectButtonProperties.offset
                ? selectButtonProperties.offset.left - optionsProperties.width / 2 + selectButtonProperties.width / 2
                : 0
        )

        const y = moveVertikal(
            optionsProperties,
            `${selectButtonProperties.offset ? selectButtonProperties.offset.top + selectButtonProperties.height : 0
            }px`,
            `${selectButtonProperties.offset ? selectButtonProperties.offset.top - optionsProperties.height : 0}px`,
            `${selectButtonProperties.top}px`
        )
        return { x, y }
    }

    // get max option width to set the options-list div with the new width after every options update
    const optionsRef = useRef([])
    // update selectOptions Component size and dimentions 
    const firstRenderTimeout = useRef()
    const firstTimeRender = useRef(true)
    useEffect(() => {
        if (firstRenderTimeout.current) clearTimeout(firstRenderTimeout.current)
        const { x: prevX, y: prevY, showSelectedParallel: prevShowSelectedParallel, wasClosed } = prevData.current

        let optionWidth = 0
        const ListOfOptionsRefWithoutEmptyItems = optionsRef.current.filter(Boolean)
        if (ListOfOptionsRefWithoutEmptyItems.length) {
            ListOfOptionsRefWithoutEmptyItems.forEach(or => {
                const _optionWidth = or.firstChild.clientWidth
                if (_optionWidth > optionWidth) optionWidth = _optionWidth
            })
        }
        optionWidth = Math.max(optionWidth + 75, 250)

        gsap.to(`.select-options[index="${index}"] .select-options-column .options-list`, {
            width: optionWidth,
            duration: 0
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
                    opacity: selectOptionsData.show ? 1 : 0,
                    filter: `blur(${selectOptionsData.show && thisSelectIsActiveNow ? 0 : 1}px)`,
                    pointerEvents: selectOptionsData.show && thisSelectIsActiveNow ? 'auto' : 'none',
                    duration: distanceToSeconds,
                    onComplete: () => {
                        prevData.current = {
                            wasClosed: !selectOptionsData.show,
                            showSelectedParallel: selectOptionsData.showSelectedParallel,
                            x: x,
                            y: y
                        }
                        firstTimeRender.current = false
                    }
                })
            }

            if (prevShowSelectedParallel || wasClosed || !selectOptionsData.showSelectedParallel) {
                gsap.to(`.select-options[index="${index}"] .select-options-column .options-list`, {
                    width: optionWidth,
                    duration: 0,
                    onComplete: () => {
                        nextXY = getNextXY()
                        const { x, y } = nextXY
                        gsap.to(`.select-options[index="${index}"]`, {
                            x: x,
                            y: y,
                            duration: 0.35,
                            delay: 0.1,
                            onComplete: () => {
                                _toggleSelectOptions()
                            }
                        })
                    }
                })
            } else {
                gsap.to(`.select-options[index="${index}"]`, {
                    x: x,
                    y: y,
                    duration: selectOptionsData.show && !wasClosed ? distanceToSeconds : 0,
                    onComplete: () => {
                        _toggleSelectOptions()
                    }
                })
            }
        }, 150)

        return () => clearTimeout(firstRenderTimeout.current)

    }, [updateSelectOptionsTimes])

    const [headline, setHeadline] = useState(selectOptionsData.headerText)
    useEffect(() => {
        const t = setTimeout(() => {
            setHeadline(selectOptionsData.headerText)
        }, selectOptionsData.headerText ? 0 : 500)
        return () => clearTimeout(t)
    }, [selectOptionsData.headerText])

    const [sortedOptions, setSortedOptions] = useState([])
    const sortOptions = (_options) => {
        try {
            const DescSorted = _.sortBy(_options, o => String(o[1]).toUpperCase())

            switch (selectOptionsData.sort) {
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

    const initListTilesInView = {
        1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(String), // key is the viewport on parallel view, item is list of options indexes can render in view 
        3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(String), // same ^ 
    }

    const [listTilesInView, setListTilesInView] = useState(initListTilesInView)
    useEffect(() => {
        setSortedOptions(sortOptions(selectOptionsData.options))
        setListTilesInView(initListTilesInView)
    }, [selectOptionsData.options, selectOptionsData.sort])
    
    console.log(7777777, sortedOptions)

    // check if option was selected
    const wasSelected = (option) => {
        return selectOptionsData.selectedOption &&
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
    }

    // check if option should hide `only with parallel view`
    const hideOption = (option, viewport) => {
        const _wasSelected = wasSelected(option)
        const isOneOfTheParallelColumns = selectOptionsData.showSelectedParallel &&
            ((_wasSelected && viewport === "1") ||
                (!_wasSelected && viewport === "3"))

        const _searchText = selectOptionsData.showSelectedParallel
            ? viewport === "1"
                ? searchTextUnselectedTail
                : searchTextSelectedTail
            : searchText

        return _searchText ||
            isOneOfTheParallelColumns
            ? (foundOptions(
                _searchText,
                option,
                selectOptionsData.searchEveryWare
            ) &&
                Boolean(selectOptionsData.showSelectedParallel
                    ? viewport === "1"
                        ? !_wasSelected
                        : _wasSelected
                    : true)) ||
            isOneOfTheParallelColumns
            : false
    }

    const scrollingOptionsListTimeout = useRef()
    // this handler is used to preduce performance lag if there is a large list of options
    // it would be claculated wich options are in view, a list of indexes would be saved in `listTilesInView`
    // and used later to allow option to be renderd or not
    const handleScrollingOptionsList = (e, viewport, viewportOptionsIds) => {
        if (scrollingOptionsListTimeout.current) clearTimeout(scrollingOptionsListTimeout.current)

        scrollingOptionsListTimeout.current = setTimeout(() => {
            const _scrollTop = $(e.target).scrollTop() // px
            const _height = $(e.target).height() // px
            const _optionHeight = 40 // px
            const _cacheExtent = 30 * 40
            const _dimensions = {
                top: Math.round(_scrollTop),
                bottom: Math.round(_scrollTop + _height)
            }

            setListTilesInView(currentListTilesInView => {
                currentListTilesInView[String(viewport)] = [...Array(viewportOptionsIds.length).keys()].filter(oIndex => {
                    const _optionDimensions = {
                        top: oIndex * _optionHeight,
                        bottom: oIndex * _optionHeight + _optionHeight
                    }
                    return _optionDimensions.top >= _dimensions.top - _cacheExtent && _optionDimensions.bottom <= _dimensions.bottom + _cacheExtent
                }).map(String)

                return { ...currentListTilesInView }
            })
        }, 100)
        return () => clearTimeout(scrollingOptionsListTimeout.current)
    }

    const [viewportOptionsIds, setViewportOptionsIds] = useState({
        "1": [],
        "3": []
    })

    useEffect(() => {
            const nextViewportOptionsIds = {
                "1": [],
                "3": []
            }

            for (const option of sortedOptions){
                let pushToViewport = "1"
                if (hideOption(option, pushToViewport)) {
                    pushToViewport = "3"
                }
                nextViewportOptionsIds[pushToViewport].push(String(option[0]))

            }
            console.log(nextViewportOptionsIds)
    
            setViewportOptionsIds(nextViewportOptionsIds)
        
    }, [sortedOptions, selectOptionsData.selectedOption])

    return (
        <div
            ref={myRef}
            className={`select-options disable-selecting${selectOptionsData.headerText || selectOptionsData.enableSearch ? ' show-gradient-effect' : ''
                } ${selectOptionsData.className ?? ''}${selectOptionsData.showSelectedParallel ? ' show-selected-parallel' : ''
                }${selectOptionsData.multiSelect ? ' multi-select' : ' single-select'}${selectOptionsData.headerText ? ' with-header-text' : ''}${selectOptionsData.enableSearch
                    ? ` with-search${selectOptionsData.enableSelectAllButton ? ' with-select-all-buttons' : ''
                    }${selectOptionsData.enableCloseButton ? ' with-close-button' : ''}`
                    : ''
                }`}
            index={index}
        >
            <div>
                <div className={`select-options-headline`} index={index}>
                    <span>{headline}</span>
                </div>

                <div
                    className={`select-options-actions`}
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
                                            selectOptionsData.options.filter(option => {
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
                            <Button
                                className={'clear-button'}
                                leftIcon={"backspace"}
                                onClick={() => {
                                    setSearchText("")
                                }}
                            />
                        }
                        value={searchText}
                        placeholder={selectOptionsData.searchPlaceHolder ?? 'finde options'}
                        onChange={setSearchText}
                    />
                    <Button
                        className={'close-button'}
                        leftIcon={"close"}
                        onClick={() => {
                            dispatch('CLOSE_SELECT_OPTION', index)
                            closeSelectOptions()
                        }}
                    />
                </div>
                <div
                    className={`select-options-body${!selectOptionsData.headerText ? ' header-text-is-not-enabled' : ''
                        }`}
                    data-cy={'select-options-body'}
                >
                    {(selectOptionsData.showSelectedParallel ? [1, 2, 3] : [1]).map(viewport => {
                        return viewport !== 2 ? (
                            <div className={"select-options-column"}>
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
                                        afterComponent={
                                            <Button
                                                className={'clear-button'}
                                                leftIcon={"backspace"}
                                                onClick={() => {
                                                    setSearchText("")
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

                                {selectOptionsData.showSelectedParallel ? (
                                    <div
                                        className={`empty-listview-background-image ${(selectOptionsData.selectedOption &&
                                            selectOptionsData.selectedOption.length !==
                                            selectOptionsData.options.length &&
                                            viewport === 1) ||
                                            (selectOptionsData.selectedOption.length && viewport === 3)
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
                                    return <div
                                        key={viewport}
                                        className={`options-list ${viewport}-ct`}
                                        onScroll={(e) => handleScrollingOptionsList(e, viewport, viewportOptionsIds[String(viewport)])}
                                    >
                                        <div
                                            style={{
                                                minHeight: parsePixel(viewportOptionsIds[String(viewport)].length * 40)
                                            }}
                                        >

                                            {selectOptionsData.defaultOption && viewport === 1 ? (
                                                <SelectOption
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

                                            {sortedOptions.map(option => {
                                                const indexOfShownOption = viewportOptionsIds[String(viewport)].indexOf(String(option[0]))
                                                return listTilesInView[String(viewport)].includes(String(indexOfShownOption)) ? (
                                                    <SelectOption
                                                        key={option[0]}
                                                        ref={optionRef => optionsRef.current.push(optionRef)}
                                                        id={option[0]}
                                                        top={indexOfShownOption * 40}
                                                        mainSelectId={selectOptionsData.mainSelectId ?? selectOptionsData.selectId}
                                                        parentSelectId={selectOptionsData.selectId}
                                                        selectOptionsIndex={index}
                                                        disableSelecting={selectOptionsData.disableSelecting}
                                                        setDisableSelecting={selectOptionsData.setDisableSelecting}
                                                        multiSelect={selectOptionsData.multiSelect}
                                                        selectedOption={selectOptionsData.selectedOption}
                                                        setSelectedOption={selectOptionsData.setSelectedOption}
                                                        hide={hideOption(option, viewport)}
                                                    >
                                                        {option[1]}
                                                    </SelectOption>
                                                ) : null
                                            })}
                                        </div>
                                    </div>
                                })()}
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
