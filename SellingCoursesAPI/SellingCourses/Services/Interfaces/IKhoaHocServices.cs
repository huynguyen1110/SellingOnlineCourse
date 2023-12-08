﻿using Microsoft.AspNetCore.Mvc;
using SellingCourses.Common;
using SellingCourses.Constants;
using SellingCourses.Dtos.GioHang;
using SellingCourses.Dtos.KhoaHoc;

namespace SellingCourses.Services.Interfaces
{
    public interface IKhoaHocServices
    {
        List<GetKhoaHocDto> GetAllKhoaHoc(KhoaHocFilter sapXepKhoaHoc, string theLoai, int page, int pageSize);
        List<GetKhoaHocDto> GetKhoaHocBanChay();
        List<GetKhoaHocDto> GetKhoaHocUuDai();
        List<GetKhoaHocDto> GetKhoaHocMoi();
        GetKhoaHocDto GetById(int id);
        List<KhoaHocGioHangDto> GetKhoaHocTuGioHang(string userEmail);
        PagingResult<GetKhoaHocDto> GetAll(KhoaHocFilterDto input);
        void UpdateYeuThich(int id, bool isFavorite);
        List<GetKhoaHocDto> GetKhoahocyeuthich();
        CreateKhoaHocDto CreateKhoaHoc(CreateKhoaHocDto input);
        CreateKhoaHocDto UpdateKhoaHocById(int id, CreateKhoaHocDto input);
        void DeleteKhoaHocById(int id);
        List<KhoaHocRegisteredDto> GetKhoaHocRegisted();
    }
}
