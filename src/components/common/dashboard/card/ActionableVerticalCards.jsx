"use client";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowUp, FaExclamationTriangle } from "react-icons/fa";
import CommonCard from "./CommonCard";
import { usePathname } from "next/navigation";

export default function ActionableVerticalCards({
  data,
  priorityColors,
  bgColor,
  textColor,
  scrollRef,
  style = {},
  className = "",
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isDashboard = pathname === "/dashboard";
  const useHorizontalLayout = !isDashboard && !isMobile;

  return (
    <CommonCard
      scrollRef={scrollRef}
      bgColor={bgColor[data.priority]}
      textColor={textColor}
      border={`1px solid #eee`}
      style={{
        borderLeft: `6px solid ${priorityColors[data.priority]}`,
        width: useHorizontalLayout ? "90vw" : "auto",
        margin: useHorizontalLayout ? "0 auto" : "0", // ✅ centers horizontally
        ...style,
      }}
      className={`d-flex justify-content-center ${className}`} // ✅ centers inner content
    >
      {useHorizontalLayout ? (
        // ✅ Horizontal layout (like screenshot)
        <Row className="align-items-center">
          {/* Left icon */}
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

          {/* Middle content */}
          <Col>
            <h6 className="mb-1">{data.title}</h6>
            <span
              dangerouslySetInnerHTML={{ __html: data.message }}
              style={{
                fontSize: "0.95rem",
                color: "#555",
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            />
          </Col>

          {/* Right side priority */}
          <Col
            xs="auto"
            className="d-flex align-items-center gap-1 fw-semibold"
          >
            <FaExclamationTriangle
              color={priorityColors[data.priority]}
              size={18}
            />
            <span
              style={{
                color: priorityColors[data.priority],
                background: bgColor[data.priority],
                borderRadius: "16px",
                padding: "4px 8px",
                fontSize: "0.85rem",
              }}
            >
              {data.priority?.charAt(0).toUpperCase() + data.priority?.slice(1)}{" "}
              Priority
            </span>
          </Col>
        </Row>
      ) : (
        // ✅ Default stacked layout (dashboard & mobile)
        <>
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
              {data.priority?.charAt(0).toUpperCase() + data.priority?.slice(1)}{" "}
              Priority
            </Col>
          </Row>
          <h6>{data.title}</h6>
          <span
            dangerouslySetInnerHTML={{ __html: data.message }}
            style={{
              fontSize: "0.95rem",
              color: "#555",
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          />
        </>
      )}
    </CommonCard>
  );
}
