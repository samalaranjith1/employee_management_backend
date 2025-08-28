"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Offcanvas,
  Nav,
  Tab,
} from "react-bootstrap";
import {
  FaBullseye,
  FaBox,
  FaUsers,
  FaExchangeAlt,
  FaCog,
} from "react-icons/fa";

const Dashboard = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeButton, setActiveButton] = useState("Today");

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const buttonOptions = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Custom",
  ];
  const navTabs = [
    "Home",
    "Actionable Insights",
    "Products",
    "Sales",
    "Consumption",
    "Closing",
    "Sales - Forecast",
    "Consumption - Forecast",
  ];

  return (
    <Container fluid className="p-4" style={{ background: "#fff" }}>
      {/* Top Info Section */}
      <Row className="align-items-center mb-4">
        <Col>
          <div style={{ fontSize: "12px", color: "#FF5722" }}>DEPARTMENT</div>
          <h2 style={{ fontWeight: 700 }}>North Indian</h2>
          <div
            style={{
              height: "2px",
              width: "50px",
              background: "#FF5722",
              marginTop: "4px",
            }}
          />
        </Col>
        <Col className="text-end">
          <Button
            onClick={handleShow}
            style={{
              background: "linear-gradient(to right, #FF5722, #FF3D00)",
              border: "none",
              color: "#fff",
            }}
          >
            <FaCog className="me-2" />
            Manage Department Closing
          </Button>
        </Col>
      </Row>

      {/* Metrics Section */}
      <Row className="text-center mb-4">
        <Col>
          <FaBullseye size={32} color="#00C853" />
          <div style={{ fontSize: "12px" }}>GOAL</div>
          <div style={{ fontWeight: 600 }}>30% of Sale</div>
        </Col>
        <Col>
          <FaBox size={32} color="#2979FF" />
          <div style={{ fontSize: "12px" }}>PRODUCTS</div>
          <div style={{ fontWeight: 600 }}>156</div>
        </Col>
        <Col>
          <FaUsers size={32} color="#AA00FF" />
          <div style={{ fontSize: "12px" }}>TEAM</div>
          <div style={{ fontWeight: 600 }}>3</div>
        </Col>
        <Col>
          <FaExchangeAlt size={32} color="#FF6D00" />
          <div style={{ fontSize: "12px" }}>TYPE</div>
          <div style={{ fontWeight: 600 }}>Purchase and Sale</div>
        </Col>
      </Row>

      {/* Button Group Section */}
      <Row className="mb-3">
        <Col>
          <ButtonGroup>
            {buttonOptions.map((btn) => (
              <Button
                key={btn}
                variant={activeButton === btn ? "success" : "outline-secondary"}
                onClick={() => setActiveButton(btn)}
              >
                {btn}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      {/* Nav Tabs Section */}
      <Tab.Container defaultActiveKey="Home">
        <Nav variant="tabs">
          {navTabs.map((tab) => (
            <Nav.Item key={tab}>
              <Nav.Link eventKey={tab}>{tab}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content
          className="p-3"
          style={{ minHeight: "300px", background: "#f8f9fa" }}
        >
          {navTabs.map((tab) => (
            <Tab.Pane eventKey={tab} key={tab}>
              <h5>{tab} Content</h5>
              <p>Render the component related to {tab} here.</p>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>

      {/* Offcanvas for Manage Department Closing */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="start"
        backdrop={false}
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Department Closing</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="secondary" onClick={handleClose} className="mb-3">
            Back to Dashboard
          </Button>
          <div style={{ height: "100%", background: "#f0f0f0" }}>
            {/* Render your full screen offcanvas content here */}
            Full screen closing content
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Dashboard;
