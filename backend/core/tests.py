from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from core.models import Service, Project

class CoreAPITests(APITestCase):

    def setUp(self):
        # Create user
        self.user = User.objects.create_user(username='testclient', password='testpassword')
        
        # Create service
        self.service = Service.objects.create(
            name="Architectural Design",
            category="Design",
            icon="Ruler",
            description="Draft blueprints",
            details="Villa;Planning"
        )
        
        # Create project
        self.project = Project.objects.create(
            name="Kochi Villa",
            category="residential",
            description="Luxury residential villa",
            location="Kochi",
            area="3000 Sq.Ft.",
            duration="10 Months",
            budget="1.5 Crore",
            services_used="Design"
        )

    def test_get_services_list(self):
        """Test retrieving the list of public services"""
        url = reverse('service-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Architectural Design")

    def test_get_projects_list(self):
        """Test retrieving the list of projects"""
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Kochi Villa")

    def test_jwt_login(self):
        """Test authentication token retrieval via SimpleJWT"""
        url = reverse('token_obtain_pair')
        data = {
            'username': 'testclient',
            'password': 'testpassword'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
