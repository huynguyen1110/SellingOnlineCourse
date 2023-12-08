import axios from "axios"
import {  CREATE_GIO_HANG_URI, DELETE_GIO_HANG_URI, GET_ALL_GIO_HANG } from "../api"
import { getAccessToken } from "../authentication/loginRegesterServices"
import { getUserEmailFromToken } from "../common"
import axiosInstance from "../../axios"

export const createGioHang = async (courseId: number) => {
    const response = axiosInstance({
        method: 'POST',
        url: CREATE_GIO_HANG_URI, 
        data: courseId
    })
    return response
}

export const deleteGioHangById = async (id: number) => {
    const response = axiosInstance({
        method: 'DELETE',
        url: DELETE_GIO_HANG_URI.concat("?id=" + id)
    })
    return response
}

export const getAllGioHang = async () => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_ALL_GIO_HANG
    })
    return response
}