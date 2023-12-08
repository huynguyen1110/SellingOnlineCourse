using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SellingCourses.Common;
using SellingCourses.Dtos.Payment;
using SellingCourses.Services.Implements;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Controllers
{
    [ApiController]
    [Route("api/thanh-toan")]
    public class PaymentControllers : Controller
    {
        private readonly IPaymentServices _paymentserService;

        public PaymentControllers(IPaymentServices paymentserService)
        {
            _paymentserService = paymentserService;
        }

        [HttpPost("create-payment")]
        public IActionResult CreateNewPayment([FromBody] CreatePaymentDto createPaymentDto)
        {
            try
            {
                var NewPayment = _paymentserService.CreatePayment(createPaymentDto);
                if (NewPayment != null)
                {
                    return Ok(NewPayment);
                }
                return BadRequest("Lỗi khi thanh toán");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all")]
        public IActionResult GetAllPayments([FromQuery] PaymentFilterDto filter)
        {
            try
            {
                return Ok(_paymentserService.GetAllPayments(filter));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("delete-payment-id")]
        public IActionResult DeletePaymentByid([FromQuery] int id)
        {
            try
            {
                _paymentserService.DeletePaymentById(id);
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("update-payment-status-id")]
        public IActionResult CaoNhatTrangThai([FromQuery] int id)
        {
            try
            {
                _paymentserService.CapNhatTrangThai(id);
                return Ok("Cập nhật thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("select-all")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_paymentserService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
