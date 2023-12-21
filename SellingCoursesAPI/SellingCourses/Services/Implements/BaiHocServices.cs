      using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SellingCourses.Common;
using SellingCourses.Dtos.BaiHoc;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using SellingCourses.Dtos.KhoaHoc;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Constants;

namespace SellingCourses.Services.Implements
{
    public class BaiHocService : IBaiHocService
    {
        private readonly SellingCoursesDbContext _dbContext;
        private readonly IMapper _mapper;

        public BaiHocService(SellingCoursesDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<PagingResult<GetBaiHocDto>> GetBaiHocAsync(BaiHocFilterDto filter)
        {

            int pageSize = filter.PageSize > 0 ? filter.PageSize : 10;
            int pageNumber = filter.PageNumber > 0 ? filter.PageNumber : 1;

            var result = new PagingResult<GetBaiHocDto>();
            var baiHocQuery = _dbContext.BaiHocs.AsNoTracking().Where(bh => !bh.Deleted);

            if (!string.IsNullOrEmpty(filter.Keyword))
            {
                baiHocQuery = baiHocQuery.Where(bh => bh.TenBaiHoc.Contains(filter.Keyword));
            }

            baiHocQuery = baiHocQuery.OrderBy(bh => bh.TenBaiHoc);

            var totalItems = await baiHocQuery.CountAsync();

            int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

            if (pageNumber <= totalPages)
            {
                int skip = (pageNumber - 1) * pageSize;
                baiHocQuery = baiHocQuery.Skip(skip).Take(pageSize);
            }
            else
            {
                baiHocQuery = baiHocQuery.Skip(0).Take(0);
            }

            var baiHocList = await baiHocQuery.ToListAsync();
            var baiHocDtoList = _mapper.Map<List<GetBaiHocDto>>(baiHocList);

            result.TotalItems = totalItems;
            result.Items = baiHocDtoList;

            return result;
        }


        public async Task<BaiHoc> CreateBaiHocAsync(CreateBaiHocDto createBaiHocDto)
        {
            var baiHoc = _mapper.Map<BaiHoc>(createBaiHocDto);
            baiHoc.CreateAt = DateTime.Now;
            baiHoc.UpdateAt = DateTime.Now;
            baiHoc.CreateBy = "HuyMV";
            // Thực hiện lưu bài học vào cơ sở dữ liệu
            _dbContext.BaiHocs.Add(baiHoc);
            await _dbContext.SaveChangesAsync();
            return baiHoc; // Trả về bài học đã được tạo
        }
        public CreateBaiHocDto UpdateBaiHocById(int id, CreateBaiHocDto input)
        {
            BaiHoc baiHoc = _dbContext.BaiHocs.FirstOrDefault(BaiHoc => BaiHoc.Id == id && BaiHoc.Deleted == false);
            if (baiHoc != null)
            {
                _mapper.Map(input, baiHoc);
                baiHoc.UpdateAt = DateTime.Now;
                _dbContext.SaveChanges();
                return input;
            }
            return null;
        }
        public void DeletedBaiHocById(int id)
        {
            BaiHoc baiHoc = _dbContext.BaiHocs.FirstOrDefault(BaiHoc => BaiHoc.Id == id);
            if (baiHoc != null)
            {
                baiHoc.Deleted = true;
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Bai học không tồn tại");
            }
        }
        public GetBaiHocDto GetById(int id)
        {
            var baiHoc = _dbContext.BaiHocs.FirstOrDefault(bh => bh.Id == id && bh.Deleted == false);

            if (baiHoc == null)
            {
                return null;
            }

            var baiHocDto = _mapper.Map<GetBaiHocDto>(baiHoc);
            return baiHocDto;
        }

        public List<GetBaiHocDto> GetByIdKhoaHoc(int idKhoaHoc)
        {
            var query = (from dt in _dbContext.ChiTietKhoaHocs
                         join bh in _dbContext.BaiHocs
                         on dt.IdBaiHoc equals bh.Id
                         where dt.IdKhoaHoc == idKhoaHoc
                         select new GetBaiHocDto
                         {
                             Id = dt.IdBaiHoc,
                             MoTa = bh.MoTa,
                             NoiDung = bh.NoiDung,
                             TenBaiHoc = bh.TenBaiHoc
                         });
            return query.ToList();
        }
    }
}
