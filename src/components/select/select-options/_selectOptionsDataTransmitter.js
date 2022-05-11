import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../hooks-store/store";

const SelectOptionsDataTransmitter = (props) => {
    const [disableSelecting, setDisableSelecting] = useState(false);
    const dispatch = useStore(false)[1];
    const [openDirections, setOpenDirections] = useState({
        top: props.top !== undefined ? props.top : true,
        bottom: props.bottom !== undefined ? props.bottom : true,
        left: props.left !== undefined ? props.left : !props.right,
        right: props.right !== undefined ? props.right : !props.left
    });

    useEffect(() => {
        const newOpenDirections = {
            top: props.top !== undefined ? props.top : true,
            bottom: props.bottom !== undefined ? props.bottom : true,
            left: props.left !== undefined ? props.left : !props.right,
            right: props.right !== undefined ? props.right : !props.left
        };
        setOpenDirections({ ...newOpenDirections });
    }, [props.top, props.bottom, props.left, props.right]);

    useEffect(() => {
        dispatch("UPDATE_DATA", {
            selectId: props.selectId,
            showSelectedParallel: props.showSelectedParallel,
            className: props.className,
            headerText: props.headerText,
            enableSearch: props.enableSearch,
            searchPlaceHolder: props.searchPlaceHolder,
            enableSelectAllButton: props.enableSelectAllButton,
            enableCloseButton: props.enableCloseButton,
            closeButtonText: props.closeButtonText,
            setShow: props.setShow,
            openDirections: openDirections,
            options: props.options,
            multiSelect: props.multiSelect,
            selectedOption: props.selectedOption,
            setSelectedOption: props.setSelectedOption,
            defaultOption: props.defaultOption,
            defaultOptionText: props.defaultOptionText,
            clearSelectedOptions: props.clearSelectedOptions,
            disableSelecting: disableSelecting,
            setDisableSelecting: setDisableSelecting,
            lastUpdate: props.clicked,
            sort: props.sort
        });
    }, [
        props.selectId,
        props.selectedOption,
        props.lastTimeUpdatedSelectedOptions,
        props.options,
        props.clearSelectedOptions,
        props.disableSelecting,
        openDirections,
        props.clicked,
        props.showSelectedParallel
    ]);

    const showTimeout = useRef();
    useEffect(() => {
        clearTimeout(showTimeout.current);

        showTimeout.current = setTimeout(() => {
            dispatch("UPDATE_DATA", {
                show: props.show,
                lastUpdate: props.clicked
            });
        }, 150);

        return () => clearTimeout(showTimeout.current);
    }, [props.show, props.clicked]);

    useEffect(() => {
        dispatch("UPDATE_DATA", {
            selectButtonProperties: props.selectButtonProperties,
            lastUpdate: props.selectMouseEnter
        });
    }, [
        props.selectButtonProperties,
        props.clicked,
        props.updatePosition,
        props.selectMouseEnter,
        props.updateOptionsProperties
    ]);

    return <></>;
};

export default SelectOptionsDataTransmitter;
