import {useRef, useEffect} from 'react'

export const useClickOutside = (ref, callback, deps = []) => {

    const callbackRef = useRef(callback)
    useEffect(() => {
        if (ref) {
            let unmountFunction
            const handleClickOutside = e => {
                if (ref.current && !ref.current.contains(e.target)) {
                    unmountFunction = callbackRef.current(e)
                }
            }

            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside)
                if (typeof unmountFunction === 'function') unmountFunction()
            }
        }
    }, [callbackRef, ref, ...deps])
}
