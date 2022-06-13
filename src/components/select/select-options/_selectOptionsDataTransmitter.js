import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../hooks-store/store";

const SelectOptionsDataTransmitter = ({
    show,
    top,
    bottom,
    left,
    right,
    selectId,
    showSelectedParallel,
    className,
    headerText,
    enableSearch,
    filterOnly,
    searchPlaceHolder,
    enableSelectAllButton,
    enableCloseButton,
    closeButtonText,
    setShow,
    options,
    multiSelect,
    selectedOption,
    setSelectedOption,
    lastTimeUpdatedSelectedOptions,
    defaultOption,
    defaultOptionText,
    clearSelectedOptions,
    clicked,
    sort,
    selectButtonProperties,
    updatePosition,
    selectMouseEnter,
    updateOptionsProperties
}) => {
    const [disableSelecting, setDisableSelecting] = useState(false);
    const dispatch = useStore(false)[1];
    const [openDirections, setOpenDirections] = useState({
        top: top !== undefined ? top : true,
        bottom: bottom !== undefined ? bottom : true,
        left: left !== undefined ? left : !right,
        right: right !== undefined ? right : !left
    });

    useEffect(() => {
        const newOpenDirections = {
            top: top !== undefined ? top : true,
            bottom: bottom !== undefined ? bottom : true,
            left: left !== undefined ? left : !right,
            right: right !== undefined ? right : !left
        };
        setOpenDirections({ ...newOpenDirections });
    }, [top, bottom, left, right]);

    useEffect(() => {
        dispatch("UPDATE_DATA", {
            selectId: selectId,
            showSelectedParallel: showSelectedParallel,
            className: className,
            headerText: headerText,
            enableSearch: enableSearch,
            filterOnly: filterOnly,
            searchPlaceHolder: searchPlaceHolder,
            enableSelectAllButton: enableSelectAllButton,
            enableCloseButton: enableCloseButton,
            closeButtonText: closeButtonText,
            setShow: setShow,
            openDirections: openDirections,
            options: options,
            multiSelect: multiSelect,
            selectedOption: selectedOption,
            setSelectedOption: setSelectedOption,
            defaultOption: defaultOption,
            defaultOptionText: defaultOptionText,
            clearSelectedOptions: clearSelectedOptions,
            disableSelecting: disableSelecting,
            setDisableSelecting: setDisableSelecting,
            lastUpdate: clicked,
            sort: sort
        });
    }, [
        selectId,
        selectedOption,
        lastTimeUpdatedSelectedOptions,
        options,
        clearSelectedOptions,
        disableSelecting,
        openDirections,
        clicked,
        showSelectedParallel
    ]);

    const showTimeout = useRef();
    useEffect(() => {
        clearTimeout(showTimeout.current);

        showTimeout.current = setTimeout(() => {
            dispatch("UPDATE_DATA", {
                show: show,
                lastUpdate: clicked
            });
        }, 150);

        return () => clearTimeout(showTimeout.current);
    }, [show, clicked]);

    useEffect(() => {
        dispatch("UPDATE_DATA", {
            selectButtonProperties: selectButtonProperties,
            lastUpdate: selectMouseEnter
        });
    }, [
        selectButtonProperties,
        clicked,
        updatePosition,
        selectMouseEnter,
        updateOptionsProperties
    ]);

    return <></>;
};

export default SelectOptionsDataTransmitter;
