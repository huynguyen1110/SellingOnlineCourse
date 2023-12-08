using AutoMapper;
using Microsoft.Extensions.Configuration;
using SellingCourses.Dtos.KhoaHoc;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Constants;
using SellingCourses.Common;
using System.IO;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Identity;
using SellingCourses.Dtos.GioHang;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace SellingCourses.Services.Implements
{
    public class KhoaHocServices : IKhoaHocServices
    {

        private readonly SellingCoursesDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _http;

        public KhoaHocServices(SellingCoursesDbContext dbContext, IMapper mapper, IConfiguration configuration, IHttpContextAccessor http)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _configuration = configuration;
            _http = http;
        }

        public List<GetKhoaHocDto> GetAllKhoaHoc(KhoaHocFilter khoaHocFilter, string theLoai, int page, int pageSize)
        {

            List<KhoaHoc> khoaHocList = null;

            DateTime CurentDateTime = DateTime.Now;

            if (theLoai != null)
            {
                khoaHocList = _dbContext.KhoaHocs.Where(khoaHoc => khoaHoc.TheLoai.Equals(theLoai)).ToList();
            }
            else
            {
                khoaHocList = _dbContext.KhoaHocs.ToList();
            }

            int skip = (page - 1) * pageSize;

            khoaHocList = khoaHocList.Skip(skip).Take(pageSize).ToList();

            if (!string.IsNullOrEmpty(khoaHocFilter.SapXepKhoaHocTheo))
            {
                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.MAC_DINH))
                {
                    khoaHocList = khoaHocList.Skip(skip).Take(pageSize).ToList();
                }

                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.HOC_NHIEU))
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.LuotBan > 20).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.HOC_NHIEU))
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.LuotBan > 20).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.DANH_GIA_CA0))
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.DiemDanhGia >= 4).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.MOI_NHAT))
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.CreateAt >= CurentDateTime.AddMonths(-1)
                                                                && khoaHoc.CreateAt < CurentDateTime).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.GIA_THAP_DEN_CAO))
                {
                    khoaHocList = khoaHocList.OrderBy(khoaHoc => khoaHoc.GiaGiam).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheo.Equals(SapXepKhoaHocTheoConstants.GIA_CAO_DEN_THAP))
                {
                    khoaHocList = khoaHocList.OrderByDescending(khoaHoc => khoaHoc.GiaGiam).ToList();
                }
            }

            if (!khoaHocFilter.SapXepKhoaHocTheoDanhGia.Equals(0))
            {
                if (khoaHocFilter.SapXepKhoaHocTheoDanhGia >= (int)LuotDanhGiaConstaint.ThreeStars)
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.DiemDanhGia >= (int)LuotDanhGiaConstaint.ThreeStars).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheoDanhGia >= (int)LuotDanhGiaConstaint.FourStars)
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.DiemDanhGia >= (int)LuotDanhGiaConstaint.FourStars).ToList();
                }
                if (khoaHocFilter.SapXepKhoaHocTheoDanhGia >= (int)LuotDanhGiaConstaint.FiveStars)
                {
                    khoaHocList = khoaHocList.Where(khoaHoc => khoaHoc.DiemDanhGia >= (int)LuotDanhGiaConstaint.FiveStars).ToList();
                }
            }


            if (khoaHocList != null)
            {
                List<GetKhoaHocDto> khoaHocDtoList = _mapper.Map<List<GetKhoaHocDto>>(khoaHocList);
                khoaHocDtoList = khoaHocDtoList.Where(x => x.Deleted == false).ToList();
                return khoaHocDtoList;
            }
            return null;
        }

        public List<GetKhoaHocDto> GetKhoaHocBanChay()
        {
            var BestSeller = _dbContext.KhoaHocs.Where(khoaHoc => khoaHoc.LuotBan > 20).ToList();
            if (BestSeller != null)
            {
                var KhoaHocListDto = _mapper.Map<List<GetKhoaHocDto>>(BestSeller);
                return KhoaHocListDto;
            }
            throw new Exception("Data is null");
        }

        public List<GetKhoaHocDto> GetKhoaHocUuDai()
        {
            var KhoaHocUuDai = _dbContext.KhoaHocs
                                            .Where(khoaHoc => khoaHoc.GiaGiam < khoaHoc.GiaGoc * (decimal)0.6)
                                            .ToList();
            if (KhoaHocUuDai != null)
            {
                var KhoaHocDto = _mapper.Map<List<GetKhoaHocDto>>(KhoaHocUuDai);
                return KhoaHocDto;
            }

            throw new Exception("Data is null");
        }

        public List<GetKhoaHocDto> GetKhoaHocMoi()
        {
            DateTime CurentDateTime = DateTime.Now;

            var ListKhoaHocMoi = _dbContext.KhoaHocs
                                            .Where(khoaHoc => khoaHoc.CreateAt >= CurentDateTime.AddMonths(-1)
                                                                && khoaHoc.CreateAt < CurentDateTime);
            if (ListKhoaHocMoi != null)
            {
                var KhoaHocDto = _mapper.Map<List<GetKhoaHocDto>>(ListKhoaHocMoi);
                return KhoaHocDto;
            }
            throw new Exception("Data is null");
        }
        public GetKhoaHocDto GetById(int id)
        {
            var khoaHoc = _dbContext.KhoaHocs.FirstOrDefault(kh => kh.Id == id);

            if (khoaHoc == null)
            {
                return null; // Hoặc có thể throw một ngoại lệ NotFoundException
            }

            var khoaHocDto = _mapper.Map<GetKhoaHocDto>(khoaHoc);
            return khoaHocDto;
        }
        public void UpdateYeuThich(int id, bool isFavorite)
        {
            var khoaHoc = _dbContext.KhoaHocs.FirstOrDefault(kh => kh.Id == id);

            if (khoaHoc != null)
            {
                khoaHoc.YeuThich = isFavorite;
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Không tìm thấy khóa học với ID này.");
            }
        }
        public List<GetKhoaHocDto> GetKhoahocyeuthich()
        {
            var yeuThichCourses = _dbContext.KhoaHocs.Where(khoaHoc => khoaHoc.YeuThich == true).ToList();
            if (yeuThichCourses != null)
            {
                var yeuThichCoursesDto = _mapper.Map<List<GetKhoaHocDto>>(yeuThichCourses);
                return yeuThichCoursesDto;
            }
            throw new Exception("Data is null");
        }


        public List<KhoaHocGioHangDto> GetKhoaHocTuGioHang(string userEmail)
        {
            var User = _dbContext.Users.FirstOrDefault(user => user.Email == userEmail);

            if (User != null)
            {
                int userId = User.Id;
                var khoaHocList = (from gioHang in _dbContext.GioHangs
                                   where gioHang.IdUser == userId && gioHang.IdUser == userId
                                   join khoaHoc in _dbContext.KhoaHocs on gioHang.IdKhoaHoc equals khoaHoc.Id
                                   where gioHang.Deleted == false
                                   select new KhoaHocGioHangDto
                                   {
                                       Id = khoaHoc.Id,
                                       IdGioHang = gioHang.Id,
                                       TenKhoaHoc = khoaHoc.TenKhoaHoc,
                                       Thumnail = khoaHoc.Thumnail,
                                       GiaGoc = khoaHoc.GiaGoc,
                                       GiaGiam = khoaHoc.GiaGiam,
                                       LuotBan = khoaHoc.LuotBan,
                                       DiemDanhGia = khoaHoc.DiemDanhGia,
                                       NoiDung = khoaHoc.NoiDung,
                                       GioiThieu = khoaHoc.GioiThieu,
                                       TheLoai = khoaHoc.TheLoai,
                                       Deleted = khoaHoc.Deleted,
                                       CreateBy = khoaHoc.CreateBy
                                   }).ToList();

                return khoaHocList;
            }
            return null;
        }
        public PagingResult<GetKhoaHocDto> GetAll(KhoaHocFilterDto input)
        {
            PagingResult<GetKhoaHocDto> result = new PagingResult<GetKhoaHocDto>();
            var khoaHoc = _dbContext.KhoaHocs.AsNoTracking().OrderByDescending(p => p.Id)
                .Where(kh => kh.TenKhoaHoc.Contains(input.Keyword) && kh.Deleted == false);
            if (input.PageSize != -1)
            {
                khoaHoc = khoaHoc.Skip(input.Skip).Take(input.PageSize);
            }
            result.TotalItems = khoaHoc.Count();
            var items = new List<GetKhoaHocDto>();
            foreach (var item in khoaHoc)
            {
                var khoaHocDto = _mapper.Map<GetKhoaHocDto>(item);
                items.Add(khoaHocDto);
            }
            result.Items = items;
            return result;
        }

        public CreateKhoaHocDto CreateKhoaHoc(CreateKhoaHocDto input)
        {
            if (input != null)
            {
                KhoaHoc NewKhoaHoc = _mapper.Map<KhoaHoc>(input);
                NewKhoaHoc.CreateAt = DateTime.Now;
                NewKhoaHoc.UpdateAt =  DateTime.Now;
                _dbContext.KhoaHocs.Add(NewKhoaHoc);
                _dbContext.SaveChanges();
                return input;
            }
            return null;
        }

        public void DeleteKhoaHocById(int id)
        {
            KhoaHoc khoaHoc = _dbContext.KhoaHocs.FirstOrDefault(KhoaHoc => KhoaHoc.Id == id);
            if (khoaHoc != null)
            {
                khoaHoc.Deleted = true;
                _dbContext.SaveChanges();
            } else
            {
                throw new Exception("Khóa học không tồn tại");
            }
        }

        public List<KhoaHocRegisteredDto> GetKhoaHocRegisted()
        {
            var userIdCurrent = _http.HttpContext.User.Claims.FirstOrDefault(x => x.Type == CustomClaimRoles.UserId);
            var query = (from _dangKy in _dbContext.DangKies
                         join _khoaHoc in _dbContext.KhoaHocs on _dangKy.IdKhoaHoc equals _khoaHoc.Id
                         join _user in _dbContext.Users on _dangKy.IdUser equals _user.Id
                         select new KhoaHocRegisteredDto
                         {
                             UserId = _user.Id,
                             Id = _khoaHoc.Id,
                             TenKhoaHoc = _khoaHoc.TenKhoaHoc,
                             Thumnail = _khoaHoc.Thumnail,
                             GiaGoc = _khoaHoc.GiaGoc,
                             GiaGiam = _khoaHoc.GiaGiam,
                             LuotBan = _khoaHoc.LuotBan,
                             DiemDanhGia = _khoaHoc.DiemDanhGia,
                             NoiDung = _khoaHoc.NoiDung,
                             GioiThieu = _khoaHoc.GioiThieu,
                             TheLoai = _khoaHoc.TheLoai,
                             Deleted = _khoaHoc.Deleted,
                             CreateBy = _khoaHoc.CreateBy
                         });
            var result = query?.Where(x => x.UserId == Int32.Parse(userIdCurrent.Value));
            return result.ToList();
        }

        public CreateKhoaHocDto UpdateKhoaHocById(int id, CreateKhoaHocDto input)
        {
            KhoaHoc khoaHoc = _dbContext.KhoaHocs.FirstOrDefault(KhoaHoc => KhoaHoc.Id == id && KhoaHoc.Deleted == false);
            if (khoaHoc != null)
            {
                _mapper.Map(input, khoaHoc);
                khoaHoc.UpdateAt = DateTime.Now;
                _dbContext.SaveChanges();
                return input;
            }
            return null;
        }
    }
}
