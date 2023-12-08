using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class ThemCotTheLoaiKhoaHoc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TheLoai",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TheLoai",
                table: "KhoaHocs");
        }
    }
}
