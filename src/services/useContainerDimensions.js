import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import $ from 'jquery'

export const getDimensions = ({ id = undefined, ref }) => {
    const $window = $(window)
    const scrollLeft = $window.scrollLeft()
    const scrollTop = $window.scrollTop()
    const windowHeight = $window.height()
    const windowWidth = $window.width()

    const $element = $(id ? ref.current[id] : ref.current)
    const offset = $element[0]?.getBoundingClientRect()

    const left = offset ? offset.left - scrollLeft : 0,
        right = offset ? offset.right - scrollLeft : 0,
        top = offset ? offset.top - scrollTop : 0,
        bottom = offset ? offset.bottom - scrollTop : 0,
        width = $element.outerWidth(),
        height = $element.outerHeight()
    //
    const leftHidden = left < 0,
        rightHidden = left + width > windowWidth,
        topHidden = top < 0,
        bottomHidden = top + height > windowHeight

    return {
        width: width,
        height: height,
        left: Math.round(left),
        top: Math.round(top),
        bottom: Math.round(bottom),
        right: Math.round(right),
        leftHidden: leftHidden,
        rightHidden: rightHidden,
        topHidden: topHidden,
        bottomHidden: bottomHidden,
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        offset: offset
    }
}

// Calculate Element width and hight using useRef and jQuery
export const useContainerDimensions = ({
    ref = { current: undefined },
    id = undefined,
    duration = 0,
    withoutResize = false,
    withoutScroll = false,
    update = []
}) => {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        //
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //
        leftHidden: false,
        rightHidden: false,
        topHidden: false,
        bottomHidden: false,
        offset: undefined
    })

    const [uT, setUT] = useState(5)

    const timeout = useRef()

    useLayoutEffect(() => {
        const $window = $(window)
        const $document = $(document)

        const handleResize = () => {
            clearTimeout(timeout.current)
            timeout.current = setTimeout(() => {
                if (ref.current) {
                    setDimensions(getDimensions({ id, ref }))
                }
            }, duration)
        }

        if (!withoutResize) {
            $window.off('resize', handleResize)
        }
        if (!withoutScroll) {
            $document.off('mousewheel  scroll', handleResize)
        }

        if (!withoutResize) {
            $window.on('resize', handleResize)
        }
        if (!withoutScroll) {
            $document.on('mousewheel scroll', handleResize)
        }
        return () => {
            if (!withoutResize) {
                $window.off('resize', handleResize)
            }
            if (!withoutScroll) {
                $document.off('mousewheel  scroll', handleResize)
            }
            clearTimeout(timeout.current)
        }
    }, [ref.current ?? undefined])

    useEffect(() => {
        setUT(2)
    }, update ?? [])

    useEffect(() => {
        if (uT < 1) {
            return
        }

        if (ref.current) {
            setDimensions(getDimensions({ id, ref }))
        }

        setUT(uT - 1)
    }, [uT])

    return dimensions
}
