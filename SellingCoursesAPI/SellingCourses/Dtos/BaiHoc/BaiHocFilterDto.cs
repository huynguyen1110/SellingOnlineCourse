namespace SellingCourses.Dtos.BaiHoc
{
    public class BaiHocFilterDto
    {
        public string Keyword { get; set; }
        public int PageSize { get; set; } // Số lượng mục trên mỗi trang
        public int PageNumber { get; set; } // Số trang
        public int Skip { get; set; }
    }
}
