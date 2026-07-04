import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://127.0.0.1:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user details
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me/`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user profile, logging out:", err);
      logout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        // Try to fetch profile with the token
        await fetchUserProfile(token);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    initializeAuth();
  }, [token]);

  // Login handler
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, { username, password });
      const { access, refresh } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setToken(access);
      
      // Fetch profile
      await fetchUserProfile(access);
      setLoading(false);
      return true;
    } catch (err) {
      console.warn("API login failed, checking fallback credentials...", err);
      
      // Local fallback for demo purposes
      if (username === 'admin' && password === 'admin123') {
        const dummyAdmin = {
          id: 1,
          username: 'admin',
          email: 'admin@abacushomes.com',
          first_name: 'Super',
          last_name: 'Admin',
          is_staff: true,
          projects: []
        };
        setUser(dummyAdmin);
        localStorage.setItem('access_token', 'dummy_admin_token');
        setToken('dummy_admin_token');
        setLoading(false);
        return true;
      } else if (username === 'client' && password === 'client123') {
        const dummyClient = {
          id: 2,
          username: 'client',
          email: 'client@abacushomes.com',
          first_name: 'John',
          last_name: 'Doe',
          is_staff: false,
          projects: [
            {
              id: 1,
              project_name: "The Abacus Splendid Villa",
              location: "Aluva, Kochi",
              start_date: "2025-04-15",
              status: "MEP & Plastering Work",
              progress_percent: 75,
              updates: [
                {
                  id: 1,
                  title: "Foundation Cast",
                  description: "Foundation layout finalized and concrete poured successfully with primary grid reinforcement check completed.",
                  photo_url: "https://images.unsplash.com/photo-1541976590-713941fbc796?auto=format&fit=crop&w=800&q=80",
                  created_at: "2025-04-20"
                },
                {
                  id: 2,
                  title: "Superstructure Brickwork",
                  description: "All ground floor brick walls erected, beams set, and roof slabs cast. Curing process concluded.",
                  photo_url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
                  created_at: "2025-07-15"
                },
                {
                  id: 3,
                  title: "Plastering & Wiring",
                  description: "Plumbing pipes set and internal electrical wiring completed. Plastering of internal walls ongoing.",
                  photo_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                  created_at: "2025-11-20"
                }
              ],
              invoices: [
                { id: 1, title: "Initial Signing & Mobilization", amount: "500000.00", due_date: "2025-04-20", status: "PAID" },
                { id: 2, title: "Foundation Completion Stage", amount: "1200000.00", due_date: "2025-06-15", status: "PAID" },
                { id: 3, title: "Superstructure Casting Stage", amount: "1800000.00", due_date: "2025-11-30", status: "PAID" },
                { id: 4, title: "Internal Plastering Stage Payment", amount: "800000.00", due_date: "2026-07-30", status: "PENDING" }
              ],
              documents: [
                { id: 1, title: "Approved 2D Architecture Blueprint", doc_type: "BLUEPRINTS", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
                { id: 2, title: "Municipality Construction License #982", doc_type: "APPROVALS", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
                { id: 3, title: "Civil Building Agreement", doc_type: "AGREEMENT", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
              ]
            }
          ]
        };
        setUser(dummyClient);
        localStorage.setItem('access_token', 'dummy_client_token');
        setToken('dummy_client_token');
        setLoading(false);
        return true;
      }

      setError(err.response?.data?.detail || 'Invalid username or password');
      setLoading(false);
      return false;
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
