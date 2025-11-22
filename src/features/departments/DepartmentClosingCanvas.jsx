"use client";
import { Offcanvas, Button } from "react-bootstrap";

function DepartmentClosingCanvas({ show, onClose }) {
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="start"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Offcanvas.Header>
        <Button variant="link" onClick={onClose}>
          ← Back to Department Page
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h4>Department Closing Details</h4>
        <p>All closing-related content goes here...</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default DepartmentClosingCanvas;
