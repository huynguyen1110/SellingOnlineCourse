using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class CapNhatDbHuynnn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "BaiHocs",
                type: "NVARCHAR(120)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MoTa",
                table: "BaiHocs",
                type: "NVARCHAR(120)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreateBy",
                table: "BaiHocs",
                type: "NVARCHAR(120)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "NVARCHAR");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR(120)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MoTa",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR(120)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreateBy",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "NVARCHAR(120)");
        }
    }
}
