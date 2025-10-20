"use client";

import React from "react";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useItemsUsageListDepartments } from "@/services/item-service";
import { itemConsumptionEfficiencyDataFormatter } from "@/utils/data_formatters/departmentPage";
import ItemConsumptionEfficiencyCards from "@/components/common/department/cards/ItemConsumptionEfficiencyCards";
import ItemConsumptionEfficiencyTable from "@/components/common/department/TablesSort/ItemConsumptionEfficiencyTable";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import ComponentHeader from "@/components/common/ComponentHeader";
import { IconTarget } from "@tabler/icons-react";

export default function ItemConsumptionEfficiency() {
  const { startDate, endDate } = useDepartmentContext();

  return (
    <div className="p-3">
      <ComponentHeader
        title="Item Consumption Efficiency"
        description="Monitor wastage patterns and consumption inefficiencies across menu items"
        titleColor="#232425"
        cardBgColor="none"
        isShowArrows={true}
        isExpandable={true}
        titleIcon={<div style={{
      background: '#ff5b09',
      borderRadius: '12px',
      padding: '8px',
      display: 'inline-block'
    }}>
      <IconTarget stroke={2} color="#fff" size={24} />
    </div>} // Insert Tabler/target icon here to match the first image
        text=""
      />
      <ServiceRenderer
        queryHook={useItemsUsageListDepartments}
        queryKey={[
          "itemsUsageListDepartments",
          1,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useItemsUsageListDepartments(1, {
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={itemConsumptionEfficiencyDataFormatter}
        shimmerCount={2}
      >
        {(data) => (
          <>
            <ItemConsumptionEfficiencyCards cards={data?.summaryCards} />
            <ItemConsumptionEfficiencyTable tableData={data?.tableData} />
          </>
        )}
      </ServiceRenderer>
    </div>
  );
}
// "use client";

// import React from "react";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useItemsUsageListDepartments } from "@/services/item-service";
// import { itemConsumptionEfficiencyDataFormatter } from "@/utils/data_formatters/departmentPage";

// import ItemConsumptionEfficiencyCards from "@/components/common/department/cards/ItemConsumptionEfficiencyCards";
// import ItemConsumptionEfficiencyTable from "@/components/common/department/TablesSort/ItemConsumptionEfficiencyTable";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";
// import ComponentHeader from "@/components/common/ComponentHeader";
// export default function ItemConsumptionEfficiency() {
//     const {startDate,endDate}=useDepartmentContext()
//   return (
//     <div className="p-3">
//             <ComponentHeader
//               title={"Item Consumption Efficiency"}
//               description={
//                 "Monitor wastage patterns and consumption inefficiencies across menu items"
//               }
//               titleColor={"rgba(31, 28, 27, 1)"}
//               cardBgColor={"none"}
//               isShowArrows={true}
//               // scrollRef={myScrollRef}
//               isExpandable={true}
//               titleIcon={""}
//               text={""}
//             />
//       <ServiceRenderer
//         queryHook={useItemsUsageListDepartments}
//         queryKey={[
//           "itemsUsageListDepartments",
//           1,
//           { startdt: startDate, enddt: endDate },
//         ]}
//         queryFn={() =>
//           useItemsUsageListDepartments(1, {
//             startdt: startDate,
//             enddt: endDate,
//           }).queryFn
//         }
//         queryArgs={[
//           { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//         ]}
//         formatter={itemConsumptionEfficiencyDataFormatter}
//         shimmerCount={2}
//       >
//         {(data, table) => (
//           <>
//             <ItemConsumptionEfficiencyCards cards={data?.summaryCards} />
//             <ItemConsumptionEfficiencyTable tableData={data?.tableData} />
//           </>
//         )}
//       </ServiceRenderer>
//     </div>
//   );
// }
// // "use client";

// // import { itemConsumptionEfficiencyDataFormatter } from "@/utils/data_formatters/departmentPage";
// // import React from "react";
// // import { Card, Row, Col, Table, Badge } from "react-bootstrap";

// // export default function ItemConsumptionEffieciency({ apiResponse }) {
// //   const formatted = itemConsumptionEfficiencyDataFormatter(apiResponse);

// //   return (
// //     <div className="p-3">
// //       {/* Summary Cards */}
// //       <Row className="mb-4">
// //         {formatted.summaryCards.map((card, idx) => (
// //           <Col key={idx} md={3}>
// //             <Card
// //               className="text-center shadow-sm"
// //               style={{ borderRadius: "16px" }}
// //             >
// //               <Card.Body>
// //                 <div
// //                   className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-${card.bg} text-white mb-2`}
// //                   style={{ width: 50, height: 50 }}
// //                 >
// //                   {card.icon}
// //                 </div>
// //                 <Card.Title>{card.value}</Card.Title>
// //                 <Card.Text className="text-muted">{card.label}</Card.Text>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>

// //       {/* Items Table */}
// //       <Card className="shadow-sm" style={{ borderRadius: "16px" }}>
// //         <Card.Body>
// //           <Table hover responsive className="align-middle">
// //             <thead className="bg-light">
// //               <tr>
// //                 <th>ITEM DETAILS</th>
// //                 <th>DEPARTMENT</th>
// //                 <th>CONSUMED</th>
// //                 <th>SALES QUANTITY</th>
// //                 <th>DIFFERENCE</th>
// //                 <th>WASTE %</th>
// //                 <th>COST IMPACT</th>
// //                 <th>STATUS</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {formatted.tableData.map((row) => (
// //                 <tr key={row.id}>
// //                   <td>{row.name}</td>
// //                   <td>
// //                     <Badge
// //                       bg="light"
// //                       text="dark"
// //                       className="px-3 py-2 rounded-pill border"
// //                     >
// //                       {row.department}
// //                     </Badge>
// //                   </td>
// //                   <td>{row.consumed}</td>
// //                   <td className="text-success">{row.sales}</td>
// //                   <td className="text-danger">{row.difference}</td>
// //                   <td>
// //                     <Badge
// //                       bg={
// //                         parseFloat(row.waste) > 30
// //                           ? "danger"
// //                           : parseFloat(row.waste) > 15
// //                           ? "warning"
// //                           : "success"
// //                       }
// //                     >
// //                       {row.waste}
// //                     </Badge>
// //                   </td>
// //                   <td className="text-danger">{row.costImpact}</td>
// //                   <td>
// //                     <Badge
// //                       bg={
// //                         row.status === "red"
// //                           ? "danger"
// //                           : row.status === "orange"
// //                           ? "warning"
// //                           : "success"
// //                       }
// //                       className="px-3 py-2 rounded-pill"
// //                     >
// //                       {row.status === "red"
// //                         ? "Critical"
// //                         : row.status === "orange"
// //                         ? "Monitor"
// //                         : "Healthy"}
// //                     </Badge>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </Card.Body>
// //       </Card>
// //     </div>
// //   );
// // }
