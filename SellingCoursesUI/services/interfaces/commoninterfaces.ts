import { Double } from "react-native/Libraries/Types/CodegenTypes"

export interface CourseInterface {
    id: number
    idGioHang: number
    tenKhoaHoc: string
    thumnail: string
    giaGoc: number
    giaGiam: number
    noiDung: string
    gioiThieu: string
    theLoai: string
    deleted: boolean
    createAt: string
    updateAt: string
    createBy: string
}

export interface UserInfoInterface {
    id: number
    firstName: string
    lastName: string
    email: string
    sdt: string
    verify: boolean
    idRole: number
    deleted: boolean
    createAt: string
    updateAt: string
    yeuThich: boolean,
    gioiTInh: string,
    ngayThangNamSinh: string
}

export interface PaymentInterface {
    id: number,
    idKhoaHoc: number,
    idUser: number,
    hoTen: string,
    tenKhoaHoc: string,
    gia: number,
    noiDung: string,
    anhChuyenKhoan: string,
    createAt: string,
    updateAt: string,
    createBy: string,
    deleted: boolean,
    trangThai: boolean
}

export interface RegisterCourseInterface {
    id: number
    idUser: number
    idKhoaHoc: number
    createAt: string
    updateAt: string
    createBy: string,
    deleted: boolean
}

export interface RegisterCourseInterface {
    id: number
    idUser: number
    idKhoaHoc: number
    createAt: string
    updateAt: string
    createBy: string
}

export interface LessonInterface {
    id: any,
    tenBaiHoc: string,
    noiDung: string,
    moTa: string,
    deleted: boolean,
    createAt: string,
    createBy: string,
}

export interface CourseDetailInterface {
    id: number
    idKhoaHoc: number
    idBaiHoc: number
    deleted: boolean,
    createAt: string
    updateAt: string
    createBy: string
}
