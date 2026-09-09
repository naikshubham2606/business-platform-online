using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class ContactDetailsConfiguration : IEntityTypeConfiguration<ContactDetails>
{
    public void Configure(EntityTypeBuilder<ContactDetails> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.PhoneNumber).HasMaxLength(50);
        builder.Property(x => x.AlternatePhoneNumber).HasMaxLength(50);
        builder.Property(x => x.Email).HasMaxLength(100);
        builder.Property(x => x.AlternateEmail).HasMaxLength(100);
        builder.Property(x => x.WhatsAppNumber).HasMaxLength(50);
        builder.Property(x => x.AddressLine1).HasMaxLength(255);
        builder.Property(x => x.AddressLine2).HasMaxLength(255);
        builder.Property(x => x.City).HasMaxLength(100);
        builder.Property(x => x.State).HasMaxLength(100);
        builder.Property(x => x.Country).HasMaxLength(100);
        builder.Property(x => x.PostalCode).HasMaxLength(20);
        builder.Property(x => x.GoogleMapsUrl).HasMaxLength(500);
        builder.Property(x => x.Latitude).HasMaxLength(50);
        builder.Property(x => x.Longitude).HasMaxLength(50);
        builder.Property(x => x.WebsiteUrl).HasMaxLength(255);

        // Seed data
        builder.HasData(new ContactDetails
        {
            Id = 1,
            PhoneNumber = "+91 90000 00000",
            Email = "info@examplelandscaping.com",
            AddressLine1 = "123 Garden Avenue",
            City = "Example City",
            State = "Example State",
            Country = "India",
            PostalCode = "000000",
            CreatedDateTime = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            UpdatedDateTime = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        });
    }
}
