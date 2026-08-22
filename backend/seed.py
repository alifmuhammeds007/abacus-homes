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
            "name": "The Malabar Courtyard Villa",
            "category": "residential",
            "description": "A luxury 5-bedroom Kerala contemporary villa featuring open central nadumuttam courtyards, teakwood sit-out verandas, sloping terracotta roofs, and integrated home automation.",
            "location": "Kakkanad, Kochi",
            "area": "6,500 Sq.Ft.",
            "duration": "14 Months",
            "budget": "Rs. 3.5 Crore",
            "services_used": "Architectural Design, Turnkey Construction, Interior Design, Smart Home Integration, Landscape Design",
            "before_image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "client_name": "Dr. Sandeep Kurup",
            "client_rating": 5,
            "client_review": "Abacus Homes delivered my dream Kerala villa exactly as visualized. Their engineering team is extremely professional and transparent about pricing.",
            "progress_timeline": [
                {"stage": "Planning & Approval", "status": "Completed", "date": "Jan 2025"},
                {"stage": "Foundation & Substructure", "status": "Completed", "date": "Mar 2025"},
                {"stage": "Superstructure Framing", "status": "Completed", "date": "Jul 2025"},
                {"stage": "MEP & Plastering", "status": "Completed", "date": "Nov 2025"},
                {"stage": "Finishing & Handover", "status": "Completed", "date": "Mar 2026"}
            ]
        },
        {
            "name": "The Heritage Teak & Laterite Villa",
            "category": "residential",
            "description": "Traditional Kerala architectural fusion villa with clay tile roof slopes, exposed laterite stone masonry, teakwood charupadi sit-outs, and tropical landscaping.",
            "location": "Beach Road, Kozhikode",
            "area": "4,800 Sq.Ft.",
            "duration": "12 Months",
            "budget": "Rs. 2.8 Crore",
            "services_used": "Residential Construction, Architectural Elevation, Panchayat Approval, Teak Woodwork",
            "before_image": "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
            "client_name": "Er. Manoj Varma",
            "client_rating": 5,
            "client_review": "The traditional Kerala aesthetic fused with modern luxury interiors is breathtaking. Superb build quality!",
            "progress_timeline": [
                {"stage": "Planning & Soil Testing", "status": "Completed", "date": "May 2024"},
                {"stage": "Excavation & Piling", "status": "Completed", "date": "Aug 2024"},
                {"stage": "Laterite & Concrete Core", "status": "Completed", "date": "Jan 2025"},
                {"stage": "Terracotta Roof & Teakwork", "status": "Completed", "date": "Jul 2025"},
                {"stage": "Final Handover", "status": "Completed", "date": "Nov 2025"}
            ]
        },
        {
            "name": "Vembanad Backwater Haven",
            "category": "interior",
            "description": "Full interior architectural design of a luxury waterfront villa. Natural teak wood acoustic slat walls, custom false ceilings, marble waterfall island kitchen, and ambient coved lighting.",
            "location": "Kumarakom, Kottayam",
            "area": "3,800 Sq.Ft.",
            "duration": "6 Months",
            "budget": "Rs. 1.6 Crore",
            "services_used": "Interior Design, Smart Lighting, Modular Kitchen, Wooden Flooring",
            "before_image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "client_name": "Rohan & Priya Mehta",
            "client_rating": 5,
            "client_review": "The interior designers at Abacus transformed our villa into a serene, modern tropical sanctuary. Highly recommended!",
            "progress_timeline": [
                {"stage": "Interior Space Planning", "status": "Completed", "date": "Oct 2025"},
                {"stage": "Demolition & Wiring", "status": "Completed", "date": "Nov 2025"},
                {"stage": "Teak Cabinetry & Ceilings", "status": "Completed", "date": "Jan 2026"},
                {"stage": "Furniture & Finishes", "status": "Completed", "date": "Feb 2026"}
            ]
        }
    ]

    for pd in projects_data:
        Project.objects.update_or_create(name=pd['name'], defaults=pd)
    print("Projects seeded.")

    # 4. Gallery Items
    gallery_data = [
        {"title": "Contemporary Kerala Villa Facade", "category": "luxury_homes", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Warm Teak Living & Acoustic Slat Wall", "category": "interiors", "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Traditional Kerala Gabled Villa", "category": "modern_villas", "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Tropical Courtyard Water Garden", "category": "landscaping", "image": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Structural Column & Roof Casting", "category": "construction_progress", "image": "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Waterfront Tropical Residence", "category": "completed_projects", "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Luxury Teak Master Bedroom Suite", "category": "interiors", "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Open-Plan Dining & Island Kitchen", "category": "interiors", "image": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Kerala Sit-Out Veranda with Charupadi", "category": "luxury_homes", "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Wayanad Rainforest Modernist Estate", "category": "modern_villas", "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Bespoke Modular Kitchen with Quartz Island", "category": "interiors", "image": "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Villa Elevation at Twilight", "category": "completed_projects", "image": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"}
    ]

    for gd in gallery_data:
        GalleryItem.objects.update_or_create(title=gd['title'], category=gd['category'], defaults=gd)
    print("Gallery items seeded.")

    # 5. Floor Plans
    floorplans_data = [
        {"title": "3BHK Traditional Nalukettu Layout", "category": "3BHK", "bedrooms": 3, "bathrooms": 3, "area": "1,850 Sq.Ft.", "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80", "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
        {"title": "4BHK Contemporary Tropical Duplex Villa", "category": "duplex", "bedrooms": 4, "bathrooms": 5, "area": "3,400 Sq.Ft.", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
        {"title": "5BHK Luxury Courtyard Villa with Pool", "category": "luxury_villas", "bedrooms": 5, "bathrooms": 6, "area": "5,200 Sq.Ft.", "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
    ]

    for fd in floorplans_data:
        FloorPlan.objects.update_or_create(title=fd['title'], category=fd['category'], defaults=fd)
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
