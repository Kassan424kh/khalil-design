import React, { memo, useEffect, useRef, useState } from "react";
import SelectOptionsDataTransmitter from "./select-options/_selectOptionsDataTransmitter";
import "./styles.sass";
import $ from "jquery";
import { useContainerDimensions } from "../../services/useContainerDimensions";
import { v4 as uuidv4 } from "uuid";
import { useClickOutside } from "../../services/useClickOutside";
import _ from "underscore";
import { useStore } from "../../hooks-store/store";

const Select = ({
  className,
  getSelectId,
  open,
  close,
  multiSelect,
  defaultAllSelected,
  options,
  additionalFilterInformation,
  updatePosition,
  onActive,
  onSelect,
  selected,
  clearAllOptions,
  toggleAllOptions,
  selectAllOptions,
  enableSelectedStatusDot,
  showSelectedParallel,
  selectOptionsClassName,
  headerText,
  enableSearch,
  filterOnly,
  searchPlaceHolder,
  enableSelectAllButton,
  enableCloseButton,
  closeButtonText,
  top,
  bottom,
  left,
  right,
  searchEveryWare,
  defaultOption,
  defaultOptionText,
  sort,
  children,
  ...props
}) => {
  const selectId = useState(uuidv4())[0];

  // hook store
  const state = useStore()[0];
  const dispatch = useStore(false)[1];

  // useState variables
  const [_options, _setOptions] = useState([]);
  const [click, setClick] = useState();
  const [hover, setHover] = useState();
  const [showOptions, setShowOptions] = useState(false);

  // get select component id from outside
  useEffect(() => {
    if (getSelectId) getSelectId(selectId);
  }, []);

  // open selectOptions window
  useEffect(() => {
    if (open) {
      setClick(Date.now());
      setHover(Date.now());
      setShowOptions(true);
    }
  }, [open]);

  // close selectOptions window
  useEffect(() => {
    if (close) {
      dispatch("UPDATE_DATA", {
        show: false,
        lastUpdate: Date.now()
      });
      setShowOptions(false);
    }
  }, [close]);

  // close selectOptions window
  // if the id of now clicked select component
  // is not the same like the id of this component
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
    multiSelect && defaultAllSelected
      ? Object.entries(_options).map((option) => [option[0], option[1]])
      : []
  );
  const [selectMouseEnter, setSelectMouseEnter] = useState(false);
  const selectButtonProperties = useContainerDimensions({
    ref: myRef,
    id: 0,
    update: [updatePosition, selectMouseEnter]
  });

  // set options locally
  useEffect(() => {
    _setOptions((_currentOptions) => {
      if (options && !_.isEqual(options, _currentOptions)) return options;
      return _currentOptions;
    });
  }, [options]);

  // get status of showOptions from outside using onActive attribute
  const showSelectOptionsRef = useRef();
  useEffect(() => {
    if (onActive) onActive(showOptions);
    showSelectOptionsRef.current = showOptions;
  }, [showOptions]);

  // set selectOption/s if the selected attribute was updated
  useEffect(() => {
    setSelectedOption((_currentSelectedOption) => {
      if (selected && !_.isEqual(_currentSelectedOption, selected)) {
        setLastTimeUpdatedSelectedOptions(Date.now());
        return selected;
      }
      return _currentSelectedOption;
    });
  }, [selected]);

  // clear all selected options from outside
  let firstLoading2 = useRef(true);
  useEffect(() => {
    if (!firstLoading2.current) {
      setSelectedOption([]);
    } else firstLoading2.current = false;
  }, [clearAllOptions]);

  // toggle all options from outside
  let firstLoading3 = useRef(true);
  useEffect(() => {
    if (!firstLoading3.current && multiSelect) {
      setSelectedOption(
        selectedOption.length === Object.entries(options).length
          ? []
          : Object.entries(options).map((option) => [option[0], option[1]])
      );
    }
    if (firstLoading3.current) firstLoading3.current = false;
  }, [toggleAllOptions]);

  // select all options from outside
  let firstLoading4 = useRef(true);
  useEffect(() => {
    if (!firstLoading4.current && multiSelect) {
      setSelectedOption(
        Object.entries(options).map((option) => [option[0], option[1]])
      );
    }
    if (firstLoading4.current) firstLoading4.current = false;
  }, [selectAllOptions]);

  // close selectOptions if clicked outside this select component
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

  // close selectOptions from outside using store state data
  useEffect(() => {
    if (!state.selectOptions.show) setShowOptions(false);
  }, [state.selectOptions.show]);

  const hoverTimeout = useRef();
  const [updateOptionsProperties, setUpdateOptionsProperties] = useState(1);
  return (
    <div
      {...props}
      ref={(ele) => (myRef.current[0] = ele)}
      id={selectId}
      className={`select disable-selecting ${className ? className : ""} ${
        showOptions ? " active" : ""
      } ${
        selectedOption.length && enableSelectedStatusDot
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
        {children}{" "}
      </div>
      {click ? (
        <SelectOptionsDataTransmitter
          selectId={selectId}
          showSelectedParallel={showSelectedParallel && multiSelect}
          selectMouseEnter={hover}
          clicked={click}
          className={selectOptionsClassName}
          headerText={headerText}
          enableSearch={enableSearch}
          filterOnly={filterOnly}
          searchPlaceHolder={searchPlaceHolder}
          enableSelectAllButton={enableSelectAllButton}
          enableCloseButton={enableCloseButton}
          closeButtonText={closeButtonText}
          selectButtonProperties={selectButtonProperties}
          show={showOptions && !close}
          setShow={setShowOptions}
          top={top}
          bottom={bottom}
          left={left}
          right={right}
          updateOptionsProperties={updateOptionsProperties}
          options={_options}
          additionalFilterInformation={additionalFilterInformation}
          multiSelect={multiSelect}
          selectedOption={selectedOption}
          setSelectedOption={(_so) => {
            setSelectedOption(_so);
            if (onSelect) onSelect(_so);
          }}
          searchEveryWare={searchEveryWare}
          lastTimeUpdatedSelectedOptions={lastTimeUpdatedSelectedOptions}
          defaultOption={defaultOption}
          defaultOptionText={defaultOptionText}
          updatePosition={updatePosition}
          clearSelectedOptions={""}
          sort={sort}
        />
      ) : null}
    </div>
  );
};

export default Select;
