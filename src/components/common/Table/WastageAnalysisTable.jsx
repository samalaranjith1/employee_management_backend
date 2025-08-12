import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaBox, FaClock, FaUtensils } from "react-icons/fa";

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
        <Card style={tableCardStyle}>
          <Card.Title className="d-flex align-items-center gap-2 mb-2">
            <FaBox style={{ color: "#00bcd4" }} /> Raw Material Wastage
          </Card.Title>
          <div style={scrollBodyStyle}>
            {rawMaterialWastage.map((item, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center justify-content-between py-2 border-bottom"
              >
                <div className="d-flex align-items-center gap-3">
                  <div style={{ fontSize: "20px", color: "#00bcd4" }}>
                    {item.icon}
                  </div>
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
          </div>
        </Card>
      </Col>

      <Col md={4}>
        <Card style={tableCardStyle}>
          <Card.Title className="d-flex align-items-center gap-2 mb-2">
            <FaClock style={{ color: "#3f51b5" }} /> Expired Items
          </Card.Title>
          <div style={scrollBodyStyle}>
            {expiredItems.map((item, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center justify-content-between py-2 border-bottom"
              >
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
          </div>
        </Card>
      </Col>

      <Col md={4}>
        <Card style={tableCardStyle}>
          <Card.Title className="d-flex align-items-center gap-2 mb-2">
            <FaUtensils style={{ color: "#7b1fa2" }} /> Expired Products
          </Card.Title>
          <div style={scrollBodyStyle}>
            {expiredProducts.map((item, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center justify-content-between py-2 border-bottom"
              >
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
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default WastageAnalysisTable;
