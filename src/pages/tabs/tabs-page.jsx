import "./styles.sass";
import React, { useState } from "react";
import TabsPage from "../../components/tabs/tabs-pages/tabs-page/tabs-page";
import TabsPages from "../../components/tabs/tabs-pages/tabs-pages";
import TabsSwitcher from "../../components/tabs/tabs-switcher/tabs-switcher";

const Tabs = () => {
    const disabledTabs = ["tab1", "tab5"];

    const tabsObject = {
        tab1: 1,
        tab2: 2,
        tab3: 3,
        tab4: 4,
        tab5: 5,
        tab6: 6,
        tab7: 7
    };

    const [selectedTab, setSelectedTab] = useState();

    return (
        <div className="page tabs">
            <TabsSwitcher
                tabs={tabsObject}
                startWith={"tab2"}
                disabledTabs={disabledTabs}
                onSwitch={setSelectedTab}
                withSwitchArrows
            />
            <TabsPages selectedTab={selectedTab}>
                {Object.entries(tabsObject).map(([k, v], i) => {
                    return (
                        <TabsPage key={i} id={k}>
                            {v}
                        </TabsPage>
                    );
                })}
            </TabsPages>
        </div>
    );
};

export default Tabs;
