"use client";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaCog } from "react-icons/fa";

function DepartmentHeader({ department, onManageClick }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #F56A2A, #F23C13)",
        color: "#fff",
        padding: "1.2rem 2rem",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaArrowLeft size={20} className="me-2" />
          <span style={{ fontSize: "1rem", fontWeight: "500" }}>
            Department
          </span>
        </div>

        {/* Desktop Button */}
        <Button
          variant="outline-light"
          className="d-none d-md-flex align-items-center"
          style={{
            background: "#fff",
            color: "#F23C13",
            fontWeight: "500",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
          onClick={onManageClick}
        >
          <FaCog className="me-2" />
          Manage Department Closing
        </Button>

        {/* Mobile Button */}
        <Button
          variant="outline-light"
          className="d-flex d-md-none"
          style={{
            background: "#fff",
            color: "#F23C13",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #eee",
          }}
          onClick={onManageClick}
        >
          <FaCog />
        </Button>
      </div>

      <h3 className="mt-2" style={{ fontWeight: "700" }}>
        {department}
      </h3>
    </div>
  );
}

export default DepartmentHeader;
