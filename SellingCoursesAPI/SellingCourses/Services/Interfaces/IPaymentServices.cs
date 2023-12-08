using SellingCourses.Common;
using SellingCourses.Dtos.Payment;

namespace SellingCourses.Services.Interfaces
{
    public interface IPaymentServices
    {
        CreatePaymentDto CreatePayment(CreatePaymentDto input);
        List<List<GetPaymentDto>> GetAllPayments(PaymentFilterDto filter);
        void DeletePaymentById(int id);
        void CapNhatTrangThai(int id);
        List<GetPaymentDto> GetAll();
    }
}
