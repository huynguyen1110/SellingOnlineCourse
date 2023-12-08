import axios from "axios"
import {
    GET_BEST_SELLER_URI,
    GET_KHOA_HOC_BY_ID_URI,
    GET_KHOA_HOC_TU_GIO_HANG_URI,
    GET_KHOA_HOC_URI,
    GET_KHOA_HOC_UU_DAI_URI,
    SEARCH_KHOA_HOC,
    UPDATE_KHOA_HOC_YEUTHICH,
    GET_KHOA_HOC_YEUTHICH,
    CREATE_KHOA_HOC_URI,
    UPDATE_KHOA_HOC_BY_ID_URI,
    DELETE_GIO_HANG_URI,
    DELETE_KHOA_HOC_BY_ID_URI,
    GET_COURSES_REGISTERED_URI
} from "../api"
import { getAccessToken } from "../authentication/loginRegesterServices"
import { getUserEmailFromToken } from "../common"
import axiosInstance from "../../axios"
import { CourseInterface } from "../interfaces/commoninterfaces"


export const getAllKhoaHoc = (sapXepKhoaHoc: string, sapXepKhoaHocTheoDanhGia: number, theLoai: string, page: number, pageSize: number) => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_KHOA_HOC_URI
            .concat("?sapXepKhoaHoc=" + sapXepKhoaHoc + "&sapXepKhoaHocTheoDanhGia=" + sapXepKhoaHocTheoDanhGia + "&theLoai=" + theLoai + "&page=" + page + "&pageSize=" + pageSize)
    })
    return response
}

export const getKhoaHocBanChay = () => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_BEST_SELLER_URI
    })
    return response
}

export const getKhoaHocUuDai = () => {
    const response = axios({
        method: 'GET',
        url: GET_KHOA_HOC_UU_DAI_URI
    })
    return response
}

export const getKhoaHocMoi = () => {
    const response = axios({
        method: 'GET',
        url: GET_BEST_SELLER_URI
    })
    return response
}

export const getKhoaHocYeuThich = () => {
    const response = axios({
        method: 'GET',
        url: GET_KHOA_HOC_YEUTHICH
    })
    return response
}

export const getKhoaHocById = (id: number) => {
    const response = axios({
        method: 'GET',
        url: GET_KHOA_HOC_BY_ID_URI.concat("/" + id)
    })
    return response
}

export const getKhoaHocTrongGioHang = async () => {
    var token = await getAccessToken()
    var userEmail = getUserEmailFromToken(token)
    const response = axios({
        method: 'GET',
        url: GET_KHOA_HOC_TU_GIO_HANG_URI.concat("?email=" + userEmail)
    })
    return response
}

export const searchKhoaHoc = async (keyword: any) => {
    const response = axios({
        method: 'GET',
        url: SEARCH_KHOA_HOC.concat("?pageSize=100&pageNumber=0&keyword=" + keyword)
    })
    return response;
}

export const updateKhoaHocYeuThich = async (id: number, isFavorite: boolean) => {
    const response = await axiosInstance({
        method: 'PUT',
        url: UPDATE_KHOA_HOC_YEUTHICH.concat("/" + id),
        data: isFavorite,
    });
    return response;
}

export const createKhoaHoc = async (khoaHocData: CourseInterface) => {
    const response = await axiosInstance({
        method: 'POST',
        url: CREATE_KHOA_HOC_URI,
        data: khoaHocData,
    });
    return response;
}

export const updateKhoaById = async (khoaHocData: CourseInterface, id: number) => {
    const response = await axiosInstance({
        method: 'PUT',
        url: UPDATE_KHOA_HOC_BY_ID_URI.concat("?id=" + id),
        data: khoaHocData,
    });
    return response;
}

export const delteKhoaHocById = async (id: number) => {
    const response = await axiosInstance({
        method: 'PUT',
        url: DELETE_KHOA_HOC_BY_ID_URI.concat("?id=" + id)
    });
    return response;
}

export const getCoursesRegistered = async () => {
    const response = await axiosInstance({
        method: 'GET',
        url: GET_COURSES_REGISTERED_URI
    });
    return response;
}





