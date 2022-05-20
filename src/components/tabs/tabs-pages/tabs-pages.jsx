import React, { cloneElement, Children, useState, useEffect } from "react";
import "./styles.sass";
import TabsPage from "./tabs-page/tabs-page";

const TabsPages = ({ className, children, selectedTab }) => {
    const [selectedTabsPageIndex, setSelectedTabsPageIndex] = useState();
    useEffect(() => {
        Children.map(children, (c, i) => {
            if (c.props.id === selectedTab) setSelectedTabsPageIndex(i);
        });
    }, [selectedTab]);

    return (
        <div className={`tabs-pages ${className}`}>
            {Children.map(children, (child, i) => {
                return child.type === TabsPage
                    ? cloneElement(child, {
                          selected: child.props.id === selectedTab,
                          before: i < selectedTabsPageIndex,
                          after: i > selectedTabsPageIndex
                      })
                    : null;
            })}
        </div>
    );
};

export default TabsPages;
