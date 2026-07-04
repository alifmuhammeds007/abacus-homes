from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet, ProjectViewSet, GalleryItemViewSet, FloorPlanViewSet,
    BlogPostViewSet, TestimonialViewSet, CareerPositionViewSet, CareerApplicationViewSet,
    ConsultationRequestViewSet, ContactMessageViewSet, ClientProjectViewSet,
    ProjectProgressUpdateViewSet, PaymentInvoiceViewSet, ProjectDocumentViewSet,
    get_user_profile
)

router = DefaultRouter()
router.register('services', ServiceViewSet, basename='service')
router.register('projects', ProjectViewSet, basename='project')
router.register('gallery', GalleryItemViewSet, basename='gallery')
router.register('floorplans', FloorPlanViewSet, basename='floorplan')
router.register('blogs', BlogPostViewSet, basename='blog')
router.register('testimonials', TestimonialViewSet, basename='testimonial')
router.register('careers', CareerPositionViewSet, basename='career')
router.register('applications', CareerApplicationViewSet, basename='application')
router.register('consultation', ConsultationRequestViewSet, basename='consultation')
router.register('contact', ContactMessageViewSet, basename='contact')
router.register('client-projects', ClientProjectViewSet, basename='client-project')
router.register('progress-updates', ProjectProgressUpdateViewSet, basename='progress-update')
router.register('invoices', PaymentInvoiceViewSet, basename='invoice')
router.register('documents', ProjectDocumentViewSet, basename='document')

urlpatterns = [
    path('auth/me/', get_user_profile, name='auth_me'),
    path('', include(router.urls)),
]
