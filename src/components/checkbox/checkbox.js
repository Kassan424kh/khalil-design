import React, { useState } from 'react'
import './styles.sass'

const Checkbox = ({
    checked,
    indeterminate = false,
    className,
    primary,
    disabled,
    children,
    onCheck,
    left,
    right,
    ...props
}) => {
    const [_checked, _isChecked] = useState(checked ?? false)

    return (
        <div
            {...props}
            className={`checkbox disable-selecting ${className ?? ''}${primary ? ' primary' : ''}${
                disabled ? ' disabled' : ''
            }`}
            onClick={() => {
                if (onCheck) onCheck(!checked)
                _isChecked(!_checked)
            }}
        >
            {right && !left ? <div className={'children right'}>{children}</div> : null}
            <span
                className={`checkbox-icon${
                    checked ? (!disabled ? ' checked' : '') : _checked && !disabled ? ' checked' : ''
                } ${indeterminate ? ' indeterminate' : ''}`}
            >
                <span className={'material-icons-outlined'}>{indeterminate ? 'remove' : 'check'}</span>
            </span>
            {left || (!left && !right) ? <div className={'children left'}>{children}</div> : null}
        </div>
    )
}

export default Checkbox
