from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Service, Project, GalleryItem, FloorPlan, BlogPost, Testimonial,
    CareerPosition, CareerApplication, ConsultationRequest, ContactMessage,
    ClientProject, ProjectProgressUpdate, PaymentInvoice, ProjectDocument
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'

class FloorPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloorPlan
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class CareerPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerPosition
        fields = '__all__'

class CareerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerApplication
        fields = '__all__'

class ConsultationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationRequest
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

# --- Client Tracker / Dashboard Serializers ---

class ProjectProgressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectProgressUpdate
        fields = '__all__'

class PaymentInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentInvoice
        fields = '__all__'

class ProjectDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDocument
        fields = '__all__'

class ClientProjectSerializer(serializers.ModelSerializer):
    updates = ProjectProgressUpdateSerializer(many=True, read_only=True)
    invoices = PaymentInvoiceSerializer(many=True, read_only=True)
    documents = ProjectDocumentSerializer(many=True, read_only=True)
    client_detail = UserSerializer(source='client', read_only=True)

    class Meta:
        model = ClientProject
        fields = ['id', 'client', 'client_detail', 'project_name', 'location', 'start_date', 'status', 'progress_percent', 'updates', 'invoices', 'documents']
