namespace SellingCourses.Dtos.BaiHoc
{
    public class GetBaiHocDto
    {
        public int Id { get; set; }
        public string TenBaiHoc { get; set; }
        public string NoiDung { get; set; }
        public string MoTa { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string CreateBy { get; set; }
    }
}