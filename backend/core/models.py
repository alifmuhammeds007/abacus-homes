from django.db import models
from django.contrib.auth.models import User

# --- Core Content Models ---

class Service(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100) # e.g., "Design", "Approval", "Construction"
    icon = models.CharField(max_length=50, help_text="Lucide icon name (e.g. Ruler, Construction, Palmtree)")
    description = models.TextField()
    details = models.TextField(help_text="Detailed text or semicolon-separated sub-services")

    def __str__(self):
        return self.name

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('interior', 'Interior'),
        ('exterior', 'Exterior'),
        ('landscape', 'Landscape'),
        ('renovation', 'Renovation'),
    ]
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    location = models.CharField(max_length=255)
    area = models.CharField(max_length=100, help_text="e.g. 4,500 Sq.Ft.")
    duration = models.CharField(max_length=100, help_text="e.g. 12 Months")
    budget = models.CharField(max_length=100, help_text="e.g. $250,000 / Rs 2.5 Crore")
    services_used = models.CharField(max_length=500, help_text="Comma-separated services used")
    before_image = models.TextField(blank=True, null=True, help_text="Image URL")
    after_image = models.TextField(blank=True, null=True, help_text="Image URL")
    progress_timeline = models.JSONField(blank=True, null=True, help_text="JSON list of project phases and milestones")
    client_name = models.CharField(max_length=100, blank=True, null=True)
    client_rating = models.IntegerField(default=5)
    client_review = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('luxury_homes', 'Luxury Homes'),
        ('modern_villas', 'Modern Villas'),
        ('interiors', 'Interiors'),
        ('landscaping', 'Landscaping'),
        ('construction_progress', 'Construction Progress'),
        ('completed_projects', 'Completed Projects'),
    ]
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    image = models.TextField(help_text="Image URL")

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

class FloorPlan(models.Model):
    CATEGORY_CHOICES = [
        ('2BHK', '2BHK'),
        ('3BHK', '3BHK'),
        ('4BHK', '4BHK'),
        ('luxury_villas', 'Luxury Villas'),
        ('duplex', 'Duplex'),
        ('contemporary', 'Contemporary'),
        ('modern', 'Modern'),
    ]
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    bedrooms = models.IntegerField(default=3)
    bathrooms = models.IntegerField(default=3)
    area = models.CharField(max_length=100, help_text="e.g. 2,400 Sq.Ft.")
    image = models.TextField(help_text="Image URL")
    pdf_url = models.TextField(help_text="PDF file URL for download", blank=True, null=True)

    def __str__(self):
        return self.title

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100) # e.g., Construction Tips, Modern Architecture
    content = models.TextField()
    author = models.CharField(max_length=100, default="Abacus Editorial")
    date = models.DateField(auto_now_add=True)
    image = models.TextField(help_text="Image URL")

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    client_image = models.TextField(blank=True, null=True, help_text="Image URL")
    rating = models.IntegerField(default=5)
    project_type = models.CharField(max_length=100, help_text="e.g. Villa Owner, Kochi")
    review_text = models.TextField()

    def __str__(self):
        return f"{self.client_name} - {self.project_type}"


# --- Lead & Form Models ---

class CareerPosition(models.Model):
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=100) # e.g. Engineering, Architecture, Marketing
    location = models.CharField(max_length=100, default="Bangalore")
    description = models.TextField()
    requirements = models.TextField(help_text="Semicolon-separated requirements")

    def __str__(self):
        return self.title

class CareerApplication(models.Model):
    position = models.ForeignKey(CareerPosition, on_delete=models.CASCADE, related_name="applications")
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    resume_url = models.TextField(help_text="Uploaded CV URL or text")
    cover_letter = models.TextField(blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} for {self.position.title}"

class ConsultationRequest(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    location = models.CharField(max_length=255)
    project_type = models.CharField(max_length=100)
    budget = models.CharField(max_length=100)
    land_area = models.CharField(max_length=100)
    plan_url = models.TextField(blank=True, null=True, help_text="Uploaded Layout/Plan URL or text")
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consultation from {self.name} ({self.project_type})"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"


# --- Client Tracker / Dashboard Models ---

class ClientProject(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    project_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    status = models.CharField(max_length=100, default="In Progress") # Planning, Foundation, Finishing, etc.
    progress_percent = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.client.username} - {self.project_name}"

class ProjectProgressUpdate(models.Model):
    client_project = models.ForeignKey(ClientProject, on_delete=models.CASCADE, related_name="updates")
    title = models.CharField(max_length=255)
    description = models.TextField()
    photo_url = models.TextField(help_text="Weekly site image URL")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_project.project_name} Update: {self.title}"

class PaymentInvoice(models.Model):
    STATUS_CHOICES = [
        ('PAID', 'Paid'),
        ('PENDING', 'Pending'),
        ('OVERDUE', 'Overdue'),
    ]
    client_project = models.ForeignKey(ClientProject, on_delete=models.CASCADE, related_name="invoices")
    title = models.CharField(max_length=255) # e.g. Foundation stage payment
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    invoice_url = models.TextField(blank=True, null=True, help_text="Invoice PDF download URL")

    def __str__(self):
        return f"{self.client_project.project_name} - {self.title} ({self.status})"

class ProjectDocument(models.Model):
    DOC_CHOICES = [
        ('BLUEPRINTS', 'Blueprints & Drawings'),
        ('APPROVALS', 'Government Approvals'),
        ('AGREEMENT', 'Contract Agreement'),
        ('OTHER', 'Other Documents'),
    ]
    client_project = models.ForeignKey(ClientProject, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=255)
    doc_type = models.CharField(max_length=20, choices=DOC_CHOICES, default='BLUEPRINTS')
    file_url = models.TextField(help_text="Document PDF URL")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_project.project_name} Document: {self.title}"
