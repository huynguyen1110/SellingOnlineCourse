using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class CapNhapKyTu2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "TrangThai",
                table: "Payments",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BIT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "TrangThai",
                table: "Payments",
                type: "BIT",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
