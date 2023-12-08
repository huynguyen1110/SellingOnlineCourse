export const BASE_URL = "http://192.168.1.175:150"

// API KHOA_HOC

export const GET_KHOA_HOC_URI = BASE_URL.concat("/api/khoa-hoc/get-all-theloai-page-pageSize")

export const GET_BEST_SELLER_URI = BASE_URL.concat("/api/khoa-hoc/get-banchay")

export const GET_KHOA_HOC_UU_DAI_URI = BASE_URL.concat("/api/khoa-hoc/get-uu-dai")

export const GET_KHOA_HOC_MOI_URI = BASE_URL.concat("/api/khoa-hoc/get-moi")

export const GET_KHOA_HOC_BY_ID_URI = BASE_URL.concat("/api/khoa-hoc/get-by-id")

export const GET_KHOA_HOC_TU_GIO_HANG_URI = BASE_URL.concat("/api/khoa-hoc/get-khoa-hoc-trong-gio-hang")

export const SEARCH_KHOA_HOC = BASE_URL.concat("/api/khoa-hoc/get-all")

export const UPDATE_KHOA_HOC_YEUTHICH = BASE_URL.concat("/api/khoa-hoc/update-yeu-thich")

export const GET_KHOA_HOC_YEUTHICH = BASE_URL.concat("/api/khoa-hoc/get-yeu-thich")

export const CREATE_KHOA_HOC_URI = BASE_URL.concat("/api/khoa-hoc/create")

export const UPDATE_KHOA_HOC_BY_ID_URI = BASE_URL.concat("/api/khoa-hoc/update-khoa-hoc-id")

export const DELETE_KHOA_HOC_BY_ID_URI = BASE_URL.concat("/api/khoa-hoc/delete-khoa-hoc-id")

export const GET_COURSES_REGISTERED_URI = BASE_URL.concat("/api/khoa-hoc/khoa-hoc-registered")

// API USER
export const LOGIN = BASE_URL.concat("/api/user/login")

export const REGISTER = BASE_URL.concat("/api/user/create")

export const GET_USER_BY_EMAIL_URI = BASE_URL.concat("/api/user/get-user-by-email")

export const UPDATE_USER_BY_EMAIL = BASE_URL.concat("/api/user/update-user-by-email")

export const FORGOT_PASSWORD = BASE_URL.concat("/api/user/quen-mat-khau")

export const CHANGE_PASSWORD = BASE_URL.concat("/api/user/thay-doi-mat-khau")

export const GET_CURENT_USER = BASE_URL.concat("/api/user/get-current-user")

export const GET_ALL_USER = BASE_URL.concat("/api/user/get-all-user")

// API GIO_HANG

export const CREATE_GIO_HANG_URI = BASE_URL.concat("/api/gio-hang/create")

export const DELETE_GIO_HANG_URI = BASE_URL.concat("/api/gio-hang/delete-gio-hang-id")

export const GET_ALL_GIO_HANG = BASE_URL.concat("/api/gio-hang/get-all")

// UploadFile

export const UPLOAD_IMAGE = BASE_URL.concat("/api/images")

// API THANH_TOAN

export const CREATE_PAYMENT_URI = BASE_URL.concat("/api/thanh-toan/create-payment")
export const GET_ALL_PAYMENTS_URI = BASE_URL.concat("/api/thanh-toan/get-all")
export const DELETE_PAYMENT_URI = BASE_URL.concat("/api/thanh-toan/delete-payment-id")
export const UPDATE_PAYMENT_STATUS_URI = BASE_URL.concat("/api/thanh-toan/update-payment-status-id")
export const SELECT_ALL = BASE_URL.concat("/api/thanh-toan/select-all")

// API DANG_KY_KHOA_HOC
export const CREATE_DANG_KY_URI = BASE_URL.concat("/api/dang-ky/create-dang-ky")
export const DELETE_DANG_KY_URI = BASE_URL.concat("/api/dang-ky/delete-dang-ky-id")
export const GET_ALL_DANG_KY = BASE_URL.concat("/api/dang-ky/get-all")


// API BAI_HOC 
export const GET_ALL_BAI_HOC = BASE_URL.concat("/api/BaiHoc/get-all")
export const CREAT_BAI_HOC = BASE_URL.concat("/api/BaiHoc/create")
export const UPDATE_BAI_HOC_BY_ID = BASE_URL.concat("/api/BaiHoc/update-bai-hoc-id")
export const DELETE_BAI_HOC_BY_ID = BASE_URL.concat("/api/BaiHoc/delete-bai-hoc-id")
export const GET_BAI_HOC_BY_ID = BASE_URL.concat("/api/BaiHoc/get-by-id")
export const GET_BAI_HOC_BY_ID_KHOA_HOC = BASE_URL.concat("/api/BaiHoc/get-by-id-khoa-hoc")
// export const DELETE_PAYMENT_URI = BASE_URL.concat("/api/thanh-toan/delete-payment-id")

// DETAIL COURSE SERVICES
export const GET_CHI_TIET_KHOA_HOC = BASE_URL.concat("/api/chi-tiet-khoa-hoc/get-bai-hoc")
export const CREATE_CHI_TIET_KHOA_HOC = BASE_URL.concat("/api/chi-tiet-khoa-hoc/create-chi-tiet-khoa-hoc")
export const DELETE_CHI_TIET_KHOA_HOC = BASE_URL.concat("/api/chi-tiet-khoa-hoc/delete-chi-tiet-khoa-hoc")


