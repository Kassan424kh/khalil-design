import { useEffect, useState } from "react";
import "./styles.sass";

const TabsPage = ({ children, selected, before, after, className }) => {
    const [renderChilds, setRenderChilds] = useState(selected);

    useEffect(() => {
        const t = setTimeout(
            () => {
                setRenderChilds(selected);
            },
            selected ? 0 : 350
        );
        return () => clearTimeout(t);
    }, [selected]);

    return (
        <div
            className={`tabs-page ${(() => {
                if (selected) return "selected";
                if (before) return "before";
                else if (after) return "after";
                return "";
            })()} ${className ?? ""}`}
        >
            {renderChilds ? children : null}
        </div>
    );
};

export default TabsPage;
