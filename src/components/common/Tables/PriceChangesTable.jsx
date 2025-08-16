"use client";
import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";
import BaseSurface from "./BaseSurface";

function PriceChangesTable({ styles, recentChanges, futureHikes }) {
  return (
    <Row>
      {/* Recent Price Changes */}
      <Col md={6} className="mb-4">
        <BaseSurface
          title="Recent Price Changes"
          containerStyle={styles?.sectionCard}
          headerStyle={styles?.sectionHeaderRecent}
          bodyStyle={styles?.tableContainer}
        >
          <Table hover responsive className="mb-0">
            <tbody style={styles?.tableBody}>
              {recentChanges.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted">{item.category}</div>
                    <div className="text-primary">Effective: {item.date}</div>
                  </td>
                  <td className="text-end align-middle">
                    <div>₹{item.oldPrice} → ₹{item.newPrice}</div>
                    <div style={item.up ? styles.priceUp : styles.priceDown}>
                      {item.up ? "+" : ""}₹{item.change}
                    </div>
                    <div style={item.up ? styles.priceUp : styles.priceDown}>
                      {item.percent}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ padding: "8px 12px", ...styles?.footer }}>
            Net Recent Impact: <span className="text-danger">₹8,200</span>
          </div>
        </BaseSurface>
      </Col>

      {/* Future Price Hikes */}
      <Col md={6} className="mb-4">
        <BaseSurface
          title={<span><FaExclamationCircle className="me-1" /> Future Price Hikes</span>}
          containerStyle={styles?.sectionCard}
          headerStyle={styles?.sectionHeaderFuture}
          bodyStyle={styles?.tableContainer}
        >
          <Table hover responsive className="mb-0">
            <tbody style={styles?.tableBody}>
              {futureHikes.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted">{item.category}</div>
                    <div className="text-warning">Tentative: {item.date}</div>
                  </td>
                  <td className="text-end align-middle">
                    <div>₹{item.oldPrice} → ₹{item.newPrice}</div>
                    <div style={styles.priceUp}>+₹{item.change}</div>
                    <div style={styles.priceUp}>{item.percent}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ padding: "8px 12px", backgroundColor: "#fffbeb", fontWeight: "bold" }}>
            Expected Future Impact: <span className="text-danger">₹6,280</span>
          </div>
        </BaseSurface>
      </Col>
    </Row>
  );
}

export default PriceChangesTable;
