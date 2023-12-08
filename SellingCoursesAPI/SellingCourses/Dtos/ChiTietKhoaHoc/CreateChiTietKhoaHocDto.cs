namespace SellingCourses.Dtos.ChiTietKhoaHoc
{
    public class CreateChiTietKhoaHocDto
    {
        public int IdKhoaHoc { get; set; }
        public int IdBaiHoc { get; set; }

        public bool Deleted { get; set; }
        public DateTime CreateAt { get; set; }

        public DateTime UpdateAt { get; set; }
        public string CreateBy { get; set; }
    }
}
