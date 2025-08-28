"use client";

import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";
import ComponentHeader from "@/components/common/ComponentHeader";
import SalesTable from "@/components/common/department/TablesSort/SalesTable";
import SalesCards from "@/components/common/department/cards/SalesCards";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useProductsUsageList } from "@/services/product-service";
import { salesDataFormatter } from "@/utils/data_formatters/departmentPage";

export default function DepartmentSales() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      <ComponentHeader
        title={"Products Usage"}
        description={"Track sales usage, margins and performance"}
        titleColor={"fw-bold text-primary fs-4"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaChartLine className="me-2" color="blue" size={24} />}
      />

      <ServiceRenderer
        queryHook={useProductsUsageList}
        queryKey={["productsUsage"]}
        queryArgs={[
          // { startdt: "2025-06-06", enddt: "2025-08-27", outlet: 1, userId: 7 },
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={salesDataFormatter}
      >
        {(data) => (
          <>
            {/* ✅ Horizontal scrollable Sales Cards (same as Consumption) */}
            <div
              ref={myScrollRef}
              className="d-flex"
              style={{
                gap: "16px",
                paddingBottom: "0.5rem",
                overflowX: "auto",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {data.summary.map((card, i) => (
                <SalesCards key={i} {...card} />
              ))}
            </div>

            {/* ✅ Vertical scrollable table */}
            <div
              className="pt-2"
              style={{
                maxHeight: "65vh",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <SalesTable products={data.products} />
            </div>
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}
