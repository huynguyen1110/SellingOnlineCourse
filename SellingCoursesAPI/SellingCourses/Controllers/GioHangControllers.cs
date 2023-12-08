using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Controllers
{
    [ApiController]
    [Route("api/gio-hang")]
    public class GioHangControllers : ControllerBase
    {

        private readonly IGioHangServices _gioHangServices;

        public GioHangControllers(IGioHangServices gioHangServices)
        {
            _gioHangServices = gioHangServices;
        }

        [HttpPost("create")]
        public IActionResult CreateGioHang([FromBody] int khoaHocId)
        {
            try
            {
                var NewGioHang = _gioHangServices.CreateGioHang(khoaHocId);
                return Ok(NewGioHang);
            } catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("delete-gio-hang-id")]
        public IActionResult DeleteGioHang([FromQuery] int id)
        {
            try
            {
                _gioHangServices.DeleteGioHangById(id);
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var gioHangs = _gioHangServices.GetAllGioHang();
                return Ok(gioHangs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
