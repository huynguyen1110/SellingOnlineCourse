using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Common;
using SellingCourses.Constants;
using SellingCourses.Dtos.KhoaHoc;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Controllers
{
    [ApiController]
    [Route("api/khoa-hoc")]
    public class KhoaHocControllers : ControllerBase
    {

        private readonly IKhoaHocServices khoaHocServices;

        public KhoaHocControllers(IKhoaHocServices khoaHocServices)
        {
            this.khoaHocServices = khoaHocServices;
        }

        [HttpGet("get-all-theloai-page-pageSize")]
        public IActionResult GetAllKhoaHoc([FromQuery] KhoaHocFilter sapxeptheo, string theLoai, int page = 1, int pageSize = 20)
        {
            try {
                var result = khoaHocServices.GetAllKhoaHoc(sapxeptheo, theLoai, page, pageSize);
                return Ok(result);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-banchay")]
        public IActionResult GetKhoaHocBanChay()
        {
            try
            {
                var Result = khoaHocServices.GetKhoaHocBanChay();
                return Ok(Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-uu-dai")]
        public IActionResult GetKhoaHocUuDai()
        {
            try
            {
                var Result = khoaHocServices.GetKhoaHocUuDai();
                return Ok(Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-moi")]
        public IActionResult GetKhoaHocMoi()
        {
            try
            {
                var Result = khoaHocServices.GetKhoaHocMoi();
                return Ok(Result);
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
                var khoaHoc = khoaHocServices.GetById(id);
                if (khoaHoc == null)
                {
                    return NotFound("Không tìm thấy khóa học với id này.");
                }
                return Ok(khoaHoc);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-khoa-hoc-trong-gio-hang")]
        public IActionResult GetKhoaHocTrongGioHang([FromQuery] string email)
        {
            try
            {
                var khoaHocList = khoaHocServices.GetKhoaHocTuGioHang(email);
                if (khoaHocList == null)
                {
                    return BadRequest("Không có dữ liệu");
                }
                return Ok(khoaHocList);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-yeu-thich/{id}")]
        public IActionResult UpdateYeuThich(int id, [FromBody] bool isFavorite)
        {
            try
            {
                khoaHocServices.UpdateYeuThich(id, isFavorite);
                return Ok("Cập nhật trạng thái ưa thích thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all")]

        public ResponseModelBase<PagingResult<GetKhoaHocDto>> GetAll([FromQuery] KhoaHocFilterDto input)
        {
            try
            {
                var khoaHoc = khoaHocServices.GetAll(input);
                return new ResponseModelBase<PagingResult<GetKhoaHocDto>>
                {
                    Data = khoaHoc,
                    Message = "Thành công",
                    StatusCode = StatusCodeApp.Success,
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<PagingResult<GetKhoaHocDto>>
                {
                    Message = ex.Message,
                    StatusCode = StatusCodeApp.InternalServer,
                };
            }
        }

        [HttpGet("get-yeu-thich")]
        public IActionResult GetKhoahocyeuthich()
        {
            try
            {
                var yeuThichCourses = khoaHocServices.GetKhoahocyeuthich();
                return Ok(yeuThichCourses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public IActionResult CreateKhoaHoc([FromBody] CreateKhoaHocDto input)
        {
            try
            {
                var NewKhoaHoc = khoaHocServices.CreateKhoaHoc(input);
                if (input != null)
                {
                    return Ok(NewKhoaHoc);
                }
                return BadRequest("Tạo khóa học thất bại ");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-khoa-hoc-id")]
        public IActionResult UpdateKhoaHocById([FromBody] CreateKhoaHocDto input, [FromQuery] int id)
        {
            try
            {
                var NewKhoaHocInfo = khoaHocServices.UpdateKhoaHocById(id, input);
                if (input != null)
                {
                    return Ok(NewKhoaHocInfo);
                }
                return BadRequest("Cập nhật thông tin thất bại");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("delete-khoa-hoc-id")]
        public IActionResult DeleteKhoaHocById([FromQuery] int id)
        {
            try
            {
                khoaHocServices.DeleteKhoaHocById(id);
                return Ok("Đã xóa khóa học id: " + id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("khoa-hoc-registered")]
        public ResponseModelBase<KhoaHocRegisteredDto> KhoaHocRegistered()
        {
            try
            {
                var result = khoaHocServices.GetKhoaHocRegisted();
                return new ResponseModelBase<KhoaHocRegisteredDto>()
                {
                    ListData = result,
                    Message = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<KhoaHocRegisteredDto>()
                {
                    Message = ex.Message,
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }
    }
}
