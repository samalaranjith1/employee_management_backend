import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { suppliersSummaryOverViewDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";

const SuppliersSummaryOverView = ({
  apiData = {
    etag: null,
    id: "3",
    supplier: {
      id: "3",
      outletId: "1",
      name: "AAIMATA SUPER MART",
      contactName: null,
      phone: null,
      email: null,
      address: null,
      taxId: null,
      supplierTypeId: 1,
      supplierType: "Suppliers",
      countryId: 1,
      country: "India",
      stateId: 24,
      state: "Telangana",
      cityId: 6,
      city: "Hyderabad",
      disabled: false,
      createdBy: null,
      updatedBy: null,
    },
    summary: {
      dt: "2025-08-04",
      startDate: "2025-08-04",
      endDate: "2025-08-04",
      purchase: {
        itemCount: 3,
        unitPrice: 0,
        totalQuantity: 0,
        totalPrice: 3550,
        purchaseStartDate: null,
        latestPurchaseDate: null,
      },
      expense: {
        purchaseAmount: 3550,
        taxAmount: 0,
        totalAmount: 3550,
      },
      payment: {
        paymentAmount: 0,
        taxAmount: 0,
        totalAmount: 0,
      },
    },
  },
}) => {
  const { summaryCards } = suppliersSummaryOverViewDataFormatter(apiData);

  return (
    <div className="p-3">
      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="d-flex align-items-center justify-content-center me-2"
          style={{
            backgroundColor: "#FF5B22",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
          }}
        >
          <span role="img" aria-label="chart">
            📊
          </span>
        </div>
        <div>
          <h6 className="mb-0 fw-semibold" style={{ color: "#212529" }}>
            Summary Overview
          </h6>
          <small style={{ color: "#6C757D", fontSize: "13px" }}>
            Real-time consumption metrics and performance indicators
          </small>
        </div>
      </div>

      {/* Summary Cards */}
      <Row>
        {summaryCards.map((card) => (
          <Col md={4} key={card.id}>
            <Card
              className="shadow-sm border-0 mb-3"
              style={{ backgroundColor: card.bgColor, borderRadius: "12px" }}
            >
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: card.iconBg,
                      borderRadius: "6px",
                      width: "28px",
                      height: "28px",
                    }}
                  >
                    {card.icon}
                  </div>
                  <span
                    className="ms-2 fw-semibold"
                    style={{ color: "#212529", fontSize: "14px" }}
                  >
                    {card.title}
                  </span>
                </div>

                {card.fields.map((field, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span style={{ fontSize: "13px", color: "#6C757D" }}>
                      {field.label}
                    </span>
                    <span
                      className={field.bold ? "fw-bold" : ""}
                      style={{
                        fontSize: "14px",
                        color: "#212529",
                      }}
                    >
                      {field.value}
                    </span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SuppliersSummaryOverView;
