import { useRef, useState } from "react";
import { useClickOutside } from "../../services/useClickOutside";
import Button from "../button/button";
import "./styles.sass";

const FloatingActionButtons = ({ actionButtons = [] }) => {
    const [active, setActive] = useState(false);
    const ref = useRef();

    useClickOutside(ref, () => {
        setActive(false);
    });

    return (
        <div
            ref={ref}
            className={`floating-action-buttons ${active ? "active" : ""}`}
        >
            <span
                className="click-background"
                onClick={() => {
                    setActive(true);
                }}
            />
            {actionButtons.map((ab) => {
                return <Button leftIcon={ab.icon} {...ab} primary />;
            })}
        </div>
    );
};

export default FloatingActionButtons;
