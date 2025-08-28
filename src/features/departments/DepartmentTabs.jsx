"use client";
import { Nav } from "react-bootstrap";

function DepartmentTabs({ navTabs, activeKey, setActiveKey }) {
  return (
    <Nav
      variant="tabs"
      activeKey={activeKey}
      onSelect={(k) => setActiveKey(k)}
      className="d-none d-md-flex justify-content-between"
    >
      {navTabs.map((tab, idx) => (
        <Nav.Item key={idx} className="flex-fill text-center">
          <Nav.Link eventKey={tab.toLowerCase().replace(/\s+/g, "-")}>
            {tab}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default DepartmentTabs;
