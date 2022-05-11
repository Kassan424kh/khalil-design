import "./styles.sass";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import { useContainerDimensions } from "../../../services/useContainerDimensions";

const Message = (props) => {
    const myRef = useRef();
    const [closeMessage, setCloseMessage] = useState(false);
    const [positionMessage, setPositionMessage] = useState(false);
    const [updateHeight, setUpdateHeight] = useState(false);
    const [
        bottomPositionOnMessagesHover,
        setBottomPositionOnMessagesHover
    ] = useState(20);

    const [state, dispatch] = useStore(false);

    const messageProperties = useContainerDimensions({
        ref: myRef,
        duration: 360,
        update: [props.index, updateHeight]
    });

    useEffect(() => {
        props.setHeightOfEachMessage({
            ...props.heightOfEachMessage,
            [props.index]: messageProperties.height + 15
        });
    }, [messageProperties]);

    useEffect(() => {
        const t = setTimeout(() => {
            setUpdateHeight(Date.now());
        }, 360);

        return () => clearTimeout(t);
    }, [state.messages.listOfMessages]);

    // get key and value from object e. g. objectMap({"s" : 4, ... }, (value, key) => value + 1)
    const objectMap = (obj, fn) => {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
        );
    };

    useEffect(() => {
        let maxBottom = 0;

        objectMap(props.heightOfEachMessage, (height, index) => {
            if (index < props.index) maxBottom += height;
        });

        setBottomPositionOnMessagesHover(maxBottom);
    }, [props.heightOfEachMessage]);

    useEffect(() => {
        setPositionMessage(true);
    }, []);

    useEffect(() => {
        let t1;
        if (props.closeImmediately) {
            t1 = setTimeout(() => {
                setCloseMessage(true);
                setTimeout(
                    () => dispatch("DELETE_MESSAGE_BY_UUID", props.uuid),
                    350
                );
            }, 360);
        }
        return () => {
            if (t1) clearTimeout(t1);
        };
    }, [props.closeImmediately]);

    useEffect(() => {
        let t1;
        if (props.index === 0) {
            t1 = setTimeout(() => {
                if (props.onClose) props.onClose();
                setCloseMessage(true);
                setTimeout(
                    () => dispatch("DELETE_MESSAGE_BY_UUID", props.uuid),
                    250
                );
            }, props.timeoutInMilliseconds);
        }
        return () => {
            if (t1) clearTimeout(t1);
        };
    }, [
        state.messages.closeMessageAutomatically,
        props.index,
        props.updatedTimes
    ]);

    return (
        <div
            className={`message ${props.type ? props.type : ""}`}
            id={props.index}
            ref={myRef}
            onMouseEnter={() => {
                dispatch("CLOSE_MESSAGE_AUTOMATICALLY", true);
            }}
            onMouseLeave={() => {
                dispatch("CLOSE_MESSAGE_AUTOMATICALLY", false);
            }}
            style={Object.assign(
                {
                    animation: `messageIn 1s cubic-bezier(0.4, 0.2, 0, 1) forwards${
                        closeMessage
                            ? ",messageOut 1s cubic-bezier(0.4, 0.2, 0, 1) forwards"
                            : ""
                    }`,
                    transition: `all 350ms cubic-bezier(0.4,0.2,0,1)`,
                    zIndex: props.listLength - (props.index + 1),
                    pointerEvents: props.messagesIsHover
                        ? "auto"
                        : props.index === 0
                        ? "auto"
                        : "none"
                },
                positionMessage
                    ? {
                          transform: `translateY(${
                              props.messagesIsHover
                                  ? bottomPositionOnMessagesHover + 55
                                  : 10 * props.index
                          }px) scale(${
                              props.messagesIsHover ? 1 : 1 - 0.1 * props.index
                          })`,
                          opacity: props.messagesIsHover
                              ? 1
                              : 1 - 0.4 * props.index
                      }
                    : {}
            )}
        >
            <span className={"status-dot"} />
            <div className={`text ${props.dismissible ? "dismissible" : ""}`}>
                {props.text}
            </div>
            {props.dismissible ? (
                <div
                    className="icon-container"
                    onClick={() => {
                        if (props.onClose) props.onClose();
                        setCloseMessage(true);
                        setTimeout(
                            () =>
                                dispatch("DELETE_MESSAGE_BY_UUID", props.uuid),
                            250
                        );
                    }}
                >
                    <span className={"material-symbols-outlined"}>close</span>
                </div>
            ) : null}
        </div>
    );
};

export default Message;
