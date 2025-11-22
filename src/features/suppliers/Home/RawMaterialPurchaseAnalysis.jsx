"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { rawMaterialPurchaseAnalysisDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";
import { useSuppliersContext } from "@/contexts/SuppliersContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useItemsPurchaseList } from "@/services/item-service";
import RawMaterialPurchaseAnalysisTable from "@/components/common/suppliers/TableSort/Home/RawMaterialPurchaseAnalysisTable";
import RawMaterialPurchaseAnalysisGraph from "@/components/common/suppliers/GraphWrapper/Home/RawMaterialPurchaseAnalysisGraph";
import { IconPackage } from "@tabler/icons-react";

const RawMaterialPurchaseAnalysis = () => {
  const { startDate, endDate } = useSuppliersContext();

  return (
    <div>
      <Card.Header
        className="d-flex align-items-center"
      // style={{ backgroundColor: cardMeta.headerBg }}
      >
        <div
          className="d-flex align-items-center justify-content-center me-3"
          style={{
            backgroundColor: '#FF6B00',
            width: 40,
            height: 40,
            borderRadius: '10px'
          }}
        >
          <IconPackage color="white" />
        </div>
        <div>
          <h6 style={{ color: "#232425", fontSize: '18px', fontWeight: 700 }}>
            Raw Material Purchase Analysis
          </h6>
          {/* <small style={{ color: "#6B7280" }}>{cardMeta.subtitle}</small> */}
        </div>
      </Card.Header>
      <ServiceRenderer
        queryHook={useItemsPurchaseList}
        queryKey={["itemsPurchaseList", { startdt: startDate, enddt: endDate }]}
        queryFn={() =>
          useItemsPurchaseList({
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
        formatter={rawMaterialPurchaseAnalysisDataFormatter}
        shimmerCount={1}
      >
        {(formattedData) => {
          const { items, totalPurchaseValue, cardMeta } = formattedData;

          const pieData = items.map((i) => ({
            name: i.name,
            value: i.value,
          }));

          return (
            <Card className="border-0 shadow-sm">
              {/* Header */}


              <Card.Body>
                <Row>
                  {/* Table */}
                  <Col md={7}>
                    <RawMaterialPurchaseAnalysisTable items={items} />
                  </Col>

                  {/* Pie Chart */}
                  <Col md={5}>
                    <RawMaterialPurchaseAnalysisGraph pieData={pieData} totalPurchaseValue={totalPurchaseValue} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        }}
      </ServiceRenderer>
    </div>
  );
};

export default RawMaterialPurchaseAnalysis;

// import React from "react";
// import { Card, Table, Row, Col } from "react-bootstrap";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { rawMaterialPurchaseAnalysisDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";

// const COLORS = [
//   "#4285F4",
//   "#34A853",
//   "#FBBC05",
//   "#EA4335",
//   "#9C27B0",
//   "#00ACC1",
//   "#F4511E",
//   "#7CB342",
// ];

// const RawMaterialPurchaseAnalysis = ({
//   apiData = {
//     etag: null,
//     list: [
//       {
//         dt: null,
//         supplierId: "3",
//         itemId: "55",
//         item: {
//           id: "55",
//           outletId: "1",
//           name: "DISH WASHER",
//           unit: "ML",
//           unitQuantity: "1000",
//           unitPrice: 70.0,
//           categoryId: 15,
//           categoryName: "Housekeeping Material",
//           disabled: false,
//           alias: "DISH WASHER - 1000ML",
//           moq: 6867,
//           itemTypeId: 1,
//           itemType: "Store Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         supplier: {
//           id: "3",
//           outletId: "1",
//           name: "AAIMATA SUPER MART",
//           contactName: null,
//           phone: null,
//           email: null,
//           address: null,
//           taxId: null,
//           supplierTypeId: 1,
//           supplierType: "Suppliers",
//           countryId: 1,
//           country: "India",
//           stateId: 24,
//           state: "Telangana",
//           cityId: 6,
//           city: "Hyderabad",
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         quantity: 20000.0,
//         itemPrice: 70.0,
//         totalPrice: 1400.0,
//       },
//       {
//         dt: null,
//         supplierId: "3",
//         itemId: "77",
//         item: {
//           id: "77",
//           outletId: "1",
//           name: "SWASTIK CHILLI POWDER",
//           unit: "GM",
//           unitQuantity: "500",
//           unitPrice: 137.0,
//           categoryId: 7,
//           categoryName: "Indian Grocery",
//           disabled: false,
//           alias: "SWASTIK CHILLI POWDER - 500GM",
//           moq: 2467,
//           itemTypeId: 1,
//           itemType: "Store Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         supplier: {
//           id: "3",
//           outletId: "1",
//           name: "AAIMATA SUPER MART",
//           contactName: null,
//           phone: null,
//           email: null,
//           address: null,
//           taxId: null,
//           supplierTypeId: 1,
//           supplierType: "Suppliers",
//           countryId: 1,
//           country: "India",
//           stateId: 24,
//           state: "Telangana",
//           cityId: 6,
//           city: "Hyderabad",
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         quantity: 5000.0,
//         itemPrice: 115.0,
//         totalPrice: 1150.0,
//       },
//       {
//         dt: null,
//         supplierId: "3",
//         itemId: "56",
//         item: {
//           id: "56",
//           outletId: "1",
//           name: "FLOAR CLEANER",
//           unit: "ML",
//           unitQuantity: "1000",
//           unitPrice: 50.0,
//           categoryId: 15,
//           categoryName: "Housekeeping Material",
//           disabled: false,
//           alias: "FLOAR CLEANER - 1000ML",
//           moq: 3000,
//           itemTypeId: 1,
//           itemType: "Store Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         supplier: {
//           id: "3",
//           outletId: "1",
//           name: "AAIMATA SUPER MART",
//           contactName: null,
//           phone: null,
//           email: null,
//           address: null,
//           taxId: null,
//           supplierTypeId: 1,
//           supplierType: "Suppliers",
//           countryId: 1,
//           country: "India",
//           stateId: 24,
//           state: "Telangana",
//           cityId: 6,
//           city: "Hyderabad",
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         quantity: 20000.0,
//         itemPrice: 50.0,
//         totalPrice: 1000.0,
//       },
//     ],
//   },
// }) => {
//   const { items, totalPurchaseValue, cardMeta } =
//     rawMaterialPurchaseAnalysisDataFormatter(apiData);

//   // Pie chart data
//   const pieData = items.map((i) => ({
//     name: i.name,
//     value: i.value,
//   }));

//   return (
//     <Card className="border-0 shadow-sm">
//       {/* Header */}
//       <Card.Header
//         className="d-flex align-items-center"
//         style={{ backgroundColor: cardMeta.headerBg }}
//       >
//         <div
//           className="rounded-circle d-flex align-items-center justify-content-center me-3"
//           style={{
//             backgroundColor: cardMeta.iconBg,
//             width: 36,
//             height: 36,
//           }}
//         >
//           {cardMeta.icon}
//         </div>
//         <div>
//           <h6 className="mb-0 fw-bold" style={{ color: "#1A1A1A" }}>
//             {cardMeta.title}
//           </h6>
//           <small style={{ color: "#6B7280" }}>{cardMeta.subtitle}</small>
//         </div>
//       </Card.Header>

//       <Card.Body>
//         <Row>
//           {/* Table */}
//           <Col md={7}>
//             <Table borderless responsive className="align-middle">
//               <thead>
//                 <tr style={{ color: "#6B7280", fontSize: "14px" }}>
//                   <th>Item</th>
//                   <th>Purchase Qty</th>
//                   <th>Purchase Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item) => (
//                   <tr key={item.key} style={{ fontSize: "14px" }}>
//                     <td>
//                       <div className="fw-semibold" style={{ color: "#1A1A1A" }}>
//                         {item.name}
//                       </div>
//                       <div style={{ color: "#6B7280", fontSize: "12px" }}>
//                         {item.type}. {item.unitInfo}
//                       </div>
//                     </td>
//                     <td style={{ color: "#1A1A1A" }}>{item.quantity}</td>
//                     <td style={{ color: "#1A1A1A" }}>
//                       ₹{item.value.toLocaleString("en-IN")}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>

//           {/* Pie Chart */}
//           <Col md={5} className="d-flex flex-column align-items-center">
//             <h6
//               className="fw-semibold mb-3"
//               style={{ color: "#1A1A1A", fontSize: "14px" }}
//             >
//               Purchase Distribution
//             </h6>
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   innerRadius={60}
//                   outerRadius={80}
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(val) => `₹${val.toLocaleString("en-IN")}`}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </Col>
//         </Row>

//         {/* Footer total */}
//         <div className="d-flex justify-content-between border-top pt-3 mt-3 fw-bold">
//           <span style={{ color: "#1A1A1A" }}>Total Purchase Value</span>
//           <span style={{ color: "#1A1A1A" }}>
//             ₹{totalPurchaseValue.toLocaleString("en-IN")}
//           </span>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default RawMaterialPurchaseAnalysis;
