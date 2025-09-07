"use client";

import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { FaExclamationTriangle, FaCube } from "react-icons/fa";
import ComponentHeader from "@/components/common/ComponentHeader";
import ClosingTable from "@/components/common/department/TablesSort/ClosingTable";
import ClosingCards from "@/components/common/department/cards/ClosingCards";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { departmentClosingDataFormatter } from "@/utils/data_formatters/departmentPage";
import { useItemsConsumptionClsoingTotal } from "@/services/item-service";
import { useDepartmentContext } from "@/contexts/DepartmentContext";

export default function DepartmentClosing() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      {/* <ComponentHeader
        title={"Department Closing"}
        description={"Track department closing, item totals and prices"}
        titleColor={"fw-bold text-primary fs-4"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={
          <FaExclamationTriangle className="me-2" color="red" size={24} />
        }
      /> */}

      <ServiceRenderer
        queryHook={useItemsConsumptionClsoingTotal}
        queryKey={["departmentClosing"]}
        queryArgs={[
          { startdt: "2025-06-06", enddt: endDate, outlet: 1, userId: 7 },
          //   { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={departmentClosingDataFormatter}
      >
        {(data) => (
          <>
            {/* ✅ Horizontal scrollable Closing Cards */}
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
              {data.topCardsData.map((card, i) => (
                <ClosingCards key={i} {...card} />
              ))}
            </div>

            {/* ✅ Vertical scrollable Closing Table */}
            <div>
              <ClosingTable tableData={data.tableData} />
            </div>
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}
// // components/department/DepartmentClosing.js
// "use client";

// import { departmentClosingDataFormatter } from "@/utils/data_formatters/departmentPage";
// import React from "react";
// import { Container, Row, Col, Card, Table } from "react-bootstrap";
// import { FaExclamationTriangle, FaCube } from "react-icons/fa";

// const DepartmentClosing = ({ apiData }) => {
//   const { topCardsData, tableData } = departmentClosingDataFormatter(apiData);

//   const iconMap = {
//     "Total Closing": <FaExclamationTriangle color="#f44336" />,
//     "Total Items": <FaCube color="#3f51b5" />,
//   };

//   return (
//     <Container fluid className="p-4">
//       <Row className="mb-4">
//         {topCardsData.map((card) => (
//           <Col key={card.title} md={3}>
//             <Card className="shadow-sm">
//               <Card.Body className="d-flex align-items-center justify-content-between">
//                 <div>
//                   <div className="text-muted">{card.title}</div>
//                   <div className="fw-bold fs-5">{card.value}</div>
//                 </div>
//                 <div className="fs-3">{card.icon}</div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Card className="shadow-sm">
//         <Card.Body>
//           <Table hover responsive borderless>
//             <thead>
//               <tr>
//                 <th>ITEM</th>
//                 <th>QUANTITY</th>
//                 <th>TOTAL PRICE</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, idx) => (
//                 <tr key={idx}>
//                   <td>
//                     <strong>{row.item}</strong>
//                     <div className="text-muted" style={{ fontSize: "0.85rem" }}>
//                       {row.category} • {row.quantity} • ₹{row.totalPrice}
//                     </div>
//                   </td>
//                   <td>{row.quantity}</td>
//                   <td>₹{row.totalPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default DepartmentClosing;
