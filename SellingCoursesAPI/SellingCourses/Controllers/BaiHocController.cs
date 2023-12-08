using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Common;
using SellingCourses.Constants;
using SellingCourses.Dtos.BaiHoc;
using SellingCourses.Dtos.KhoaHoc;
using SellingCourses.Services.Implements;
using SellingCourses.Services.Interfaces;
using System;

namespace SellingCourses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaiHocController : ControllerBase
    {
        private readonly IBaiHocService _baiHocService;

        public BaiHocController(IBaiHocService baiHocService)
        {
            _baiHocService = baiHocService;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllBaiHoc([FromQuery] BaiHocFilterDto filter)
        {
            try
            {
                var baiHoc = await _baiHocService.GetBaiHocAsync(filter);
                return Ok(baiHoc); // Trả về danh sách bài học
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBase<PagingResult<GetBaiHocDto>>
                {
                    Message = ex.Message,
                    StatusCode = StatusCodeApp.InternalServer,
                });
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateBaiHoc([FromBody] CreateBaiHocDto createBaiHocDto)
        {
            try
            {
                var baiHoc = await _baiHocService.CreateBaiHocAsync(createBaiHocDto);
                return Ok(baiHoc); // Trả về bài học đã được tạo
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBase<string>
                {
                    Message = ex.Message,
                    StatusCode = StatusCodeApp.InternalServer,
                });
            }
        }
        [HttpPut("update-bai-hoc-id")]
        public IActionResult UpdateBaiHocById([FromBody] CreateBaiHocDto input, [FromQuery] int id)
        {
            try
            {
                var NewBaiHocInfo = _baiHocService.UpdateBaiHocById(id, input);
                if (input != null)
                {
                    return Ok(NewBaiHocInfo);
                }
                return BadRequest("Cập nhật thông tin thất bại");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("delete-bai-hoc-id")]
        public IActionResult DeleteBaiHocById([FromQuery] int id)
        {
            try
            {
                _baiHocService.DeletedBaiHocById(id);
                return Ok("Đã xóa bài học id: " + id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-by-id/{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var baiHoc = _baiHocService.GetById(id);
                if (baiHoc == null)
                {
                    return NotFound("Không tìm thấy bài học với id này.");
                }
                return Ok(baiHoc);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-by-id-khoa-hoc/{id}")]
        public IActionResult GetByIdKhoaHoc(int id)
        {
            try
            {
                var baiHoc = _baiHocService.GetByIdKhoaHoc(id);
                if (baiHoc.Count() <= 0 )
                {
                    return NotFound("Không tìm thấy bài học với id này.");
                }
                return Ok(baiHoc);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
