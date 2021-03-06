import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

export default store;
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
