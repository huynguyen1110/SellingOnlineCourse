using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class HuyCreateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "passwordResetToken",
                table: "Users",
                type: "VARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "passwordChangeAt",
                table: "Users",
                type: "VARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "Thumnail",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "GioiThieu",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "TenBaiHoc",
                table: "BaiHocs",
                type: "NVARCHAR(120)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR(120)");

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "MoTa",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NVARCHAR");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "passwordResetToken",
                table: "Users",
                type: "VARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "VARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "passwordChangeAt",
                table: "Users",
                type: "VARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "VARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Thumnail",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GioiThieu",
                table: "KhoaHocs",
                type: "NVARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TenBaiHoc",
                table: "BaiHocs",
                type: "NVARCHAR(120)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NVARCHAR(120)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MoTa",
                table: "BaiHocs",
                type: "NVARCHAR",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NVARCHAR",
                oldNullable: true);
        }
    }
}
