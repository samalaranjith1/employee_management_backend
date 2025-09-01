"use client";

import React from "react";
import { Table, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { departmentAnalyticsTableDataFornatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { FaBoxOpen, FaBurn, FaCalendarAlt, FaChartLine, FaFireAlt, FaShoppingCart } from "react-icons/fa";

 function ItemsDepartmentAnalyticsTable() {
  // 🔹 Raw data for all 7 days
  const rawData = [
    {
      date: "Dec 1st, 2024",
      day: "Sunday",
      opening: { qty: "1500 GM", price: "₹2250" },
      consumption: { qty: "850 GM", price: "₹1200" },
      closing: { qty: "1450 GM", price: "₹2175" },
      netConsumption: { qty: "50 GM", price: "₹75" },
      sale: { qty: "800 GM", price: "₹1120" },
      burn: { qty: "50 GM", percentage: "56.7%" },
    },
    {
      date: "Dec 2nd, 2024",
      day: "Monday",
      opening: { qty: "1450 GM", price: "₹2175" },
      consumption: { qty: "900 GM", price: "₹1350" },
      closing: { qty: "1380 GM", price: "₹2070" },
      netConsumption: { qty: "70 GM", price: "₹105" },
      sale: { qty: "830 GM", price: "₹1245" },
      burn: { qty: "70 GM", percentage: "62.1%" },
    },
    {
      date: "Dec 3rd, 2024",
      day: "Tuesday",
      opening: { qty: "1380 GM", price: "₹2070" },
      consumption: { qty: "820 GM", price: "₹1180" },
      closing: { qty: "1320 GM", price: "₹1980" },
      netConsumption: { qty: "60 GM", price: "₹90" },
      sale: { qty: "760 GM", price: "₹1090" },
      burn: { qty: "60 GM", percentage: "59.4%" },
    },
    {
      date: "Dec 4th, 2024",
      day: "Wednesday",
      opening: { qty: "1320 GM", price: "₹1980" },
      consumption: { qty: "780 GM", price: "₹1100" },
      closing: { qty: "1280 GM", price: "₹1920" },
      netConsumption: { qty: "40 GM", price: "₹60" },
      sale: { qty: "740 GM", price: "₹1040" },
      burn: { qty: "40 GM", percentage: "59.1%" },
    },
    {
      date: "Dec 5th, 2024",
      day: "Thursday",
      opening: { qty: "1280 GM", price: "₹1920" },
      consumption: { qty: "920 GM", price: "₹1400" },
      closing: { qty: "1200 GM", price: "₹1800" },
      netConsumption: { qty: "80 GM", price: "₹120" },
      sale: { qty: "840 GM", price: "₹1280" },
      burn: { qty: "80 GM", percentage: "71.9%" },
    },
    {
      date: "Dec 6th, 2024",
      day: "Friday",
      opening: { qty: "1200 GM", price: "₹1800" },
      consumption: { qty: "880 GM", price: "₹1320" },
      closing: { qty: "1150 GM", price: "₹1725" },
      netConsumption: { qty: "50 GM", price: "₹75" },
      sale: { qty: "830 GM", price: "₹1245" },
      burn: { qty: "50 GM", percentage: "73.3%" },
    },
    {
      date: "Dec 7th, 2024",
      day: "Saturday",
      opening: { qty: "1150 GM", price: "₹1725" },
      consumption: { qty: "850 GM", price: "₹1250" },
      closing: { qty: "1100 GM", price: "₹1650" },
      netConsumption: { qty: "50 GM", price: "₹75" },
      sale: { qty: "800 GM", price: "₹1175" },
      burn: { qty: "50 GM", percentage: "73.9%" },
    },
  ];

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-gradient rounded-3 shadow-sm header-box">
        <div>
          <h5 className="fw-bold mb-1">Daily Analytics Table</h5>
          <p className="text-muted mb-0">
            Complete breakdown of daily inventory and consumption data
          </p>
        </div>
        <div className="d-flex">
          <Button className="tab-btn active">Daily</Button>
          <Button className="tab-btn">Same Days</Button>
          <Button className="tab-btn">Weekly</Button>
          <Button className="tab-btn">Monthly</Button>
        </div>
      </div>

      {/* Table */}
      <Table responsive hover className="align-middle text-center mt-4 analytics-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Opening</th>
            <th>Consumption</th>
            <th>Closing</th>
            <th>Net Consumption</th>
            <th>Sale</th>
            <th>Burn & Utilization</th>
          </tr>
        </thead>
        <tbody>
          {rawData.map((row, idx) => (
            <tr key={idx}>
              <td className="text-start fw-semibold">
                {row.date}
                <div className="text-muted small">{row.day}</div>
              </td>
              <td className="bg-soft-blue fw-semibold">
                {row.opening.qty}
                <div className="text-muted small">{row.opening.price}</div>
              </td>
              <td className="bg-soft-orange fw-semibold">
                {row.consumption.qty}
                <div className="text-muted small">{row.consumption.price}</div>
              </td>
              <td className="bg-soft-green fw-semibold">
                {row.closing.qty}
                <div className="text-muted small">{row.closing.price}</div>
              </td>
              <td className="bg-soft-red fw-semibold">
                {row.netConsumption.qty}
                <div className="text-muted small">{row.netConsumption.price}</div>
              </td>
              <td className="bg-soft-purple fw-semibold">
                {row.sale.qty}
                <div className="text-muted small">{row.sale.price}</div>
              </td>
              <td className="bg-soft-gray fw-semibold">
                {row.burn.qty}
                <div className="text-muted small">{row.burn.percentage}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Inline Styling */}
      <style jsx>{`
        .header-box {
          background: linear-gradient(90deg, #e6f8f1 0%, #f3faf8 100%);
        }
        .tab-btn {
          border: none !important;
          background: #f8f9fa !important;
          color: #555 !important;
          font-weight: 500;
          border-radius: 20px !important;
          margin-left: 8px;
          padding: 6px 16px;
        }
        .tab-btn.active {
          background: #fff3e6 !important;
          color: #ff7a00 !important;
          font-weight: 600;
          border: 1px solid #ffd6a1 !important;
        }
        .analytics-table thead {
          background: #fafafa;
          font-weight: 600;
        }
        /* Soft background tints */
        .bg-soft-blue {
          background: #eaf3ff;
          color: #007bff;
        }
        .bg-soft-orange {
          background: #fff3e6;
          color: #ff6b00;
        }
        .bg-soft-green {
          background: #e9f9f1;
          color: #28a745;
        }
        .bg-soft-red {
          background: #fdeaea;
          color: #dc3545;
        }
        .bg-soft-purple {
          background: #f6eafc;
          color: #9c27b0;
        }
        .bg-soft-gray {
          background: #f5f5f5;
          color: #555;
        }
      `}</style>
    </Container>
  );
}
export default ItemsDepartmentAnalyticsTable;
