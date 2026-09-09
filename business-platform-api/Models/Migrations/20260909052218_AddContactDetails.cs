using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace business_platform_api.Models.Migrations
{
    /// <inheritdoc />
    public partial class AddContactDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLine",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "AlternatePhone",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "City",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "State",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "WebsiteUrl",
                table: "BusinessProfiles");

            migrationBuilder.DropColumn(
                name: "WhatsAppNumber",
                table: "BusinessProfiles");

            migrationBuilder.CreateTable(
                name: "ContactDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PhoneNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AlternatePhoneNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AlternateEmail = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    WhatsAppNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AddressLine1 = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    AddressLine2 = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    State = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    GoogleMapsUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Latitude = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Longitude = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    WebsiteUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactDetails", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ContactDetails",
                columns: new[] { "Id", "AddressLine1", "AddressLine2", "AlternateEmail", "AlternatePhoneNumber", "City", "Country", "CreatedDateTime", "Email", "GoogleMapsUrl", "Latitude", "Longitude", "PhoneNumber", "PostalCode", "State", "UpdatedDateTime", "WebsiteUrl", "WhatsAppNumber" },
                values: new object[] { 1, "123 Garden Avenue", null, null, null, "Example City", "India", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "info@examplelandscaping.com", null, null, null, "+91 90000 00000", "000000", "Example State", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactDetails");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine",
                table: "BusinessProfiles",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AlternatePhone",
                table: "BusinessProfiles",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "BusinessProfiles",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "BusinessProfiles",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "BusinessProfiles",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "BusinessProfiles",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "BusinessProfiles",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "BusinessProfiles",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebsiteUrl",
                table: "BusinessProfiles",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WhatsAppNumber",
                table: "BusinessProfiles",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BusinessProfiles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AddressLine", "AlternatePhone", "City", "Country", "Email", "PhoneNumber", "PostalCode", "State", "WebsiteUrl", "WhatsAppNumber" },
                values: new object[] { "123 Green Street", null, "Springfield", "USA", "contact@genericlandscaping.example", "+1-555-0198", "62701", "IL", null, null });
        }
    }
}
