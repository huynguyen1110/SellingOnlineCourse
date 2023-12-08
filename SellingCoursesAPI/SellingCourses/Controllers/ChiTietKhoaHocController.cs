using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using SellingCourses.Dtos.ChiTietKhoaHoc;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Controllers
{
    [ApiController]
    [Route("api/chi-tiet-khoa-hoc")]
    public class ChiTietKhoaHocController : ControllerBase
    {
        private IChiTietKhoaHocServices _chiTietKhoaHocServices;

        public ChiTietKhoaHocController(IChiTietKhoaHocServices chiTietKhoaHocServices)
        {
            _chiTietKhoaHocServices = chiTietKhoaHocServices;
        }

        [HttpPost("create-chi-tiet-khoa-hoc")]
        public IActionResult ThemChiTietKhoaHoc(CreateChiTietKhoaHocDto createChiTietKhoaHocDto)
        {
            try
            {
                var Obj = _chiTietKhoaHocServices.ThemChiTiet(createChiTietKhoaHocDto);
                if (Obj != null)
                {
                    return Ok(Obj);
                } else { return BadRequest(); }
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-bai-hoc")]
        public IActionResult LayBaiHocTheoKhoaHoc([FromQuery] int courseId)
        {
            try
            {
                var listOfChiTietKhoaHoc = _chiTietKhoaHocServices.LayTatCaBaiHocTrongKhoaHoc(courseId);
                return Ok(listOfChiTietKhoaHoc);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-chi-tiet-khoa-hoc")]
        public IActionResult XoaChiTietKhoaHoc([FromQuery] int courseId, [FromQuery] int lessonId)
        {
            try
            {
                _chiTietKhoaHocServices.XoaChiTiet(courseId, lessonId);
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
