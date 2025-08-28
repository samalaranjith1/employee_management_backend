import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { FaArrowUp, FaExclamationTriangle } from 'react-icons/fa';

function ActionableCard({
  data,
  priorityColors,
  bgColor,
  textColor,
  scrollRef,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMinWidth = () => {
      setIsMobile(window.innerWidth < 700);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);
  return (
    <Card
      ref={scrollRef}
      key={data.id}
      className="p-3 gap-1 card-item"
      style={{
        width: isMobile ? "90vw" : "23vw",
        minWidth: "250px",
        flexShrink: 0,
        cursor: "pointer",
        borderTop: `8px solid ${priorityColors[`${data.priority}`]}`,
        backgroundColor: `${bgColor[`${data.priority}`]}`,
        color: textColor,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid gray",
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, border 0.3s",
        willChange: "transform",
      }}
    >
      <Row className="align-items-center mb-2">
        <Col xs="auto">
          <div
            style={{
              background: "linear-gradient(135deg, #ff6a00, #ff3c3c)",
              borderRadius: "12px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <FaArrowUp size={20} />
          </div>
        </Col>
        <Col className="text-danger fw-semibold d-flex align-items-center gap-1">
          <FaExclamationTriangle />{" "}
          {data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}{" "}
          Priority
        </Col>
      </Row>

      <h6>{data.title}</h6>

      <span
        dangerouslySetInnerHTML={{ __html: data.message }}
        style={{
          width: isMobile ? "80vw" : "20vw",
          fontSize: "0.95rem",
          color: "#555",
          maxWidth: "100%",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      />
    </Card>
  );
}

export default ActionableCard