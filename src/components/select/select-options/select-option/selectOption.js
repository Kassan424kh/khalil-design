import React, { useRef } from 'react'
import './styles.sass'
import Select from '../../select'
import { useStore } from '../../../../hooks-store/store'

const SelectOption = ({
    options,
    id,
    defaultOption,
    hide,
    selectedOption,
    multiSelect,
    setSelectedOption,
    children,
    setDisableSelecting,
    setShowOptions,
    textRef,
    selectOptionsIndex
}) => {

    const [state, dispatch] = useStore()

    const pauseClickTime = useRef(Date.now())
    const selectOptionsIncludeSubmenuOption = Object.values(options).filter(o => Array.isArray(o) && o.length === 2).length
    const isOptionSubmenu = Array.isArray(children) && children.length === 2


    const selectOption = (
        <div
            className={`select-option${defaultOption ? ' default-option' : ''}${hide ? ' hide-option' : ''}${
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
                            : selectedOption[0] === id
                    else return false
                })() &&
                !defaultOption
                    ? ' selected'
                    : ''
            }`}
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
            <span className={'select-option-icon material-symbols-outlined'}>arrow_right</span>
            <pre ref={textRef}>{isOptionSubmenu ? children[0] : children}</pre>
            {isOptionSubmenu && !multiSelect ? <span className={'select-option-icon submenu material-symbols-outlined'}>list</span> : null}
        </div>
    )

    return (
        isOptionSubmenu && !multiSelect ? (
            <Select 
                className={"submenu-selector"} 
                options={children[1]} 
                index={String(parseInt(selectOptionsIndex) + 1)} 
                enableSearch
            >
                {selectOption}
            </Select>
        ) : selectOption
    )
}

export default SelectOption
