import $ from 'jquery'
import { useEffect, useRef, useState } from 'react'

export const useKeyboardShortcut = (callback, keyboardKeys) => {
    const body = $('body')[0]
    const [pressTimes, setPressTimes] = useState(0)
    const pauseClickRef = useRef()
    useEffect(() => {
        if (pauseClickRef.current) {
            if (Date.now() > pauseClickRef.current) {
                callback()
                pauseClickRef.current = Date.now() + 10
            }
        } else pauseClickRef.current = Date.now()
    }, [pressTimes])

    useEffect(() => {
        body.addEventListener('keydown', e => {
            const { key: code, ctrlKey, keyCode, shiftKey, altKey } = e
            const withCtrl = keyboardKeys.includes('ctrl') ? ctrlKey : !ctrlKey
            const withShift = keyboardKeys.includes('shift') ? shiftKey : !shiftKey
            const withAlt = keyboardKeys.includes('alt') ? altKey : !altKey

            let _restKey = keyboardKeys.filter(key => !['ctrl', 'shift', 'alt'].includes(key))[0]

            _restKey = _restKey === 'Delete' ? keyCode === 46 : _restKey.toUpperCase() === code.toUpperCase()

            if (withCtrl && withShift && withAlt && _restKey) setPressTimes(c => c + 1)
        })
        return () => body.removeEventListener('keydown', null)
    }, [])
}
