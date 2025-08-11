"use client";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaBoxOpen, FaChartLine, FaShoppingCart } from "react-icons/fa";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const TopSellingProducts = () => {
  const topCards = [
    {
      id: 1,
      title: "Total Products",
      value: "236",
      subtitle: "Active menu items",
      icon: <FaBoxOpen />,
      bg: "#EEF2FF",
      iconBg: "#7C5CFF",
      color: "#2E2EA8",
    },
    {
      id: 2,
      title: "No Orders",
      value: "110",
      subtitle: "Zero sales today",
      icon: <FaStar />,
      bg: "#F6F7F9",
      iconBg: "#6C7A86",
      color: "#222831",
    },
    {
      id: 3,
      title: "5+ Orders",
      value: "8",
      subtitle: "Popular items",
      icon: <FaChartLine />,
      bg: "#E9FFF3",
      iconBg: "#07A875",
      color: "#0F6A43",
    },
    {
      id: 4,
      title: "10+ Orders",
      value: "8",
      subtitle: "Best sellers",
      icon: <FaShoppingCart />,
      bg: "#FFF6E6",
      iconBg: "#F29F05",
      color: "#8A4B00",
    },
  ];

  const chartData = [
    { name: "Butter Chick...", sales: 200, margin: 120 },
    { name: "Chicken Biry...", sales: 170, margin: 100 },
    { name: "Dal Makhani", sales: 140, margin: 90 },
    { name: "Paneer Butte...", sales: 125, margin: 85 },
    { name: "Tandoori Chi...", sales: 150, margin: 95 },
    { name: "Masala Chai", sales: 60, margin: 30 },
  ];

  return (
    <Container fluid style={{ padding: 16 }}>
      {/* Header */}
      <div className="mb-3">
        <h3 style={{ color: "#5B2EEA", fontWeight: 700 }}>
          Top Selling Products
        </h3>
        <small className="text-muted">
          Analyze best-performing menu items and sales trends
        </small>
      </div>

      {/* Top cards row */}
      <Row className="g-3 mb-4 top-card-row flex-nowrap overflow-auto">
        {topCards.map((c) => (
          <Col key={c.id} xs="auto" className="top-card-col">
            <Card
              style={{
                background: c.bg,
                borderRadius: 12,
                border: "none",
                padding: "18px",
                height: "100%",
                boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
                minHeight: "140px",
              }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#7B6CFA",
                      fontWeight: 600,
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: c.color,
                      marginTop: 6,
                    }}
                  >
                    {c.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#7b7b8a",
                      marginTop: 6,
                    }}
                  >
                    {c.subtitle}
                  </div>
                </div>

                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: c.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {c.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart and summary */}
      <Row className="g-3">
        <Col lg={8} md={7} sm={12}>
          <Card
            style={{
              borderRadius: 12,
              padding: 18,
              height: "100%",
              boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "#EEF2FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <FaChartLine color="#6C5BFF" />
              </div>
              <h5 style={{ margin: 0, fontWeight: 700 }}>
                Sales vs Margin Trends
              </h5>
            </div>

            <div style={{ width: "100%", height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f8" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="sales"
                    barSize={36}
                    fill="#5B7BFF"
                    radius={[6, 6, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="margin"
                    stroke="#6C5BFF"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: "#fff",
                      stroke: "#6C5BFF",
                      strokeWidth: 3,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col lg={4} md={5} sm={12}>
          <Card
            style={{
              borderRadius: 12,
              padding: 18,
              height: "100%",
              boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
            }}
          >
            <h5 style={{ fontWeight: 700, marginBottom: 16 }}>
              Revenue Summary
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  borderRadius: 10,
                  border: "1px solid #F0E8FF",
                  padding: 14,
                }}
              >
                <div style={{ fontSize: 13, color: "#7b7b8a" }}>
                  Total Revenue
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#5B2EEA",
                    marginTop: 6,
                  }}
                >
                  ₹1,013,750
                </div>
                <div style={{ fontSize: 12, color: "#9aa0b0" }}>
                  From top selling items
                </div>
              </div>

              <div
                style={{
                  borderRadius: 10,
                  border: "1px solid #F0E8FF",
                  padding: 14,
                }}
              >
                <div style={{ fontSize: 13, color: "#7b7b8a" }}>
                  Total Margin
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#5B2EEA",
                    marginTop: 6,
                  }}
                >
                  ₹582,555
                </div>
                <div style={{ fontSize: 12, color: "#9aa0b0" }}>
                  Net profit generated
                </div>
              </div>

              <div
                style={{
                  borderRadius: 10,
                  border: "1px solid #F0E8FF",
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#7b7b8a",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Avg Margin %</span>
                  <span>%</span>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#5B2EEA",
                    marginTop: 6,
                  }}
                >
                  57.5%
                </div>
                <div style={{ fontSize: 12, color: "#9aa0b0" }}>
                  Overall profitability
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <style>{`
        /* Make top card row behave like horizontal cards on mobile */
        .top-card-row {
          flex-wrap: nowrap;
        }
        .top-card-col {
          flex: 0 0 auto;
        }
        @media (max-width: 767px) {
          .top-card-col {
            width: 90vw;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .top-card-col {
            width: 25vw;
          }
        }
        @media (min-width: 1200px) {
          .top-card-col {
            width: 23vw;
          }
        }
      `}</style>
    </Container>
  );
};

export default TopSellingProducts;
