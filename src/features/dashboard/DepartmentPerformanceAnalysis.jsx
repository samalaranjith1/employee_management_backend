"use client";
import React, { useRef ,useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaPercentage } from "react-icons/fa";
import DepartmentPerformanceCards from "@/components/common/Cards/DepartmentPerformanceCards";
import DepartmentPerformanceGraph from "@/components/common/GraphWrapper/DepartmentPerformanceGraph";
import ComponentHeader from "@/components/common/ComponentHeader";

const data = [
  { name: "Kitchen", sales: 82000, consumption: 54000, cost: 61.2 },
  { name: "Beverages", sales: 66000, consumption: 40000, cost: 53.8 },
  { name: "Bakery", sales: 52000, consumption: 32000, cost: 62.2 },
  { name: "Spices", sales: 42000, consumption: 29000, cost: 65.8 },
  { name: "Dairy", sales: 44000, consumption: 25000, cost: 58.0 },
  { name: "Meat", sales: 53000, consumption: 30000, cost: 71.2 },
  { name: "Vegetables", sales: 48000, consumption: 28000, cost: 69.5 },
  { name: "Grains", sales: 39000, consumption: 23000, cost: 57.5 },
];

const DepartmentPerformance = () => {
  const myScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMinWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  return (
    <Container fluid className="p-3 pt-2">
      {/* Header */}
      <ComponentHeader
        title={"Department Performance Analysis"}
        description={"Sales vs Consumption with cost efficiency tracking"}
        titleColor={"#6f42c1 fs-4"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaPercentage color="#6f42c1" size={24} />}
        text={"8 Departments"}
      />
      {/* <Row className="mb-4">
        <Col>
          <h4 className="fw-bold" style={{ color: "#6f42c1" }}>
            <FaPercentage className="me-2" />
            Department Performance Analysis
          </h4>
          <p className="text-muted mb-0">
            Sales vs Consumption with cost efficiency tracking
          </p>
        </Col>
        <Col className="text-end">
          <Badge bg="light" text="primary" pill>
            8 Departments
          </Badge>
        </Col>
      </Row> */}

      <Row>
        <DepartmentPerformanceCards />
        <Col xs={12} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">
                Department Sales vs Consumption Analysis
              </h6>
              <p className="text-muted">
                Bars show sales & consumption values, line shows cost percentage
              </p>
              <div
                style={{
                  width: isMobile ? "95vw" : "100%",
                  marginLeft: isMobile ? "-6vw" : "0",
                }}
              >
                <DepartmentPerformanceGraph data={data} />
              </div>
              {/* Cost Ratio Tags */}
              <div className="mt-3 d-none d-md-flex flex-wrap gap-3">
                {data.map((dept) => (
                  <div
                    key={dept.name}
                    className="d-flex align-items-center gap-2"
                  >
                    <strong>{dept.name}</strong>
                    <Badge
                      bg={
                        dept.cost <= 60
                          ? "success"
                          : dept.cost <= 65
                          ? "warning"
                          : "danger"
                      }
                    >
                      {dept.cost}%
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-3">
                <Badge bg="success">≤60% Excellent</Badge>{" "}
                <Badge bg="warning">60-65% Good</Badge>{" "}
                <Badge bg="danger">65% Needs Attention</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DepartmentPerformance;
