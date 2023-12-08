using SellingCourses.Dtos.GioHang;
using SellingCourses.Entities;

namespace SellingCourses.Services.Interfaces
{
    public interface IGioHangServices
    {
        bool CreateGioHang(int khoaHocId);
        bool DeleteGioHangById(int id);
        List<KhoaHocGioHangDto> GetAllGioHang();
    }
}
