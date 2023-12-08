namespace SellingCourses.Dtos.User
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Sdt { get; set; }
        public string GioiTInh { get; set; }
        public DateTime? NgayThangNamSinh { get; set; }
    }
}
