import React, { memo, useEffect, useRef, useState } from "react";
import SelectOptionsDataTransmitter from "./select-options/_selectOptionsDataTransmitter";
import "./styles.sass";
import $ from "jquery";
import { useContainerDimensions } from "../../services/useContainerDimensions";
import { v4 as uuidv4 } from "uuid";
import { useClickOutside } from "../../services/useClickOutside";
import _ from "underscore";
import { useStore } from "../../hooks-store/store";

const Select = (props) => {
    const [options, setOptions] = useState([]);
    const selectId = useState(uuidv4())[0];
    const [click, setClick] = useState();
    const [hover, setHover] = useState();
    const [showOptions, setShowOptions] = useState(false);
    const state = useStore()[0];
    const dispatch = useStore(false)[1];

    useEffect(() => {
        if (props.getSelectId) props.getSelectId(selectId);
    }, []);

    useEffect(() => {
        if (props.open) {
            setClick(Date.now());
            setHover(Date.now());
            setShowOptions(true);
        }
    }, [props.open]);

    const closeSelectOptions = () => {
        dispatch("UPDATE_DATA", {
            show: false,
            lastUpdate: Date.now()
        });
    };

    useEffect(() => {
        if (props.close) {
            closeSelectOptions();
            setShowOptions(false);
        }
    }, [props.close]);

    useEffect(() => {
        if (state.selectOptions.selectId !== selectId) {
            setClick();
            setShowOptions(false);
        }
    }, [state.selectOptions.selectId]);

    const [
        lastTimeUpdatedSelectedOptions,
        setLastTimeUpdatedSelectedOptions
    ] = useState();
    const myRef = useRef([]);
    const [selectedOption, setSelectedOption] = useState(
        props.multiSelect && props.defaultAllSelected
            ? Object.entries(props.options).map((option) => [
                  option[0],
                  option[1]
              ])
            : []
    );
    const [selectMouseEnter, setSelectMouseEnter] = useState(false);
    const selectButtonProperties = useContainerDimensions({
        ref: myRef,
        id: 0,
        update: [props.updatePosition, selectMouseEnter]
    });

    useEffect(() => {
        if (JSON.stringify(props.options) !== JSON.stringify(options))
            setOptions(props.options);
    }, [props.options]);

    useEffect(() => {
        if (props.onActive) props.onActive(showOptions);
    }, [showOptions]);

    useEffect(() => {
        if (props.onSelect) props.onSelect(selectedOption);
        setLastTimeUpdatedSelectedOptions(Date.now());
    }, [selectedOption]);

    const oldSelected = useRef([]);
    useEffect(() => {
        if (props.selected && !_.isEqual(oldSelected.current, props.selected)) {
            setSelectedOption(props.selected);
            oldSelected.current = props.selected;
        }
    }, [props.selected]);

    let firstLoading2 = useRef(true);
    useEffect(() => {
        if (!firstLoading2.current) {
            setSelectedOption([]);
        }
        if (firstLoading2.current) firstLoading2.current = false;
    }, [props.clearAllOptions]);

    let firstLoading3 = useRef(true);
    useEffect(() => {
        if (!firstLoading3.current && props.multiSelect) {
            setSelectedOption(
                selectedOption.length === Object.entries(props.options).length
                    ? []
                    : Object.entries(props.options).map((option) => [
                          option[0],
                          option[1]
                      ])
            );
        }
        if (firstLoading3.current) firstLoading3.current = false;
    }, [props.toggleAllOptions]);

    let firstLoading4 = useRef(true);
    useEffect(() => {
        if (!firstLoading4.current && props.multiSelect) {
            setSelectedOption(
                Object.entries(props.options).map((option) => [
                    option[0],
                    option[1]
                ])
            );
        }
        if (firstLoading4.current) firstLoading4.current = false;
    }, [props.selectAllOptions]);

    useClickOutside({ current: myRef.current[0] }, (e) => {
        const $selectOptions = $(".select-options");

        // if the target of the click isn't the container nor a descendant of the container
        if (
            !$selectOptions.is(e.target) &&
            $selectOptions.has(e.target).length === 0
        ) {
            setShowOptions(false);
        }
    });

    useEffect(() => {
        if (!state.selectOptions.show) setShowOptions(false);
    }, [state.selectOptions.show]);

    useEffect(() => {
        // close selectOption if select component is unmount
        closeSelectOptions();
    }, []);

    const hoverTimeout = useRef();
    const [updateOptionsProperties, setUpdateOptionsProperties] = useState(1);
    return (
        <div
            ref={(ele) => (myRef.current[0] = ele)}
            id={selectId}
            className={`select disable-selecting ${
                props.className ? props.className : ""
            } ${showOptions ? " active" : ""} ${
                selectedOption.length && props.enableSelectedStatusDot
                    ? "options-selected"
                    : ""
            }`}
            onMouseEnter={(e) => {
                setSelectMouseEnter(true);
                setHover(Date.now());
            }}
            onMouseMove={(e) => {
                setSelectMouseEnter(true);

                clearTimeout(hoverTimeout.current);
                hoverTimeout.current = setTimeout(() => {
                    setHover(Date.now());
                }, 350);
            }}
            onMouseLeave={(e) => {
                setSelectMouseEnter(false);
            }}
            onClick={(e) => {
                setHover(Date.now());
            }}
            onMouseDown={(e) => {
                setClick(Date.now());
            }}
            onMouseUp={(e) => {
                setClick(Date.now());
            }}
        >
            <div
                ref={(ele) => (myRef.current[1] = ele)}
                onClick={() => {
                    setShowOptions(!showOptions);
                    setTimeout(() => {
                        setUpdateOptionsProperties(updateOptionsProperties + 1);
                    }, 150);
                }}
            >
                {props.children}{" "}
            </div>
            {click ? (
                <SelectOptionsDataTransmitter
                    selectId={selectId}
                    showSelectedParallel={
                        props.showSelectedParallel && props.multiSelect
                    }
                    selectMouseEnter={hover}
                    clicked={click}
                    className={props.selectOptionsClassName}
                    headerText={props.headerText}
                    enableSearch={props.enableSearch}
                    searchPlaceHolder={props.searchPlaceHolder}
                    enableSelectAllButton={props.enableSelectAllButton}
                    enableCloseButton={props.enableCloseButton}
                    closeButtonText={props.closeButtonText}
                    selectButtonProperties={selectButtonProperties}
                    show={showOptions && !props.close}
                    setShow={setShowOptions}
                    top={props.top}
                    bottom={props.bottom}
                    left={props.left}
                    right={props.right}
                    updateOptionsProperties={updateOptionsProperties}
                    options={options}
                    multiSelect={props.multiSelect}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    searchEveryWare={props.searchEveryWare}
                    lastTimeUpdatedSelectedOptions={
                        lastTimeUpdatedSelectedOptions
                    }
                    defaultOption={props.defaultOption}
                    defaultOptionText={props.defaultOptionText}
                    updatePosition={props.updatePosition}
                    clearSelectedOptions={""}
                    sort={props.sort}
                />
            ) : null}
        </div>
    );
};

export default memo(Select);
