import $ from 'jquery'

export const componentsVisibleInView = (refParentElement, refChildes, cacheExtent, callback) => {
    const $scrollList = $(refParentElement.current)

    if ($scrollList) {
        const scrollListHeightOffset = $scrollList.offset()
        if (scrollListHeightOffset) {
            const idsListOfVisibleListTiles = []
            const scrollListTop = scrollListHeightOffset.top
            const scrollListHeight = $scrollList[0].offsetHeight
            const scrollListBottom = scrollListTop + scrollListHeight

            const arrayOfChilds = Object.entries(refChildes.current)
            if (arrayOfChilds.length) {
                arrayOfChilds.map(([id, childRef]) => {
                    const $child = $(childRef)
                    const childOffset = $child.offset()
                    if (childOffset) {
                        const childTop = childOffset.top
                        const childHeight = $child[0].offsetHeight
                        const childBottom = childTop + childHeight
                        if (childTop >= scrollListTop - cacheExtent && childBottom <= scrollListBottom + cacheExtent) {
                            idsListOfVisibleListTiles.push(id)
                        }
                    }
                })
                callback(idsListOfVisibleListTiles)
            }
        }
    }
}

export const isScrolledIntoView = (refParentElement, refChildes, cacheExtent, callback) => {
    const $scrollList = $(refParentElement.current)

    if ($scrollList) {
        const scrollListHeightOffset = $scrollList.offset()
        if (scrollListHeightOffset) {
            $scrollList.bind('scroll', e => {
                clearTimeout($.data(e.target, 'scrollTimer'))
                $.data(
                    e.target,
                    'scrollTimer',
                    setTimeout(function () {
                        const idsListOfVisibleListTiles = []
                        const scrollListTop = scrollListHeightOffset.top
                        const scrollListHeight = $scrollList[0].offsetHeight
                        const scrollListBottom = scrollListTop + scrollListHeight

                        const arrayOfChilds = Object.entries(refChildes.current)
                        if (arrayOfChilds.length) {
                            arrayOfChilds.map(([id, childRef]) => {
                                const $child = $(childRef)
                                const childOffset = $child.offset()
                                if (childOffset) {
                                    const childTop = childOffset.top

                                    const childHeight = $child[0].offsetHeight
                                    const childBottom = childTop + childHeight
                                    if (
                                        childTop >= scrollListTop - cacheExtent &&
                                        childBottom <= scrollListBottom + cacheExtent
                                    ) {
                                        idsListOfVisibleListTiles.push(id)
                                    }
                                }
                            })
                            callback(idsListOfVisibleListTiles)
                        }
                    }, 550)
                )
            })
        }
    }
}
