"use client";

import React from "react";
import { Container } from "react-bootstrap";
import MenuItemsTable from "@/components/common/department/TablesSort/MenuItemsTable";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useDepartmentProductsList } from "@/services/department-service";
import { productsDataFormatter } from "@/utils/data_formatters/departmentPage";

export default function DepartmentProducts() {
  const { startDate, endDate } = useDepartmentContext();

  // If context values are undefined, render fallback
  if (!startDate || !endDate) {
    return <p className="text-center mt-3">Loading dashboard context...</p>;
  }

  return (
    <Container fluid className="p-0">
      <ServiceRenderer
        queryHook={useDepartmentProductsList}
        queryKey={["departmentProducts", startDate, endDate]}
        queryArgs={[
          1,
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={(raw) => productsDataFormatter(raw)}
        fallback={<p className="text-center mt-3">Loading products...</p>}
      >
        {(data) =>
          data && data.length > 0 ? (
            <MenuItemsTable data={data} />
          ) : (
            <p className="text-center mt-3">No products found.</p>
          )
        }
      </ServiceRenderer>
    </Container>
  );
}
