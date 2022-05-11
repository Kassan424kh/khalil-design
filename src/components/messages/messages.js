import "./styles.sass";
import Message from "./message/message";
import React, { useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import Button from "../button/button";

const Messages = () => {
    const [heightOfEachMessage, setHeightOfEachMessage] = useState({});
    const [show, setShow] = useState(false);
    const [showUngroupButton, setShowUngroupButton] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState();
    const dispatch = useStore(false)[1];
    const state = useStore(true)[0];

    const messageTypes = {
        SUCCESS: "success",
        DANGER: "danger",
        WARNING: "warning"
    };

    useEffect(() => {
        let t;
        if (state.messages.listOfMessages.length < 2) {
            t = setTimeout(() => {
                setShow(false);
                setShowUngroupButton(false);
            }, 150);
        }

        return () => clearTimeout(t);
    }, [state.messages.listOfMessages]);

    return (
        <div
            className={`messages disable-selecting  ${show ? "show" : ""}`}
            onMouseEnter={() => {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                setHoverTimeout(
                    setTimeout(() => {
                        setShowUngroupButton(true);
                    }, 750)
                );
            }}
            onMouseLeave={() => {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                setHoverTimeout(
                    setTimeout(() => {
                        setShowUngroupButton(false);
                    }, 750)
                );
            }}
        >
            {state.messages.listOfMessages.length
                ? state.messages.listOfMessages.map((message, index) => {
                      return (
                          <Message
                              show={show}
                              key={message.uuid}
                              uuid={message.uuid}
                              messagesIsHover={show}
                              id={message.id}
                              dismissible={message.dismissible}
                              index={index}
                              listLength={state.messages.listOfMessages.length}
                              type={messageTypes[message.type]}
                              text={message.message}
                              closeImmediately={message.closeImmediately}
                              heightOfEachMessage={heightOfEachMessage}
                              setHeightOfEachMessage={setHeightOfEachMessage}
                              timeoutInMilliseconds={
                                  message.timeoutInMilliseconds * (index + 1)
                              }
                              onClose={message.onClose}
                              updatedTimes={message.updatedTimes}
                          />
                      );
                  })
                : null}

            <div
                className={`messages-bottom-action-buttons ${
                    showUngroupButton &&
                    !show &&
                    state.messages.listOfMessages.length > 1
                        ? "show"
                        : ""
                }`}
            >
                <Button
                    className={`ungroup-messages`} //
                    outlined
                    rightIcon={"view_agenda"}
                    onClick={() => {
                        setShow(true);
                    }}
                ></Button>
            </div>

            <div
                className={`messages-top-action-buttons ${show ? "show" : ""}`}
            >
                <Button
                    className={`clear-all-messages-button`} // view_agenda
                    outlined
                    disabled={
                        !state.messages.listOfMessages.filter(
                            (message) => message.dismissible
                        ).length
                    }
                    rightIcon={"clear_all"}
                    onClick={() => {
                        dispatch("CLOSE_ALL_MESSAGES_IMMEDIATELY");
                    }}
                >
                    Clear All
                </Button>
                <Button
                    className={`group-messages`}
                    outlined
                    rightIcon={"line_weight"}
                    onClick={() => {
                        setShow(false);
                        setShowUngroupButton(false);
                    }}
                ></Button>
            </div>
        </div>
    );
};

export default Messages;
