using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace business_platform_api.Models.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusinessProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BusinessName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LogoPath = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    FaviconPath = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    Tagline = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ShortDescription = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    AboutDescription = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AlternatePhone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    WebsiteUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    AddressLine = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    State = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    FacebookUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    InstagramUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    WhatsAppNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessProfiles", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "BusinessProfiles",
                columns: new[] { "Id", "AboutDescription", "AddressLine", "AlternatePhone", "BusinessName", "City", "Country", "CreatedAt", "Email", "FacebookUrl", "FaviconPath", "InstagramUrl", "IsActive", "LogoPath", "PhoneNumber", "PostalCode", "ShortDescription", "State", "Tagline", "UpdatedAt", "WebsiteUrl", "WhatsAppNumber" },
                values: new object[] { 1, "A generic landscaping company providing a wide range of outdoor services.", "123 Green Street", null, "Generic Landscaping Co.", "Springfield", "USA", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "contact@genericlandscaping.example", null, null, null, true, null, "+1-555-0198", "62701", "We provide top quality landscaping services.", "IL", "Beautiful landscapes for everyone.", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessProfiles");
        }
    }
}
