"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaBox, FaClock, FaUtensils } from "react-icons/fa";
import BaseSurface from "./BaseSurface";

function WastageAnalysisTable({
  expiredItems,
  expiredProducts,
  rawMaterialWastage,
  tableCardStyle,
  scrollBodyStyle,
}) {
  return (
    <Row className="g-3 mt-3">
      <Col md={4}>
        <BaseSurface title={<span className="d-flex align-items-center gap-2"><FaBox style={{ color: "#00bcd4" }} /> Raw Material Wastage</span>} containerStyle={tableCardStyle} bodyStyle={scrollBodyStyle}>
          {rawMaterialWastage.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <div className="d-flex align-items-center gap-3">
                <div style={{ fontSize: "20px", color: "#00bcd4" }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: "500" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {item.category} • {item.qty} • ₹{item.price}
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.total}</div>
            </div>
          ))}
        </BaseSurface>
      </Col>

      <Col md={4}>
        <BaseSurface title={<span className="d-flex align-items-center gap-2"><FaClock style={{ color: "#3f51b5" }} /> Expired Items</span>} containerStyle={tableCardStyle} bodyStyle={scrollBodyStyle}>
          {expiredItems.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <div>
                <div style={{ fontWeight: "500" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.category} • {item.qty} • ₹{item.price}
                </div>
                <div style={{ fontSize: "12px", color: "#3f51b5" }}>
                  Expired: {item.date}
                </div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.total}</div>
            </div>
          ))}
        </BaseSurface>
      </Col>

      <Col md={4}>
        <BaseSurface title={<span className="d-flex align-items-center gap-2"><FaUtensils style={{ color: "#7b1fa2" }} /> Expired Products</span>} containerStyle={tableCardStyle} bodyStyle={scrollBodyStyle}>
          {expiredProducts.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-between py-2 border-bottom">
              <div>
                <div style={{ fontWeight: "500" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.category} • ₹{item.price}
                </div>
                <div style={{ fontSize: "12px", color: "#7b1fa2" }}>
                  Prepared: {item.date}
                </div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.total}</div>
            </div>
          ))}
        </BaseSurface>
      </Col>
    </Row>
  );
}

export default WastageAnalysisTable;
