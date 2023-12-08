using AutoMapper;
using SellingCourses.Dtos.GioHang;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Services.Implements
{
    public class GioHangServices : IGioHangServices
    {

        private readonly SellingCoursesDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserServices _userServices;

        public GioHangServices(SellingCoursesDbContext dbContext, IMapper mapper, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IUserServices userServices)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _userServices = userServices;
        }

        public bool CreateGioHang(int khoaHocId)
        {
            var user = _userServices.GetCurrentUser();
            if (user != null)
            {
                string userName = user.FirstName + " " + user.LastName;
                var khoaHoc = _dbContext.KhoaHocs.FirstOrDefault(kh => kh.Id == khoaHocId);
                if (khoaHoc == null)
                {
                    return false;
                }
                var gioHang = _dbContext.GioHangs.FirstOrDefault(x => x.IdKhoaHoc == khoaHocId && x.IdUser == user.Id && x.Deleted == false);
                if (gioHang == null)
                {
                    var gioHangNew = new GioHang()
                    {
                        IdKhoaHoc = khoaHocId,
                        IdUser = user.Id, 
                        CreateAt = DateTime.Now,
                        CreateBy = userName,
                        UpdateAt = DateTime.Now,
                        Deleted = false
                    };
                    _dbContext.GioHangs.Add(gioHangNew);
                    _dbContext.SaveChanges(); 
                }
                else
                {
                    return false;
                }
            }
            else
            {
                throw new Exception("Token không hợp lệ");
            }
            return true;
        }

        public bool DeleteGioHangById(int idKhoaHoc)
        {
            var user = _userServices.GetCurrentUser();
            
            var khoaHoc = _dbContext.KhoaHocs.FirstOrDefault(kh => kh.Id == idKhoaHoc);
            if (khoaHoc == null)
            {
                return false;
            }

            if(user != null)
            {
                var gioHang = _dbContext.GioHangs.FirstOrDefault(x => x.IdKhoaHoc == idKhoaHoc && x.IdUser == user.Id && x.Deleted == false);
                if(gioHang != null)
                {
                    gioHang.Deleted = true;
                    _dbContext.SaveChanges();
                    return true;
                }
            }
            else
            {
                throw new Exception("Token không hợp lệ");
            }
            return false;
        }

        public List<KhoaHocGioHangDto> GetAllGioHang()
        {
            var user = _userServices.GetCurrentUser();
            if (user != null)
            {
                var gioHangs = (from dt in _dbContext.GioHangs
                                join kh in _dbContext.KhoaHocs
                                on dt.IdKhoaHoc equals kh.Id
                                where dt.Deleted == false && dt.IdUser == user.Id
                                select new KhoaHocGioHangDto()
                                {
                                    Id = dt.IdKhoaHoc,
                                    IdGioHang = dt.Id, 
                                    CreateAt = dt.CreateAt,
                                    CreateBy = dt.CreateBy,
                                    Deleted = dt.Deleted,
                                    GiaGiam = kh.GiaGiam, 
                                    GiaGoc = kh.GiaGoc,
                                    DiemDanhGia = kh.DiemDanhGia, 
                                    GioiThieu = kh.GioiThieu,
                                    LuotBan = kh.LuotBan,
                                    NoiDung = kh.NoiDung,
                                    TenKhoaHoc = kh.TenKhoaHoc, 
                                    TheLoai = kh.TheLoai,
                                    Thumnail = kh.Thumnail

                                });
                return gioHangs.ToList();
            }
            return null;
        }
    }
}
