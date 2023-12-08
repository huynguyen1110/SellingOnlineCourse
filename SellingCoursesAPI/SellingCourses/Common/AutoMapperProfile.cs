using AutoMapper;
using SellingCourses.Dtos.BaiHoc;
using SellingCourses.Dtos.ChiTietKhoaHoc;
using SellingCourses.Dtos.KhoaHoc;
using SellingCourses.Dtos.Payment;
using SellingCourses.Dtos.User;
using SellingCourses.Entities;

namespace SellingCourses.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<KhoaHoc, GetKhoaHocDto>();
            CreateMap<CreateKhoaHocDto, KhoaHoc>();
            CreateMap<User, GetUserDto>();
            CreateMap<UpdateUserDto, User>();
            CreateMap<CreatePaymentDto, Payment>();
            CreateMap<Payment, GetPaymentDto>();
            CreateMap<BaiHoc, GetBaiHocDto>();
            CreateMap<CreateBaiHocDto, BaiHoc>();
            CreateMap<CreateChiTietKhoaHocDto, ChiTietKhoaHoc>();
        }
    }
}
