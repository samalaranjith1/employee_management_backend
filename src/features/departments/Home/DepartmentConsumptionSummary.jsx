"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { IconChartBar, IconChartHistogram } from "@tabler/icons-react";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useDepartmentSummary } from "@/services/department-service";
import { departmentConsumptionSummaryDataFormatter } from "@/utils/data_formatters/departmentPage";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ConsumptionSummaryCards from "@/components/common/department/cards/ConsumptionSummaryCards";
import ComponentHeader from "@/components/common/ComponentHeader";

export default function DepartmentConsumptionSummary({ departmentId }) {
  const { startDate, endDate } = useDepartmentContext();

  return (
    <div className="p-2">
      <ComponentHeader
        title={"Consumption Summary"}
        description={"Real-time consumption metrics and performance indicators"}
        titleColor={"#535454"}
        cardBgColor={"none"}
        isShowArrows={true}
        // scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<div style={{
          background: '#FF6254',
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconChartHistogram stroke={2} color="#fff" size={24} />
        </div>}
        style={{ cursor: "pointer" }}
        handleExpandClick={() =>
          handleNavigation({
            router,
            url: "consumption_analytics",
            params: { startDate: startDate, endDate: endDate },
          })
        }
      />

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
        formatter={departmentConsumptionSummaryDataFormatter}
        shimmerCount={3}
      >
        {(cards) => (
          <Card className="p-3 border-0 shadow-sm rounded-4" >

            {/* ✅ Use reusable cards component */}
            <ConsumptionSummaryCards cards={cards} />
          </Card>
        )}
      </ServiceRenderer>
    </div>
  );
}
