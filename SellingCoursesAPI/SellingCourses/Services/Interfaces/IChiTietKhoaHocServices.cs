using SellingCourses.Dtos.ChiTietKhoaHoc;
using SellingCourses.Entities;

namespace SellingCourses.Services.Interfaces
{
    public interface IChiTietKhoaHocServices
    {

        ChiTietKhoaHoc ThemChiTiet(CreateChiTietKhoaHocDto createChiTietKhoaHocDto);
        bool LessonAlreadyAddedToCourse(int courseId, int lessionId);
        void XoaChiTiet(int courseId, int lessonId);
        List<ChiTietKhoaHoc> LayTatCaBaiHocTrongKhoaHoc(int courseId);

    }
}
