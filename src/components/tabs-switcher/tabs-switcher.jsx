import { useReducer, useRef, useState, useEffect } from "react";
import "./styles.sass";
import $ from "jquery";

const TabsSwitcher = ({ tabs, onSwitch, disabeldTabs }) => {
    const tabSwitcherRef = useRef();
    const tabsRef = useRef({});
    const [selectedTab, setSelectedTab] = useState();
    const [effectPositionAndSize, setEffectPositionAndSize] = useState({
        width: "0",
        left: "5px"
    });

    useEffect(() => {
        if (tabSwitcherRef.current) {
        }
    }, [tabSwitcherRef]);

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
                    width: firstTabData.width - 11,
                    left: firstTabData.left + 4 - $tabSwitcherRef.left
                });
                if (firstRenderTimeout.current) firstRenderTimeout.current = 0;
            }
        }, firstRenderTimeout.current);

        return () => clearTimeout(t);
    }, [tabsRef, selectedTab, tabSwitcherRef]);

    return (
        <div className={`tabs-switcher`} ref={tabSwitcherRef}>
            {tabs
                ? Object.entries(tabs).map(([k, v], i) => {
                      return (
                          <div
                              key={i}
                              ref={(r) => {
                                  tabsRef.current[k] = r;
                                  if (!selectedTab && i === 0) {
                                      setSelectedTab(k);
                                  }
                              }}
                              className={`tab ${
                                  selectedTab === k ? "selected" : ""
                              } ${
                                  disabeldTabs && disabeldTabs.includes(k)
                                      ? "disabled"
                                      : ""
                              }`}
                              onLoad={(e) => {
                                  console.log("asdf");
                              }}
                              onClick={(e) => {
                                  if (
                                      (disabeldTabs &&
                                          !disabeldTabs.includes(k)) ||
                                      !disabeldTabs
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
                className="background-effect"
                style={{
                    ...effectPositionAndSize
                }}
            />
        </div>
    );
};

export default TabsSwitcher;
