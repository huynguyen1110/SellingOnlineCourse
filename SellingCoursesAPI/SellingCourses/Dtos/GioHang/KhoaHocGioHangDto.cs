namespace SellingCourses.Dtos.GioHang
{
    public class KhoaHocGioHangDto
    {
        public int Id { get; set; }

        public int IdGioHang { get; set; }

        public string TenKhoaHoc { get; set; }

        public string Thumnail { get; set; }

        public Decimal GiaGoc { get; set; }

        public Decimal GiaGiam { get; set; }

        public int LuotBan { get; set; }

        public int DiemDanhGia { get; set; }

        public string NoiDung { get; set; } = string.Empty;

        public string GioiThieu { get; set; } = string.Empty;

        public string TheLoai { get; set; }

        public bool Deleted { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime UpdateAt { get; set; }

        public string CreateBy { get; set; }
    }
}
