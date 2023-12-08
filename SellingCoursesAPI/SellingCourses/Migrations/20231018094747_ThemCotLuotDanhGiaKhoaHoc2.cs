using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class ThemCotLuotDanhGiaKhoaHoc2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LuotDanhGia",
                table: "KhoaHocs");

            migrationBuilder.AddColumn<int>(
                name: "DiemDanhGia",
                table: "KhoaHocs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiemDanhGia",
                table: "KhoaHocs");

            migrationBuilder.AddColumn<int>(
                name: "LuotDanhGia",
                table: "KhoaHocs",
                type: "int",
                nullable: true);
        }
    }
}
