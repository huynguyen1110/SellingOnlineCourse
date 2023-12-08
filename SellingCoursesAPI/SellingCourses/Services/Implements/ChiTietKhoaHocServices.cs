using AutoMapper;
using SellingCourses.Dtos.ChiTietKhoaHoc;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Services.Implements
{
    public class ChiTietKhoaHocServices : IChiTietKhoaHocServices
    {
        private readonly SellingCoursesDbContext _dbContext;
        private readonly IMapper _mapper;

        public ChiTietKhoaHocServices(SellingCoursesDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public bool LessonAlreadyAddedToCourse(int courseId, int lessionId)
        {
            return _dbContext.ChiTietKhoaHocs.Any(cd => cd.IdKhoaHoc == courseId && cd.IdBaiHoc == lessionId);
        }


        public ChiTietKhoaHoc ThemChiTiet(CreateChiTietKhoaHocDto createChiTietKhoaHocDto)
        {
            if (LessonAlreadyAddedToCourse(createChiTietKhoaHocDto.IdKhoaHoc, createChiTietKhoaHocDto.IdBaiHoc))
            {
                return null;
            }

            if (_dbContext.KhoaHocs.Any(kh => kh.Id == createChiTietKhoaHocDto.IdKhoaHoc && !kh.Deleted) && _dbContext.BaiHocs.Any(bh => bh.Id == createChiTietKhoaHocDto.IdBaiHoc && !bh.Deleted))
            {
                var chiTietKhoaHoc = _mapper.Map<CreateChiTietKhoaHocDto, ChiTietKhoaHoc>(createChiTietKhoaHocDto);
                chiTietKhoaHoc.CreateAt = DateTime.Now;
                chiTietKhoaHoc.UpdateAt = DateTime.Now;
                _dbContext.ChiTietKhoaHocs.Add(chiTietKhoaHoc);
                _dbContext.SaveChanges();

                return chiTietKhoaHoc;
            }
            
            throw new Exception("Thêm khóa học lỗi");
        }

        public void XoaChiTiet(int courseId, int lessonId)
        {
            var chiTietToDelete = _dbContext.ChiTietKhoaHocs.FirstOrDefault(cd => cd.IdKhoaHoc == courseId && cd.IdBaiHoc == lessonId);

            if (chiTietToDelete != null)
            {
                _dbContext.ChiTietKhoaHocs.Remove(chiTietToDelete);
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Không tìm thấy chi tiết khóa học để xóa.");
            }
        }

        public List<ChiTietKhoaHoc> LayTatCaBaiHocTrongKhoaHoc(int courseId)
        {
            var chiTietList = _dbContext.ChiTietKhoaHocs
                .Where(cd => cd.IdKhoaHoc == courseId)
                .ToList();

            return chiTietList;
        }
    }
}
