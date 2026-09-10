using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace business_platform_api.Models.Migrations
{
    /// <inheritdoc />
    public partial class AddAboutUsModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AboutUs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HeroImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    HeroImageAltText = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    IntroductionTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Introduction = table.Column<string>(type: "text", nullable: false),
                    StoryTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Story = table.Column<string>(type: "text", nullable: false),
                    MissionTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Mission = table.Column<string>(type: "text", nullable: false),
                    VisionTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Vision = table.Column<string>(type: "text", nullable: false),
                    ApproachTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Approach = table.Column<string>(type: "text", nullable: false),
                    ExperienceTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    ExperienceText = table.Column<string>(type: "text", nullable: false),
                    ClosingTitle = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    ClosingText = table.Column<string>(type: "text", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutUs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AboutUsHighlights",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AboutUsId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Icon = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutUsHighlights", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AboutUsHighlights_AboutUs_AboutUsId",
                        column: x => x.AboutUsId,
                        principalTable: "AboutUs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AboutUsStatistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AboutUsId = table.Column<int>(type: "integer", nullable: false),
                    Label = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Value = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Suffix = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutUsStatistics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AboutUsStatistics_AboutUs_AboutUsId",
                        column: x => x.AboutUsId,
                        principalTable: "AboutUs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AboutUsValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AboutUsId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Icon = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutUsValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AboutUsValues_AboutUs_AboutUsId",
                        column: x => x.AboutUsId,
                        principalTable: "AboutUs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AboutUsHighlights_AboutUsId",
                table: "AboutUsHighlights",
                column: "AboutUsId");

            migrationBuilder.CreateIndex(
                name: "IX_AboutUsHighlights_AboutUsId_DisplayOrder",
                table: "AboutUsHighlights",
                columns: new[] { "AboutUsId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_AboutUsStatistics_AboutUsId",
                table: "AboutUsStatistics",
                column: "AboutUsId");

            migrationBuilder.CreateIndex(
                name: "IX_AboutUsStatistics_AboutUsId_DisplayOrder",
                table: "AboutUsStatistics",
                columns: new[] { "AboutUsId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_AboutUsValues_AboutUsId",
                table: "AboutUsValues",
                column: "AboutUsId");

            migrationBuilder.CreateIndex(
                name: "IX_AboutUsValues_AboutUsId_DisplayOrder",
                table: "AboutUsValues",
                columns: new[] { "AboutUsId", "DisplayOrder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AboutUsHighlights");

            migrationBuilder.DropTable(
                name: "AboutUsStatistics");

            migrationBuilder.DropTable(
                name: "AboutUsValues");

            migrationBuilder.DropTable(
                name: "AboutUs");
        }
    }
}
