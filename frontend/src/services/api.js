import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Automatically inject JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && !token.startsWith('dummy')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Mock Fallbacks
const MOCK_SERVICES = [
  { id: 1, name: "Architectural Design & Consulting", category: "Design", icon: "Ruler", description: "Premium villa design, building elevations, 3D visualization, and structural analysis by our award-winning architects.", details: "House Planning;Villa Design;Commercial Design;Structural Design;3D Visualization;Vastu Compliance Consulting" },
  { id: 2, name: "Panchayat & Municipality Approval", category: "Approval", icon: "FileCheck", description: "Seamless handling of building permit documentation, structural drawing approvals, and local body clearance certificates.", details: "Building Permit Application;Documentation;Municipality Approval;Corporation & Panchayat Approval;NOC Procurement" },
  { id: 3, name: "Residential Construction", category: "Construction", icon: "Home", description: "End-to-end luxury home construction. We use premium grade steel, high-quality concrete, and expert craftsmanship.", details: "Luxury Villas;Duplex Homes;Multi-Family Apartments;Custom Residential Build;Turnkey Civil Construction" },
  { id: 4, name: "Commercial Construction", category: "Construction", icon: "Building", description: "State-of-the-art office spaces, retail outlets, and commercial complexes engineered for longevity and business growth.", details: "Office Complexes;Retail Outlets;Showroom Fitouts;Structural Steel Framework;Industrial Warehouses" },
  { id: 5, name: "Interior & Exterior Design", category: "Design", icon: "Paintbrush", description: "Luxurious interior spaces and eye-catching building facades designed to reflect your personality and style.", details: "Modular Kitchens;False Ceiling Design;Wardrobes & Custom Woodwork;Modern Facade Elevation;Wall Texturing" },
  { id: 6, name: "Smart Home Integration", category: "Tech", icon: "Cpu", description: "Automate your home with cutting-edge smart lighting, climate controls, automated security, and entertainment systems.", details: "Smart Lighting Controls;Automated Security Systems;Multi-room Audio;Smart Thermostats;Voice Assistant Integration" },
  { id: 7, name: "Landscape & Outdoor Design", category: "Design", icon: "Palmtree", description: "Bespoke gardens, swimming pools, paving, and stone installations to create an outdoor oasis for your home.", details: "Landscape Architecture;Swimming Pool Construction;Interlock Paving;Bangalore Stone Installation;Terrace Gardening" },
  { id: 8, name: "Estimation & Project Management", category: "Management", icon: "TrendingUp", description: "Detailed BOQ estimation and dedicated project managers to ensure on-time delivery within the defined budget.", details: "Detailed BOQ Cost Sheets;Material Quantity Estimates;Project Scheduling (PERT/CPM);Quality Control Inspections" }
];

const MOCK_PROJECTS = [
  {
    id: 1,
    name: "The Grand Abacus Oasis",
    category: "residential",
    description: "A luxury 5-bedroom villa featuring glassmorphism elements, double-height ceilings, a private infinity pool, and integrated automation systems.",
    location: "Kochi, Kerala",
    area: "6,500 Sq.Ft.",
    duration: "14 Months",
    budget: "Rs. 3.5 Crore",
    services_used: "Architectural Design, Turnkey Construction, Interior Design, Smart Home Integration, Landscape Design",
    before_image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    client_name: "Dr. Sandeep Kurup",
    client_rating: 5,
    client_review: "Abacus Homes delivered my dream villa exactly as visualized. Their engineering team is extremely professional and transparent about pricing.",
    progress_timeline: [
      { stage: "Planning & Approval", status: "Completed", date: "Jan 2025" },
      { stage: "Foundation & Substructure", status: "Completed", date: "Mar 2025" },
      { stage: "Superstructure Framing", status: "Completed", date: "Jul 2025" },
      { stage: "MEP & Plastering", status: "Completed", date: "Nov 2025" },
      { stage: "Finishing & Handover", status: "Completed", date: "Mar 2026" }
    ]
  },
  {
    id: 2,
    name: "Elite Corporate Hub",
    category: "commercial",
    description: "Modern environment-friendly 4-story commercial building built with sustainable materials and featuring a double-glazed facade.",
    location: "Indiranagar, Bangalore",
    area: "18,000 Sq.Ft.",
    duration: "18 Months",
    budget: "Rs. 9.8 Crore",
    services_used: "Commercial Construction, Structural Design, Panchayat & Municipality Approval, False Ceiling",
    before_image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    client_name: "Elixir Technologies",
    client_rating: 5,
    client_review: "Incredible commercial build. Handed over 2 weeks ahead of schedule. Build quality and steelwork is state-of-the-art.",
    progress_timeline: [
      { stage: "Planning & Soil Testing", status: "Completed", date: "May 2024" },
      { stage: "Excavation & Piling", status: "Completed", date: "Aug 2024" },
      { stage: "Concrete Core Casting", status: "Completed", date: "Jan 2025" },
      { stage: "Facade & Glass Glazing", status: "Completed", date: "Jul 2025" },
      { stage: "MEP Handover", status: "Completed", date: "Nov 2025" }
    ]
  },
  {
    id: 3,
    name: "Minimalist Penthouse Renovation",
    category: "interior",
    description: "Full redesign of a duplex penthouse. High-end woodwork, custom lighting, marble installations, and Italian modular kitchen.",
    location: "MG Road, Bangalore",
    area: "3,200 Sq.Ft.",
    duration: "5 Months",
    budget: "Rs. 1.2 Crore",
    services_used: "Interior Design, Smart Home Integration, False Ceiling, Tile Installation",
    before_image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    client_name: "Rohan & Priya Mehta",
    client_rating: 5,
    client_review: "The interior designers at Abacus transformed our dated penthouse into a gorgeous, sleek, modern sanctuary. Highly recommended!",
    progress_timeline: [
      { stage: "Interior Space Planning", status: "Completed", date: "Oct 2025" },
      { stage: "Demolition & Wiring", status: "Completed", date: "Nov 2025" },
      { stage: "Cabinetry & False Ceiling", status: "Completed", date: "Jan 2026" },
      { stage: "Furniture & Finishes", status: "Completed", date: "Feb 2026" }
    ]
  }
];

