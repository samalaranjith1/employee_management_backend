"use client";

import ComponentHeader from "@/components/common/ComponentHeader";
import ConsumptionCards from "@/components/common/department/cards/ConsumptionCards";
import ConsumptionTable from "@/components/common/department/TablesSort/ConsumptionTable";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useItemsUsageListDepartments } from "@/services/item-service";
import { departmentConcumptionDataFormatter } from "@/utils/data_formatters/departmentPage";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

export default function DepartmentConsumption() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      {/* <ComponentHeader
        title={"Department Consumption"}
        description={"Track consumption, waste and critical items"}
        titleColor={"fw-bold text-primary fs-4"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={
          <FaExclamationTriangle className="me-2" color="red" size={24} />
        }
      /> */}

      <ServiceRenderer
        queryHook={useItemsUsageListDepartments}
        queryKey={["departmentConsumption"]}
        queryArgs={[
          { startdt: "2025-06-06", enddt: "2025-08-01", outlet: 1, userId: 7 },
          //   { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={departmentConcumptionDataFormatter}
      >
        {(data) => (
          <>
            {/* ✅ Horizontal scrollable cards */}
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
              <ConsumptionCards topCardsData={data.topCardsData} />
            </div>

            {/* ✅ Vertical scrollable table */}
            <div className="pt-2">
              <ConsumptionTable tableData={data.tableData} />
            </div>
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}
// // components/DepartmentConsumption.jsx
// "use client";

// import React from "react";
// import { Card, Row, Col, Table, Badge } from "react-bootstrap";
// import { departmentConcumptionDataFormatter } from "@/utils/data_formatters/departmentPage";

// export default function DepartmentConsumption({ apiResponse }) {
//   const { topCardsData, tableData } =
//     departmentConcumptionDataFormatter(apiResponse);

//   return (
//     <div>
//       {/* Top Cards */}
//       <Row className="mb-4">
//         {topCardsData.map((card, idx) => (
//           <Col key={idx} md={3}>
//             <Card className="p-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <div className="text-muted">{card.title}</div>
//                   <div className="h5 fw-bold">{card.value}</div>
//                 </div>
//                 <div style={{ fontSize: "24px", color: card.color }}>
//                   {card.icon}
//                 </div>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Table */}
//       <Table striped hover responsive>
//         <thead>
//           <tr>
//             <th>ITEM DETAILS</th>
//             <th>DEPARTMENT</th>
//             <th>CONSUMED</th>
//             <th>SALES QUANTITY</th>
//             <th>DIFFERENCE</th>
//             <th>WASTE %</th>
//             <th>COST IMPACT</th>
//             <th>STATUS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((item) => (
//             <tr key={item.id}>
//               <td>
//                 {item.itemDetails}
//                 <div className="text-muted" style={{ fontSize: "12px" }}>
//                   {item.subCategory}
//                 </div>
//               </td>
//               <td>{item.department}</td>
//               <td>{item.consumed}</td>
//               <td className="text-success">{item.salesQuantity}</td>
//               <td className="text-danger">{item.difference}</td>
//               <td>
//                 <Badge
//                   bg={
//                     item.wastePercent > 30
//                       ? "danger"
//                       : item.wastePercent > 10
//                       ? "warning"
//                       : "success"
//                   }
//                 >
//                   {item.wastePercent}%
//                 </Badge>
//               </td>
//               <td className="text-danger">{item.costImpact} loss incurred</td>
//               <td>
//                 <Badge
//                   bg={
//                     item.status === "red"
//                       ? "danger"
//                       : item.status === "orange"
//                       ? "warning"
//                       : "success"
//                   }
//                 >
//                   {item.status === "red"
//                     ? "Critical"
//                     : item.status === "orange"
//                     ? "Monitor"
//                     : "Safe"}
//                 </Badge>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }
