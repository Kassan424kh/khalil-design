import React, { useEffect, useRef, forwardRef } from 'react'
import './styles.sass'
import Select from '../../select'
import { useStore } from '../../../../hooks-store/store'

String.prototype.replaceJSX = function (find, replace) {
    return find
        .split(/  +/g)
        .filter(Boolean)
        .flatMap(splitedSearchWord => {
            const splitedText = this.split(splitedSearchWord)
            return splitedText.flatMap((item, index) => [item, index !== splitedText.length - 1 ? replace : ''])
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
            searchText
        },
        ref
    ) => {
        const [_, dispatch] = useStore()

        const pauseClickTime = useRef(Date.now())
        const isOptionSubmenu = Array.isArray(children) && children.length === 2
        const childOfSelectedOptionIsArray = Array.isArray(selectedOption[1]) && selectedOption[1].length === 2

        const selectOption = (
            <div
                ref={ref}
                className={`select-option${hide ? ' hide-option' : ''}${defaultOption ? ' default-option' : ''}${
                    hide ? ' hide-option' : ''
                }${
                    selectedOption &&
                    (() => {
                        if (selectedOption.length)
                            return multiSelect
                                ? (() => {
                                      const foundSelectedOption = selectedOption.filter(option => {
                                          return option[0] === id
                                      })[0]
                                      return foundSelectedOption ? foundSelectedOption[0] === id : false
                                  })()
                                : selectedOption[0] === id && (isOptionSubmenu ? childOfSelectedOptionIsArray : true)
                        else return false
                    })() &&
                    !defaultOption
                        ? ' selected'
                        : ''
                }`}
                onClick={() => {
                    if (Date.now() > pauseClickTime.current && !isOptionSubmenu) {
                        if (!defaultOption && setSelectedOption) {
                            setSelectedOption(
                                multiSelect
                                    ? selectedOption.filter(option => option[0] === id).length
                                        ? selectedOption.filter(option => option[0] !== id)
                                        : [...selectedOption, [id, children]]
                                    : [id, children]
                            )
                        }
                        setDisableSelecting(true)
                        if (!multiSelect && !isOptionSubmenu) {
                            setTimeout(() => {
                                dispatch('CLOASE_ALL_SELECT')
                            }, 450)
                        }
                        pauseClickTime.current = Date.now() + 350
                    }
                }}
            >
                <div className={'option-content'}>
                    <span className={'select-option-icon material-symbols-outlined'}>arrow_right</span>
                    <pre className={'option-text'}>
                        {(() => {
                            const optionText = String(isOptionSubmenu ? children[0] : children)
                            return typeof optionText === 'string' && Boolean(searchText.replace(/  +/g, ''))
                                ? optionText.replaceJSX(
                                      searchText.replace(/  +/g, ''),
                                      <b>{searchText.replace(/  +/g, ' ')}</b>
                                  )
                                : optionText
                        })()}
                    </pre>
                    {isOptionSubmenu && !multiSelect ? (
                        <span className={'select-option-icon submenu material-symbols-outlined'}>list</span>
                    ) : null}
                </div>
            </div>
        )

        return (
            <div className={`select-option-container`} style={{ top: top }}>
                {isOptionSubmenu && !multiSelect ? (
                    <Select
                        className={'submenu-selector'}
                        options={children[1]}
                        index={String(parseInt(selectOptionsIndex) + 1)}
                        enableSearch
                        mainSelectId={mainSelectId}
                        parentSelectId={parentSelectId}
                        selected={(() => {
                            if (childOfSelectedOptionIsArray && selectedOption[0] === id) return selectedOption[1]
                        })()}
                        onSelect={option => {
                            if (Date.now() > pauseClickTime.current) {
                                if (!defaultOption && setSelectedOption) setSelectedOption([id, option])
                                setDisableSelecting(true)
                                setTimeout(() => {
                                    dispatch('CLOASE_ALL_SELECT')
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
