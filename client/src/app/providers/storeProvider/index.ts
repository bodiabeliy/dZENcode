import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import UserReducer from "./reducers/UserlSlice"
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({ 
    UserReducer
 })
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
