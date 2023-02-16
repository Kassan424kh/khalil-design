import React, { useRef } from 'react'
import './styles.sass'
import Select from '../../select'

const SelectOption = ({
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
    const pauseClickTime = useRef(Date.now())
    const isSubmenu = Array.isArray(children) && children.length === 2

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
                    if (!multiSelect && !isSubmenu) {
                        setTimeout(() => {
                            setShowOptions(false)
                        }, 450)
                    }
                    pauseClickTime.current = Date.now() + 350
                }
            }}
        >
            <span className={'select-option-icon material-icons-outlined'}>arrow_right</span>
            <pre ref={textRef}>{isSubmenu ? children[0] : children}</pre>
            {isSubmenu && !multiSelect ? <span className={'select-option-icon submenu material-icons'}>checklist</span> : null}
        </div>
    )

    return (
        isSubmenu && !multiSelect ? <Select className={"submenu-selector"} options={children[1]} index={String(parseInt(selectOptionsIndex) + 1)} enableSearch>
            {selectOption}
        </Select> : selectOption
    )
}

export default SelectOption
