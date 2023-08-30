import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../index'
import User, { Product, ProductPrice } from '../types/index';
import api from '../api';


export interface ProductState {
 products:Product[]

}

const initialState: ProductState = {
  products:[]
}

export const productState = createSlice({
  
  name: 'product',
  initialState,
  reducers: {
    gettingProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    getSortedProducts: (state, action: PayloadAction<string>) => {
      state.products = state.products.sort((a:any, b:any) => a[action.payload].localeCompare(b[action.payload]))
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { gettingProductsSuccess, getSortedProducts} = productState.actions

export const ProductsSelector = (state:RootState) => state.ProductReducer.products



// получение списка продуктов
export const getOProducts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/api/auth/products`);
    dispatch(gettingProductsSuccess(response.data))
  } catch (error: any) {
    throw Error("Happend error: " + error)
  }
};



export default productState.reducer