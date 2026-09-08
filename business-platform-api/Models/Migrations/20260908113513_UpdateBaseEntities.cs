using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace business_platform_api.Models.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBaseEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "BusinessProfiles",
                newName: "UpdatedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "BusinessProfiles",
                newName: "CreatedDateTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedDateTime",
                table: "BusinessProfiles",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "BusinessProfiles",
                newName: "CreatedAt");
        }
    }
}
