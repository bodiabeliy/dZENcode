import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../index'
import api from '../api';
import Order from '../types/index';


export interface OrderState {
 orders:Order[]
 order:Order;
 currentCurency:number

}

const initialState: OrderState = {
    order:{
      id: 0,
      title: '',
      date: '',
      description: '',
      products: [],
      totalSum: 0
    },
    orders:[], 
    currentCurency: 0
}

export const orderState = createSlice({
  
  name: 'order',
  initialState,
  reducers: {
    gettingOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
       state.orders = action.payload
    },

    getOrderCurrentPrices: (state, action:any) => {
      const sum = action.payload.order.products.reduce((accumulator:any, currentObject:any) => {
        return accumulator + currentObject.price.value;
      }, 0);
      
      state.order = {...action.payload.order, totalSum:sum}
      const indexToUpdate = state.orders.findIndex(item => item.id === state.order.id);
      if (indexToUpdate !== -1) {
        state.orders[indexToUpdate] = state.order;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { gettingOrdersSuccess, getOrderCurrentPrices} = orderState.actions

export const OrdersSelector = (state:RootState) => state.OrderReducer.orders
export const OrdersOrderCurrentPricesSelector = (state:RootState) => state.OrderReducer.currentCurency



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