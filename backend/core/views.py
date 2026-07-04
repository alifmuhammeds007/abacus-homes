from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import (
    Service, Project, GalleryItem, FloorPlan, BlogPost, Testimonial,
    CareerPosition, CareerApplication, ConsultationRequest, ContactMessage,
    ClientProject, ProjectProgressUpdate, PaymentInvoice, ProjectDocument
)
from .serializers import (
    UserSerializer, ServiceSerializer, ProjectSerializer, GalleryItemSerializer,
    FloorPlanSerializer, BlogPostSerializer, TestimonialSerializer,
    CareerPositionSerializer, CareerApplicationSerializer,
    ConsultationRequestSerializer, ContactMessageSerializer,
    ClientProjectSerializer, ProjectProgressUpdateSerializer,
    PaymentInvoiceSerializer, ProjectDocumentSerializer
)

# --- Custom Permissions ---

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow read access to anyone, write access to admin users only.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class IsAdminOrOwner(permissions.BasePermission):
    """
    Allow access to project owner or admins.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if hasattr(obj, 'client'):
            return obj.client == request.user
        if hasattr(obj, 'client_project'):
            return obj.client_project.client == request.user
        return False

# --- Public & Content ViewSets ---

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAdminOrReadOnly]

class FloorPlanViewSet(viewsets.ModelViewSet):
    queryset = FloorPlan.objects.all()
    serializer_class = FloorPlanSerializer
    permission_classes = [IsAdminOrReadOnly]

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAdminOrReadOnly]

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminOrReadOnly]

class CareerPositionViewSet(viewsets.ModelViewSet):
    queryset = CareerPosition.objects.all()
    serializer_class = CareerPositionSerializer
    permission_classes = [IsAdminOrReadOnly]

# --- Lead / Submission ViewSets ---

class CareerApplicationViewSet(viewsets.ModelViewSet):
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class ConsultationRequestViewSet(viewsets.ModelViewSet):
    queryset = ConsultationRequest.objects.all()
    serializer_class = ConsultationRequestSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


# --- Client Tracker / Dashboard ViewSets ---

class ClientProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ClientProjectSerializer
    
    def get_permissions(self):
        return [permissions.IsAuthenticated(), IsAdminOrOwner()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ClientProject.objects.all()
        return ClientProject.objects.filter(client=user)

class ProjectProgressUpdateViewSet(viewsets.ModelViewSet):
    queryset = ProjectProgressUpdate.objects.all()
    serializer_class = ProjectProgressUpdateSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsAdminOrOwner()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ProjectProgressUpdate.objects.all()
        return ProjectProgressUpdate.objects.filter(client_project__client=user)

class PaymentInvoiceViewSet(viewsets.ModelViewSet):
    queryset = PaymentInvoice.objects.all()
    serializer_class = PaymentInvoiceSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsAdminOrOwner()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return PaymentInvoice.objects.all()
        return PaymentInvoice.objects.filter(client_project__client=user)

class ProjectDocumentViewSet(viewsets.ModelViewSet):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsAdminOrOwner()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ProjectDocument.objects.all()
        return ProjectDocument.objects.filter(client_project__client=user)


# --- Custom Auth & Dashboard Profile Helper ---

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_profile(request):
    """
    Get current logged in user and their project context (if client)
    """
    user = request.user
    user_data = UserSerializer(user).data
    
    # If the user is not staff, append their associated projects
    if not user.is_staff:
        projects = ClientProject.objects.filter(client=user)
        user_data['projects'] = ClientProjectSerializer(projects, many=True).data
    else:
        user_data['projects'] = []
        
    return Response(user_data)
