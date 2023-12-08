import axios from "axios"
import { CREATE_PAYMENT_URI, DELETE_PAYMENT_URI, GET_ALL_PAYMENTS_URI, SELECT_ALL, UPDATE_PAYMENT_STATUS_URI, UPLOAD_IMAGE } from "../api"
import { PaymentInterface } from "../interfaces/commoninterfaces"
import { registerCustomIconType } from "@rneui/base"
import axiosInstance from "../../axios"

export const uploadPayingImage = async (selectedFile: string) => {
    const formData: any = new FormData()
    formData.append('file', {
        uri: selectedFile,
        type: 'image/jpeg', // Loại ảnh, bạn có thể đổi tùy vào loại ảnh bạn đang sử dụng
        name: 'image.jpg',
    })
    const response = axiosInstance({
        method: 'POST',
        url: UPLOAD_IMAGE,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    return response
}

export const createNewPayment = (paymentData: PaymentInterface) => {
    const response = axiosInstance({
        method: 'POST',
        url: CREATE_PAYMENT_URI,
        data: paymentData
    })
    return response
}

// /get-all?TrangThai=DA_XAC_NHAN&pageSize=11&pageNumber=1'
export const getAllPayments = (pageSize: number, pageNumber: number, keyWord: string, SortByCreateDate:boolean, status: string) => {
    const response = axiosInstance({
        method: 'GET',
        url: GET_ALL_PAYMENTS_URI.concat("?SortByCreateDate=" + SortByCreateDate + "&TrangThai=" + status +  "&pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&keyword=" + keyWord),
    })
    return response
}

export const deletePaymentByIdService = (id: number) => {
    const response = axiosInstance({
        method: 'PUT',
        url: DELETE_PAYMENT_URI.concat("?id=" + id)
    });
    return response;
}

export const updatePaymentStatusService = (id: number) => {
    const response = axiosInstance({
        method: 'PUT',
        url: UPDATE_PAYMENT_STATUS_URI.concat("?id=" + id)
    });
    return response;
}

export const selectAllPayment = () => {
    const response = axiosInstance({
        method: 'GET',
        url: SELECT_ALL
    });
    return response;
}
