import {useRef, useEffect} from "react";

export const useClickOutside = (ref, callback) => {
    const callbackRef = useRef()
    callbackRef.current = callback

    useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                callbackRef.current(e)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callbackRef, ref]);
}