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
    name: "The Malabar Courtyard Villa",
    category: "residential",
    description: "A luxury 5-bedroom Kerala contemporary villa featuring open central nadumuttam courtyards, teakwood sit-out verandas, sloping terracotta roofs, and integrated home automation.",
    location: "Kakkanad, Kochi",
    area: "6,500 Sq.Ft.",
    duration: "14 Months",
    budget: "Rs. 3.5 Crore",
    services_used: "Architectural Design, Turnkey Construction, Interior Design, Smart Home Integration, Landscape Design",
    before_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    after_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    client_name: "Dr. Sandeep Kurup",
    client_rating: 5,
    client_review: "Abacus Homes delivered my dream Kerala villa exactly as visualized. Their engineering team is extremely professional and transparent about pricing.",
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
    name: "The Heritage Teak & Laterite Villa",
    category: "residential",
    description: "Traditional Kerala architectural fusion villa with clay tile roof slopes, exposed laterite stone masonry, teakwood charupadi sit-outs, and tropical landscaping.",
    location: "Beach Road, Kozhikode",
    area: "4,800 Sq.Ft.",
    duration: "12 Months",
    budget: "Rs. 2.8 Crore",
    services_used: "Residential Construction, Architectural Elevation, Panchayat Approval, Teak Woodwork",
    before_image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=1200&q=80",
    after_image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    client_name: "Er. Manoj Varma",
    client_rating: 5,
    client_review: "The traditional Kerala aesthetic fused with modern luxury interiors is breathtaking. Superb build quality!",
    progress_timeline: [
      { stage: "Planning & Soil Testing", status: "Completed", date: "May 2024" },
      { stage: "Excavation & Piling", status: "Completed", date: "Aug 2024" },
      { stage: "Laterite & Concrete Core", status: "Completed", date: "Jan 2025" },
      { stage: "Terracotta Roof & Teakwork", status: "Completed", date: "Jul 2025" },
      { stage: "Final Handover", status: "Completed", date: "Nov 2025" }
    ]
  },
  {
    id: 3,
    name: "Vembanad Backwater Haven",
    category: "interior",
    description: "Full interior architectural design of a luxury waterfront villa. Natural teak wood acoustic slat walls, custom false ceilings, marble waterfall island kitchen, and ambient coved lighting.",
    location: "Kumarakom, Kottayam",
    area: "3,800 Sq.Ft.",
    duration: "6 Months",
    budget: "Rs. 1.6 Crore",
    services_used: "Interior Design, Smart Lighting, Modular Kitchen, Wooden Flooring",
    before_image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    after_image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    client_name: "Rohan & Priya Mehta",
    client_rating: 5,
    client_review: "The interior designers at Abacus transformed our villa into a serene, modern tropical sanctuary. Highly recommended!",
    progress_timeline: [
      { stage: "Interior Space Planning", status: "Completed", date: "Oct 2025" },
      { stage: "Demolition & Wiring", status: "Completed", date: "Nov 2025" },
      { stage: "Teak Cabinetry & Ceilings", status: "Completed", date: "Jan 2026" },
      { stage: "Furniture & Finishes", status: "Completed", date: "Feb 2026" }
    ]
  }
];

const MOCK_GALLERY = [
  { id: 1, title: "Contemporary Kerala Villa Facade", category: "luxury_homes", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "Warm Teak Living & Acoustic Slat Wall", category: "interiors", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Traditional Kerala Gabled Villa", category: "modern_villas", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, title: "Tropical Courtyard Water Garden", category: "landscaping", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, title: "Structural Column & Roof Casting", category: "construction_progress", image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, title: "Waterfront Tropical Residence", category: "completed_projects", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
  { id: 7, title: "Luxury Teak Master Bedroom Suite", category: "interiors", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80" },
  { id: 8, title: "Open-Plan Dining & Island Kitchen", category: "interiors", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80" },
  { id: 9, title: "Kerala Sit-Out Veranda with Charupadi", category: "luxury_homes", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80" },
  { id: 10, title: "Wayanad Rainforest Modernist Estate", category: "modern_villas", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
  { id: 11, title: "Bespoke Modular Kitchen with Quartz Island", category: "interiors", image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80" },
  { id: 12, title: "Villa Elevation at Twilight", category: "completed_projects", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80" }
];

const MOCK_FLOORPLANS = [
  { id: 1, title: "3BHK Traditional Nalukettu Layout", category: "3BHK", bedrooms: 3, bathrooms: 3, area: "1,850 Sq.Ft.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80", pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 2, title: "4BHK Contemporary Tropical Duplex Villa", category: "duplex", bedrooms: 4, bathrooms: 5, area: "3,400 Sq.Ft.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 3, title: "5BHK Luxury Courtyard Villa with Pool", category: "luxury_villas", bedrooms: 5, bathrooms: 6, area: "5,200 Sq.Ft.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
];

const MOCK_BLOGS = [
  { id: 1, title: "5 Architectural Secrets for Building a Modern Kerala Villa", category: "Vastu & Design", content: "Kerala's tropical climate requires smart cross-ventilation, sloping terracotta roof drainage, open central nadumuttam courtyards, and overhang eaves. Here is how modern architects blend traditional Kerala timber aesthetics with contemporary minimalism.", author: "Ar. Sneha Mathew", date: "2026-07-01", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "The Step-by-Step Guide to Panchayat & Municipality Building Approvals in Kerala", category: "Building Approval Guide", content: "Navigating Kerala Municipality Building Rules (KMBR / KPBR) can be seamless with the right guidance. Learn the required set-backs, FAR calculations, 2D blueprint requirements, and local body clearance certificates.", author: "Er. Sirajuddin K.A", date: "2026-06-25", image: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Interior Trends: Teak Woodwork, Acoustic Slat Walls & Modular Luxury Kitchens", category: "Interior Trends", content: "Discover how warm natural teak, quartz waterfall counters, automated ambient lighting, and minimalist sliding partitions are creating serene, breathable luxury spaces in tropical Kerala homes.", author: "Ar. Priya Nair", date: "2026-06-12", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" }
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
