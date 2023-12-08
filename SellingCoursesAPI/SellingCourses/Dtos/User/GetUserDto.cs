using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace SellingCourses.Dtos.User
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Sdt { get; set; }
        public bool Verify { get; set; } = false;
        public int IdRole { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string GioiTInh { get; set; }
        public DateTime NgayThangNamSinh { get; set; }
    }
}
