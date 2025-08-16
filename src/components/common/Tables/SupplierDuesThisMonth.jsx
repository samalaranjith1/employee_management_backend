"use client";
import React, { useState } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import BaseSurface from "./BaseSurface";
import MonthlyPurchaseDistributionGraph from "../GraphWrapper/MonthlyPurchaseDistributionGraph";
import TopSellersTable from "../Tables/MonthlyPurchaseDistributionGraph";

export default function SupplierDuesThisMonth() {
  const styles = {
    container: { padding: "1rem", backgroundColor: "#f8fafc" },
    sectionCard: { borderRadius: "12px", border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: "1rem", padding: "1rem" },
    purchaseCard: { backgroundColor: "#f1f5f9", borderRadius: "12px", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 },
    amount: { fontSize: "2rem", fontWeight: "bold", color: "#1e3a8a" },
    stickyHeader: { position: "sticky", top: 0, background: "#fff", zIndex: 2 },
  };

  const monthData = {
    August: { total: 820000, suppliers: 8, pie: [], suppliersList: [] },
    July: { total: 720000, suppliers: 6, pie: [], suppliersList: [] },
  };

  const [selectedMonth, setSelectedMonth] = useState("August");
  const data = monthData[selectedMonth];

  return (
    <Card style={styles.container} className="m-2">
      <BaseSurface containerStyle={styles.sectionCard} headerRight={
        <Dropdown>
          <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
            <FaCalendarAlt color="#7c3aed" />{selectedMonth}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(monthData).map((month) => (
              <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>{month}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      }>

        {/* Total Purchase Card */}
        <div style={styles.purchaseCard} className="mb-4">
          <div>
            <div style={{ fontSize: "0.9rem", color: "#334155" }}>Total Purchase MTD</div>
            <div style={styles.amount}>₹{data.total.toLocaleString()}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>from {data.suppliers} suppliers</div>
          </div>
          <div style={{ borderRadius: "50%", padding: "0.75rem", color: "#fff", background: "linear-gradient(90deg,#7c3aed,#6366f1)" }}>
            <FaShoppingCart size={20} />
          </div>
        </div>

        {/* Graph & Table */}
        <Row>
          <Col md={6}>
            <MonthlyPurchaseDistributionGraph data={data} styles={styles} />
          </Col>
          <Col md={6}>
            <TopSellersTable data={data} styles={styles} />
          </Col>
        </Row>
      </BaseSurface>
    </Card>
  );
}
