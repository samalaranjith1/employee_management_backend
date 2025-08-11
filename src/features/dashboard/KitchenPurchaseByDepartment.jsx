"use client";

import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaBoxes,
  FaSearch,
  FaEllipsisV,
  FaCircle,
  FaUtensils,
  FaSeedling,
  FaFire,
  FaDrumstickBite,
  FaCoffee,
  FaLeaf,
  FaCocktail,
  FaTint,
  FaTruck,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock data to populate the table, adjusted to match the provided screen
const mockData = [
  {
    id: 1,
    department: "SOUTH INDIAN",
    departmentDesc: "department",
    consumptionPercent: "22.98%",
    netConsumptionPercent: "23.02%",
    sales: "₹7,872",
    opening: "₹1,457.26",
    consumption: "₹1,809.85",
    closing: "₹1,424.12",
    netConsumption: "₹1,812.99",
    budget: "₹2,583.16",
    efficiency: "77%",
    efficiencyColor: "yellow",
    icon: FaUtensils,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 2,
    department: "NORTH INDIAN",
    departmentDesc: "department",
    consumptionPercent: "7.63%",
    netConsumptionPercent: "11.44%",
    sales: "₹8,950",
    opening: "₹4,318.52",
    consumption: "₹518.6",
    closing: "₹3,781.21",
    netConsumption: "₹1,456.3",
    budget: "₹2,238.98",
    efficiency: "94%",
    efficiencyColor: "green",
    icon: FaSeedling,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    department: "TANDOOR",
    departmentDesc: "department",
    consumptionPercent: "12.91%",
    netConsumptionPercent: "3.59%",
    sales: "₹12,340",
    opening: "₹1,561.26",
    consumption: "₹565",
    closing: "₹2,349.52",
    netConsumption: "₹58.74",
    budget: "₹1,314.77",
    efficiency: "95%",
    efficiencyColor: "green",
    icon: FaFire,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: 4,
    department: "BIRYANI",
    departmentDesc: "department",
    consumptionPercent: "28.16%",
    netConsumptionPercent: "28.53%",
    sales: "₹13,100",
    opening: "₹2,605.4",
    consumption: "₹3,689.9",
    closing: "₹2,758.96",
    netConsumption: "₹2,738.25",
    budget: "₹3,539.27",
    efficiency: "72%",
    efficiencyColor: "yellow",
    icon: FaDrumstickBite,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 5,
    department: "BREAKFAST",
    departmentDesc: "department",
    consumptionPercent: "0%",
    netConsumptionPercent: "-29.89%",
    sales: "₹2,450",
    opening: "₹20",
    consumption: "₹20",
    closing: "₹241.37",
    netConsumption: "₹-241.37",
    budget: "₹486",
    efficiency: "100%",
    efficiencyColor: "green",
    icon: FaCoffee,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 6,
    department: "CHINESE",
    departmentDesc: "department",
    consumptionPercent: "14.29%",
    netConsumptionPercent: "13.14%",
    sales: "₹9,680",
    opening: "₹3,773.11",
    consumption: "₹1,274",
    closing: "₹2,890.71",
    netConsumption: "₹2,216.4",
    budget: "₹2,724.24",
    efficiency: "87%",
    efficiencyColor: "green",
    icon: FaLeaf,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 7,
    department: "EXOTIC SHAKES",
    departmentDesc: "department",
    consumptionPercent: "45.59%",
    netConsumptionPercent: "43.58%",
    sales: "₹4,170",
    opening: "₹8,360.59",
    consumption: "₹926.7",
    closing: "₹5,116.23",
    netConsumption: "₹4,171.56",
    budget: "₹683.16",
    efficiency: "79%",
    efficiencyColor: "yellow",
    icon: FaCocktail,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: 8,
    department: "BEVERAGES",
    departmentDesc: "department",
    consumptionPercent: "19.7%",
    netConsumptionPercent: "7.62%",
    sales: "₹6,850",
    opening: "₹3,384.3",
    consumption: "₹345",
    closing: "₹2,592.3",
    netConsumption: "₹137",
    budget: "₹1,406.88",
    efficiency: "95%",
    efficiencyColor: "green",
    icon: FaTint,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: 9,
    department: "DISPATCH",
    departmentDesc: "department",
    consumptionPercent: "0%",
    netConsumptionPercent: "0%",
    sales: "₹5,200",
    opening: "₹2,576.7",
    consumption: "₹1,144",
    closing: "₹1,327.6",
    netConsumption: "₹3,393.2",
    budget: "₹3,500",
    efficiency: "78%",
    efficiencyColor: "yellow",
    icon: FaTruck,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    id: 10,
    department: "KITCHEN",
    departmentDesc: "department",
    consumptionPercent: "0%",
    netConsumptionPercent: "0%",
    sales: "₹9,100",
    opening: "₹20",
    consumption: "₹1,630",
    closing: "₹20",
    netConsumption: "₹1,630",
    budget: "₹4,300",
    efficiency: "90%",
    efficiencyColor: "green",
    icon: FaCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

// Helper function to get row background color
const getRowBackgroundColor = (department) => {
  if (department === "BIRYANI" || department === "EXOTIC SHAKES") {
    return "bg-amber-50";
  }
  return "bg-white";
};

// Helper function to get pill background color
const getPillBackgroundColor = (efficiencyColor) => {
  switch (efficiencyColor) {
    case "green":
      return "bg-green-100";
    case "yellow":
      return "bg-orange-100";
    case "red":
      return "bg-red-100";
    default:
      return "";
  }
};

// Helper function to get pill text color
const getPillTextColor = (efficiencyColor) => {
  switch (efficiencyColor) {
    case "green":
      return "text-green-600";
    case "yellow":
      return "text-orange-600";
    case "red":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default function App() {
  return (
    <div className="bg-[#f0f2f5] p-2 font-inter">
      <Card fluid className="p-3">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6}>
            <h1 className="h4 fw-bold text-gray-800">Department Consumption</h1>
            <p className="text-gray-500 small mb-0">
              Track kitchen purchases, budget performance, and consumption
              efficiency by department
            </p>
          </Col>
          <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
            <div className="d-flex justify-content-end align-items-center">
              <FaSearch className="text-gray-500 me-3" size={20} />
              <FaEllipsisV className="text-gray-500" size={20} />
            </div>
          </Col>
        </Row>

        {/* Main Content Card */}
        <Card className="rounded-xl shadow-sm border-0">
          <Card.Body>
            {/* Inner Header */}
            <Row className="mb-3 align-items-center">
              <Col xs={12} md={6}>
                <div className="d-flex align-items-center">
                  <div className="p-2 bg-purple-100 rounded-lg me-2">
                    <FaBoxes className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h5 className="h6 fw-bold mb-0">
                      Kitchen Purchase by Departments
                    </h5>
                    <p className="text-gray-500 small mb-0">
                      Detailed breakdown of consumption and budget performance
                      by department
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                <FaEllipsisV className="text-gray-500" size={20} />
              </Col>
            </Row>

            {/* Table Section with fixed height and scrollable body */}
            <div
              style={{ maxHeight: "65vh", overflowY: "auto" }}
              className="rounded-xl"
            >
              <Table responsive hover className="mb-0">
                <thead
                  className="small text-nowrap text-uppercase text-gray-500"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#eef2f5",
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th>Department</th>
                    <th>Consumption%</th>
                    <th>Net Consumption%</th>
                    <th className="text-green-600">Sales</th>
                    <th>Opening</th>
                    <th>Consumption</th>
                    <th>Closing</th>
                    <th>Net Consumption</th>
                    <th>Budget</th>
                    <th className="text-center">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((item) => (
                    <tr
                      key={item.id}
                      className={`small text-nowrap ${getRowBackgroundColor(
                        item.department
                      )}`}
                    >
                      <td className="d-flex align-items-center fw-bold text-gray-800">
                        <div className={`p-2 rounded-lg me-2 ${item.iconBg}`}>
                          <item.icon className={`${item.iconColor}`} />
                        </div>
                        <div>
                          {item.department}
                          <p className="text-gray-500 mb-0 fw-normal">
                            {item.departmentDesc}
                          </p>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`font-semibold d-inline-block px-2 py-1 rounded-lg ${
                            item.consumptionPercent !== "0%"
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {item.consumptionPercent}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`font-semibold d-inline-block px-2 py-1 rounded-lg ${
                            item.netConsumptionPercent !== "0%"
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {item.netConsumptionPercent}
                        </span>
                      </td>
                      <td className="text-green-600 font-semibold">
                        {item.sales}
                      </td>
                      <td>{item.opening}</td>
                      <td>{item.consumption}</td>
                      <td>{item.closing}</td>
                      <td>
                        <span className="text-blue-600 font-semibold d-inline-block px-2 py-1 rounded-lg bg-blue-100">
                          {item.netConsumption}
                        </span>
                      </td>
                      <td>{item.budget}</td>
                      <td className="text-center">
                        <span
                          className={`px-2 py-1 rounded-pill fw-bold text-xs ${getPillBackgroundColor(
                            item.efficiencyColor
                          )} ${getPillTextColor(item.efficiencyColor)}`}
                        >
                          {item.efficiency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Legend */}
        <Row className="mt-4 align-items-center">
          <Col xs={12} md={8}>
            <div className="d-flex flex-wrap align-items-center small">
              <div className="me-3 d-flex align-items-center">
                <FaCircle className="text-green-500 me-1" size={10} />
                <span className="text-gray-600">High efficiency 80%+ (8)</span>
              </div>
              <div className="me-3 d-flex align-items-center">
                <FaCircle className="text-orange-400 me-1" size={10} />
                <span className="text-gray-600">
                  Medium efficiency 60-79% (1)
                </span>
              </div>
              <div className="d-flex align-items-center">
                <FaCircle className="text-red-500 me-1" size={10} />
                <span className="text-gray-600">
                  Low efficiency under 60% (1)
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
            <span className="small text-muted">Total Departments: 10</span>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
