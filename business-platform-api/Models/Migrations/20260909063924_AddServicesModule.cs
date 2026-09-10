using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace business_platform_api.Models.Migrations
{
    /// <inheritdoc />
    public partial class AddServicesModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Slug = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    ShortDescription = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ServiceId = table.Column<int>(type: "integer", nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AltText = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceImages_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "CreatedDateTime", "Description", "DisplayOrder", "IsActive", "Name", "ShortDescription", "Slug", "UpdatedDateTime" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Comprehensive garden maintenance including mowing, weeding, pruning, and fertilization to keep your outdoor space pristine.", 1, true, "Garden Maintenance", "Regular upkeep of your garden spaces.", "garden-maintenance", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Expert landscape design services tailored to your property, incorporating hardscaping, plant selection, and sustainable practices.", 2, true, "Landscape Design", "Custom design for your dream outdoor living area.", "landscape-design", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Specialized lawn care services including aeration, overseeding, pest control, and seasonal treatments for a lush, green lawn.", 3, true, "Lawn Care", "Professional lawn treatment and care.", "lawn-care", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Professional tree trimming, removal, disease diagnosis, and overall plant health care by certified arborists.", 4, true, "Tree and Plant Care", "Specialized arbor care and plant health services.", "tree-and-plant-care", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Design, installation, and maintenance of smart irrigation systems to ensure optimal water usage and plant health.", 5, true, "Irrigation Installation", "Efficient water management systems.", "irrigation-installation", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.InsertData(
                table: "ServiceImages",
                columns: new[] { "Id", "AltText", "CreatedDateTime", "DisplayOrder", "ImageUrl", "IsPrimary", "ServiceId", "UpdatedDateTime" },
                values: new object[,]
                {
                    { 1, "Worker maintaining a garden", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 1, "/images/services/garden-maintenance-1.jpg", true, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, "Close up of pruned bushes", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 2, "/images/services/garden-maintenance-2.jpg", false, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, "Freshly mowed lawn", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 3, "/images/services/garden-maintenance-3.jpg", false, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 4, "Completed landscape design project", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 1, "/images/services/landscape-design-1.jpg", true, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 5, "Design blueprints", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 2, "/images/services/landscape-design-2.jpg", false, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 6, "Green lawn", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 1, "/images/services/lawn-care-1.jpg", true, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceImages_ServiceId",
                table: "ServiceImages",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceImages_ServiceId_DisplayOrder",
                table: "ServiceImages",
                columns: new[] { "ServiceId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Services_DisplayOrder",
                table: "Services",
                column: "DisplayOrder");

            migrationBuilder.CreateIndex(
                name: "IX_Services_IsActive",
                table: "Services",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_Services_Slug",
                table: "Services",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceImages");

            migrationBuilder.DropTable(
                name: "Services");
        }
    }
}
