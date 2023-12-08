import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { LoginData, RegisterData } from "../interfaces/authenticateInterfaces";
import axiosInstance, { addTokenToAxios } from "../../axios";
import { CHANGE_PASSWORD, FORGOT_PASSWORD, GET_ALL_USER, GET_CURENT_USER, GET_USER_BY_EMAIL_URI, LOGIN, REGISTER, UPDATE_USER_BY_EMAIL } from "../api";
import { UserInfoInterface } from "../interfaces/commoninterfaces";

export const loginApi = ({ email, password }: LoginData) => {
  return axiosInstance({
    method: "POST",
    url: LOGIN,
    data: {
      email,
      password
    }
  })
}

export function registerApi({ firstName, lastName, sdt, email, password }: RegisterData) {
  try {
    const responseData = axiosInstance({
      method: 'POST',
      url: REGISTER,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        sdt: sdt,
        password: password
      }
    })
    return responseData
  } catch (err) {
    alert(err)
  }
}

//Access token 
export const setAccessToken = async (accessToken: string) => {
  if (!accessToken) {
    return false
  }
  try {
    await SecureStore.setItemAsync('accessToken', accessToken)
    addTokenToAxios(accessToken)
    return true
  } catch (error) {
    alert(error)
  }
  return false
}

export const getAccessToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (!accessToken) {
      console.error('Error getting access token:');
    }
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

export const getUserByEmail = (email: string) => {
  const response = axiosInstance({
    method: 'GET',
    url: GET_USER_BY_EMAIL_URI.concat("?email=" + email)
  })
  return response
}


export const updateUserByEmail = (email: string, userInfo: UserInfoInterface) => {
  const response = axiosInstance({
    method: 'PUT',
    url: UPDATE_USER_BY_EMAIL.concat("?email=" + email),
    data: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      sdt: userInfo.sdt,
      gioiTInh: userInfo.gioiTInh,
      ngayThangNamSinh: userInfo.ngayThangNamSinh
    }
  })
  return response
}

export const forgotPassword = (email: string) => {
  const response = axiosInstance({
    method: 'GET',
    url: FORGOT_PASSWORD.concat("?email=" + email),
  })
  return response
}

export const changePassword = ( password:string , newPassword: string) => {
  const response = axiosInstance({
    method: 'POST',
    url: CHANGE_PASSWORD,
    data: {
      password, 
      newPassword
    }
  })
  return response
}

export const getCurrentUser = () => {
  const response = axiosInstance({
    method: 'GET',
    url: GET_CURENT_USER,
  })
  return response
}

export const getAllUser = (idRole: number) => {
  const response = axiosInstance({
    method: 'GET',
    url: GET_ALL_USER.concat("?idRole=" + idRole),
  })
  return response
}