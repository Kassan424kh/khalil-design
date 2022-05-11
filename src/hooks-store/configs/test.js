import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    CHANGE_NEWS_UPDATE_TIME: (state, newTime) => ({ time: newTime })
  };
  initStore(actions, { time: 3000 });
};

export default configureStore;
