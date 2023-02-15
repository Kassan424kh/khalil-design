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
                    if (!multiSelect) {
                        setTimeout(() => {
                            //setShowOptions(false)
                        }, 450)
                    }
                    pauseClickTime.current = Date.now() + 350
                }
            }}
        >
            <span className={'select-option-icon material-icons-outlined'}>arrow_right</span>
            <pre ref={textRef}>{children}</pre>
        </div>
    )

    return (
        <Select className={"submenu-selector"} options={[1, 2, 3]} index={String(parseInt(selectOptionsIndex) + 1)}>
            {selectOption}
        </Select>
    )
}

export default SelectOption
