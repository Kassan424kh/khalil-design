import React, { useEffect, useRef, forwardRef, useState } from 'react'
import './styles.sass'
import Select from '../../select'
import { useStore } from '../../../../hooks-store/store'

String.prototype.replaceJSX = function (find, replace) {
    return find
        .toUpperCase()
        .split(/  +/g)
        .filter(Boolean)
        .flatMap(splitedSearchWord => {
            const findOriginalText = (originalText, splitedText) => {
                const getSplitedTextIndexInOriginalText = originalText
                    .toUpperCase()
                    .search(splitedText.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1').toUpperCase())
                return originalText.slice(
                    getSplitedTextIndexInOriginalText,
                    getSplitedTextIndexInOriginalText + splitedText.length
                )
            }

            const splitedText = this.toUpperCase().split(splitedSearchWord)
            return splitedText.flatMap((item, index) => [
                findOriginalText(this, item),
                index !== splitedText.length - 1 ? replace(findOriginalText(this, splitedSearchWord)) : ''
            ])
        })
}

const SelectOption = forwardRef(
    (
        {
            id,
            top,
            defaultOption,
            hide,
            selectedOption,
            multiSelect,
            setSelectedOption,
            children,
            setDisableSelecting,
            selectOptionsIndex,
            mainSelectId,
            parentSelectId,
            searchText,
            loadingOption
        },
        ref
    ) => {
        const [_state_, dispatch] = useStore()
        const [submenuShowNow, setSubmenuShowNow] = useState(false)

        const pauseClickTime = useRef(Date.now())
        const isOptionSubmenu = Array.isArray(children) && children.length === 2
        const _selectedOption = selectedOption ?? []
        const childOfSelectedOptionIsArray = Array.isArray(_selectedOption.at(1)) && _selectedOption.at(1).length === 2

        const isScreenMounted = useRef(true)
        useEffect(() => {
            isScreenMounted.current = true
            return () => (isScreenMounted.current = false)
        }, [])

        const selectOption = (
            <div
                ref={ref}
                className={`select-option${isOptionSubmenu && submenuShowNow ? ' hover-effect' : ''}${
                    hide ? ' hide-option' : ''
                }${defaultOption ? ' default-option' : ''}${hide ? ' hide-option' : ''}${
                    _selectedOption &&
                    (() => {
                        if (_selectedOption.length)
                            return multiSelect
                                ? (() => {
                                      const foundSelectedOption = _selectedOption.filter(option => {
                                          return option[0] === id
                                      })[0]
                                      return foundSelectedOption ? foundSelectedOption[0] === id : false
                                  })()
                                : _selectedOption[0] === id && (isOptionSubmenu ? childOfSelectedOptionIsArray : true)
                        else return false
                    })() &&
                    !defaultOption
                        ? ' selected'
                        : ''
                }${loadingOption ? ' loading-option' : ''}`}
                onClick={() => {
                    if (Date.now() > pauseClickTime.current && !isOptionSubmenu) {
                        if (!defaultOption && setSelectedOption) {
                            const nextSelectedOption = multiSelect
                                ? _selectedOption.filter(option => option[0] === id).length
                                    ? _selectedOption.filter(option => option[0] !== id)
                                    : [..._selectedOption, [id, children]]
                                : [id, children]
                            setSelectedOption(nextSelectedOption)
                        }
                        setDisableSelecting(true)
                        pauseClickTime.current = Date.now() + 350
                        if (!multiSelect && !isOptionSubmenu) {
                            setTimeout(() => {
                                dispatch('CLOSE_ALL_SELECT')
                            }, 450)
                        }
                    }
                }}
            >
                <div className={'option-content'}>
                    <span className={'select-option-icon material-symbols-outlined'}>check</span>
                    <pre className={'option-text'}>
                        {(() => {
                            const optionText = String(isOptionSubmenu ? children[0] : children)
                            return typeof optionText === 'string' && Boolean(searchText?.replace(/  +/g, ''))
                                ? optionText.replaceJSX(searchText.replace(/  +/g, ''), originalText => (
                                      <b>{originalText.replace(/  +/g, ' ')}</b>
                                  ))
                                : optionText
                        })()}
                    </pre>
                    {isOptionSubmenu && !multiSelect ? (
                        <span className={'select-option-icon submenu material-symbols-outlined'}>expand_more</span>
                    ) : null}
                </div>
            </div>
        )

        return (
            <div
                className={`select-option-container`}
                style={{ transform: `perspective(1px) translateY(${top}px) translateZ(0)` }}
            >
                {isOptionSubmenu && !multiSelect ? (
                    <Select
                        className={'submenu-selector'}
                        options={children[1]}
                        index={String(parseInt(selectOptionsIndex) + 1)}
                        mainSelectId={mainSelectId}
                        parentSelectId={parentSelectId}
                        selected={_selectedOption.at(1) ?? []}
                        onActive={setSubmenuShowNow}
                        onSelect={option => {
                            if (Date.now() > pauseClickTime.current) {
                                if (!defaultOption && setSelectedOption) setSelectedOption([id, option])
                                setDisableSelecting(true)
                                if (isScreenMounted.current)
                                    setTimeout(() => {
                                        dispatch('CLOSE_ALL_SELECT')
                                    }, 450)
                            }
                        }}
                    >
                        {selectOption}
                    </Select>
                ) : (
                    selectOption
                )}
            </div>
        )
    }
)

export default SelectOption
