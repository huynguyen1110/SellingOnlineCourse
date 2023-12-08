using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Controllers
{
    [ApiController]
    [Route("api/dang-ky")]
    public class DangKyControllers : ControllerBase
    {

        private readonly IDangKyServices _dangKyServices;

        public DangKyControllers(IDangKyServices dangKyServices)
        {
            _dangKyServices = dangKyServices;
        }

        [HttpPost("create-dang-ky")]
        public IActionResult CreateDangKy([FromQuery] int khoaHocId, [FromQuery] int userId)
        {
            try
            {
                var  NewDangKy = _dangKyServices.CreateDangKy(khoaHocId, userId);
                return Ok(NewDangKy);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("delete-dang-ky-id")]
        public IActionResult DeleteDangKyById(int id)
        {
            try
            {
                _dangKyServices.DeleteDangKyById(id);
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var result = _dangKyServices.GetAllDangKy();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
