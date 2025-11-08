import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import PrivacyConsent from "./components/PrivacyConsent";
import Dashboard from "./components/Dashboard";
import HealthInformation from "./components/HealthInformation";
import HealthTopicDetail from "./components/HealthTopicDetail";
import HealthTopics from "./components/HealthTopics";
import HealthTopicDetailPage from "./components/HealthTopicDetailPage";
import Services from "./components/Services";
import Contact from "./components/Contact";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: "patient" | "provider";
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserData = localStorage.getItem("userData");
    const consent = localStorage.getItem("privacyConsent");

    if (token && storedUserData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(storedUserData));
      setHasConsent(consent === "true");
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLoginSuccess = (data: UserData) => {
    setIsAuthenticated(true);
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    // After login, redirect to consent page
    navigate("/privacy-consent");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setHasConsent(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("privacyConsent");
    navigate("/");
  };

  // Determine if we should show header (not on login/register/verify/consent pages)
  const publicPages = [
    "/",
    "/login",
    "/register",
    "/verify",
    "/privacy-consent",
  ];
  const showHeader =
    isAuthenticated && hasConsent && !publicPages.includes(location.pathname);

  return (
    <div className="App">
      {/* Show Header on authenticated pages after consent */}
      {showHeader && (
        <Header
          isAuthenticated={isAuthenticated}
          onLoginClick={handleLoginClick}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <LandingPage onGetStarted={handleLoginClick} />
            ) : hasConsent ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/privacy-consent" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : hasConsent ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/privacy-consent" replace />
            )
          }
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route path="/verify" element={<Verify />} />

        {/* Privacy Consent - Required after login */}
        <Route
          path="/privacy-consent"
          element={
            isAuthenticated && !hasConsent ? (
              <PrivacyConsent />
            ) : isAuthenticated && hasConsent ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Routes - Require auth AND consent */}
        {/* Dashboard - Main landing page after consent */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && userData ? (
              hasConsent ? (
                <Dashboard userName={userData.name} />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Health Information - Secondary pages */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              hasConsent ? (
                <HealthInformation />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/health-info/:id"
          element={
            isAuthenticated ? (
              hasConsent ? (
                <HealthTopicDetail />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/health-topics"
          element={
            isAuthenticated ? (
              hasConsent ? (
                <HealthTopics />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/health-topics/:id"
          element={
            isAuthenticated ? (
              hasConsent ? (
                <HealthTopicDetailPage />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/services"
          element={
            isAuthenticated ? (
              hasConsent ? (
                <Services />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/contact"
          element={
            isAuthenticated ? (
              hasConsent ? (
                <Contact />
              ) : (
                <Navigate to="/privacy-consent" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Show Footer on authenticated pages after consent */}
      {showHeader && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
