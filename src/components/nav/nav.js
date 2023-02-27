import NavLogo from "./logo/nav-logo";
import NavUser from "./user/nav-user";
import "./styles.sass";
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useClickOutside } from "../../services/useClickOutside";
import { useStore } from "../../hooks-store/store";
import Theme from "../../_themes";

const Nav = (props) => {
    const [state, dispatch] = useStore()
    const myRef = useRef();
    const [firstTimeLoading, setFirstTimeLoading] = useState(true);
    const [pinned, setPinned] = useState(
        localStorage.getItem("nav-bar-was-pinned") === "true"
    );
    const [wasOpened, setWasOpened] = useState(
        localStorage.getItem("nav-bar-was-open") === "true"
    );
    const [fullOpenOnlyWithOneClick, setFullOpenOnlyWithOneClick] = useState(
        false
    );
    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(true);
    const [selectOptionsActiveStatus, setSelectOptionsActiveStatus] = useState(
        false
    );
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [currentForecast, setCurrentForecast] = useState(null);
    const [currentForecastName, setCurrentForecastName] = useState(null);
    const [updateNavStatusTimes, setUpdateNavStatusTimes] = useState(0);
    const [clearSelectedFC, setClearSelectedFC] = useState(0);
    const [darkModeIsOn, setDarkModeIsOn] = useState(
        localStorage.getItem("selected-theme") === "dark"
    );
    const selectIds = useRef([]);

    useEffect(() => {
        const notFullOpenedWithOnlyOneClick =
            (!pinned && (show || open) && !fullOpenOnlyWithOneClick) || // check if nav not opened with only one Click
            (pinned && (show || open)); // check if nav par is pinned

        if (props.onStatusChange)
            props.onStatusChange({
                ...{
                    pinned,
                    show,
                    open,
                    wasOpened,
                    fullOpenOnlyWithOneClick,
                    notFullOpenedWithOnlyOneClick
                }
            });
        setUpdateNavStatusTimes(updateNavStatusTimes + 1);
        localStorage.setItem("nav-bar-was-pinned", pinned);
    }, [pinned, show, open, wasOpened, fullOpenOnlyWithOneClick]);

    useEffect(() => {
        setCurrentForecast(null);
    }, [props.forecastIds]);

    const closeTimeout = useRef();
    useEffect(() => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        if (!isMouseEnter && !selectOptionsActiveStatus) {
            closeTimeout.current = setTimeout(
                () => {
                    setOpen(false);
                    if (!pinned) setShow(false);

                    if (firstTimeLoading) {
                        setFirstTimeLoading(false);
                    }
                },
                firstTimeLoading ? 6000 : 3000
            );
        }
    }, [pinned, open, show, isMouseEnter, selectOptionsActiveStatus]);

    useClickOutside(myRef, (e) => {
        const $selectOptions = $(".select-options");

        // if the target of the click isn't the container nor a descendant of the container
        if (
            !$selectOptions.is(e.target) &&
            $selectOptions.has(e.target).length === 0
        ) {
            setOpen(false);
            if (!pinned) setShow(false);
        }
    });

    const closeSelectOptions = () => {
        dispatch("UPDATE_SELECT_PROPS", {
            show: false,
            lastUpdate: Date.now()
        });
    };

    return (
        <div
            ref={myRef}
            className={`navbar disable-selecting ${
                firstTimeLoading ? "first-time-loading" : ""
            } ${show ? "show" : ""} ${open ? "open" : ""} ${
                pinned ? "pinned" : ""
            }`}
            onMouseEnter={(e) => {
                setIsMouseEnter(true);
            }}
            onMouseLeave={(e) => {
                setIsMouseEnter(false);
            }}
            onClick={() => {}}
        >
            <div className={`nav`}>
                <div className={"nav-container"}>
                    <div className={"nav-content"}>
                        <div className={"nav-head"}>
                            <div
                                className={"nav-open-close-button icon-button"}
                                onClick={() => {
                                    closeSelectOptions();
                                    localStorage.setItem(
                                        "nav-bar-was-open",
                                        JSON.stringify(!open)
                                    );
                                    setWasOpened(!open);
                                    setFullOpenOnlyWithOneClick(false);
                                    setOpen(!open);
                                }}
                            >
                                <span className={"material-symbols-outlined"}>
                                    flip
                                </span>
                            </div>
                            <a href={"/"}>
                                <NavLogo open={open} />
                            </a>
                        </div>
                        <NavUser open={open} userName={props.user} />
                        <div className={"nav-body"}>
                            <div
                                className={`top list ${
                                    state.selectOptions.show &&
                                    selectIds.current.includes(
                                        state.selectOptions.selectId
                                    )
                                        ? "disable-toolTip"
                                        : ""
                                }`}
                            ></div>
                            <div className={"bottom"}>
                                <div
                                    className={`action-button pin-button`}
                                    onClick={() => {
                                        Theme.toggleTheme();
                                        setDarkModeIsOn((d) => !d);
                                    }}
                                >
                                    <span
                                        className={`icon-button material-symbols-outlined`}
                                    >
                                        {darkModeIsOn
                                            ? "light_mode"
                                            : "bedtime"}
                                    </span>
                                </div>
                                <div
                                    className={`action-button pin-button ${
                                        pinned ? "active" : ""
                                    }`}
                                    onClick={() => {
                                        setPinned(!pinned);
                                    }}
                                >
                                    <span
                                        className={`icon-button material-symbols-outlined`}
                                    >
                                        {!pinned ? "unpin" : "push_pin"}
                                    </span>
                                </div>
                                <a
                                    href={"/login"}
                                    onClick={() => {
                                        sessionStorage.clear();
                                        closeSelectOptions();
                                    }}
                                    className={"action-button logout-button"}
                                >
                                    <span
                                        className={
                                            "icon-button material-symbols-outlined"
                                        }
                                    >
                                        logout
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`nav-open-button ${show ? "show" : ""} ${
                    open ? "open" : ""
                } ${pinned ? "pinned" : ""}`}
                onClick={() => {
                    if (!pinned) {
                        if (open) {
                            setOpen(!open);
                        } else {
                            setOpen(wasOpened);
                        }

                        setFullOpenOnlyWithOneClick(wasOpened && !open);

                        //setFullOpenWithOneClick(open)
                        setShow(!show);
                    }
                }}
            >
                <FullOpenAndCloseButton />
            </div>
        </div>
    );
};

