using Microsoft.EntityFrameworkCore;
using SellingCourses.Entities;

namespace SellingCourses
{
    public class SellingCoursesDbContext : DbContext
    {
        #region db set
        public DbSet<BaiHoc> BaiHocs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<PermissionsRole> PermissionsRoles { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<KhoaHoc> KhoaHocs { get; set; }
        public DbSet<ChiTietKhoaHoc> ChiTietKhoaHocs { get; set; }
        public DbSet<DangKy> DangKies { get; set; }
        public DbSet<GioHang> GioHangs { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }

        #endregion

        public SellingCoursesDbContext(DbContextOptions<SellingCoursesDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
