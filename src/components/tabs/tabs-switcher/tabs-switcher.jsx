import React, { useReducer, useRef, useState, useEffect } from "react";
import "./styles.sass";
import $ from "jquery";

const TabsSwitcher = ({
  tabs,
  onSwitch,
  disabledTabs,
  startWith,
  withSwitchArrows
}) => {
  const tabSwitcherRef = useRef();
  const tabsRef = useRef({});
  const [selectedTab, setSelectedTab] = useState();
  const [effectPositionAndSize, setEffectPositionAndSize] = useState({
    width: "0",
    left: "5px"
  });

  useEffect(() => {
    setSelectedTab(startWith);
  }, [startWith]);

  const firstRenderTimeout = useRef(1000);
  useEffect(() => {
    const t = setTimeout(() => {
      if (tabsRef.current[selectedTab] && tabSwitcherRef.current) {
        const $tabSwitcherRef = $(
          tabSwitcherRef.current
        )[0].getBoundingClientRect();
        const firstTabData = $(
          tabsRef.current[selectedTab]
        )[0].getBoundingClientRect();
        setEffectPositionAndSize({
          width: firstTabData.width - 12,
          left: firstTabData.left + 5 - $tabSwitcherRef.left
        });
        if (firstRenderTimeout.current) firstRenderTimeout.current = 0;
      }
    }, firstRenderTimeout.current);

    return () => clearTimeout(t);
  }, [tabsRef, selectedTab, tabSwitcherRef]);

  return (
    <div className={`tabs-switcher`} ref={tabSwitcherRef}>
      {withSwitchArrows ? (
        <div
          className="switch-button prev"
          onClick={() => {
            setSelectedTab((currentSelectedTab) => {
              const tabsWithoutDisabled = Object.entries(tabs)
                .map((t) => t[0])
                .filter((t) =>
                  disabledTabs && disabledTabs.length
                    ? !disabledTabs.includes(t)
                    : t
                );
              const indexOfCurrentSelectedTab = tabsWithoutDisabled.indexOf(
                currentSelectedTab
              );
              const _newSelected = currentSelectedTab
                ? indexOfCurrentSelectedTab > 0
                  ? tabsWithoutDisabled[indexOfCurrentSelectedTab - 1]
                  : tabsWithoutDisabled.at(-1)
                : tabsWithoutDisabled.at(-1);
              if (onSwitch) onSwitch(_newSelected);
              return _newSelected;
            });
          }}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
      ) : null}
      {tabs
        ? Object.entries(tabs).map(([k, v], i) => {
            return (
              <div
                key={i}
                ref={(r) => {
                  if (
                    (disabledTabs && !disabledTabs.includes(k)) ||
                    !disabledTabs
                  ) {
                    tabsRef.current[k] = r;
                    setSelectedTab((currentSelectedTab) => {
                      if (
                        !currentSelectedTab &&
                        (((startWith &&
                          disabledTabs &&
                          !disabledTabs.includes(startWith)) ||
                          (startWith && !disabledTabs) ||
                          !startWith) &&
                        Object.keys(tabs).includes(startWith)
                          ? startWith === k
                          : true)
                      ) {
                        if (onSwitch) onSwitch(k);
                        return k;
                      }
                      return currentSelectedTab;
                    });
                  }
                }}
                className={`tab ${selectedTab === k ? "selected" : ""} ${
                  disabledTabs && disabledTabs.includes(k) ? "disabled" : ""
                }`}
                onClick={(e) => {
                  if (
                    (disabledTabs && !disabledTabs.includes(k)) ||
                    !disabledTabs
                  ) {
                    setSelectedTab(k);
                    if (onSwitch) onSwitch(k);
                  }
                }}
              >
                {v}
              </div>
            );
          })
        : null}
      <div
        className={`background-effect ${selectedTab ? `_${selectedTab}` : ""}`}
        style={{
          ...effectPositionAndSize
        }}
      />

      {withSwitchArrows ? (
        <div
          className="switch-button next"
          onClick={() => {
            setSelectedTab((currentSelectedTab) => {
              const tabsWithoutDisabled = Object.entries(tabs)
                .map((t) => t[0])
                .filter((t) =>
                  disabledTabs && disabledTabs.length
                    ? !disabledTabs.includes(t)
                    : t
                );
              const indexOfCurrentSelectedTab = tabsWithoutDisabled.indexOf(
                currentSelectedTab
              );
              const _newSelected = currentSelectedTab
                ? indexOfCurrentSelectedTab < tabsWithoutDisabled.length - 1
                  ? tabsWithoutDisabled[indexOfCurrentSelectedTab + 1]
                  : tabsWithoutDisabled[0]
                : tabsWithoutDisabled[0];

              if (onSwitch) onSwitch(_newSelected);
              return _newSelected;
            });
          }}
        >
          <span className="material-symbols-outlined">navigate_next</span>
        </div>
      ) : null}
    </div>
  );
};

export default TabsSwitcher;
