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

            // Sắp xếp bài học theo tên (hoặc theo yêu cầu của bạn)
            baiHocQuery = baiHocQuery.OrderBy(bh => bh.TenBaiHoc);

            var totalItems = await baiHocQuery.CountAsync();

            // Tính số trang dựa trên pageSize và số lượng mục
            int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

            // Kiểm tra xem có lấy các mục trên trang này hay không
            if (pageNumber <= totalPages)
            {
                int skip = (pageNumber - 1) * pageSize;
                baiHocQuery = baiHocQuery.Skip(skip).Take(pageSize);
            }
            else
            {
                baiHocQuery = baiHocQuery.Skip(0).Take(0); // Trả về danh sách trống nếu vượt quá số trang có sẵn.
            }

            var baiHocList = await baiHocQuery.ToListAsync();
            var baiHocDtoList = _mapper.Map<List<GetBaiHocDto>>(baiHocList);

            result.TotalItems = totalItems;
            result.Items = baiHocDtoList;

            return result;
        }



        /* public async Task<List<GetBaiHocDto>> GetBaiHocAsync(BaiHocFilterDto filter)
        {
            var baiHocQuery = _dbContext.BaiHocs.AsNoTracking().Where(bh => !bh.Deleted);

            if (!string.IsNullOrEmpty(filter.Keyword))
            {
                baiHocQuery = baiHocQuery.Where(bh => bh.TenBaiHoc.Contains(filter.Keyword));
            }

            
            baiHocQuery = baiHocQuery.OrderBy(bh => bh.TenBaiHoc);

            var baiHocList = await baiHocQuery.ToListAsync();
            var baiHocDtoList = _mapper.Map<List<GetBaiHocDto>>(baiHocList);

            return baiHocDtoList;
        }*/

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
                return null; // Hoặc có thể throw một ngoại lệ NotFoundException
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
