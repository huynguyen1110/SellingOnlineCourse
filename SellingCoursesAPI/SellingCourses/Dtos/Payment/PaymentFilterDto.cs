using Microsoft.AspNetCore.Mvc;
using SellingCourses.Common;

namespace SellingCourses.Dtos.Payment
{
    public class PaymentFilterDto : PagingBase
    {
        [FromQuery]
        public Boolean SortByCreateDate { get; set; }
        [FromQuery]
        public string TrangThai { get; set; }
    }
}
