using AutoMapper;
using SellingCourses.Constants;
using SellingCourses.Dtos.Payment;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;

namespace SellingCourses.Services.Implements
{
    public class PaymentServices : IPaymentServices
    {

        private readonly SellingCoursesDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public PaymentServices(SellingCoursesDbContext dbContext, IMapper mapper, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _configuration = configuration;
        }

        public CreatePaymentDto CreatePayment(CreatePaymentDto input)
        {
            if (input != null)
            {
                Payment NewPayment = _mapper.Map<Payment>(input);
                NewPayment.Deleted = false;
                _dbContext.Payments.Add(NewPayment);
                _dbContext.SaveChanges();
                return input;
            }
            return null;
        }

        public List<List<GetPaymentDto>> GetAllPayments(PaymentFilterDto filter)
        {
            var Payments = _dbContext.Payments
                .GroupBy(payment => new { payment.NoiDung, payment.CreateAt })
                .Select(group => group.ToList())
                .ToList();


            if (!string.IsNullOrEmpty(filter.Keyword))
            {
                var PaymentFiltered = Payments
                    .Where(group => group.Any(payment => payment.NoiDung.Contains(filter.Keyword) ||
                                                         payment.TenKhoaHoc.Contains(filter.Keyword) ||
                                                         payment.CreateBy.Contains(filter.Keyword)))
                    .ToList();

                if (filter.PageSize != -1)
                {
                    PaymentFiltered = PaymentFiltered.Skip(filter.Skip).Take(filter.PageSize).ToList();
                }

                var paymentsDto = PaymentFiltered
                    .SelectMany(group => group)
                    .Select(payment => _mapper.Map<GetPaymentDto>(payment))
                    .ToList();

                if (filter.SortByCreateDate)
                {
                    paymentsDto = paymentsDto.OrderByDescending(payment => payment.CreateAt).ToList();
                }
                else
                {
                    paymentsDto = paymentsDto.OrderBy(payment => payment.CreateAt).ToList();
                }

                return paymentsDto.GroupBy(payment => new { payment.NoiDung, payment.CreateAt })
                                                                                    .Select(group => group.ToList()).ToList();


            }

            if (filter.PageSize != -1)
            {
                var pagedPayments = Payments
                                    .Skip(filter.Skip)
                                    .Take(filter.PageSize)
                                    .Select(group => group.Select(payment => _mapper.Map<GetPaymentDto>(payment)).ToList())
                                    .ToList();

                if (filter.TrangThai == Constants.DangKyStatus.DA_XAC_NHAN)
                {
                    pagedPayments = pagedPayments
                                .Where(group => group.Any(payment => payment.TrangThai == true))
                                .ToList();
                }
                if (filter.TrangThai == Constants.DangKyStatus.CHUA_XAC_NHAN)
                {
                    pagedPayments = pagedPayments
                                .Where(group => group.Any(payment => payment.TrangThai == false))
                                .ToList();
                }

                if (filter.SortByCreateDate)
                {
                    pagedPayments = pagedPayments.OrderByDescending(group => group.First().CreateAt).ToList();
                }
                else
                {
                    pagedPayments = pagedPayments.OrderBy(group => group.First().CreateAt).ToList();
                }

                return pagedPayments;
            }

            return null;
        }

        public void DeletePaymentById(int id)
        {
            var Payment = _dbContext.Payments.FirstOrDefault(payment => payment.Id == id);
            if (Payment != null)
            {
                Payment.Deleted = true;
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Payment không tồn tại");
            }
        }

        public void CapNhatTrangThai(int id)
        {
            var Payment = _dbContext.Payments.FirstOrDefault(payment => payment.Id == id);
            if (Payment != null)
            {
                Payment.TrangThai = true;
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Payment không tồn tại");
            }
        }

        public List<GetPaymentDto> GetAll()
        {
            var query = (from dt in _dbContext.Payments
                         where dt.Deleted == false
                         select new GetPaymentDto
                         {
                             Id = dt.Id,
                             IdUser = dt.IdUser,
                             IdKhoaHoc = dt.IdKhoaHoc,
                             AnhChuyenKhoan = dt.AnhChuyenKhoan, 
                             CreateAt = dt.CreateAt,
                             CreateBy = dt.CreateBy,
                             Deleted = dt.Deleted,
                             Gia = dt.Gia,
                             HoTen = dt.HoTen,
                             NoiDung = dt.NoiDung,
                             TenKhoaHoc = dt.TenKhoaHoc, 
                             TrangThai = dt.TrangThai,  
                             UpdateAt = dt.UpdateAt
                         });
            return query.ToList();
        }
    }
}
