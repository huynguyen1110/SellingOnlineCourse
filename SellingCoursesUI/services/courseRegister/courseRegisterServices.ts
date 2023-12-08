import axios from "axios"
import { CREATE_DANG_KY_URI, DELETE_DANG_KY_URI, GET_ALL_DANG_KY } from "../api"
import axiosInstance from "../../axios";


export const createDangKy = (khoaHocId: number, userId: number) => {
    const response = axiosInstance({
        method: 'POST',
        url: CREATE_DANG_KY_URI.concat("?khoaHocId=" + khoaHocId + "&userId=" + userId)
    });
    return response;
}

export const deleteDangKyById = (id: number) => {
    const response = axiosInstance({
        method: 'PUT',
        url: DELETE_DANG_KY_URI.concat("?id=" + id)
    });
    return response;
}

export const getAllDangKy = () => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_ALL_DANG_KY
    });
    return response;
}