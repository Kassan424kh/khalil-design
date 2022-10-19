import React, { useCallback, useEffect, useRef, useState } from "react";
import { defaultSelectOptionsData } from "../../../hooks-store/configs/selectOptionsHooksStore";
import { useStore } from "../../../hooks-store/store";
import { useContainerDimensions } from "../../../services/useContainerDimensions";
import Button from "../../button/button";
import TextField from "../../textfield/textfield";
import SelectOption from "./select-option/selectOption";
import "./styles.sass";
import { useClickOutside } from "../../../services/useClickOutside";
import $ from "jquery";
import _ from "underscore";

const SelectOptions = () => {
  const state = useStore()[0];
  const [selectOptionsData, setSelectOptionsData] = useState(
    defaultSelectOptionsData.selectOptions
  );
  const dispatch = useStore(false)[1];

  const closeSelectOptions = () => {
    dispatch("UPDATE_DATA", {
      show: false,
      lastUpdate: Date.now()
    });
  };

  const [allOptionsWasSelected, setAllOptionsWasSelected] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectButtonProperties, setSelectButtonProperties] = useState(
    defaultSelectOptionsData.selectOptions.selectButtonProperties
  );

  const [maxOptionTextWidth, setMaxOptionTextWidth] = useState(0);
  const optionTextRefs = useRef({});

  useEffect(() => {
    const t = setTimeout(() => {
      Object.entries(optionTextRefs.current).forEach(([key, value], index) => {
        setMaxOptionTextWidth((oldWidth) =>
          value && value.scrollWidth > oldWidth ? value.scrollWidth : oldWidth
        );
      });
    }, 10);
    return () => clearTimeout(t);
  }, [selectOptionsData.options]);

  useEffect(() => {
    setMaxOptionTextWidth(0);
    optionTextRefs.current = {};
  }, [selectOptionsData.options]);

  const [updateOffset, setUpdateOffset] = useState();
  const updateOffsetTimeout = useRef();
  useEffect(() => {
    clearTimeout(updateOffsetTimeout.current);

    updateOffsetTimeout.current = setTimeout(() => {
      setUpdateOffset(Date.now());
    }, 100);
    return () => clearTimeout(updateOffsetTimeout.current);
  }, [selectOptionsData.options]);

  const myRef = useRef();
  const optionsProperties = useContainerDimensions({
    ref: myRef,
    duration: 150,
    update: [selectOptionsData.options, maxOptionTextWidth, updateOffset]
  });

  useEffect(() => {
    setAllOptionsWasSelected(
      Object.entries(selectOptionsData.options).length ===
        selectOptionsData.length
    );
  }, [selectOptionsData, selectOptionsData.options]);

  useEffect(() => {
    setAllOptionsWasSelected(
      Object.entries(selectOptionsData.options ?? []).length ===
        (selectOptionsData.selectedOption ?? []).length
    );
  }, [
    selectOptionsData,
    selectOptionsData.selectedOption,
    selectOptionsData.options
  ]);

  const foundOptions = useCallback(
    (searchText, option, searchEveryWare = false) => {
      return !searchText
        .toUpperCase()
        .split(" ")
        .filter((word) => word)
        .some((r) => {
          const optionWasSelected = selectOptionsData.selectedOption.filter(
            (selectedOption) => selectedOption[0] === option[0]
          ).length;

          if (
            selectOptionsData.multiSelect &&
            selectOptionsData.showSelectedParallel &&
            selectOptionsData.filterOnly
          )
            if (
              (!optionWasSelected &&
                selectOptionsData.filterOnly === "selected") ||
              (optionWasSelected &&
                selectOptionsData.filterOnly === "unselected")
            )
              return true;

          // return true if there are matching parts in the publisher name which is passed as additional filter information
          if (
            state.selectOptions.additionalFilterInformation &&
            option[0] in state.selectOptions.additionalFilterInformation
          )
            if (
              state.selectOptions.additionalFilterInformation[option[0]]
                .toString()
                .toUpperCase()
                .split(" ")
                .filter((word) => {
                  if (searchEveryWare) {
                    const regex = new RegExp(r, "g");
                    return word && word.match(regex);
                  } else {
                    return word.startsWith(r) ? word : "";
                  }
                }).length
            )
              return true;

          // return true if there are matching parts of the media name
          return option[1]
            .toString()
            .toUpperCase()
            .split(" ")
            .filter((word) => {
              if (searchEveryWare) {
                const regex = new RegExp(r, "g");
                return word && word.match(regex);
              } else {
                return word.startsWith(r) ? word : "";
              }
            }).length;
        });
    },
    [selectOptionsData.selectedOption]
  );

  const stylePositionBetweenTopAndBottom = (
    topHiddenNummber,
    bottomHiddenNummber = 15,
    defaultNumber = 0,
    forEffects = false
  ) => {
    if (selectButtonProperties.offset) {
      const // directions
        directions = selectOptionsData.openDirections,
        directionTop = selectOptionsData.openDirections.top,
        directionBottom = selectOptionsData.openDirections.bottom,
        // window
        windowHeight = window.innerHeight,
        // select
        selectHeight = selectButtonProperties.height,
        selectTop = selectButtonProperties.offset.top,
        selectBottom = selectButtonProperties.offset.bottom,
        // selectOptions
        selectOptionsHeight = optionsProperties.height,
        selectOptionsTop = optionsProperties.top,
        selectOptionsBottom = optionsProperties.bottom;

      if ((directions && directionTop && directionBottom) || !directions) {
        if (
          // show on bottom if there is place in top and bottom
          selectTop - selectOptionsHeight > 0 &&
          selectBottom + selectOptionsHeight < windowHeight
        ) {
          return topHiddenNummber;
        } else if (
          // show on bottom the window if bottom of selectElement is smaller then top of window
          selectBottom - 15 <
          0
        ) {
          return forEffects ? topHiddenNummber : 15;
        } else if (
          // show on top the window if top of selectElement is bigger then bottom of window
          selectTop + 15 >
          windowHeight
        ) {
          return forEffects
            ? bottomHiddenNummber
            : windowHeight - selectOptionsHeight - 15;
        } else if (
          // show on bottom if there is no place on top only if there is place on bottom
          selectTop - selectOptionsHeight < 0 &&
          selectBottom + selectOptionsHeight < windowHeight
        ) {
          return topHiddenNummber;
        } else if (
          // show on top if there is no more place on bottom only if there is a place on top
          selectBottom - selectOptionsHeight < windowHeight &&
          selectTop - selectOptionsHeight > 0
        ) {
          return bottomHiddenNummber;
        } else {
          // otherwise show on top
          return topHiddenNummber;
        }
      } else if (directions && directionTop) {
        if (
          // show on top of screen if there is no place on top
          selectTop - selectOptionsHeight <
          0
        ) {
          return forEffects ? topHiddenNummber : 15;
        } else if (
          // show on bottom of screen if the top of selectElement bigger then the screen end
          selectTop + 15 >
          windowHeight
        ) {
          return forEffects
            ? bottomHiddenNummber
            : windowHeight - selectOptionsHeight - 15;
        } else {
          // otherwise show on top
          return bottomHiddenNummber;
        }
      } else if (
        (directions && directionBottom) ||
        (directions && !directionTop && !directionBottom)
      ) {
        if (
          // show on bottom of the screen if there is no place more on bottom
          selectBottom + selectOptionsHeight >
          windowHeight
        ) {
          return forEffects
            ? bottomHiddenNummber
            : windowHeight - selectOptionsHeight - 15;
        } else if (
          // show on top of the screen if the bottom of the selectElement smaller then the top of the screen
          selectBottom + 15 <
          0
        ) {
          return forEffects ? topHiddenNummber : 15;
        } else {
          // otherwise show on bottom
          return topHiddenNummber;
        }
      } else {
        return defaultNumber;
      }
    } else {
      return 0;
    }
  };

  const stylePositionBetweenRightAndLeft = (
    leftHiddenNummber,
    rightHiddenNummber = 15,
    centerPosition = null,
    forEffects = false
  ) => {
    if (selectButtonProperties.offset) {
      const // directions
        directions = selectOptionsData.openDirections,
        directionLeft = selectOptionsData.openDirections.left,
        directionRight = selectOptionsData.openDirections.right,
        // window
        windowWidth = window.innerWidth,
        // select
        selectWidth = selectButtonProperties.width,
        selectLeft = selectButtonProperties.offset.left,
        selectRight = selectButtonProperties.offset.right,
        // selectOptions
        selectOptionsWidth = optionsProperties.width,
        selectOptionsLeft = optionsProperties.left,
        selectOptionsRight = optionsProperties.right;

      if (
        // can in center Position full show then show it in center of the element
        (directions && directionLeft && directionRight) ||
        !directions
      ) {
        if (
          selectLeft + selectWidth / 2 - selectOptionsWidth / 2 > 0 &&
          selectRight - selectWidth / 2 + selectOptionsWidth / 2 < windowWidth
        ) {
          return centerPosition;
        } else if (
          // show selectOptions on left of the window if the right of the selectElement is too much scrolled to left
          selectRight < 0
        ) {
          return forEffects ? leftHiddenNummber : 15;
        } else if (
          // show selectOptions on right of the window if the left of the selectElement is too much scrolled to right
          selectLeft > windowWidth
        ) {
          return forEffects
            ? rightHiddenNummber
            : windowWidth - selectOptionsWidth - 15;
        } else if (
          // show selectOptions on right of selectElement if there is no place in the left Position
          selectLeft - selectOptionsWidth < 0 &&
          selectRight + selectOptionsWidth < windowWidth
        ) {
          return leftHiddenNummber;
        } else if (
          // show selectOptions on left of selectElement if there is no place in the right Position
          selectRight + selectOptionsWidth > windowWidth &&
          selectLeft - selectOptionsWidth > 0
        ) {
          return rightHiddenNummber;
        } else if (
          // show on left of screen if there is no place more
          selectLeft + selectWidth / 2 - selectOptionsWidth / 2 <
          0
        ) {
          return forEffects ? leftHiddenNummber : 15;
        } else if (
          // show on right of screen if there is no place more
          selectRight - selectWidth / 2 + selectOptionsWidth / 2 >
          windowWidth
        ) {
          if (
            // show on left of screen if the selectOptions is bigger then the screen width
            selectOptionsWidth > windowWidth
          ) {
            return forEffects ? leftHiddenNummber : 15;
          } else {
            return forEffects
              ? leftHiddenNummber
              : windowWidth - selectOptionsWidth - 15;
          }
        } else {
          return centerPosition;
        }
      } else if (directions && directionLeft) {
        // show selectOptions only in left position
        if (selectLeft - selectOptionsWidth > 0) {
          return selectLeft > windowWidth
            ? forEffects
              ? rightHiddenNummber
              : windowWidth - selectOptionsWidth - 15 // show on right of the screen if the selectElement left position was bigger then the screen
            : rightHiddenNummber; // show on left of the selectElement
        } else if (selectRight < 0) {
          // show on right of the screen if the selectElement right position was smaller then the screen beginn
          return forEffects ? leftHiddenNummber : 15;
        } else {
          // show on right of the screen when there is no place for the selectOptions in the left position on the window
          return forEffects ? rightHiddenNummber : 15;
        }
      } else if (directions && directionRight) {
        // show selectOptions only in right position
        if (selectRight + selectOptionsWidth < windowWidth) {
          return selectRight < 0
            ? forEffects
              ? leftHiddenNummber
              : 15 // show on right of the screen if the selectElement left position was bigger then the screen
            : leftHiddenNummber; // show on left of the selectElement
        } else if (selectLeft > windowWidth) {
          // show on right of the screen if the selectElement right position was smaller then the screen beginn
          return forEffects
            ? rightHiddenNummber
            : windowWidth - selectOptionsWidth - 15;
        } else {
          // show on right of the screen when there is no place for the selectOptions in the left position on the window
          return forEffects
            ? rightHiddenNummber
            : windowWidth - selectOptionsWidth - 15;
        }
      } else if (directions && !selectLeft && !directionRight) {
        return centerPosition;
      } else {
        if (
          // show on left of screen if there is no place more
          selectLeft + selectWidth / 2 - selectOptionsWidth / 2 <
          0
        ) {
          return forEffects ? leftHiddenNummber : 15;
        } else if (
          // show on right of screen if there is no place more
          selectRight - selectWidth / 2 + selectOptionsWidth / 2 >
          windowWidth
        ) {
          if (
            // show on left of screen if the selectOptions is bigger then the screen width
            selectOptionsWidth > windowWidth
          ) {
            return forEffects ? leftHiddenNummber : 15;
          } else {
            return forEffects
              ? leftHiddenNummber
              : windowWidth - selectOptionsWidth - 15;
          }
        } else {
          return centerPosition;
        }
      }
    } else {
      return centerPosition;
    }
  };

  useEffect(() => {
    setSelectButtonProperties({
      ...selectOptionsData.selectButtonProperties
    });
  }, [selectOptionsData]);

  useEffect(() => {
    const _selectOptionsData = state.selectOptions;
    if (_selectOptionsData) {
      if (
        selectOptionsData.selectId !== _selectOptionsData.selectId ||
        !_selectOptionsData.show
      ) {
        setSearchText("");
      }
      setSelectOptionsData(_selectOptionsData);
    }
  }, [state.selectOptions]);

  useClickOutside(myRef, (e) => {
    const $selectOptions = $(".select");

    // if the target of the click isn't the container nor a descendant of the container
    if (
      !$selectOptions.is(e.target) &&
      $selectOptions.has(e.target).length === 0
    ) {
      closeSelectOptions();
    }
  });

  return (
    <div
      ref={myRef}
      className={`select-options disable-selecting ${
        selectOptionsData.show ? "show" : ""
      } ${selectOptionsData.enableSearch ? "with-search" : ""} ${
        selectOptionsData.headerText ? "with-header-text" : ""
      } ${selectOptionsData.className ?? ""} ${
        selectOptionsData.showSelectedParallel ? "show-selected-parallel" : ""
      } ${selectOptionsData.multiSelect ? "multi-select" : "single-select"}`}
      style={{
        pointerEvents: selectOptionsData.show ? "all" : "none",
        top: stylePositionBetweenTopAndBottom(
          `${
            selectButtonProperties.offset
              ? selectButtonProperties.offset.top +
                selectButtonProperties.height
              : 0
          }px`,
          `${
            selectButtonProperties.offset
              ? selectButtonProperties.offset.top - optionsProperties.height
              : 0
          }px`,
          `${selectButtonProperties.top}px`
        ),
        left: stylePositionBetweenRightAndLeft(
          `${
            selectButtonProperties.offset
              ? selectButtonProperties.offset.left +
                selectButtonProperties.width
              : 0
          }px`,
          `${
            selectButtonProperties.offset
              ? selectButtonProperties.offset.left - optionsProperties.width
              : 0
          }px`,

          selectButtonProperties.offset
            ? selectButtonProperties.offset.left -
                optionsProperties.width / 2 +
                selectButtonProperties.width / 2
            : 0
        ),
        boxShadow: `${stylePositionBetweenRightAndLeft(
          15,
          -15,
          0,
          true
        )}px ${stylePositionBetweenTopAndBottom(
          15,
          -15,
          0,
          true
        )}px 50px rgba(0,0,0,.05)`,
        transform: `translateX(${stylePositionBetweenRightAndLeft(
          -15,
          15,
          0,
          true
        )}px) translateY(${stylePositionBetweenTopAndBottom(
          -15,
          15,
          0,
          true
        )}px) scale(.99)`,
        transition: `opacity 350ms cubic-bezier(.4, .2, 0, 1), transform 350ms cubic-bezier(.4, .2, 0, 1), top ${
          selectOptionsData.show ? 350 : 0
        }ms cubic-bezier(.4, .2, 0, 1), left ${
          selectOptionsData.show ? 350 : 0
        }ms cubic-bezier(.4, .2, 0, 1), box-shadow 350ms cubic-bezier(.4, .2, 0, 1)`,
        minWidth: selectOptionsData.showSelectedParallel
          ? `${
              maxOptionTextWidth + 150 < 250 ? 250 : maxOptionTextWidth + 150
            }px`
          : "250px"
      }}
    >
      <div>
        {selectOptionsData.headerText ? (
          <>
            <div className="select-options-headline">
              {selectOptionsData.headerText}
            </div>
            <span className={`select-options-headline-placeholder`} />
          </>
        ) : null}

        <div className="actions">
          {selectOptionsData.enableSearch ? (
            <>
              {selectOptionsData.enableSelectAllButton &&
              selectOptionsData.multiSelect ? (
                <>
                  <Button
                    className={"select-all-button"}
                    leftIcon={"done_all"}
                    onClick={() => {
                      selectOptionsData.setSelectedOption(
                        Object.entries(selectOptionsData.options).filter(
                          (option) => {
                            return searchText !== ""
                              ? !foundOptions(searchText, option)
                              : true;
                          }
                        )
                      );
                    }}
                  />
                  <Button
                    className={"select-all-button"}
                    leftIcon={"remove_done"}
                    onClick={() => {
                      selectOptionsData.setSelectedOption([]);
                    }}
                  />
                </>
              ) : null}
              <TextField
                inputRef={(r) => r && r.focus()}
                className="select-options-search-field"
                value={searchText}
                placeholder={
                  selectOptionsData.searchPlaceHolder ?? "finde options"
                }
                onChange={setSearchText}
              />

              {selectOptionsData.enableCloseButton &&
              selectOptionsData.multiSelect ? (
                <Button
                  className={"close-button"}
                  onClick={closeSelectOptions}
                  outlined
                  blue
                >
                  {selectOptionsData.closeButtonText ?? "done"}
                </Button>
              ) : null}
            </>
          ) : null}
        </div>

        <div className={`select-options-body`} data-cy={"select-options-body"}>
          {(selectOptionsData.showSelectedParallel ? [1, 2, 3] : [1]).map(
            (index) => {
              return index !== 2 ? (
                <div key={index} className={`content ${index}-ct`}>
                  {selectOptionsData.showSelectedParallel ? (
                    <div
                      className={`empty-listview-background-image ${
                        (selectOptionsData.selectedOption &&
                          selectOptionsData.selectedOption.length !==
                            Object.entries(selectOptionsData.options).length &&
                          index === 1) ||
                        (selectOptionsData.selectedOption.length && index === 3)
                          ? "hide"
                          : ""
                      }`}
                    >
                      <span className={"material-symbols-outlined"}>
                        {index === 3 ? "done_all" : "remove_done"}
                      </span>
                    </div>
                  ) : null}

                  {selectOptionsData.defaultOption && index === 1 ? (
                    <SelectOption
                      options={selectOptionsData.options}
                      id={""}
                      disableSelecting={selectOptionsData.disableSelecting}
                      setDisableSelecting={
                        selectOptionsData.setDisableSelecting
                      }
                      selectedOption={selectOptionsData}
                      setShowOptions={selectOptionsData.setShowOptions}
                      setSelectedOption={selectOptionsData.setSelectedOption}
                      hide={selectOptionsData.searchText}
                      defaultOption
                    >
                      {selectOptionsData.defaultOptionText ?? "Select a option"}
                    </SelectOption>
                  ) : null}
                  <div>
                    {(() => {
                      const optionsListNotSorted = Object.entries(
                        selectOptionsData.options
                      );
                      try {
                        const DescSorted = _.sortBy(optionsListNotSorted, (o) =>
                          o[1]?.toUpperCase()
                        );

                        switch (selectOptionsData.sort) {
                          case "DESC":
                            return DescSorted;
                          case "ASC":
                            return DescSorted.reverse();
                          default:
                            return optionsListNotSorted;
                        }
                      } catch (e) {
                        return optionsListNotSorted;
                      }
                    })().map((option, oIndex) => {
                      const wasSelected =
                        selectOptionsData.selectedOption &&
                        (() => {
                          if (selectOptionsData.selectedOption.length)
                            return selectOptionsData.multiSelect
                              ? (() => {
                                  const foundSelectedOption = selectOptionsData.selectedOption.filter(
                                    (_option) => {
                                      return _option[0] === option[0];
                                    }
                                  )[0];
                                  return foundSelectedOption
                                    ? foundSelectedOption[0] === option[0]
                                    : false;
                                })()
                              : selectOptionsData.selectedOption[0] ===
                                  option[0];
                          else return false;
                        })();

                      return (
                        <SelectOption
                          options={selectOptionsData.options}
                          textRef={(ref) =>
                            (optionTextRefs.current[`${oIndex}`] = ref)
                          }
                          key={option[0]}
                          id={option[0]}
                          disableSelecting={selectOptionsData.disableSelecting}
                          setDisableSelecting={
                            selectOptionsData.setDisableSelecting
                          }
                          multiSelect={selectOptionsData.multiSelect}
                          selectedOption={selectOptionsData.selectedOption}
                          setShowOptions={closeSelectOptions}
                          setSelectedOption={
                            selectOptionsData.setSelectedOption
                          }
                          hide={
                            searchText ||
                            (selectOptionsData.showSelectedParallel &&
                              ((wasSelected && index === 1) ||
                                (!wasSelected && index === 3)))
                              ? foundOptions(
                                  searchText,
                                  option,
                                  selectOptionsData.searchEveryWare
                                ) ||
                                (selectOptionsData.showSelectedParallel &&
                                  ((wasSelected && index === 1) ||
                                    (!wasSelected && index === 3)))
                              : false
                          }
                        >
                          {option[1]}
                        </SelectOption>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div key={index} className={"vertical-rule"} />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectOptions;
