import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client';
import { AppDispatch, RootState } from '../index'
import User from '../types/index';
import api from '../api';
import Order from '../types/index';


export interface OrderState {
 orders:Order[]
}

const initialState: OrderState = {
    orders:[]
}

export const orderState = createSlice({
  
  name: 'order',
  initialState,
  reducers: {
    gettingOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
       state.orders = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { gettingOrdersSuccess} = orderState.actions

export const OrdersSelector = (state:RootState) => state.OrderReducer.orders



// получение списка заказов
export const getOrders = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/api/auth/orders`);
    dispatch(gettingOrdersSuccess(response.data))
  } catch (error: any) {
    throw Error("Happend error: " + error)
  }
};



export default orderState.reducer