using AutoMapper;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Services.Implements
{
    public class DangKyServices : IDangKyServices
    {

        private readonly SellingCoursesDbContext _dbContext;
        private readonly IMapper _mapper;

        public DangKyServices(SellingCoursesDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public DangKy CreateDangKy(int idKhoaHoc, int userId)
        {
            var User = _dbContext.Users.FirstOrDefault(user => user.Id == userId && user.Deleted == false);
            var KhoaHoc = _dbContext.KhoaHocs.FirstOrDefault(khoaHoc => khoaHoc.Id == idKhoaHoc && khoaHoc.Deleted == false);
            if (User == null)
            {
                throw new Exception("Đăng ký lỗi do người dùng không tồn tại");
            } else if (KhoaHoc == null)
            {
                throw new Exception("Đăng ký lỗi do khoa học không tồn tại");
            } else
            {
                var NewDangKy = new DangKy
                {
                    IdKhoaHoc = idKhoaHoc,
                    IdUser = userId,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                    Deleted = false,
                    CreateBy = User.Email,
                };
                _dbContext.DangKies.Add(NewDangKy);
                _dbContext.SaveChanges();
                return NewDangKy;
            }
        }

        public void DeleteDangKyById(int id)
        {
            var DangKy = _dbContext.DangKies.FirstOrDefault(k => k.Id == id);
            if (DangKy == null)
            {
                throw new Exception("Khóa học không tồn tại");
            } else
            {
                DangKy.Deleted = true;
                _dbContext.SaveChanges();
            }
        }

        public List<DangKy> GetAllDangKy()
        {
            var dangKy = _dbContext.DangKies.Where(x => x.Deleted == false).ToList();
            return dangKy;
            
        }
    }
}
