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
  
  name: 'user',
  initialState,
  reducers: {
    loginUserSuccess: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload;
      state.isAuth = true;
    },
    logoutUserSuccess: (state) => {
      state.email = '';
      state.password = '';
      state.isAuth = false;

    },

    userSessionCount: (state, action: PayloadAction<number>) => {
      state.sesstioionCount = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginUserSuccess, logoutUserSuccess,userSessionCount } = userState.actions

export const UserEmailSelector = (state:RootState) => state.UserReducer.email
export const UserPasswordSelector = (state:RootState) => state.UserReducer.password
export const UserIsAuthSelector = (state:RootState) => state.UserReducer.isAuth
export const UserCurrentSesstionCountSelector = (state:RootState) => state.UserReducer.sesstioionCount


// регистрация пользователя
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post(`/api/auth/registration`, {
      email,
      password,
    });
    console.log(response.data);
  } catch (error: any) {
    alert(error);
  }
};

// авторизация пользователя
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    
   
    const response = await api.post(`/api/auth/login`, {
      email,
      password,
    });

    dispatch(loginUserSuccess(response.data.user));
    
    localStorage.setItem('token', response.data.token);
  } catch (error: any) {}
};

// добавление jwt-токена авторизированому пользователю
export const getUserToken = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/api/auth/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(loginUserSuccess(response.data.user));
    // console.log(response.data.user);

    localStorage.setItem('token', response.data.token);
  } catch (error: any) {
    // localStorage.removeItem('token');
  }
};



export default userState.reducer