export default Nav;

const FullOpenAndCloseButton = (props) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 17 75"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 1.5
            }}
        >
            <g transform="matrix(1,0,0,1,-1285.13,-590.661)">
                <g transform="matrix(1,0,0,1,7.48987,-7.88933)">
                    <g transform="matrix(0.0290404,0,0,0.022206,1276.39,602.967)">
                        <path
                            d="M61.899,80.214C61.899,80.214 63.49,82.141 66.377,85.64C187.433,232.335 314.608,370.152 447.317,498.456C447.32,498.459 447.322,498.461 447.325,498.464C478.064,528.183 496.2,575.212 496.2,625.205C496.2,929.908 496.2,2021.59 496.2,2327.12C496.2,2377.43 477.994,2424.77 447.111,2454.78C401.315,2499.26 330.945,2567.62 269.002,2627.8C183.314,2711.04 112.621,2817.83 61.901,2940.66C61.9,2940.66 61.899,2940.67 61.899,2940.67L0,3055.49L-60.18,3055.49L-60.18,-103.395L0,-103.395L61.899,80.214Z"
                            style={{
                                fill: "var(--nav-background-color)"
                            }}
                        />
                        <g>
                            <g transform="matrix(1,0,0,1.30777,-64.7605,330.913)">
                                <circle
                                    cx="312.86"
                                    cy="893.952"
                                    r="64.761"
                                    style={{
                                        fill: "var(--black)"
                                    }}
                                />
                            </g>
                            <g transform="matrix(1,0,0,1.30777,-64.7605,-278.943)">
                                <circle
                                    cx="312.86"
                                    cy="893.952"
                                    r="64.761"
                                    style={{
                                        fill: "var(--black)"
                                    }}
                                />
                            </g>
                            <g transform="matrix(1,0,0,1.30777,-64.7605,940.77)">
                                <circle
                                    cx="312.86"
                                    cy="893.952"
                                    r="64.761"
                                    style={{
                                        fill: "var(--black)"
                                    }}
                                />
                            </g>
                        </g>
                    </g>
                    <g transform=" matrix(0.0290404,0,0,0.02904,1276.39,592.456)">
                        <path
                            d="M0,227.059C0,436.286 219.616,596.82 366.636,680.847C446.75,726.601 496.196,811.782 496.196,904.041C496.2,1191.91 496.2,1798.29 496.2,2082.74C496.196,2172.91 448.943,2256.48 371.68,2302.97C224.687,2391.44 0,2561.31 0,2772.94"
                            style={{
                                fill: "none",
                                stroke: "var(--nav-border-color)",
                                strokeWidth: "26px"
                            }}
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};
