"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
  Container,
  Button,
  Col,
  Offcanvas,
} from "react-bootstrap";
import {
  FaBell,
  FaUserCircle,
  FaStore,
  FaBars,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import NavPanel from "./NavPanel";
import Profile from "./Profile";

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState("/"); // default active page
  const [isMobile, setMobile] = useState("0");

  const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

  // Update window width for responsive design
  useEffect(() => {
    const updateMinWidth = () => setMobile(window.innerWidth < 900);
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  // Update active tab based on current URL
  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  const handleNavClick = (path) => {
    setActiveTab(path);
    window.location.href = path; // simple navigation, can replace with next/router if using Next.js
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/insights", label: "Actionable Insights" },
  ];

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="px-3 shadow-sm fixed-top"
      style={{
        background: "linear-gradient(90deg, #f4e5daff, #ffb347)", // choose option
        color: "#fff",
      }}
    >
      <Container fluid className="align-items-center justify-content-between">
        {/* Left Section: Menu & Brand */}
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="link"
            className="p-0 text-dark"
            onClick={() => setShowNavPanel(true)}
          >
            <FaBars />
          </Button>

          <Navbar.Brand
            href="/"
            className="d-flex align-items-center gap-lg-2"
            style={{ color: "rgb(255,92,0)" }}
          >
            <FaStore size={24} className="d-none d-lg-flex" />
            <span className="fw-bold">Costonomy</span>
          </Navbar.Brand>
        </div>

        {/* Center Navigation (Desktop Only) */}
        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center"
        >
          <Nav className="d-flex flex-row gap-4">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                onMouseEnter={() => setHoveredTab(item.path)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color:
                    activeTab === item.path
                      ? "#ff5016"
                      : hoveredTab === item.path
                      ? "#ff8a50"
                      : "#333",
                  borderBottom:
                    activeTab === item.path
                      ? "2px solid #ff5016"
                      : hoveredTab === item.path
                      ? "2px solid #ff8a50"
                      : "2px solid transparent",
                  transition: "all 0.2s ease",
                  paddingBottom: "4px",
                }}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Desktop Search */}
          <Form className="d-none d-lg-flex">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              style={{
                minWidth: isMobile < 900 ? "100px" : "0",
                marginLeft: isMobile < 900 ? "-50px" : "0",
              }}
            />
          </Form>

          {/* Mobile Search Icon */}
          <Button
            variant="link"
            className="text-dark p-0 d-lg-none"
            onClick={toggleMobileSearch}
          >
            <FaSearch size={18} />
          </Button>

          {/* Outlet Dropdown */}
          <Dropdown align="end" className="d-none d-lg-flex">
            <Dropdown.Toggle
              variant="outline-dark"
              className="d-flex align-items-center gap-2"
            >
              <FaMapMarkerAlt style={{ color: "rgb(255, 92, 0)" }} />
              <span
                className="rounded-circle"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "green",
                  display: "inline-block",
                }}
              />
              <span className="fw-medium">Mumbai Central</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Mumbai Central</Dropdown.Item>
              <Dropdown.Item>Outlet 2</Dropdown.Item>
              <Dropdown.Item>Outlet 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Mobile Outlet */}
          <Dropdown align="end" className="d-lg-none">
            <Dropdown.Toggle
              variant="link"
              className="text-dark p-0 border-0"
              style={{ boxShadow: "none" }}
            >
              <FaStore size={18} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Outlet 1</Dropdown.Item>
              <Dropdown.Item>Outlet 2</Dropdown.Item>
              <Dropdown.Item>Outlet 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Notifications (Desktop Only) */}
          <Button
            variant="link"
            className="text-dark me-2 p-0 d-none d-lg-flex"
          >
            <FaBell size={20} />
          </Button>

          {/* Profile (All Devices) */}
          <Button
            variant="link"
            className="text-dark p-0"
            onClick={() => setShowProfilePanel(true)}
          >
            <FaUserCircle size={24} />
          </Button>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="position-absolute top-100 start-0 w-100 bg-white p-2 shadow-sm">
            <Form className="d-flex w-100">
              <FormControl
                type="search"
                placeholder="Search..."
                autoFocus
                className="me-2"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowMobileSearch(false)}
              >
                Close
              </Button>
            </Form>
          </div>
        )}
      </Container>

      {/* Side Panels */}
      <Offcanvas
        show={showNavPanel}
        onHide={() => setShowNavPanel(false)}
        style={{ width: "280px" }}
      >
        <NavPanel onSelect={() => setShowNavPanel(false)} />
      </Offcanvas>

      <Offcanvas
        show={showProfilePanel}
        onHide={() => setShowProfilePanel(false)}
        style={{ width: "280px" }}
        placement="end"
      >
        <Profile onSelect={() => setShowProfilePanel(false)} />
      </Offcanvas>
    </Navbar>
  );
}
