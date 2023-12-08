import axios from "axios"
import {
GET_ALL_BAI_HOC,
CREAT_BAI_HOC,
GET_BAI_HOC_BY_ID,
UPDATE_BAI_HOC_BY_ID,
DELETE_BAI_HOC_BY_ID,
GET_BAI_HOC_BY_ID_KHOA_HOC
} from "../api"
import { getAccessToken } from "../authentication/loginRegesterServices"
import { getUserEmailFromToken } from "../common"
import axiosInstance from "../../axios"
import { LessonInterface } from "../interfaces/commoninterfaces"



export const createBaiHoc = async (baiHocData: LessonInterface) => {
    const response = await axiosInstance({
        method: 'POST',
        url: CREAT_BAI_HOC,
        data: {
            tenBaiHoc: baiHocData.tenBaiHoc,
            noiDung: baiHocData.noiDung, 
            moTa: baiHocData.moTa, 
            deleted: baiHocData.deleted
        },
    });
    return response;
}
export const getBaiHocById = (id: number) => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_BAI_HOC_BY_ID.concat("/" + id)
    })
    return response
}

export const updateBaiById = async (baiHocData: LessonInterface, id: number) => {
    const response = await axiosInstance({
        method: 'PUT',
        url: UPDATE_BAI_HOC_BY_ID.concat("?id=" + id),
        data: baiHocData,
    });
    return response;
}

export const deleteBaiHoc = async (id: number) => {
    const response = await axiosInstance({
        method: 'PUT',
        url: DELETE_BAI_HOC_BY_ID.concat("?id=" + id),
        data : {
            deleted : true
        }
    });
    return response;
}

// export const getAllBaiHoc = () => {
//     const response = axios ({
//         method : 'GET',
//         url : GET_ALL_BAI_HOC
//     })
//     return response
// }
export const getAllBaiHoc = (PageSize: number,PageNumber : number) => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_ALL_BAI_HOC,
        params: {
            PageSize,
            PageNumber
        }
    });
    return response;
}

export const getBaiHocByIdKhoaHoc = async (id: number) => {
    const response = await axiosInstance({
        method: 'GET',
        url: GET_BAI_HOC_BY_ID_KHOA_HOC.concat("/" + id)
    });
    return response;
}



