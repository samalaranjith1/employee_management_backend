"use client";
import React, { useState } from "react";
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
  FaChevronDown,
} from "react-icons/fa";
import NavPanel from "./NavPanel";
import Profile from "./Profile";

export default function Header() {
  
  const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showNavPanel, setShowNavPanel] = useState(false);
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const [showSearchResultPanel, setShowSearchResultPanel] = useState(false);

    const handleNavPanelClose = () => setShowNavPanel(false);
    const handleNavPanelShow = () => setShowNavPanel(true);

    const handleProfileClose = () => setShowProfilePanel(false);
    const handleProfileShow = () => setShowProfilePanel(true); 

    const handleSearchResultPanelClose = () => setShowSearchResultPanel(false);
    const handleSearchResultPanelShow = () => setShowSearchResultPanel(true);      

  const handleSearchToggle = () => {
    setShowMobileSearch((prev) => !prev);
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3 shadow-sm fixed-top">
      <Container fluid>
        <Navbar className="pe-lg-3">
          <div className="pe-3" onClick={handleNavPanelShow}>
            <FaBars />
          </div>

          <Offcanvas
            show={showNavPanel}
            onHide={handleNavPanelClose}
            style={{ width: "280px" }}
          >
            <NavPanel onSelect={handleNavPanelClose} />
          </Offcanvas>
          <Navbar.Brand
            href="/"
            className="d-flex align-items-center gap-lg-2"
            style={{ color: "rgb(255,92,0)" }}
          >
            <FaStore size={24} className="d-none d-lg-flex" />
            <span className="fw-bold">Costonomy</span>
          </Navbar.Brand>
        </Navbar>
        {/* <Navbar.Brand
          href="/"
          className="d-flex align-items-center gap-lg-2"
          style={{ color: "rgb(255,92,0)" }}
        >
          <FaStore size={24} className="d-none d-lg-flex" />
          <span className="fw-bold">Costonomy</span>
        </Navbar.Brand> */}
        <Col md={6} className="justify-content-center d-none d-lg-flex">
          <Nav className="gap-4">
            <Nav.Link href="/" className="fw-medium">
              Home
            </Nav.Link>
            <Nav.Link href="/insights" className="fw-medium">
              Actionable Insights
            </Nav.Link>
          </Nav>
        </Col>

        <Form className="d-flex me-3 d-none d-lg-flex">
          <FormControl type="search" placeholder="Search..." className="me-2" />
        </Form>
        {/* <Button
          variant="link"
          className="text-dark p-0 d-lg-none"
          onClick={handleSearchToggle}
        >
          <FaSearch size={18} />
        </Button> */}
        <Dropdown className="d-none d-lg-flex">
          <Dropdown.Toggle
            variant="outline-warning"
            className="d-flex align-items-center gap-2 outlet-dropdown-toggle"
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

            {/* <FaChevronDown size={12} className="ms-auto" /> */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Mumbai Central</Dropdown.Item>
            <Dropdown.Item>Outlet 2</Dropdown.Item>
            <Dropdown.Item>Outlet 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="link" className="text-dark me-2 p-0  d-none d-lg-flex">
          <FaBell size={20} />
        </Button>

        <Button
          variant="link"
          className="text-dark p-0  d-none d-lg-flex"
          onClick={handleProfileShow}
        >
          <FaUserCircle size={24} />
        </Button>
        <Offcanvas
          show={showProfilePanel}
          onHide={handleProfileClose}
          style={{ width: "280px" }}
          placement="end"
        >
          <Profile onSelect={handleProfileClose} />
        </Offcanvas>
        <div className="d-flex align-items-center gap-3 d-md-none">
          <Button
            variant="link"
            className="text-dark p-0"
            onClick={handleSearchToggle}
          >
            <FaSearch size={18} />
          </Button>

          {/* Outlet Dropdown */}
          <Dropdown align="end">
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

          {/* Profile */}
          <Button variant="link" className="text-dark p-0" onClick={handleProfileShow}>
            <FaUserCircle size={20} />
          </Button>
          <Offcanvas
            show={showProfilePanel}
            onHide={handleProfileClose}
            style={{ width: "280px" }}
            placement="end"
          >
            <Profile onSelect={handleProfileClose} />
          </Offcanvas>
        </div>
        {showMobileSearch && (
          <div className="position-absolute top-100 start-0 w-100 bg-white p-2  shadow-sm">
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
    </Navbar>
  );
}



  



