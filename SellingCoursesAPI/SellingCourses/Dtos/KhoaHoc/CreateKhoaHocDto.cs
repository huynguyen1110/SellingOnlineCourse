namespace SellingCourses.Dtos.KhoaHoc
{
    public class CreateKhoaHocDto
    {
        public string TenKhoaHoc { get; set; }
        public string Thumnail { get; set; }
        public Decimal GiaGoc { get; set; }
        public Decimal GiaGiam { get; set; }
        public string NoiDung { get; set; } = string.Empty;
        public string GioiThieu { get; set; } = string.Empty;
        public string TheLoai { get; set; }
        public string CreateBy { get; set; }
    }
}
