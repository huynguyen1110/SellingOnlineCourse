namespace SellingCourses.Dtos.Payment
{
    public class GetPaymentDto
    {
        public int Id { get; set; }
        public int IdKhoaHoc { get; set; }
        public int IdUser { get; set; }
        public string HoTen { get; set; }
        public string TenKhoaHoc { get; set; }
        public Decimal Gia { get; set; }
        public string NoiDung { get; set; }
        public string AnhChuyenKhoan { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string CreateBy { get; set; }
        public bool TrangThai { get; set; }
    }
}
