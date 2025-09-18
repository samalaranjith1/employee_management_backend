"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { purchaseSuppplierDetailsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useSuppliersUsageItemPurchase } from "@/services/supplier-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ItemsSupplierPurchaseTable from "@/components/common/items/TableSort/ItemsSupplierPurchaseTable";
export default function ItemsSupplierPurchaseDetails() {
  const { startDate, endDate } = useItemsContext();

  return (
    <ServiceRenderer
      queryHook={useSuppliersUsageItemPurchase}
      queryKey={[
        "suppliersUsageItemPurchase",
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useSuppliersUsageItemPurchase({
          startdt: startDate,
          enddt: endDate,
        }).queryFn
      }
      queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
      formatter={purchaseSuppplierDetailsDataFormatter}
      shimmerCount={2}
    >
      {({ topCards, tableMeta, tableData }) => (
        <div className="p-3">
          {/* Top Cards */}
          <Row className="g-3 mb-4">
            {topCards.map((card, idx) => (
              <Col md={4} key={idx}>
                <Card
                  className="border-0 shadow-sm h-100"
                  style={{ backgroundColor: card.bg, borderRadius: "16px" }}
                >
                  <Card.Body className="d-flex align-items-center p-3">
                    <div className="me-3">{card.icon}</div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          color: "#6B7280",
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: card.textColor,
                        }}
                      >
                        {card.value}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                        {card.subText}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ✅ Extracted Table */}
          <ItemsSupplierPurchaseTable
            tableMeta={tableMeta}
            tableData={tableData}
          />
        </div>
      )}
    </ServiceRenderer>
  );
}
// "use client";

// import React from "react";
// import { Card, Row, Col, Table } from "react-bootstrap";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { purchaseSuppplierDetailsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useSuppliersUsageItemPurchase } from "@/services/supplier-service";
// import { useItemsContext } from "@/contexts/ItemsContext";

// export default function ItemsSupplierPurchaseDetails() {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useSuppliersUsageItemPurchase}
//       queryKey={[
//         "suppliersUsageItemPurchase",
//         { startdt: startDate, enddt: endDate },
//       ]}
//       queryFn={() =>
//         useSuppliersUsageItemPurchase({
//           startdt: startDate,
//           enddt: endDate,
//         }).queryFn
//       }
//       queryArgs={[{ startdt: startDate, enddt: endDate,outlet:1,userId:7 }]}
//       formatter={purchaseSuppplierDetailsDataFormatter}
//       shimmerCount={2}
//     >
//       {({ topCards, tableMeta, tableData }) => (
//         <div className="p-3">
//           {/* Top Cards */}
//           <Row className="g-3 mb-4">
//             {topCards.map((card, idx) => (
//               <Col md={4} key={idx}>
//                 <Card
//                   className="border-0 shadow-sm h-100"
//                   style={{ backgroundColor: card.bg, borderRadius: "16px" }}
//                 >
//                   <Card.Body className="d-flex align-items-center p-3">
//                     <div className="me-3">{card.icon}</div>
//                     <div>
//                       <div
//                         style={{
//                           fontSize: "0.9rem",
//                           fontWeight: "500",
//                           color: "#6B7280",
//                         }}
//                       >
//                         {card.title}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "1.5rem",
//                           fontWeight: "700",
//                           color: card.textColor,
//                         }}
//                       >
//                         {card.value}
//                       </div>
//                       <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
//                         {card.subText}
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Table */}
//           <Card
//             className="border-0 shadow-sm"
//             style={{ borderRadius: "16px", overflow: "hidden" }}
//           >
//             <Card.Header
//               className="d-flex align-items-center"
//               style={{
//                 backgroundColor: "#FFF7ED",
//                 border: "none",
//                 borderRadius: "16px 16px 0 0",
//                 padding: "16px",
//               }}
//             >
//               {tableMeta.icon}
//               <div>
//                 <h6 className="mb-0 fw-bold">{tableMeta.title}</h6>
//                 <small className="text-muted">{tableMeta.subtitle}</small>
//               </div>
//             </Card.Header>
//             <Card.Body className="p-0">
//               <Table hover responsive className="mb-0">
//                 <thead style={{ backgroundColor: "#F9FAFB" }}>
//                   <tr>
//                     <th className="py-3 px-3">Supplier Name</th>
//                     <th className="py-3">Total Quantity</th>
//                     <th className="py-3">Total Price</th>
//                     <th className="py-3">Avg Price</th>
//                     <th className="py-3">Start Date</th>
//                     <th className="py-3">End Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((row, idx) => (
//                     <tr key={idx}>
//                       <td className="py-3 px-3">{row.supplierName}</td>
//                       <td className="text-primary">{row.totalQuantity}</td>
//                       <td className="text-success">{row.totalPrice}</td>
//                       <td style={{ color: "#6D28D9" }}>{row.avgPrice}</td>
//                       <td>{row.startDate}</td>
//                       <td>{row.endDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </div>
//       )}
//     </ServiceRenderer>
//   );
// }

