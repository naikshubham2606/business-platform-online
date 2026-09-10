using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace business_platform_api.Models.Migrations
{
    /// <inheritdoc />
    public partial class UpdateServiceImagesSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "https://picsum.photos/id/104/800/600");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "https://picsum.photos/id/114/800/600");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "https://picsum.photos/id/120/800/600");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "https://picsum.photos/id/122/800/600");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "https://picsum.photos/id/135/800/600");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "https://picsum.photos/id/163/800/600");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "/images/services/garden-maintenance-1.jpg");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "/images/services/garden-maintenance-2.jpg");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "/images/services/garden-maintenance-3.jpg");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "/images/services/landscape-design-1.jpg");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "/images/services/landscape-design-2.jpg");

            migrationBuilder.UpdateData(
                table: "ServiceImages",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "/images/services/lawn-care-1.jpg");
        }
    }
}
