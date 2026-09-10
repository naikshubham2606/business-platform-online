using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Models;

public static class DbInitializer
{
    public static async Task SeedDataAsync(AppDbContext context)
    {
        var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        // 1. Business Profile
        if (!await context.BusinessProfiles.AnyAsync())
        {
            await context.BusinessProfiles.AddAsync(new BusinessProfile
            {
                Id = 1,
                BusinessName = "Generic Landscaping Co.",
                Tagline = "Beautiful landscapes for everyone.",
                ShortDescription = "We provide top quality landscaping services.",
                AboutDescription = "A generic landscaping company providing a wide range of outdoor services.",
                CreatedDateTime = now,
                UpdatedDateTime = now,
                IsActive = true
            });
        }

        // 2. Contact Details
        if (!await context.ContactDetails.AnyAsync())
        {
            await context.ContactDetails.AddAsync(new ContactDetails
            {
                Id = 1,
                PhoneNumber = "+91 90000 00000",
                Email = "info@examplelandscaping.com",
                AddressLine1 = "123 Garden Avenue",
                City = "Example City",
                State = "Example State",
                Country = "India",
                PostalCode = "000000",
                CreatedDateTime = now,
                UpdatedDateTime = now
            });
        }

        // 3. Services
        if (!await context.Services.AnyAsync())
        {
            var services = new List<Service>
            {
                new() { Id = 1, Name = "Garden Maintenance", Slug = "garden-maintenance", ShortDescription = "Regular upkeep of your garden spaces.", Description = "Comprehensive garden maintenance including mowing, weeding, pruning, and fertilization to keep your outdoor space pristine.", DisplayOrder = 1, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 2, Name = "Landscape Design", Slug = "landscape-design", ShortDescription = "Custom design for your dream outdoor living area.", Description = "Expert landscape design services tailored to your property, incorporating hardscaping, plant selection, and sustainable practices.", DisplayOrder = 2, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 3, Name = "Lawn Care", Slug = "lawn-care", ShortDescription = "Professional lawn treatment and care.", Description = "Specialized lawn care services including aeration, overseeding, pest control, and seasonal treatments for a lush, green lawn.", DisplayOrder = 3, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 4, Name = "Tree and Plant Care", Slug = "tree-and-plant-care", ShortDescription = "Specialized arbor care and plant health services.", Description = "Professional tree trimming, removal, disease diagnosis, and overall plant health care by certified arborists.", DisplayOrder = 4, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 5, Name = "Irrigation Installation", Slug = "irrigation-installation", ShortDescription = "Efficient water management systems.", Description = "Design, installation, and maintenance of smart irrigation systems to ensure optimal water usage and plant health.", DisplayOrder = 5, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now }
            };

            await context.Services.AddRangeAsync(services);
            await context.SaveChangesAsync();
        }

        // 4. Service Images
        if (!await context.ServiceImages.AnyAsync())
        {
            var serviceImages = new List<ServiceImage>
            {
                // Service 1: Garden Maintenance
                new() { Id = 1, ServiceId = 1, ImageUrl = "https://picsum.photos/id/104/800/600", AltText = "Worker maintaining a garden", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 2, ServiceId = 1, ImageUrl = "https://picsum.photos/id/114/800/600", AltText = "Close up of pruned bushes", IsPrimary = false, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 3, ServiceId = 1, ImageUrl = "https://picsum.photos/id/120/800/600", AltText = "Freshly mowed lawn", IsPrimary = false, DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                
                // Service 2: Landscape Design
                new() { Id = 4, ServiceId = 2, ImageUrl = "https://picsum.photos/id/122/800/600", AltText = "Completed landscape design project", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 5, ServiceId = 2, ImageUrl = "https://picsum.photos/id/135/800/600", AltText = "Design blueprints", IsPrimary = false, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                
                // Service 3: Lawn Care
                new() { Id = 6, ServiceId = 3, ImageUrl = "https://picsum.photos/id/163/800/600", AltText = "Green lawn", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now }
            };

            await context.ServiceImages.AddRangeAsync(serviceImages);
        }

        await context.SaveChangesAsync();

        // 5. About Us
        if (!await context.AboutUs.AnyAsync())
        {
            await context.AboutUs.AddAsync(new AboutUs
            {
                Id = 1,
                HeroImageUrl = "https://picsum.photos/id/373/1200/600",
                HeroImageAltText = "A beautifully maintained residential garden",
                IntroductionTitle = "Who We Are",
                Introduction = "We are a passionate team of landscape designers, horticulturists, and garden maintenance professionals dedicated to creating outdoor spaces that are both beautiful and enduring. With a deep respect for nature and a commitment to quality craftsmanship, we work closely with each client to understand their vision and bring it to life.\n\nOur approach combines thoughtful planning, careful plant selection, and reliable ongoing care. Whether we are transforming an overgrown plot into a lush garden retreat or maintaining an already established landscape, we bring the same level of attention and dedication to every project.",
                StoryTitle = "Our Story",
                Story = "Our journey into professional landscaping began with a simple belief: every outdoor space has the potential to become something extraordinary. What started as a small team taking on residential garden maintenance projects grew steadily as word spread about our commitment to quality and our genuine care for the spaces we tended.\n\nOver the years, we expanded our capabilities to include full landscape design, irrigation installation, lawn care, and specialist tree and plant services. Each expansion was driven not by ambition alone, but by client needs — homeowners and businesses who trusted us to take on more of their outdoor environments.\n\nToday, we bring together a team of experienced professionals who share a common passion for horticulture, design, and the craft of working with living landscapes. We have had the privilege of working on gardens ranging from intimate courtyard spaces to expansive residential properties and commercial green areas.\n\nThrough every project, our founding principle remains unchanged: we work with nature, not against it. We design landscapes that are sustainable, manageable, and genuinely enjoyable for the people who live and work in them.",
                MissionTitle = "Our Mission",
                Mission = "Our mission is to create and maintain outdoor spaces that bring lasting joy, natural beauty, and practical value to the people who inhabit them. We are committed to honest workmanship, sustainable practices, and building long-term relationships with our clients based on trust and consistent results.",
                VisionTitle = "Our Vision",
                Vision = "We envision a world where every property — regardless of size or budget — has the opportunity to be surrounded by thoughtfully designed, well-maintained green spaces. We believe that access to nature, even in small form, improves quality of life, and we strive to make that a reality for every client we serve.",
                ApproachTitle = "Our Approach",
                Approach = "Every project begins with listening. We take the time to understand how you use your outdoor space, what challenges you face, and what you hope to achieve. From there, our team assesses the existing landscape, soil conditions, light availability, and drainage before recommending any design or maintenance plan.\n\nWe work in a structured sequence: understand, assess, plan, execute, and maintain. This ensures that every decision we make is informed by the specific conditions of your space and aligned with your long-term goals. We do not believe in one-size-fits-all solutions — every garden and every client is different, and our work reflects that.\n\nThroughout the project, we maintain clear and open communication. You will always know what work is planned, what has been completed, and what comes next. Once the initial work is done, we offer ongoing maintenance programs designed to keep your landscape looking its best through every season.",
                ExperienceTitle = "Our Experience",
                ExperienceText = "Our team brings hands-on experience across a wide range of landscaping disciplines. From residential lawn care and garden planting to full landscape redesigns and irrigation system installations, we have built our expertise through years of practical work in diverse outdoor environments.\n\nWe are equally comfortable working on small suburban gardens and large commercial green spaces. Our horticulture knowledge covers a broad range of plant varieties suited to local conditions, and our maintenance programs are designed to keep landscapes healthy and attractive year-round.\n\nWe stay current with sustainable landscaping techniques, water-efficient irrigation methods, and environmentally responsible garden management practices. Our commitment to continuous learning means that our clients always benefit from approaches that are both effective and considerate of the natural environment.",
                ClosingTitle = "Ready to Transform Your Outdoor Space?",
                ClosingText = "Whether you have a clear vision or simply know that your garden could be better, we are here to help. Get in touch with our team to discuss your outdoor space, share your ideas, and find out how we can create a landscape you will genuinely love. We offer free initial consultations and would be delighted to visit your property to understand what is possible.",
                CreatedDateTime = now,
                UpdatedDateTime = now
            });
            await context.SaveChangesAsync();
        }

        // 6. About Us Highlights
        if (!await context.AboutUsHighlights.AnyAsync())
        {
            await context.AboutUsHighlights.AddRangeAsync(new List<AboutUsHighlight>
            {
                new() { Id = 1, AboutUsId = 1, Title = "Thoughtful Landscape Planning", Description = "Every project begins with a thorough understanding of your space, your lifestyle, and your long-term goals. We never rush into work without a considered plan.", Icon = "map", DisplayOrder = 1, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 2, AboutUsId = 1, Title = "Quality Plant Selection", Description = "We carefully select plants suited to your local soil and climate conditions, ensuring healthier growth, lower maintenance requirements, and lasting visual impact.", Icon = "leaf", DisplayOrder = 2, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 3, AboutUsId = 1, Title = "Reliable Ongoing Maintenance", Description = "A beautiful landscape needs consistent care. Our maintenance programs are designed to keep your outdoor space looking its best throughout every season of the year.", Icon = "shield-check", DisplayOrder = 3, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 4, AboutUsId = 1, Title = "Attention to Detail", Description = "From precise edging to careful pruning and seasonal planting, we take pride in the small details that make a significant difference to the overall appearance of your garden.", Icon = "eye", DisplayOrder = 4, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 5, AboutUsId = 1, Title = "Sustainable Practices", Description = "We incorporate environmentally responsible techniques including water-efficient irrigation, organic soil enrichment, and native plant selections wherever possible.", Icon = "recycle", DisplayOrder = 5, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 6, AboutUsId = 1, Title = "Client-Focused Service", Description = "We build long-term relationships with our clients. Clear communication, punctual service, and genuine care for your satisfaction are at the heart of everything we do.", Icon = "heart-handshake", DisplayOrder = 6, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now }
            });
            await context.SaveChangesAsync();
        }

        // 7. About Us Values
        if (!await context.AboutUsValues.AnyAsync())
        {
            await context.AboutUsValues.AddRangeAsync(new List<AboutUsValue>
            {
                new() { Id = 1, AboutUsId = 1, Title = "Quality", Description = "We hold ourselves to high standards in everything we do — from the materials and plants we select to the precision of the work we carry out. Quality is not negotiable.", Icon = "star", DisplayOrder = 1, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 2, AboutUsId = 1, Title = "Integrity", Description = "We are honest in our assessments, transparent in our pricing, and straightforward in our communication. If something is not right, we say so — and we fix it.", Icon = "badge-check", DisplayOrder = 2, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 3, AboutUsId = 1, Title = "Reliability", Description = "Our clients count on us to show up, to deliver what we promise, and to maintain consistent standards over time. We take that trust seriously and work hard to honour it.", Icon = "clock", DisplayOrder = 3, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 4, AboutUsId = 1, Title = "Sustainability", Description = "We are mindful of our environmental impact. We use sustainable methods, conserve water where possible, and make choices that support healthy ecosystems in and around the spaces we manage.", Icon = "tree", DisplayOrder = 4, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 5, AboutUsId = 1, Title = "Craftsmanship", Description = "Landscaping is a skilled craft. We invest in the training and experience of our team to ensure that the work we carry out reflects genuine expertise and care.", Icon = "tool", DisplayOrder = 5, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now }
            });
            await context.SaveChangesAsync();
        }

        // 8. About Us Statistics
        if (!await context.AboutUsStatistics.AnyAsync())
        {
            await context.AboutUsStatistics.AddRangeAsync(new List<AboutUsStatistic>
            {
                new() { Id = 1, AboutUsId = 1, Label = "Years of Experience", Value = "10", Suffix = "+", Description = "A decade of dedicated landscaping work across residential and commercial properties.", DisplayOrder = 1, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 2, AboutUsId = 1, Label = "Projects Completed", Value = "250", Suffix = "+", Description = "From small garden transformations to large-scale landscape designs, each one delivered with care.", DisplayOrder = 2, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 3, AboutUsId = 1, Label = "Service Areas", Value = "15", Suffix = "+", Description = "Serving clients across a growing number of cities and surrounding areas.", DisplayOrder = 3, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 4, AboutUsId = 1, Label = "Client Satisfaction", Value = "98", Suffix = "%", Description = "The vast majority of our clients return to us season after season and refer us to their neighbours.", DisplayOrder = 4, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now }
            });
            await context.SaveChangesAsync();
        }

        // 9. Master Data for Request a Quote
        if (!await context.PropertyTypes.AnyAsync())
        {
            await context.PropertyTypes.AddRangeAsync(
                new PropertyType { Id = 1, Name = "Bungalow", Description = "Residential bungalow", DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 2, Name = "Villa", Description = "Residential villa", DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 3, Name = "Apartment", Description = "Apartment or flat", DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 4, Name = "Residential House", Description = "General residential house", DisplayOrder = 4, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 5, Name = "Farmhouse", Description = "Farmhouse property", DisplayOrder = 5, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 6, Name = "Resort", Description = "Resort property", DisplayOrder = 6, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 7, Name = "Hotel", Description = "Hotel property", DisplayOrder = 7, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 8, Name = "Commercial Property", Description = "General commercial building", DisplayOrder = 8, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 9, Name = "Office", Description = "Office building", DisplayOrder = 9, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 10, Name = "Restaurant", Description = "Restaurant property", DisplayOrder = 10, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 11, Name = "Club / Community Property", Description = "Club or community center", DisplayOrder = 11, CreatedDateTime = now, UpdatedDateTime = now },
                new PropertyType { Id = 12, Name = "Other", Description = "Other property type", DisplayOrder = 12, CreatedDateTime = now, UpdatedDateTime = now }
            );
        }

        if (!await context.WorkAreaTypes.AnyAsync())
        {
            await context.WorkAreaTypes.AddRangeAsync(
                new WorkAreaType { Id = 1, Name = "Front Lawn", DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 2, Name = "Back Lawn", DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 3, Name = "Entire Garden", DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 4, Name = "Side Garden", DisplayOrder = 4, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 5, Name = "Terrace Garden", DisplayOrder = 5, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 6, Name = "Balcony", DisplayOrder = 6, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 7, Name = "Poolside", DisplayOrder = 7, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 8, Name = "Entrance Area", DisplayOrder = 8, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 9, Name = "Driveway", DisplayOrder = 9, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 10, Name = "Landscape Boundary", DisplayOrder = 10, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 11, Name = "Commercial Outdoor Area", DisplayOrder = 11, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 12, Name = "Multiple Areas", DisplayOrder = 12, CreatedDateTime = now, UpdatedDateTime = now },
                new WorkAreaType { Id = 13, Name = "Other", DisplayOrder = 13, CreatedDateTime = now, UpdatedDateTime = now }
            );
        }

        if (!await context.MeasurementUnits.AnyAsync())
        {
            await context.MeasurementUnits.AddRangeAsync(
                new MeasurementUnit { Id = 1, Name = "Square Meter", ShortName = "sq m", UnitType = "Area", DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new MeasurementUnit { Id = 2, Name = "Square Feet", ShortName = "sq ft", UnitType = "Area", DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new MeasurementUnit { Id = 3, Name = "Acre", ShortName = "ac", UnitType = "Area", DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                new MeasurementUnit { Id = 4, Name = "Hectare", ShortName = "ha", UnitType = "Area", DisplayOrder = 4, CreatedDateTime = now, UpdatedDateTime = now },
                new MeasurementUnit { Id = 5, Name = "Meter", ShortName = "m", UnitType = "Length", DisplayOrder = 5, CreatedDateTime = now, UpdatedDateTime = now },
                new MeasurementUnit { Id = 6, Name = "Feet", ShortName = "ft", UnitType = "Length", DisplayOrder = 6, CreatedDateTime = now, UpdatedDateTime = now }
            );
        }

        if (!await context.UrgencyTypes.AnyAsync())
        {
            await context.UrgencyTypes.AddRangeAsync(
                new UrgencyType { Id = 1, Name = "Flexible", DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new UrgencyType { Id = 2, Name = "Within 1 Month", DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new UrgencyType { Id = 3, Name = "Within 2 Weeks", DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                new UrgencyType { Id = 4, Name = "As Soon As Possible", DisplayOrder = 4, CreatedDateTime = now, UpdatedDateTime = now },
                new UrgencyType { Id = 5, Name = "Urgent", DisplayOrder = 5, CreatedDateTime = now, UpdatedDateTime = now }
            );
        }

        if (!await context.ContactMethods.AnyAsync())
        {
            await context.ContactMethods.AddRangeAsync(
                new ContactMethod { Id = 1, Name = "Phone", DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new ContactMethod { Id = 2, Name = "WhatsApp", DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new ContactMethod { Id = 3, Name = "Email", DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now }
            );
        }

        if (!await context.QuoteRequestStatuses.AnyAsync())
        {
            await context.QuoteRequestStatuses.AddRangeAsync(
                new QuoteRequestStatus { Id = 1, Name = "New", Description = "Newly submitted request", DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 2, Name = "Under Review", Description = "Currently being reviewed", DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 3, Name = "Contacted", Description = "Customer has been contacted", DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 4, Name = "Site Visit Required", Description = "A site visit needs to be scheduled", DisplayOrder = 4, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 5, Name = "Quotation In Progress", Description = "Preparing the quotation", DisplayOrder = 5, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 6, Name = "Quotation Sent", Description = "Quotation has been sent", DisplayOrder = 6, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 7, Name = "Accepted", Description = "Quotation accepted", DisplayOrder = 7, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 8, Name = "Rejected", Description = "Quotation rejected", DisplayOrder = 8, CreatedDateTime = now, UpdatedDateTime = now },
                new QuoteRequestStatus { Id = 9, Name = "Cancelled", Description = "Request cancelled", DisplayOrder = 9, CreatedDateTime = now, UpdatedDateTime = now }
            );
        }

        await context.SaveChangesAsync();
        // 10. Projects
        if (!await context.Projects.AnyAsync())
        {
            var p1 = Guid.NewGuid();
            var p2 = Guid.NewGuid();
            var p3 = Guid.NewGuid();
            var p4 = Guid.NewGuid();
            var p5 = Guid.NewGuid();

            var projects = new List<Project>
            {
                new() { Id = p1, Title = "Villa Garden Transformation", Slug = "villa-garden-transformation", ShortDescription = "Complete outdoor transformation with lawn development, planting and irrigation.", Description = "The project included extensive landscape design, comprehensive lawn care, and smart irrigation installation to create a lush, self-sustaining garden for a private villa.", Location = "North Goa", CompletionDate = new DateTime(2025, 11, 15, 0, 0, 0, DateTimeKind.Utc), IsFeatured = true, IsActive = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = p2, Title = "Resort Landscape Development", Slug = "resort-landscape-development", ShortDescription = "Expansive tropical landscape creation for a boutique resort.", Description = "Working closely with resort architects, we delivered full-scale landscape design, tree and plant care, and ongoing garden maintenance to establish a mature tropical aesthetic.", Location = "South Goa", CompletionDate = new DateTime(2026, 2, 10, 0, 0, 0, DateTimeKind.Utc), IsFeatured = true, IsActive = true, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = p3, Title = "Residential Lawn Upgrade", Slug = "residential-lawn-upgrade", ShortDescription = "A fast and efficient lawn care and maintenance overhaul.", Description = "This residential project focused on rescuing a damaged lawn. We provided aeration, overseeding, and set up a new irrigation schedule. Now, it's a perfect green space for the family.", Location = "Panjim", CompletionDate = new DateTime(2025, 9, 5, 0, 0, 0, DateTimeKind.Utc), IsFeatured = false, IsActive = true, DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = p4, Title = "Commercial Office Greenery", Slug = "commercial-office-greenery", ShortDescription = "Low-maintenance planting and design for a corporate office entrance.", Description = "We provided landscape design and tree/plant care specifically selecting drought-resistant and low-maintenance plants suitable for a busy corporate environment.", Location = "Porvorim", CompletionDate = new DateTime(2026, 5, 20, 0, 0, 0, DateTimeKind.Utc), IsFeatured = false, IsActive = true, DisplayOrder = 4, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = p5, Title = "Terrace Garden Development", Slug = "terrace-garden-development", ShortDescription = "Transforming a bare rooftop into a vibrant terrace garden.", Description = "A challenging but rewarding project installing custom planters, an automated micro-irrigation system, and selecting plants that thrive in high sunlight and wind exposure.", Location = "Margao", CompletionDate = new DateTime(2025, 12, 1, 0, 0, 0, DateTimeKind.Utc), IsFeatured = true, IsActive = true, DisplayOrder = 5, CreatedDateTime = now, UpdatedDateTime = now }
            };

            await context.Projects.AddRangeAsync(projects);

            // Project Images
            var projectImages = new List<ProjectImage>
            {
                new() { Id = 1, ProjectId = p1, ImageUrl = "https://picsum.photos/id/11/800/600", AltText = "Villa garden after transformation", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 2, ProjectId = p1, ImageUrl = "https://picsum.photos/id/13/800/600", AltText = "New irrigation system in action", IsPrimary = false, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 3, ProjectId = p2, ImageUrl = "https://picsum.photos/id/15/800/600", AltText = "Resort pathway with tropical plants", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 4, ProjectId = p2, ImageUrl = "https://picsum.photos/id/17/800/600", AltText = "Resort poolside landscaping", IsPrimary = false, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 5, ProjectId = p3, ImageUrl = "https://picsum.photos/id/28/800/600", AltText = "Lush green residential lawn", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 6, ProjectId = p4, ImageUrl = "https://picsum.photos/id/29/800/600", AltText = "Corporate office entrance greenery", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
                new() { Id = 7, ProjectId = p5, ImageUrl = "https://picsum.photos/id/30/800/600", AltText = "Beautiful terrace garden setup", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now }
            };
            await context.ProjectImages.AddRangeAsync(projectImages);

            // Project Services
            var projectServices = new List<ProjectService>
            {
                new() { Id = 1, ProjectId = p1, ServiceId = 2, CreatedDateTime = now, UpdatedDateTime = now }, // Landscape Design
                new() { Id = 2, ProjectId = p1, ServiceId = 3, CreatedDateTime = now, UpdatedDateTime = now }, // Lawn Care
                new() { Id = 3, ProjectId = p1, ServiceId = 5, CreatedDateTime = now, UpdatedDateTime = now }, // Irrigation

                new() { Id = 4, ProjectId = p2, ServiceId = 2, CreatedDateTime = now, UpdatedDateTime = now }, // Landscape Design
                new() { Id = 5, ProjectId = p2, ServiceId = 4, CreatedDateTime = now, UpdatedDateTime = now }, // Tree & Plant Care
                new() { Id = 6, ProjectId = p2, ServiceId = 1, CreatedDateTime = now, UpdatedDateTime = now }, // Garden Maintenance

                new() { Id = 7, ProjectId = p3, ServiceId = 3, CreatedDateTime = now, UpdatedDateTime = now }, // Lawn Care

                new() { Id = 8, ProjectId = p4, ServiceId = 2, CreatedDateTime = now, UpdatedDateTime = now }, // Landscape Design
                new() { Id = 9, ProjectId = p4, ServiceId = 4, CreatedDateTime = now, UpdatedDateTime = now }, // Tree & Plant Care

                new() { Id = 10, ProjectId = p5, ServiceId = 2, CreatedDateTime = now, UpdatedDateTime = now }, // Landscape Design
                new() { Id = 11, ProjectId = p5, ServiceId = 5, CreatedDateTime = now, UpdatedDateTime = now }  // Irrigation
            };
            await context.ProjectServices.AddRangeAsync(projectServices);
            
            await context.SaveChangesAsync();
        }
    }
}
