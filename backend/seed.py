import os
import django
import datetime
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abacus_backend.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import (
    Service, Project, GalleryItem, FloorPlan, BlogPost, Testimonial,
    CareerPosition, ClientProject, ProjectProgressUpdate, PaymentInvoice, ProjectDocument
)

def seed_database():
    print("Starting database seeding...")

    # 1. Create Users
    admin_user, created = User.objects.get_or_create(username='admin', defaults={
        'email': 'admin@abacushomes.com',
        'is_staff': True,
        'is_superuser': True
    })
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Admin user created: admin/admin123")
    else:
        print("Admin user already exists")

    client_user, created = User.objects.get_or_create(username='client', defaults={
        'email': 'client@abacushomes.com',
        'first_name': 'John',
        'last_name': 'Doe'
    })
    if created:
        client_user.set_password('client123')
        client_user.save()
        print("Client user created: client/client123")
    else:
        print("Client user already exists")

    # 2. Services
    services_data = [
        {
            "name": "Architectural Design & Consulting",
            "category": "Design",
            "icon": "Ruler",
            "description": "Premium villa design, building elevations, 3D visualization, and structural analysis by our award-winning architects.",
            "details": "House Planning;Villa Design;Commercial Design;Structural Design;3D Visualization;Vastu Compliance Consulting"
        },
        {
            "name": "Panchayat & Municipality Approval",
            "category": "Approval",
            "icon": "FileCheck",
            "description": "Seamless handling of building permit documentation, structural drawing approvals, and local body clearance certificates.",
            "details": "Building Permit Application;Documentation;Municipality Approval;Corporation & Panchayat Approval;NOC Procurement"
        },
        {
            "name": "Residential Construction",
            "category": "Construction",
            "icon": "Home",
            "description": "End-to-end luxury home construction. We use premium grade steel, high-quality concrete, and expert craftsmanship.",
            "details": "Luxury Villas;Duplex Homes;Multi-Family Apartments;Custom Residential Build;Turnkey Civil Construction"
        },
        {
            "name": "Commercial Construction",
            "category": "Construction",
            "icon": "Building",
            "description": "State-of-the-art office spaces, retail outlets, and commercial complexes engineered for longevity and business growth.",
            "details": "Office Complexes;Retail Outlets;Showroom Fitouts;Structural Steel Framework;Industrial Warehouses"
        },
        {
            "name": "Interior & Exterior Design",
            "category": "Design",
            "icon": "Paintbrush",
            "description": "Luxurious interior spaces and eye-catching building facades designed to reflect your personality and style.",
            "details": "Modular Kitchens;False Ceiling Design;Wardrobes & Custom Woodwork;Modern Facade Elevation;Wall Texturing"
        },
        {
            "name": "Smart Home Integration",
            "category": "Tech",
            "icon": "Cpu",
            "description": "Automate your home with cutting-edge smart lighting, climate controls, automated security, and entertainment systems.",
            "details": "Smart Lighting Controls;Automated Security Systems;Multi-room Audio;Smart Thermostats;Voice Assistant Integration"
        },
        {
            "name": "Landscape & Outdoor Design",
            "category": "Design",
            "icon": "Palmtree",
            "description": "Bespoke gardens, swimming pools, paving, and stone installations to create an outdoor oasis for your home.",
            "details": "Landscape Architecture;Swimming Pool Construction;Interlock Paving;Bangalore Stone Installation;Terrace Gardening"
        },
        {
            "name": "Estimation & Project Management",
            "category": "Management",
            "icon": "TrendingUp",
            "description": "Detailed BOQ estimation and dedicated project managers to ensure on-time delivery within the defined budget.",
            "details": "Detailed BOQ Cost Sheets;Material Quantity Estimates;Project Scheduling (PERT/CPM);Quality Control Inspections"
        }
    ]

    for sd in services_data:
        Service.objects.get_or_create(name=sd['name'], defaults=sd)
    print("Services seeded.")

    # 3. Projects
    projects_data = [
        {
            "name": "The Grand Abacus Oasis",
            "category": "residential",
            "description": "A luxury 5-bedroom villa featuring glassmorphism elements, double-height ceilings, a private infinity pool, and integrated automation systems.",
            "location": "Kochi, Kerala",
            "area": "6,500 Sq.Ft.",
            "duration": "14 Months",
            "budget": "Rs. 3.5 Crore",
            "services_used": "Architectural Design, Turnkey Construction, Interior Design, Smart Home Integration, Landscape Design",
            "before_image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
            "after_image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
            "client_name": "Dr. Sandeep Kurup",
            "client_rating": 5,
            "client_review": "Abacus Homes delivered my dream villa exactly as visualized. Their engineering team is extremely professional and transparent about pricing.",
            "progress_timeline": [
                {"stage": "Planning & Approval", "status": "Completed", "date": "Jan 2025"},
                {"stage": "Foundation & Substructure", "status": "Completed", "date": "Mar 2025"},
                {"stage": "Superstructure Framing", "status": "Completed", "date": "Jul 2025"},
                {"stage": "MEP & Plastering", "status": "Completed", "date": "Nov 2025"},
                {"stage": "Finishing & Handover", "status": "Completed", "date": "Mar 2026"}
            ]
        },
        {
            "name": "Elite Corporate Hub",
            "category": "commercial",
            "description": "Modern environment-friendly 4-story commercial building built with sustainable materials and featuring a double-glazed facade.",
            "location": "Indiranagar, Bangalore",
            "area": "18,000 Sq.Ft.",
            "duration": "18 Months",
            "budget": "Rs. 9.8 Crore",
            "services_used": "Commercial Construction, Structural Design, Panchayat & Municipality Approval, False Ceiling",
            "before_image": "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80",
            "after_image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            "client_name": "Elixir Technologies",
            "client_rating": 5,
            "client_review": "Incredible commercial build. Handed over 2 weeks ahead of schedule. Build quality and steelwork is state-of-the-art.",
            "progress_timeline": [
                {"stage": "Planning & Soil Testing", "status": "Completed", "date": "May 2024"},
                {"stage": "Excavation & Piling", "status": "Completed", "date": "Aug 2024"},
                {"stage": "Concrete Core Casting", "status": "Completed", "date": "Jan 2025"},
                {"stage": "Facade & Glass Glazing", "status": "Completed", "date": "Jul 2025"},
                {"stage": "MEP Handover", "status": "Completed", "date": "Nov 2025"}
            ]
        },
        {
            "name": "Minimalist Penthouse Renovation",
            "category": "interior",
            "description": "Full redesign of a duplex penthouse. High-end woodwork, custom lighting, marble installations, and Italian modular kitchen.",
            "location": "MG Road, Bangalore",
            "area": "3,200 Sq.Ft.",
            "duration": "5 Months",
            "budget": "Rs. 1.2 Crore",
            "services_used": "Interior Design, Smart Home Integration, False Ceiling, Tile Installation",
            "before_image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
            "after_image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
            "client_name": "Rohan & Priya Mehta",
            "client_rating": 5,
            "client_review": "The interior designers at Abacus transformed our dated penthouse into a gorgeous, sleek, modern sanctuary. Highly recommended!",
            "progress_timeline": [
                {"stage": "Interior Space Planning", "status": "Completed", "date": "Oct 2025"},
                {"stage": "Demolition & Wiring", "status": "Completed", "date": "Nov 2025"},
                {"stage": "Cabinetry & False Ceiling", "status": "Completed", "date": "Jan 2026"},
                {"stage": "Furniture & Finishes", "status": "Completed", "date": "Feb 2026"}
            ]
        }
    ]

    for pd in projects_data:
        Project.objects.get_or_create(name=pd['name'], defaults=pd)
    print("Projects seeded.")

    # 4. Gallery Items
    gallery_data = [
        {"title": "Luxury Villa Facade", "category": "luxury_homes", "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"},
        {"title": "Minimalist Living Area", "category": "interiors", "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"},
        {"title": "Modern Duplex Villa", "category": "modern_villas", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"},
        {"title": "Lush Back Garden", "category": "landscaping", "image": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"},
        {"title": "Concrete Pouring Frame", "category": "construction_progress", "image": "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80"},
        {"title": "Completed Residential Suite", "category": "completed_projects", "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"},
        {"title": "Luxury Master Bedroom", "category": "interiors", "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"},
        {"title": "Contemporary Exterior", "category": "luxury_homes", "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"}
    ]

    for gd in gallery_data:
        GalleryItem.objects.get_or_create(title=gd['title'], category=gd['category'], defaults=gd)
    print("Gallery items seeded.")

    # 5. Floor Plans
    floorplans_data = [
        {"title": "Standard 3BHK Layout", "category": "3BHK", "bedrooms": 3, "bathrooms": 3, "area": "1,850 Sq.Ft.", "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80", "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
        {"title": "Premium 4BHK Duplex Plan", "category": "duplex", "bedrooms": 4, "bathrooms": 5, "area": "3,400 Sq.Ft.", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
        {"title": "Luxury Villa Layout with Pool", "category": "luxury_villas", "bedrooms": 5, "bathrooms": 6, "area": "5,200 Sq.Ft.", "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
    ]

    for fd in floorplans_data:
        FloorPlan.objects.get_or_create(title=fd['title'], category=fd['category'], defaults=fd)
    print("Floor plans seeded.")

    # 6. Blog Posts
    blogs_data = [
        {
            "title": "5 Tips for Cost-Effective Luxury Villa Construction",
            "category": "Budget Planning",
            "content": "Building a luxury home does not mean you have to overspend. Here, we discuss structural optimization, bulk material sourcing, smart planning strategies, energy-saving configurations, and how choosing the right turnkey partner can save you up to 15% on total construction costs.",
            "author": "Ar. Anand Kumar",
            "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "The Step-by-Step Guide to Building Approval Permits",
            "category": "Building Approval Guide",
            "content": "Navigating municipality laws and corporation regulations can be daunting. In this guide, we simplify the documentation process, showing you how to secure approvals for 2D plans, fire safety certificates, electrical authority approvals, and land ownership validations.",
            "author": "Er. Suresh Menon",
            "image": "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Smart Home Trends: Enhancing Convenience & Security",
            "category": "Interior Trends",
            "content": "Home automation is changing the way we live. Learn about the latest technology in smart hubs, occupancy sensors, automated solar shading, voice-activated safety shutters, and integrating your home entertainment system directly into custom modular ceilings.",
            "author": "John Doe",
            "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
        }
    ]

    for bd in blogs_data:
        BlogPost.objects.get_or_create(title=bd['title'], defaults=bd)
    print("Blogs seeded.")

    # 7. Testimonials
    testimonials_data = [
        {"client_name": "Dr. Sandeep Kurup", "client_image": "https://randomuser.me/api/portraits/men/32.jpg", "rating": 5, "project_type": "Villa Owner, Kochi", "review_text": "Abacus Homes delivered my dream villa exactly as visualized. Their engineering team is extremely professional and transparent about pricing."},
        {"client_name": "Arun Kumar", "client_image": "https://randomuser.me/api/portraits/men/44.jpg", "rating": 5, "project_type": "Kakkanad, Residential", "review_text": "I was very worried about the building approvals, but their legal team handled the municipal papers end-to-end. Fantastic experience!"},
        {"client_name": "Meera Nair", "client_image": "https://randomuser.me/api/portraits/women/12.jpg", "rating": 5, "project_type": "Interior Client, Bangalore", "review_text": "Absolutely love my new modular kitchen and false ceiling design. Their designers pay great attention to detail."}
    ]

    for td in testimonials_data:
        Testimonial.objects.get_or_create(client_name=td['client_name'], project_type=td['project_type'], defaults=td)
    print("Testimonials seeded.")

    # 8. Careers
    careers_data = [
        {"title": "Civil Site Engineer", "department": "Civil Engineering", "location": "Kochi", "description": "Supervise site operations, inspect concrete mixes, manage labor productivity, and ensure structural blueprint adherence.", "requirements": "B.Tech in Civil Engineering;3-5 years site supervision experience;Fluent in English & local language;Proficiency in MS Project"},
        {"title": "Junior Architect", "department": "Architecture", "location": "Bangalore", "description": "Collaborate on structural drafting, build 3D elevations, coordinate customer layouts, and submit municipal clearance drawings.", "requirements": "B.Arch degree;1-2 years experience in design firm;Expert in AutoCAD, Revit & SketchUp;Strong design portfolio"}
    ]

    for cd in careers_data:
        CareerPosition.objects.get_or_create(title=cd['title'], defaults=cd)
    print("Careers seeded.")

    # 9. Client Dashboard Seeds (Linked to 'client' user account)
    client_proj, created = ClientProject.objects.get_or_create(
        client=client_user,
        project_name="The Abacus Splendid Villa",
        defaults={
            "location": "Aluva, Kochi",
            "start_date": datetime.date(2025, 4, 15),
            "status": "MEP & Plastering Work",
            "progress_percent": 75
        }
    )
    if created:
        print("ClientProject seeded.")
        # Progress updates
        ProjectProgressUpdate.objects.create(
            client_project=client_proj,
            title="Foundation Cast",
            description="Foundation layout finalized and concrete poured successfully with primary grid reinforcement check completed.",
            photo_url="https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80"
        )
        ProjectProgressUpdate.objects.create(
            client_project=client_proj,
            title="Superstructure Brickwork",
            description="All ground floor brick walls erected, beams set, and roof slabs cast. Curing process concluded.",
            photo_url="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
        )
        ProjectProgressUpdate.objects.create(
            client_project=client_proj,
            title="Plastering & Wiring",
            description="Plumbing pipes set and internal electrical wiring completed. Plastering of internal walls ongoing.",
            photo_url="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        )

        # Invoices
        PaymentInvoice.objects.create(
            client_project=client_proj,
            title="Initial Signing & Mobilization",
            amount=500000.00,
            due_date=datetime.date(2025, 4, 20),
            status="PAID",
            invoice_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )
        PaymentInvoice.objects.create(
            client_project=client_proj,
            title="Foundation Completion Stage",
            amount=1200000.00,
            due_date=datetime.date(2025, 6, 15),
            status="PAID",
            invoice_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )
        PaymentInvoice.objects.create(
            client_project=client_proj,
            title="Superstructure Casting Stage",
            amount=1800000.00,
            due_date=datetime.date(2025, 11, 30),
            status="PAID",
            invoice_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )
        PaymentInvoice.objects.create(
            client_project=client_proj,
            title="Internal Plastering Stage Payment",
            amount=800000.00,
            due_date=datetime.date(2026, 7, 30),
            status="PENDING",
            invoice_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )

        # Documents
        ProjectDocument.objects.create(
            client_project=client_proj,
            title="Approved 2D Architecture Blueprint",
            doc_type="BLUEPRINTS",
            file_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )
        ProjectDocument.objects.create(
            client_project=client_proj,
            title="Municipality Construction License #982",
            doc_type="APPROVALS",
            file_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )
        ProjectDocument.objects.create(
            client_project=client_proj,
            title="Civil Building Agreement",
            doc_type="AGREEMENT",
            file_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        )
        print("ClientProject sub-items seeded successfully.")
    else:
        print("ClientProject already exists.")

    print("Seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
