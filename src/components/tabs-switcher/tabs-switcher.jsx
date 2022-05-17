import { useReducer, useRef, useState, useEffect } from "react";
import "./styles.sass";
import $ from "jquery";

const TabsSwitcher = ({ tabs, onSwitch }) => {
    const tabsRef = useRef({});
    const [selectedTab, setSelectedTab] = useState();
    const [effectPositionAndSize, setEffectPositionAndSize] = useState({
        width: "0",
        left: "5px"
    });

    useEffect(() => {
        if (tabsRef.current[selectedTab]) {
            const firstTabData = $(
                tabsRef.current[selectedTab]
            )[0].getBoundingClientRect();
            setEffectPositionAndSize({
                width: firstTabData.width - 11,
                left: firstTabData.left + 4
            });
        }
    }, [tabsRef, selectedTab]);

    return (
        <div className={`tabs-switcher`}>
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
                              }`}
                              onLoad={(e) => {
                                  console.log("asdf");
                              }}
                              onClick={(e) => {
                                  setSelectedTab(k);
                                  if (onSwitch) onSwitch(k);
                              }}
                          >
                              {k} {v}
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
