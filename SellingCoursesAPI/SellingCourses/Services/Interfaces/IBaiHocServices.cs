using SellingCourses.Common;
using SellingCourses.Dtos.BaiHoc;
using SellingCourses.Dtos.KhoaHoc;
using SellingCourses.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SellingCourses.Services.Interfaces
{
    public interface IBaiHocService
    {
        Task<PagingResult<GetBaiHocDto>> GetBaiHocAsync(BaiHocFilterDto filter);
        //Task<List<GetBaiHocDto>> GetBaiHocAsync(BaiHocFilterDto filter);
        Task<BaiHoc> CreateBaiHocAsync(CreateBaiHocDto createBaiHocDto);
        // IBaiHocService.cs
        CreateBaiHocDto UpdateBaiHocById(int id, CreateBaiHocDto input);
        void DeletedBaiHocById(int id);
        GetBaiHocDto GetById(int id);

        List<GetBaiHocDto> GetByIdKhoaHoc(int idKhoaHoc);
    }
}


