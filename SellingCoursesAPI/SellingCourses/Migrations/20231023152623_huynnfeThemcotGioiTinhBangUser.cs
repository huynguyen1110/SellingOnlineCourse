using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class huynnfeThemcotGioiTinhBangUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GioiTInh",
                table: "Users",
                type: "NVARCHAR(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayThangNamSinh",
                table: "Users",
                type: "DATETIME",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GioiTInh",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NgayThangNamSinh",
                table: "Users");
        }
    }
}