const MOCK_GALLERY = [
  { id: 1, title: "Luxury Villa Facade", category: "luxury_homes", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Minimalist Living Area", category: "interiors", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Modern Duplex Villa", category: "modern_villas", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Lush Back Garden", category: "landscaping", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Concrete Pouring Frame", category: "construction_progress", image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Completed Residential Suite", category: "completed_projects", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: "Luxury Master Bedroom", category: "interiors", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Contemporary Exterior", category: "luxury_homes", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" }
];

const MOCK_FLOORPLANS = [
  { id: 1, title: "Standard 3BHK Layout", category: "3BHK", bedrooms: 3, bathrooms: 3, area: "1,850 Sq.Ft.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80", pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 2, title: "Premium 4BHK Duplex Plan", category: "duplex", bedrooms: 4, bathrooms: 5, area: "3,400 Sq.Ft.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 3, title: "Luxury Villa Layout with Pool", category: "luxury_villas", bedrooms: 5, bathrooms: 6, area: "5,200 Sq.Ft.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
];

const MOCK_BLOGS = [
  { id: 1, title: "5 Tips for Cost-Effective Luxury Villa Construction", category: "Budget Planning", content: "Building a luxury home does not mean you have to overspend. Here, we discuss structural optimization, bulk material sourcing, smart planning strategies, energy-saving configurations, and how choosing the right turnkey partner can save you up to 15% on total construction costs.", author: "Ar. Anand Kumar", date: "2026-07-01", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "The Step-by-Step Guide to Building Approval Permits", category: "Building Approval Guide", content: "Navigating municipality laws and corporation regulations can be daunting. In this guide, we simplify the documentation process, showing you how to secure approvals for 2D plans, fire safety certificates, electrical authority approvals, and land ownership validations.", author: "Er. Suresh Menon", date: "2026-06-25", image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Smart Home Trends: Enhancing Convenience & Security", category: "Interior Trends", content: "Home automation is changing the way we live. Learn about the latest technology in smart hubs, occupancy sensors, automated solar shading, voice-activated safety shutters, and integrating your home entertainment system directly into custom modular ceilings.", author: "John Doe", date: "2026-06-12", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" }
];

const MOCK_TESTIMONIALS = [
  { id: 1, client_name: "Dr. Sandeep Kurup", client_image: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, project_type: "Villa Owner, Kochi", review_text: "Abacus Homes delivered my dream villa exactly as visualized. Their engineering team is extremely professional and transparent about pricing." },
  { id: 2, client_name: "Arun Kumar", client_image: "https://randomuser.me/api/portraits/men/44.jpg", rating: 5, project_type: "Kakkanad, Residential", review_text: "I was very worried about the building approvals, but their legal team handled the municipal papers end-to-end. Fantastic experience!" },
  { id: 3, client_name: "Meera Nair", client_image: "https://randomuser.me/api/portraits/women/12.jpg", rating: 5, project_type: "Interior Client, Bangalore", review_text: "Absolutely love my new modular kitchen and false ceiling design. Their designers pay great attention to detail." }
];

const MOCK_CAREERS = [
  { id: 1, title: "Civil Site Engineer", department: "Civil Engineering", location: "Kochi", description: "Supervise site operations, inspect concrete mixes, manage labor productivity, and ensure structural blueprint adherence.", requirements: "B.Tech in Civil Engineering;3-5 years site supervision experience;Fluent in English & local language;Proficiency in MS Project" },
  { id: 2, title: "Junior Architect", department: "Architecture", location: "Bangalore", description: "Collaborate on structural drafting, build 3D elevations, coordinate customer layouts, and submit municipal clearance drawings.", requirements: "B.Arch degree;1-2 years experience in design firm;Expert in AutoCAD, Revit & SketchUp;Strong design portfolio" }
];

// Helper to make mock responses
const mockResponse = (data) => Promise.resolve({ data });

export const servicesAPI = {
  list: () => api.get('/services/').catch(() => mockResponse(MOCK_SERVICES)),
  detail: (id) => api.get(`/services/${id}/`).catch(() => mockResponse(MOCK_SERVICES.find(s => s.id === parseInt(id)))),
};

export const projectsAPI = {
  list: () => api.get('/projects/').catch(() => mockResponse(MOCK_PROJECTS)),
  detail: (id) => api.get(`/projects/${id}/`).catch(() => mockResponse(MOCK_PROJECTS.find(p => p.id === parseInt(id)))),
};

export const galleryAPI = {
  list: () => api.get('/gallery/').catch(() => mockResponse(MOCK_GALLERY)),
};

export const floorplansAPI = {
  list: () => api.get('/floorplans/').catch(() => mockResponse(MOCK_FLOORPLANS)),
};

export const blogsAPI = {
  list: () => api.get('/blogs/').catch(() => mockResponse(MOCK_BLOGS)),
  detail: (id) => api.get(`/blogs/${id}/`).catch(() => mockResponse(MOCK_BLOGS.find(b => b.id === parseInt(id)))),
};

export const testimonialsAPI = {
  list: () => api.get('/testimonials/').catch(() => mockResponse(MOCK_TESTIMONIALS)),
};

export const careersAPI = {
  list: () => api.get('/careers/').catch(() => mockResponse(MOCK_CAREERS)),
  apply: (data) => api.post('/applications/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).catch(() => mockResponse({ success: true, message: 'Application submitted successfully (Simulated)' })),
};

export const consultationAPI = {
  submit: (data) => api.post('/consultation/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).catch(() => mockResponse({ success: true, message: 'Consultation request submitted successfully (Simulated)' })),
};

export const contactAPI = {
  submit: (data) => api.post('/contact/', data).catch(() => mockResponse({ success: true, message: 'Message sent successfully (Simulated)' })),
};

export const clientDashboardAPI = {
  getProjects: () => api.get('/client-projects/').catch(() => {
    // Return mock client dashboard project context if auth is client
    const token = localStorage.getItem('access_token');
    if (token === 'dummy_client_token') {
      return mockResponse([
        {
          id: 1,
          project_name: "The Abacus Splendid Villa",
          location: "Aluva, Kochi",
          start_date: "2025-04-15",
          status: "MEP & Plastering Work",
          progress_percent: 75,
          updates: [
            { id: 1, title: "Foundation Cast", description: "Foundation layout finalized and concrete poured successfully.", photo_url: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80", created_at: "2025-04-20" },
            { id: 2, title: "Superstructure Brickwork", description: "All brick walls erected, beams set, and roof slabs cast.", photo_url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80", created_at: "2025-07-15" },
            { id: 3, title: "Plastering & Wiring", description: "Plumbing pipes set and internal electrical wiring completed.", photo_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", created_at: "2025-11-20" }
          ],
          invoices: [
            { id: 1, title: "Initial Signing & Mobilization", amount: 500000.00, due_date: "2025-04-20", status: "PAID" },
            { id: 2, title: "Foundation Completion Stage", amount: 1200000.00, due_date: "2025-06-15", status: "PAID" },
            { id: 3, title: "Superstructure Casting Stage", amount: 1800000.00, due_date: "2025-11-30", status: "PAID" },
            { id: 4, title: "Internal Plastering Stage Payment", amount: 800000.00, due_date: "2026-07-30", status: "PENDING" }
          ],
          documents: [
            { id: 1, title: "Approved 2D Architecture Blueprint", doc_type: "BLUEPRINTS", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
            { id: 2, title: "Municipality Construction License #982", doc_type: "APPROVALS", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
            { id: 3, title: "Civil Building Agreement", doc_type: "AGREEMENT", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
          ]
        }
      ]);
    }
    return mockResponse([]);
  }),
};
