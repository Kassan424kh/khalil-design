import React, { useEffect, useRef, forwardRef } from 'react'
import './styles.sass'
import Select from '../../select'
import { useStore } from '../../../../hooks-store/store'

const SelectOption = forwardRef(({
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
    parentSelectId
}, ref) => {

    const [_, dispatch] = useStore()

    const pauseClickTime = useRef(Date.now())
    const isOptionSubmenu = Array.isArray(children) && children.length === 2

    const selectOption = (
        <div
            ref={ref}
            className={`select-option${hide ? ' hide-option' : ''}${defaultOption ? ' default-option' : ''}${hide ? ' hide-option' : ''}${selectedOption &&
                (() => {
                    if (selectedOption.length)
                        return multiSelect
                            ? (() => {
                                const foundSelectedOption = selectedOption.filter(option => {
                                    return option[0] === id
                                })[0]
                                return foundSelectedOption ? foundSelectedOption[0] === id : false
                            })()
                            : selectedOption[0] === id
                    else return false
                })() &&
                !defaultOption
                ? ' selected'
                : ''
                }`
            }
            onClick={() => {
                if (Date.now() > pauseClickTime.current) {
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
                        console.log(20989074)
                        setTimeout(() => {
                            dispatch("CLOASE_ALL_SELECT_OPTIONS")
                        }, 450)
                    }
                    pauseClickTime.current = Date.now() + 350
                }
            }}
        >
            <div className={"option-content"}>
                <span className={'select-option-icon material-symbols-outlined'}>arrow_right</span>
                <pre className={"option-text"}>{isOptionSubmenu ? children[0] : children}</pre>
                {isOptionSubmenu && !multiSelect ? <span className={'select-option-icon submenu material-symbols-outlined'}>list</span> : null}
            </div>
        </div>
    )

    return (
        <div
            className={`select-option-container`}
            style={{ top: top }}

        >
            {isOptionSubmenu && !multiSelect ? (
                <Select
                    className={"submenu-selector"}
                    options={children[1]}
                    index={String(parseInt(selectOptionsIndex) + 1)}
                    enableSearch
                    mainSelectId={mainSelectId}
                    parentSelectId={parentSelectId}
                >
                    {selectOption}
                </Select>
            ) : selectOption}
        </div>
    )
})

export default SelectOption
