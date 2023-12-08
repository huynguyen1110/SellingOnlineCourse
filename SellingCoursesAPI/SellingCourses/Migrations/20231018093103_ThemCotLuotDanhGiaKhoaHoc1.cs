using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class ThemCotLuotDanhGiaKhoaHoc1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "LuotDanhGia",
                table: "KhoaHocs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "LuotDanhGia",
                table: "KhoaHocs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
