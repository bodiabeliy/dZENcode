import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client';
import { AppDispatch, RootState } from '../index'
import User from '../types/index';
import api from '../api';


export interface UserState {
  email: string,
  password: string,
  isAuth: boolean,
  sesstioionCount:number
}

const initialState: UserState = {
  email: "",
  password: "",
  isAuth: false,
  sesstioionCount:1
}

export const userState = createSlice({
  
  name: 'counter',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
// export const { loginUserSuccess, logoutUserSuccess,userSessionCount } = userState.actions





// добавление jwt-токена авторизированому пользователю
export const getUserToken = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/api/auth/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    // console.log(response.data.user);

    localStorage.setItem('token', response.data.token);
  } catch (error: any) {
    // localStorage.removeItem('token');
  }
};



export default userState.reducer