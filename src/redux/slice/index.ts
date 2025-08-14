import { combineReducers, Action } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';
import paymentLogsSlice from './dashboard';

export interface AppState {
    counter: ReturnType<typeof counterReducer>;
    paymentLogs: ReturnType<typeof paymentLogsSlice>
}

const appReducer = combineReducers({
    counter:counterReducer,
    paymentLogs:paymentLogsSlice
});

const rootReducer = (state: AppState | undefined, action: Action): AppState => {
  return appReducer(state, action);
};


export default rootReducer;