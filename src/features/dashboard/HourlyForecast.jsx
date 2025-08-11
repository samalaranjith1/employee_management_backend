"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { FaClock, FaArrowRight, FaChartLine } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for products, metrics, and data points
const mockProductData = {
  "All Products": {
    Sales: {
      dailyForecast: "₹33,110",
      actualSoFar: "₹17,109",
      remainingTarget: "₹16,001",
      graphData: [
        { hour: "12 AM", forecast: 500, actual: 480 },
        { hour: "2 AM", forecast: 550, actual: 520 },
        { hour: "4 AM", forecast: 650, actual: 610 },
        { hour: "6 AM", forecast: 1000, actual: 950 },
        { hour: "8 AM", forecast: 1500, actual: 1450 },
        { hour: "10 AM", forecast: 2200, actual: 2100 },
        { hour: "12 PM", forecast: 2500, actual: 2400 },
        { hour: "2 PM", forecast: 2800, actual: 2700 },
        { hour: "4 PM", forecast: 2400, actual: 2350 },
        { hour: "6 PM", forecast: 1800, actual: 1750 },
        { hour: "8 PM", forecast: 2000, actual: 2100 },
        { hour: "10 PM", forecast: 2900, actual: 3200 },
        { hour: "11 PM", forecast: 2200, actual: 2600 },
      ],
    },
    Orders: {
      dailyForecast: "1,250",
      actualSoFar: "780",
      remainingTarget: "470",
      graphData: [
        { hour: "12 AM", forecast: 20, actual: 18 },
        { hour: "2 AM", forecast: 25, actual: 23 },
        { hour: "4 AM", forecast: 30, actual: 28 },
        { hour: "6 AM", forecast: 50, actual: 48 },
        { hour: "8 AM", forecast: 70, actual: 65 },
        { hour: "10 AM", forecast: 90, actual: 88 },
        { hour: "12 PM", forecast: 100, actual: 95 },
        { hour: "2 PM", forecast: 110, actual: 105 },
        { hour: "4 PM", forecast: 95, actual: 92 },
        { hour: "6 PM", forecast: 75, actual: 70 },
        { hour: "8 PM", forecast: 80, actual: 85 },
        { hour: "10 PM", forecast: 120, actual: 130 },
        { hour: "11 PM", forecast: 100, actual: 110 },
      ],
    },
  },
  "Product A": {
    Sales: {
      dailyForecast: "₹15,000",
      actualSoFar: "₹8,500",
      remainingTarget: "₹6,500",
      graphData: [
        { hour: "12 AM", forecast: 200, actual: 190 },
        { hour: "2 AM", forecast: 220, actual: 210 },
        { hour: "4 AM", forecast: 300, actual: 280 },
        { hour: "6 AM", forecast: 500, actual: 470 },
        { hour: "8 AM", forecast: 800, actual: 750 },
        { hour: "10 AM", forecast: 1100, actual: 1050 },
        { hour: "12 PM", forecast: 1250, actual: 1200 },
        { hour: "2 PM", forecast: 1400, actual: 1350 },
        { hour: "4 PM", forecast: 1100, actual: 1080 },
        { hour: "6 PM", forecast: 850, actual: 820 },
        { hour: "8 PM", forecast: 900, actual: 950 },
        { hour: "10 PM", forecast: 1300, actual: 1500 },
        { hour: "11 PM", forecast: 1100, actual: 1250 },
      ],
    },
  },
};

const products = Object.keys(mockProductData);
const metrics = ["Sales", "Orders"]; // Hardcoded for simplicity, could be dynamic

