import React from 'react'
import './styles.sass'

const Button = ({
    primary,
    outlined,
    text,
    disabled,
    withShadow,
    loading,
    green,
    grey,
    red,
    blue,
    yellow,
    className,
    children,
    leftIcon,
    rightIcon,
    onClick,
    ...props
}) => {
    return (
        <div
            {...props}
            className={`tv-tool-button disable-selecting${(() => {
                let _classes = ''
                if (primary) _classes += ' primary'
                if (outlined) _classes += ' outlined'
                if (disabled) _classes += ' disabled'
                if (withShadow) _classes += ' with-shadow'
                if (loading) _classes += ' loading'
                if (text) _classes += ' text'
                if (!children && (leftIcon || rightIcon)) _classes += ' icon-button'
                // colors
                if (green) _classes += ' green'
                else if (grey) _classes += ' grey'
                else if (red) _classes += ' red'
                else if (blue) _classes += ' blue'
                else if (yellow) _classes += ' yellow'

                if (className) _classes += ` ${className}`
                return _classes
            })()}`}
            style={{
                padding: text
                    ? `0 ${rightIcon ? '8px' : '0'} 0 ${leftIcon ? '8px' : '0'}`
                    : `${children && (leftIcon || rightIcon) ? '10px' : '15px'} ${
                          children && rightIcon ? '20px' : '15px'
                      } ${children && (leftIcon || rightIcon) ? '10px' : '15px'} ${
                          children && leftIcon ? '20px' : '15px'
                      }`
            }}
            onClick={!disabled && !loading ? onClick : null}
        >
            {leftIcon ? <span className="button-icon left material-symbols-outlined">{leftIcon}</span> : null}
            {children ? (
                <div
                    className={'button-content'}
                    style={{
                        padding: `0 ${rightIcon ? (text ? '15px' : '20px') : '0'} 0 ${
                            leftIcon ? (text ? '15px' : '20px') : '0'
                        }`
                    }}
                >
                    {children}
                </div>
            ) : null}
            {rightIcon ? <span className="button-icon right material-symbols-outlined">{rightIcon}</span> : null}
            {loading ? <div className="loading-effect" /> : null}
        </div>
    )
}

export default Button
