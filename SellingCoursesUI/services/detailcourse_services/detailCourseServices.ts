import axios from "axios";
import { CREATE_CHI_TIET_KHOA_HOC, DELETE_CHI_TIET_KHOA_HOC, GET_CHI_TIET_KHOA_HOC } from "../api";
import { CourseDetailInterface } from "../interfaces/commoninterfaces";
import axiosInstance from "../../axios";


export const getBaiKhoaTrongKhoaHoc = (khoaHocId: number) => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_CHI_TIET_KHOA_HOC
            .concat("?courseId=" + khoaHocId)
    })
    return response
}

export const themChiTietKhoaHoc = (inputData: CourseDetailInterface) => {
    const response = axiosInstance({
        method: 'POST',
        url: CREATE_CHI_TIET_KHOA_HOC,
        data: inputData
    })
    return response
}

export const xoaChiTietKhoaHoc = (courseId: number, lessionId: number) => {
    const response = axiosInstance({
        method: 'DELETE',
        url: DELETE_CHI_TIET_KHOA_HOC.concat("?courseId=" + courseId + "&lessonId=" + lessionId),
    })
    return response
}