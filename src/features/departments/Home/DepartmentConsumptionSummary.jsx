"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { IconChartBar } from "@tabler/icons-react";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useDepartmentSummary } from "@/services/department-service";
import { departmentConsumptionSummaryDataFormatter  } from "@/utils/data_formatters/departmentPage";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ConsumptionSummaryCards from "@/components/common/department/cards/ConsumptionSummaryCards";

export default function DepartmentConsumptionSummary({ departmentId }) {
  const { startDate, endDate } = useDepartmentContext();

  return (
    <ServiceRenderer
      queryHook={useDepartmentSummary}
      queryKey={[
        "departmentSummary",
        departmentId,
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useDepartmentSummary(departmentId, {
          startdt: startDate,
          enddt: endDate,
        }).queryFn
      }
      queryArgs={[
        departmentId,
        { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
      ]}
      formatter={departmentConsumptionSummaryDataFormatter }
      shimmerCount={3}
    >
      {(cards) => (
        <Card className="p-3 border-0 shadow-sm rounded-4">
          {/* Header */}
          <Row className="mb-3 align-items-center">
            <Col xs="auto">
              <div
                style={{
                  background: "#FF6A00",
                  borderRadius: "12px",
                  padding: "8px",
                  display: "inline-flex",
                }}
              >
                <IconChartBar color="white" size={24} />
              </div>
            </Col>
            <Col>
              <h5 className="mb-0 fw-bold">Consumption Summary</h5>
              <small className="text-muted">
                Real-time consumption metrics and performance indicators
              </small>
            </Col>
          </Row>

          {/* ✅ Use reusable cards component */}
          <ConsumptionSummaryCards cards={cards} />
        </Card>
      )}
    </ServiceRenderer>
  );
}
