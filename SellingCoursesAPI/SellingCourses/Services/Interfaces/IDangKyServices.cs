using SellingCourses.Entities;

namespace SellingCourses.Services.Interfaces
{
    public interface IDangKyServices
    {
        DangKy CreateDangKy(int idKhoaHoc, int userId);
        void DeleteDangKyById(int id);
        List<DangKy> GetAllDangKy();
    }
}
