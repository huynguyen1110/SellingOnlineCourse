using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellingCourses.Migrations
{
    /// <inheritdoc />
    public partial class addtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaiHocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenBaiHoc = table.Column<string>(type: "NVARCHAR(120)", nullable: false),
                    NoiDung = table.Column<string>(type: "NVARCHAR", nullable: false),
                    MoTa = table.Column<string>(type: "NVARCHAR", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiHocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietKhoaHocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    IdBaiHoc = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietKhoaHocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DangKys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<int>(type: "INT", nullable: false),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DangKys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GioHang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<int>(type: "INT", nullable: false),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GioHang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhoaHocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhoaHoc = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    Thumnail = table.Column<string>(type: "NVARCHAR", nullable: false),
                    GiaGoc = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    GiaGiam = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    NoiDung = table.Column<string>(type: "NVARCHAR", nullable: false),
                    GioiThieu = table.Column<string>(type: "NVARCHAR", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoaHocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    IdUser = table.Column<int>(type: "INT", nullable: false),
                    HoTen = table.Column<string>(type: "NVARCHAR", nullable: false),
                    TenKhoaHoc = table.Column<string>(type: "NVARCHAR", nullable: false),
                    Gia = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    NoiDung = table.Column<string>(type: "VARCHAR", nullable: false),
                    AnhChuyenKhoan = table.Column<string>(type: "NVARCHAR", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionsName = table.Column<string>(type: "NVARCHAR(255)", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionsRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdRole = table.Column<int>(type: "INT", nullable: false),
                    IdPermissions = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionsRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "NVARCHAR(255)", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    LastName = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR(255)", nullable: false),
                    Sdt = table.Column<string>(type: "VARCHAR(10)", nullable: false),
                    Password = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    Verify = table.Column<bool>(type: "BIT", nullable: false),
                    IdRole = table.Column<int>(type: "INT", nullable: false),
                    passwordChangeAt = table.Column<string>(type: "VARCHAR", nullable: false),
                    passwordResetToken = table.Column<string>(type: "VARCHAR", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiHocs");

            migrationBuilder.DropTable(
                name: "ChiTietKhoaHocs");

            migrationBuilder.DropTable(
                name: "DangKys");

            migrationBuilder.DropTable(
                name: "GioHang");

            migrationBuilder.DropTable(
                name: "KhoaHocs");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "PermissionsRoles");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
