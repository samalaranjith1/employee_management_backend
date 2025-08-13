"use client";
import React, { useState,useEffect } from "react";
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

  const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);
  const [minWidth, setMinWidth] = useState("0");

  useEffect(() => {
    const updateMinWidth = () => {
      setMinWidth(window.innerWidth < 900);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="px-3 shadow-sm fixed-top">
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
            <Nav.Link href="/" className="fw-medium text-dark">
              Home
            </Nav.Link>
            <Nav.Link href="/insights" className="fw-medium text-dark">
              Actionable Insights
            </Nav.Link>
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
                minWidth: minWidth < 900 ? "100px" : "0",
                marginLeft: minWidth < 900 ? "-50px" : "0",
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
              variant="outline-warning"
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
