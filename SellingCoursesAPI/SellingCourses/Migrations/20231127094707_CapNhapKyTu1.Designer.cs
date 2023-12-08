﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SellingCourses;

#nullable disable

namespace SellingCourses.Migrations
{
    [DbContext(typeof(SellingCoursesDbContext))]
    [Migration("20231127094707_CapNhapKyTu1")]
    partial class CapNhapKyTu1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SellingCourses.Entities.BaiHoc", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(120)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<string>("MoTa")
                        .HasColumnType("NVARCHAR(120)");

                    b.Property<string>("NoiDung")
                        .HasColumnType("NVARCHAR(120)");

                    b.Property<string>("TenBaiHoc")
                        .HasColumnType("NVARCHAR(120)");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("BaiHocs");
                });

            modelBuilder.Entity("SellingCourses.Entities.ChiTietKhoaHoc", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<int>("IdBaiHoc")
                        .HasColumnType("INT");

                    b.Property<int>("IdKhoaHoc")
                        .HasColumnType("INT");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("ChiTietKhoaHocs");
                });

            modelBuilder.Entity("SellingCourses.Entities.DangKy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<int>("IdKhoaHoc")
                        .HasColumnType("INT");

                    b.Property<int>("IdUser")
                        .HasColumnType("INT");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("DangKys");
                });

            modelBuilder.Entity("SellingCourses.Entities.EmailTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Body")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EmailTemplate");
                });

            modelBuilder.Entity("SellingCourses.Entities.GioHang", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<int>("IdKhoaHoc")
                        .HasColumnType("INT");

                    b.Property<int>("IdUser")
                        .HasColumnType("INT");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("GioHang");
                });

            modelBuilder.Entity("SellingCourses.Entities.KhoaHoc", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(MAX)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<int>("DiemDanhGia")
                        .HasColumnType("int");

                    b.Property<decimal>("GiaGiam")
                        .HasColumnType("DECIMAL(10,2)");

                    b.Property<decimal>("GiaGoc")
                        .HasColumnType("DECIMAL(10,2)");

                    b.Property<string>("GioiThieu")
                        .HasColumnType("NVARCHAR(MAX)");

                    b.Property<int>("LuotBan")
                        .HasColumnType("int");

                    b.Property<string>("NoiDung")
                        .HasColumnType("NVARCHAR(MAX)");

                    b.Property<string>("TenKhoaHoc")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(MAX)");

                    b.Property<string>("TheLoai")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<string>("Thumnail")
                        .HasColumnType("NVARCHAR(MAX)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.Property<bool>("YeuThich")
                        .HasColumnType("BIT");

                    b.HasKey("Id");

                    b.ToTable("KhoaHocs");
                });

            modelBuilder.Entity("SellingCourses.Entities.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AnhChuyenKhoan")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("NVARCHAR");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("NVARCHAR");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<decimal>("Gia")
                        .HasColumnType("DECIMAL(10,2)");

                    b.Property<string>("HoTen")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("NVARCHAR");

                    b.Property<int>("IdKhoaHoc")
                        .HasColumnType("INT");

                    b.Property<int>("IdUser")
                        .HasColumnType("INT");

                    b.Property<string>("NoiDung")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("TenKhoaHoc")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("NVARCHAR");

                    b.Property<bool>("TrangThai")
                        .HasColumnType("BIT");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("SellingCourses.Entities.Permissions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<string>("PermissionsName")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(255)");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("SellingCourses.Entities.PermissionsRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<int>("IdPermissions")
                        .HasColumnType("INT");

                    b.Property<int>("IdRole")
                        .HasColumnType("INT");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("PermissionsRoles");
                });

            modelBuilder.Entity("SellingCourses.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("NVARCHAR");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(255)");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("SellingCourses.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("DATETIME");

                    b.Property<bool>("Deleted")
                        .HasColumnType("BIT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(255)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<string>("GioiTInh")
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<int>("IdRole")
                        .HasColumnType("INT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<DateTime?>("NgayThangNamSinh")
                        .HasColumnType("DATETIME");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("NVARCHAR(50)");

                    b.Property<string>("Sdt")
                        .IsRequired()
                        .HasColumnType("VARCHAR(10)");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("DATETIME");

                    b.Property<bool>("Verify")
                        .HasColumnType("BIT");

                    b.Property<string>("passwordChangeAt")
                        .HasColumnType("VARCHAR");

                    b.Property<string>("passwordResetToken")
                        .HasColumnType("VARCHAR");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