// // "use client";

// // import { purchaseSuppplierDetailsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// // import React from "react";
// // import { Card, Row, Col, Table } from "react-bootstrap";

// // export default function ItemsSupplierPurchaseDetails({
// //   data = {
// //     etag: "-942085445",
// //     suppliers: 14,
// //     totalAmount: 191051,
// //     totalQuantity: 1968863,
// //     list: [
// //       {
// //         id: "34",
// //         supplier: {
// //           id: "34",
// //           outletId: "1",
// //           name: "MAHENDRA RICE",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 10,
// //           unitPrice: 105,
// //           totalQuantity: 1244000,
// //           totalPrice: 87971,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "37",
// //         supplier: {
// //           id: "37",
// //           outletId: "1",
// //           name: "SARANGA KRISHNA MURTHY",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 1,
// //           unitPrice: 157.2,
// //           totalQuantity: 217500,
// //           totalPrice: 34200,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "52",
// //         supplier: {
// //           id: "52",
// //           outletId: "1",
// //           name: "SOUTH INDIA TRADING & Co",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 2,
// //           unitPrice: 40.8,
// //           totalQuantity: 300000,
// //           totalPrice: 11680,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "47",
// //         supplier: {
// //           id: "47",
// //           outletId: "1",
// //           name: "ROMEO DISPOSABLE HOUSE",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 5,
// //           unitPrice: 290,
// //           totalQuantity: 6040,
// //           totalPrice: 11120,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "27",
// //         supplier: {
// //           id: "27",
// //           outletId: "1",
// //           name: "Local Vendor",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 6,
// //           unitPrice: 2900,
// //           totalQuantity: 25400,
// //           totalPrice: 10585,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "48",
// //         supplier: {
// //           id: "48",
// //           outletId: "1",
// //           name: "N M FOODS",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 9,
// //           unitPrice: 620,
// //           totalQuantity: 15451,
// //           totalPrice: 8625,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "26",
// //         supplier: {
// //           id: "26",
// //           outletId: "1",
// //           name: "Pasura Express LLP",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 6,
// //           unitPrice: 32.5,
// //           totalQuantity: 516,
// //           totalPrice: 8401,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "21",
// //         supplier: {
// //           id: "21",
// //           outletId: "1",
// //           name: "New Arife - Shakes Groceries",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 14,
// //           unitPrice: 590,
// //           totalQuantity: 16768,
// //           totalPrice: 5835,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "3",
// //         supplier: {
// //           id: "3",
// //           outletId: "1",
// //           name: "AAIMATA SUPER MART",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 3,
// //           unitPrice: 115,
// //           totalQuantity: 45000,
// //           totalPrice: 3550,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "6",
// //         supplier: {
// //           id: "6",
// //           outletId: "1",
// //           name: "Rythu Bazar",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 18,
// //           unitPrice: 85,
// //           totalQuantity: 50133,
// //           totalPrice: 2889,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "24",
// //         supplier: {
// //           id: "24",
// //           outletId: "1",
// //           name: "Hassta Enterprises",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 1,
// //           unitPrice: 250,
// //           totalQuantity: 10000,
// //           totalPrice: 2500,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "8",
// //         supplier: {
// //           id: "8",
// //           outletId: "1",
// //           name: "Imperial Dairy",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 2,
// //           unitPrice: 290,
// //           totalQuantity: 23000,
// //           totalPrice: 2170,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "4",
// //         supplier: {
// //           id: "4",
// //           outletId: "1",
// //           name: "Office Express",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 3,
// //           unitPrice: 60,
// //           totalQuantity: 5055,
// //           totalPrice: 945,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //       {
// //         id: "20",
// //         supplier: {
// //           id: "20",
// //           outletId: "1",
// //           name: "Pavani Milk Parlour",
// //           contactName: null,
// //           phone: null,
// //           email: null,
// //           address: null,
// //           taxId: null,
// //           supplierTypeId: 1,
// //           supplierType: "Suppliers",
// //           countryId: 1,
// //           country: "India",
// //           stateId: 24,
// //           state: "Telangana",
// //           cityId: 6,
// //           city: "Hyderabad",
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         purchase: {
// //           itemCount: 1,
// //           unitPrice: 58,
// //           totalQuantity: 10000,
// //           totalPrice: 580,
// //           purchaseStartDate: "2025-08-04",
// //           latestPurchaseDate: "2025-08-04",
// //         },
// //         expense: null,
// //         payment: null,
// //       },
// //     ],
// //   },
// // }) {
// //   const { topCards, tableMeta, tableData } =
// //     purchaseSuppplierDetailsDataFormatter(data);

// //   return (
// //     <div className="p-3">
// //       {/* Top Cards */}
// //       <Row className="g-3 mb-4">
// //         {topCards.map((card, idx) => (
// //           <Col md={4} key={idx}>
// //             <Card
// //               className="border-0 shadow-sm h-100"
// //               style={{ backgroundColor: card.bg, borderRadius: "16px" }}
// //             >
// //               <Card.Body className="d-flex align-items-center p-3">
// //                 <div className="me-3">{card.icon}</div>
// //                 <div>
// //                   <div
// //                     style={{
// //                       fontSize: "0.9rem",
// //                       fontWeight: "500",
// //                       color: "#6B7280",
// //                     }}
// //                   >
// //                     {card.title}
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "1.5rem",
// //                       fontWeight: "700",
// //                       color: card.textColor,
// //                     }}
// //                   >
// //                     {card.value}
// //                   </div>
// //                   <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
// //                     {card.subText}
// //                   </div>
// //                 </div>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>

// //       {/* Table */}
// //       <Card
// //         className="border-0 shadow-sm"
// //         style={{ borderRadius: "16px", overflow: "hidden" }}
// //       >
// //         <Card.Header
// //           className="d-flex align-items-center"
// //           style={{
// //             backgroundColor: "#FFF7ED",
// //             border: "none",
// //             borderRadius: "16px 16px 0 0",
// //             padding: "16px",
// //           }}
// //         >
// //           {tableMeta.icon}
// //           <div>
// //             <h6 className="mb-0 fw-bold">{tableMeta.title}</h6>
// //             <small className="text-muted">{tableMeta.subtitle}</small>
// //           </div>
// //         </Card.Header>
// //         <Card.Body className="p-0">
// //           <Table hover responsive className="mb-0">
// //             <thead style={{ backgroundColor: "#F9FAFB" }}>
// //               <tr>
// //                 <th className="py-3 px-3">Supplier Name</th>
// //                 <th className="py-3">Total Quantity</th>
// //                 <th className="py-3">Total Price</th>
// //                 <th className="py-3">Avg Price</th>
// //                 <th className="py-3">Start Date</th>
// //                 <th className="py-3">End Date</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {tableData.map((row, idx) => (
// //                 <tr key={idx}>
// //                   <td className="py-3 px-3">{row.supplierName}</td>
// //                   <td className="text-primary">{row.totalQuantity}</td>
// //                   <td className="text-success">{row.totalPrice}</td>
// //                   <td style={{ color: "#6D28D9" }}>{row.avgPrice}</td>
// //                   <td>{row.startDate}</td>
// //                   <td>{row.endDate}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </Card.Body>
// //       </Card>
// //     </div>
// //   );
// // }
