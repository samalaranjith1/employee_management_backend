"use client";
import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  FaRupeeSign,
  FaUtensils,
  FaPercentage,
  FaBullseye,
} from "react-icons/fa";

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
  return (
    <Card className="p-4 m-3" style={{ backgroundColor: "#f7f8fa" }}>
      {/* Header */}
      <Row className="mb-4">
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
      </Row>

      {/* Desktop: Cards Left | Graph Right */}
      <Row>
        {/* Cards Column */}
        <Col
          xs={12}
          lg={3}
          className="d-flex flex-lg-column flex-row overflow-auto gap-3 mb-3 mb-lg-0"
          style={{ whiteSpace: "nowrap" }}
        >
          <Card
            className="shadow-sm flex-shrink-0"
            style={{ borderLeft: "5px solid #3b82f6", minWidth: "220px" }}
          >
            <Card.Body>
              <FaRupeeSign className="text-primary fs-4" />
              <p className="mb-1 text-muted">Total Sales</p>
              <h5 className="fw-bold text-primary">₹413K</h5>
            </Card.Body>
          </Card>

          <Card
            className="shadow-sm flex-shrink-0"
            style={{ borderLeft: "5px solid #10b981", minWidth: "220px" }}
          >
            <Card.Body>
              <FaUtensils className="text-success fs-4" />
              <p className="mb-1 text-muted">Total Consumption</p>
              <h5 className="fw-bold text-success">₹255K</h5>
            </Card.Body>
          </Card>

          <Card
            className="shadow-sm flex-shrink-0"
            style={{ borderLeft: "5px solid #f97316", minWidth: "220px" }}
          >
            <Card.Body>
              <FaPercentage className="text-warning fs-4" />
              <p className="mb-1 text-muted">Overall Cost %</p>
              <h5 className="fw-bold text-warning">61.7%</h5>
            </Card.Body>
          </Card>

          <Card
            className="shadow-sm flex-shrink-0"
            style={{ borderLeft: "5px solid #a855f7", minWidth: "220px" }}
          >
            <Card.Body>
              <FaBullseye className="text-purple fs-4" />
              <p className="mb-1 text-muted">Target Cost %</p>
              <h5 className="fw-bold text-purple">≤60%</h5>
            </Card.Body>
          </Card>
        </Col>

        {/* Graph Column */}
        <Col xs={12} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">
                Department Sales vs Consumption Analysis
              </h6>
              <p className="text-muted">
                Bars show sales & consumption values, line shows cost percentage
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#8884d8"
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#f97316"
                    domain={[50, 75]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="sales"
                    fill="#3b82f6"
                    name="Sales"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="consumption"
                    fill="#10b981"
                    name="Consumption"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cost"
                    stroke="#f97316"
                    name="Cost %"
                    dot={{ r: 5 }}
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Cost Ratio Tags */}
              <div className="mt-3 d-flex flex-wrap gap-3">
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
    </Card>
  );
};

export default DepartmentPerformance;
