import { initStore } from "../store";
import { v4 as uuidv4 } from "uuid";

const configureStore = () => {
    const findMessageAfterUUID = (listOfMessages, UUID) => {
        const foundMessageInList = listOfMessages.filter(
            (message) => message.uuid === UUID
        );
        return foundMessageInList.length ? foundMessageInList[0] : undefined;
    };

    const updateMessageAfterUUID = (listOfMessages, newMessage) => {
        return listOfMessages.map((message) => {
            return message.uuid === newMessage.uuid
                ? {
                      ...message,
                      ...newMessage,
                      updatedTimes: message.updatedTimes + 1
                  }
                : message;
        });
    };

    const actions = {
        ADD_NEW_MESSAGE: (state, message) => {
            if (
                message.uuid &&
                findMessageAfterUUID(
                    state.messages.listOfMessages,
                    message.uuid
                )
            ) {
                state.messages.listOfMessages = updateMessageAfterUUID(
                    state.messages.listOfMessages,
                    message
                );
            } else {
                message = {
                    ...message,
                    uuid: message.uuid ?? uuidv4(),
                    closeImmediately: false,
                    updatedTimes: 0
                };
                state.messages.listOfMessages = [
                    message,
                    ...state.messages.listOfMessages.map((message, index) => {
                        return index < 15
                            ? message
                            : {
                                  ...message,
                                  closeImmediately: message.dismissible
                                      ? true
                                      : false
                              };
                    })
                ];
            }
            state.messages.updatedTimes = state.messages.updatedTimes + 1;

            return { ...state };
        },

        CLOSE_MESSAGE_IMMEDIATELY: (state, messageUuid) => {
            const indexOfMessage = state.messages.listOfMessages.findIndex(
                (m) => m.uuid === messageUuid
            );

            if (indexOfMessage >= 0) {
                let newMessage = state.messages.listOfMessages[indexOfMessage];
                newMessage = { ...newMessage, closeImmediately: true };
                state.messages.listOfMessages = state.messages.listOfMessages.map(
                    (message, index) => {
                        if (index === indexOfMessage) {
                            return newMessage;
                        }
                        return message;
                    }
                );
            }
            state.messages.updatedTimes = state.messages.updatedTimes + 1;
            return { ...state };
        },
        CLOSE_ALL_MESSAGES_IMMEDIATELY: (state) => {
            state.messages.listOfMessages = state.messages.listOfMessages.map(
                (message) => {
                    return {
                        ...message,
                        closeImmediately: message.dismissible ? true : false
                    };
                }
            );
            state.messages.updatedTimes = state.messages.updatedTimes + 1;
            return { ...state };
        },
        DELETE_MESSAGE_BY_UUID: (state, messageUuid) => {
            state.messages.listOfMessages = state.messages.listOfMessages.filter(
                (message) => message.uuid !== messageUuid
            );
            state.messages.updatedTimes = state.messages.updatedTimes + 1;
            return { ...state };
        },
        CLOSE_MESSAGE_AUTOMATICALLY: (state, clear) => {
            state.messages.closeMessageAutomatically = clear;
            state.messages.updatedTimes = state.messages.updatedTimes + 1;
            return { ...state };
        }
    };
    initStore(actions, {
        messages: {
            listOfMessages: [],
            closeMessageAutomatically: false,
            updatedTimes: 0
        }
    });
};

export default configureStore;