export default function HourlyForecast() {
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedMetric, setSelectedMetric] = useState("Sales");
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const newData = mockProductData[selectedProduct]?.[selectedMetric];
    setCurrentData(newData || {});
  }, [selectedProduct, selectedMetric]);

  // Adjusted height for the graph
  const svgHeight = 450; // Increased from 250 to 350

  const maxForecast = currentData?.graphData
    ? Math.max(...currentData.graphData.map((d) => d.forecast))
    : 0;
  const maxActual = currentData?.graphData
    ? Math.max(...currentData.graphData.map((d) => d.actual))
    : 0;
  const maxVal = Math.ceil(Math.max(maxForecast, maxActual) / 100) * 100;

  const renderGraph = () => {
    if (!currentData.graphData || currentData.graphData.length === 0) {
      return (
        <div className="text-center p-5 text-secondary">
          No data available for this selection.
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={svgHeight}>
        <LineChart
          data={currentData.graphData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="hour"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fill: "#6c757d", fontSize: 12 }}
            label={{
              value: "Time",
              position: "insideBottom",
              offset: -15,
              fill: "#6c757d",
              fontSize: 14,
            }}
          />
          <YAxis
            domain={[0, maxVal]}
            tickFormatter={(value) =>
              selectedMetric === "Sales" ? `₹${value}` : value
            }
            tick={{ fill: "#6c757d", fontSize: 12 }}
            label={{
              value: selectedMetric === "Sales" ? "Sales (₹)" : "Orders",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fill: "#6c757d",
              fontSize: 14,
            }}
          />
          <Tooltip
            formatter={(value, name) => [
              selectedMetric === "Sales" ? `₹${value}` : value,
              name === "forecast" ? "Forecast" : "Actual",
            ]}
            labelFormatter={(label) => `Hour: ${label}`}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ top: -10, right: 0, paddingBottom: "10px" }}
            payload={[
              {
                value: "Forecast",
                type: "line",
                id: "forecast",
                color: "#007bff",
              },
              { value: "Actual", type: "line", id: "actual", color: "#28a745" },
            ]}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#007bff"
            activeDot={{ r: 8 }}
            name="forecast"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#28a745"
            activeDot={{ r: 8 }}
            name="actual"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card
      style={{
        backgroundColor: "white",
        padding: "2rem",
      }}
      className="m-2"
    >
      <Container fluid className="p-0">
        {/* Header */}
        <Row className="mb-4 d-flex align-items-center">
          <Col xs={12} md={6}>
            <div className="d-flex align-items-center">
              <FaClock className="h-6 w-6 me-2 text-primary" />
              <div>
                <h1 className="h5 fw-bold text-dark mb-0">Hourly Forecast</h1>
                <p
                  className="text-secondary mb-0"
                  style={{ fontSize: "0.875rem" }}
                >
                  Real-time predictions for today's performance
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
            <span className="text-secondary me-3">Today's Forecast</span>
            <button className="btn btn-light rounded-circle">
              <FaArrowRight />
            </button>
          </Col>
        </Row>

        {/* Main Content */}
        <Row>
          {/* Filters and Cards Sidebar */}
          <Col lg={3}>
            <Card className="rounded-lg shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="h6 fw-bold mb-3">Filters</Card.Title>
                <div className="mb-3">
                  <p className="text-secondary mb-1">Products</p>
                  <Dropdown
                    onSelect={(eventKey) => setSelectedProduct(eventKey)}
                  >
                    <Dropdown.Toggle
                      variant="light"
                      className="w-100 text-start d-flex align-items-center justify-content-between"
                    >
                      {selectedProduct}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      {products.map((product) => (
                        <Dropdown.Item
                          key={product}
                          eventKey={product}
                          active={selectedProduct === product}
                        >
                          {product}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="mb-3">
                  <p className="text-secondary mb-1">Metrics</p>
                  <Dropdown
                    onSelect={(eventKey) => setSelectedMetric(eventKey)}
                  >
                    <Dropdown.Toggle
                      variant="light"
                      className="w-100 text-start d-flex align-items-center justify-content-between"
                    >
                      <FaChartLine className="me-2" /> {selectedMetric}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      {metrics.map((metric) => (
                        <Dropdown.Item
                          key={metric}
                          eventKey={metric}
                          active={selectedMetric === metric}
                        >
                          {metric}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>

            {/* Daily Forecast Cards */}
            <Card
              className="rounded-lg shadow-sm mb-3"
              style={{ backgroundColor: "#e9f1ff", borderColor: "#e9f1ff" }}
            >
              <Card.Body>
                <h6 className="fw-bold mb-1 text-primary">Daily Forecast</h6>
                <h4 className="fw-bold text-dark">
                  {currentData.dailyForecast}
                </h4>
              </Card.Body>
            </Card>
            <Card
              className="rounded-lg shadow-sm mb-3"
              style={{ backgroundColor: "#dff8e9", borderColor: "#dff8e9" }}
            >
              <Card.Body>
                <h6 className="fw-bold mb-1 text-success">Actual So Far</h6>
                <h4 className="fw-bold text-dark">{currentData.actualSoFar}</h4>
              </Card.Body>
            </Card>
            <Card
              className="rounded-lg shadow-sm mb-3"
              style={{ backgroundColor: "#ffe9e9", borderColor: "#ffe9e9" }}
            >
              <Card.Body>
                <h6 className="fw-bold mb-1 text-danger">Remaining Target</h6>
                <h4 className="fw-bold text-dark">
                  {currentData.remainingTarget}
                </h4>
              </Card.Body>
            </Card>
          </Col>

          {/* Graph and Data */}
          <Col lg={9}>
            <Card className="rounded-lg shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Card.Title className="h6 fw-bold mb-0">
                    {selectedMetric} Forecast by Hour
                  </Card.Title>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <span
                        className="dot"
                        style={{ backgroundColor: "#007bff" }}
                      ></span>
                      <small className="text-secondary ms-1">Forecast</small>
                    </div>
                    <div>
                      <span
                        className="dot"
                        style={{ backgroundColor: "#28a745" }}
                      ></span>
                      <small className="text-secondary ms-1">Actual</small>
                    </div>
                  </div>
                </div>
                <div className="position-relative text-center">
                  {renderGraph()}
                </div>
              </Card.Body>
            </Card>

            {/* Current Hour Card */}
            <Card className="rounded-lg shadow-sm">
              <Card.Body>
                <p className="mb-0 text-secondary">
                  Current Hour (5 PM) - Forecast:{" "}
                  <span className="text-primary fw-bold">₹1,420</span> | Actual:{" "}
                  <span className="text-success fw-bold">₹1,368</span>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        .dot {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </Card>
  );
}
