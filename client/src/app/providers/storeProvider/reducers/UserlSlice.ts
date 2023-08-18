import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../index'
import User from '../types/index';
import api from '../api';


export interface UserState {
  email: string,
  password: string,
  isAuth: boolean,
}

const initialState: UserState = {
  email: "",
  password: "",
  isAuth: false,
}

export const userState = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loginUserSuccess: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.password = action.payload;
      state.isAuth = true;
    },
    logoutUserSuccess: (state) => {
      state.email = '';
      state.password = '';
      state.isAuth = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginUserSuccess, logoutUserSuccess } = userState.actions

export const UserEmailSelector = (state:RootState) => state.UserReducer.email
export const UserPasswordSelector = (state:RootState) => state.UserReducer.password
export const UserIsAuthSelector = (state:RootState) => state.UserReducer.isAuth


// регистрация пользователя
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post(`/auth/registration`, {
      email,
      password,
    });
    console.log(response.data);
  } catch (error: any) {
    alert(error);
  }
};

// авторизация пользователя
export const Login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.post(`/auth/login`, {
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
    const response = await api.get(`/auth/auth`, {
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