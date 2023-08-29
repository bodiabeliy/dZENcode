import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import UserReducer from "./reducers/UserSlice"
import OrderReducer from "./reducers/OrderSlice"
import ProductReducer from "./reducers/ProductSlice"

const rootReducer = combineReducers({ 
    UserReducer,
    OrderReducer,
    ProductReducer
 })
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
