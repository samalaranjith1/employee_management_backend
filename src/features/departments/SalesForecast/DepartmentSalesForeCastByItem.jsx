"use client";

import ComponentHeader from "@/components/common/ComponentHeader";
import SalesForeCastByItemTable from "@/components/common/department/TablesSort/SalesForeCastByItemTable";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useProductsSalesForecastList } from "@/services/product-service";
import { departmentSalesForeCastByItemDataFormatter } from "@/utils/data_formatters/departmentPage";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

export default function DepartmentSalesForecastByItem() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      <ComponentHeader
        title={"Sales Forecast by Item"}
        description={"Daily sales forecast by item"}
        titleColor={"fw-bold text-primary fs-4"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaChartLine className="me-2" color="blue" size={24} />}
      />

      <ServiceRenderer
        queryHook={useProductsSalesForecastList}
        queryKey={["productsSalesForecast"]}
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={departmentSalesForeCastByItemDataFormatter}
      >
        {(data) => (
          <>
            {/* Vertical scrollable table */}
            <div
              style={{
                maxHeight: "65vh",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <SalesForeCastByItemTable tableData={data.tableData} />
            </div>
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}

// // components/department/DepartmentSalesForeCasByItem.jsx
// "use client";

// import {departmentSalesForeCastByItemDataFormatter } from "@/utils/data_formatters/departmentPage";
// import React from "react";
// import { Table, Card, Row, Col } from "react-bootstrap";
// import { FaCalendarAlt } from "react-icons/fa";

// const DepartmentSalesForeCasByItem = ({ apiResponse }) => {
//   const { topCardsData, tableData } =
//     departmentSalesForeCastByItemDataFormatter(apiResponse);

//   return (
//     <div>
//       {/* Top Cards */}
//       <Row className="mb-4">
//         {topCardsData.map((card, idx) => (
//           <Col key={idx} sm={6} md={3} className="mb-3">
//             <Card className="text-center shadow-sm">
//               <Card.Body>
//                 <Card.Title>{card.title}</Card.Title>
//                 <Card.Text className="fs-5 fw-bold">{card.value}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Table */}
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>
//               <FaCalendarAlt className="me-1" /> DAY
//             </th>
//             <th>ITEM</th>
//             <th>ORDERS</th>
//             <th>ITEMS SOLD</th>
//             <th>NET SALES</th>
//             <th>DISCOUNT</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, idx) => (
//             <tr key={idx}>
//               <td>{row.day}</td>
//               <td>{row.item}</td>
//               <td>{row.orders}</td>
//               <td>{row.itemsSold}</td>
//               <td>{row.netSales}</td>
//               <td>{row.discount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default DepartmentSalesForeCasByItem;
