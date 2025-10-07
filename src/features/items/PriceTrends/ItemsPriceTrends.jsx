"use client";

import React, { useState, useMemo } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaDownload, FaFileExport } from "react-icons/fa";
import { priceTrendsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemPriceChangeHistory } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ItemsPriceTrends = () => {
  const { startDate, endDate } = useItemsContext();
  const [view, setView] = useState("table");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return null;
    return (data) => {
      const sorted = [...data].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (sortConfig.key.includes("Date")) {
          return sortConfig.direction === "asc"
            ? new Date(aVal) - new Date(bVal)
            : new Date(bVal) - new Date(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortConfig.direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
      return sorted;
    };
  }, [sortConfig]);

  return (
    <ServiceRenderer
      queryHook={useItemPriceChangeHistory}
      queryKey={["itemPriceChangeHistory", { startdt: startDate, enddt: endDate }]}
      queryFn={() =>
        useItemPriceChangeHistory({ startdt: startDate, enddt: endDate }).queryFn
      }
      queryArgs={[475, { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
      formatter={priceTrendsDataFormatter}
      shimmerCount={1}
    >
      {({ data = [], cardsData }) => {
        const displayedData = sortedData ? sortedData(data) : data;

        return (
          <Container fluid className="p-4 bg-white rounded shadow-sm">
            {/* Summary Section */}
            <Row className="mb-4 text-left">
              <Col md={3}>
                <Card
                  className="p-3 border-0 shadow-sm rounded-lg"
                  style={{ backgroundColor: "#eaf0ff" }}
                >
                  <h6 className="text-muted">Current Price</h6>
                  <h4 className="fw-bold text-primary">₹{cardsData.currentPrice}</h4>
                  <h6 className="fw-bold text-primary">{cardsData.curentPriceSub}</h6>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  className="p-3 border-0 shadow-sm rounded-lg"
                  style={{ backgroundColor: "#fff5e6" }}
                >
                  <h6 className="text-muted">Highest Price</h6>
                  <h4 className="fw-bold text-warning">₹{cardsData.highestPrice}</h4>
                  <h6 className="fw-bold text-warning">{cardsData.highestPriceSub}</h6>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  className="p-3 border-0 shadow-sm rounded-lg"
                  style={{ backgroundColor: "#fce8f3" }}
                >
                  <h6 className="text-muted">Lowest Price</h6>
                  <h4 className="fw-bold text-danger">₹{cardsData.lowestPrice}</h4>
                  <h6 className="fw-bold text-danger">{cardsData.lowestPriceSub}</h6>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  className="p-3 border-0 shadow-sm rounded-lg"
                  style={{ backgroundColor: "#e9f8ef" }}
                >
                  <h6 className="text-muted">Total Change</h6>
                  <h4 className="fw-bold text-success">
                    ₹ {cardsData?.percentageOfChange}
                  </h4>
                  <h6 className="fw-bold text-success">
                    {cardsData.percentageOfChangeSub}
                  </h6>
                </Card>
              </Col>
            </Row>

            {/* Controls */}
            <Row className="mb-3 d-flex justify-content-between">
              <Col>
                <h5 className="fw-bold">Price Change History</h5>
                <p className="text-muted">Monthly price trends and variations</p>
              </Col>
              <Col
                className="d-flex justify-content-end align-items-center"
                style={{ gap: 16 }}
              >
                <Button
                  style={{
                    background: "#FF6300",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "16px",
                    padding: "8px 24px",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 2px 8px rgba(255,99,0,0.07)",
                  }}
                >
                  <FaFileExport style={{ marginRight: 8 }} />
                  Export
                </Button>

                <div
                  style={{
                    background: "#F8F8F8",
                    borderRadius: 22,
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setView("table")}
                    style={{
                      border: "none",
                      outline: "none",
                      background: view === "table" ? "#fff" : "transparent",
                      color: view === "table" ? "#FF6300" : "#B5B5B5",
                      fontWeight: 600,
                      fontSize: "15px",
                      borderRadius: 18,
                      padding: "8px 32px",
                      boxShadow:
                        view === "table" ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
                      transition: "all 0.18s",
                      marginRight: 6,
                    }}
                  >
                    Table View
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("chart")}
                    style={{
                      border: "none",
                      outline: "none",
                      background: view === "chart" ? "#fff" : "transparent",
                      color: view === "chart" ? "#FF6300" : "#B5B5B5",
                      fontWeight: 600,
                      fontSize: "15px",
                      borderRadius: 18,
                      padding: "8px 32px",
                      boxShadow:
                        view === "chart" ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
                      transition: "all 0.18s",
                    }}
                  >
                    Chart View
                  </button>
                </div>
              </Col>
            </Row>

            {/* Table View */}
            {view === "table" && (
              <div
                style={{
                  maxHeight: "65vh",
                  overflowY: "auto",
                  overflowX: "auto",
                  position: "relative",
                  display: "block",
                }}
              >
                <Table
                  hover
                  className="align-middle mb-0"
                  style={{
                    minWidth: "1000px",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                  }}
                >
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      backgroundColor: "#f8f9fa",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <tr>
                      <th onClick={() => handleSort("startDate")}>
                        Start Date{renderSortArrow("startDate")}
                      </th>
                      <th onClick={() => handleSort("endDate")}>
                        End Date{renderSortArrow("endDate")}
                      </th>
                      <th onClick={() => handleSort("price")}>
                        Price (₹/1000GM){renderSortArrow("price")}
                      </th>
                      <th onClick={() => handleSort("priceDiff")}>
                        Price Difference{renderSortArrow("priceDiff")}
                      </th>
                      <th onClick={() => handleSort("changePercent")}>
                        Change %{renderSortArrow("changePercent")}
                      </th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData?.length > 0 ? (
                      displayedData.map((row, idx) => (
                        <tr key={idx}>
                          <td>{formatDate(row.startDate)}</td>
                          <td>{formatDate(row.endDate)}</td>
                          <td>₹{row.price}</td>
                          <td
                            className={
                              row.priceDiff > 0
                                ? "text-success"
                                : row.priceDiff < 0
                                  ? "text-danger"
                                  : "text-muted"
                            }
                          >
                            {row.priceDiff > 0 ? <span><FaArrowTrendUp size={14}/> + ₹</span> :  row.priceDiff == 0 ? '--': <span><FaArrowTrendDown size={14}/> ₹</span>}
                            {row.priceDiff}
                          </td>
                          <td>{row.changePercent}%</td>
                          <td className="d-flex align-items-center gap-2">
                            {row.priceDiff > 0 ? <span><FaArrowTrendUp size={14} color="green"/></span> : row.priceDiff == 0 ? '--':<span><FaArrowTrendDown size={14} color="red"/></span>}
                           {row.trendText}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "#888",
                            fontStyle: "italic",
                          }}
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Chart View */}
            {view === "chart" && (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={data || []}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="startDate" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="price" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Container>
        );
      }}
    </ServiceRenderer>
  );
};

export default ItemsPriceTrends;


// "use client";

// import React, { useState } from "react";
// import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { FaDownload } from "react-icons/fa";
// import { priceTrendsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemPriceChangeHistory } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// const ItemsPriceTrends = () => {
//   const { startDate, endDate } = useItemsContext();
//   const [view, setView] = useState("table");

//   return (
//     <ServiceRenderer
//       queryHook={useItemPriceChangeHistory}
//       queryKey={[
//         "itemPriceChangeHistory",
//         { startdt: startDate, enddt: endDate },
//       ]}
//       queryFn={() =>
//         useItemPriceChangeHistory({ startdt: startDate, enddt: endDate })
//           .queryFn
//       }
//       queryArgs={[
//         475,
//         { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//       ]}
//       formatter={priceTrendsDataFormatter}
//       shimmerCount={1}
//     >
//       {({ data, cardsData }) => (
//         <Container fluid className="p-4 bg-white rounded shadow-sm">
//           {/* Top Summary Section */}
//           <Row className="mb-4 text-left">
//             <Col md={3}>
//               <Card
//                 className="p-3 border-0 shadow-sm rounded-lg"
//                 style={{ backgroundColor: "#eaf0ff" }}
//               >
//                 <h6 className="text-muted">Current Price</h6>
//                 <h4 className="fw-bold text-primary">
//                   ₹{cardsData.currentPrice}
//                 </h4>
//                 <h6 className="fw-bold text-primary">
//                   {cardsData.curentPriceSub}
//                 </h6>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card
//                 className="p-3 border-0 shadow-sm rounded-lg"
//                 style={{ backgroundColor: "#fff5e6" }}
//               >
//                 <h6 className="text-muted">Highest Price</h6>
//                 <h4 className="fw-bold text-warning">
//                   ₹{cardsData.highestPrice}
//                 </h4>
//                 <h6 className="fw-bold text-warning">
//                   {cardsData.highestPriceSub}
//                 </h6>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card
//                 className="p-3 border-0 shadow-sm rounded-lg"
//                 style={{ backgroundColor: "#fce8f3" }}
//               >
//                 <h6 className="text-muted">Lowest Price</h6>
//                 <h4 className="fw-bold text-danger">
//                   ₹{cardsData.lowestPrice}
//                 </h4>
//                 <h6 className="fw-bold text-danger">
//                   {cardsData.lowestPriceSub}
//                 </h6>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card
//                 className="p-3 border-0 shadow-sm rounded-lg"
//                 style={{ backgroundColor: "#e9f8ef" }}
//               >
//                 <h6 className="text-muted">Total Change</h6>
//                 <h4 className="fw-bold text-success">
//                   {cardsData?.percentageOfChange}%
//                 </h4>
//                 <h6 className="fw-bold text-success">
//                   {cardsData.percentageOfChangeSub}
//                 </h6>
//               </Card>
//             </Col>
//           </Row>

//           {/* Controls */}
//           <Row className="mb-3 d-flex justify-content-between">
//             <Col>
//               <h5 className="fw-bold">Price Change History</h5>
//               <p className="text-muted">Monthly price trends and variations</p>
//             </Col>
//             <Col className="d-flex justify-content-end align-items-center" style={{ gap: 16 }}>
//       {/* Export: solid orange, slightly rounded */}
//       <Button
//         style={{
//           background: "#FF6300",
//           border: "none",
//           borderRadius: "10px",
//           color: "#fff",
//           fontWeight: 600,
//           fontSize: "16px",
//           padding: "8px 24px",
//           display: "flex",
//           alignItems: "center",
//           boxShadow: "0 2px 8px rgba(255,99,0,0.07)",
//         }}
//       >
//         <FaDownload style={{ marginRight: 8 }} />
//         Export
//       </Button>
//       {/* Segmented toggle group */}
//       <div
//         style={{
//           background: "#F8F8F8",
//           borderRadius: 22,
//           display: "flex",
//           alignItems: "center",
//           padding: 2,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//         }}
//       >
//         {/* Table View */}
//         <button
//           type="button"
//           onClick={() => setView("table")}
//           style={{
//             border: "none",
//             outline: "none",
//             background: view === "table" ? "#fff" : "transparent",
//             color: view === "table" ? "#FF6300" : "#B5B5B5",
//             fontWeight: 600,
//             fontSize: "15px",
//             borderRadius: 18,
//             padding: "8px 32px",
//             boxShadow: view === "table" ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
//             transition: "all 0.18s",
//             marginRight: 6,
//           }}
//         >
//           Table View
//         </button>
//         {/* Chart View */}
//         <button
//           type="button"
//           onClick={() => setView("chart")}
//           style={{
//             border: "none",
//             outline: "none",
//             background: view === "chart" ? "#fff" : "transparent",
//             color: view === "chart" ? "#FF6300" : "#B5B5B5",
//             fontWeight: 600,
//             fontSize: "15px",
//             borderRadius: 18,
//             padding: "8px 32px",
//             boxShadow: view === "chart" ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
//             transition: "all 0.18s",
//           }}
//         >
//           Chart View
//         </button>
//       </div>
//     </Col>
//           </Row>

//           {/* Table View */}
//           {view === "table" && (
//             <Table hover responsive className="align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Price (₹/1000GM)</th>
//                   <th>Price Difference</th>
//                   <th>Change %</th>
//                   <th>Trend</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data?.map((row, idx) => (
//                   <tr key={idx}>
//                     <td>{row.startDate}</td>
//                     <td>{row.endDate}</td>
//                     <td>₹{row.price}</td>
//                     <td
//                       className={
//                         row.priceDiff > 0
//                           ? "text-success"
//                           : row.priceDiff < 0
//                           ? "text-danger"
//                           : "text-muted"
//                       }
//                     >
//                       {row.priceDiff > 0 ? "+" : ""}
//                       {row.priceDiff}
//                     </td>
//                     <td>{row.changePercent}%</td>
//                     <td className="d-flex align-items-center gap-2">
//                       {row.trendIcon} {row.trendText}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}

//           {/* Chart View */}
//           {view === "chart" && (
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart
//                 data={data || []}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="startDate" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="price" fill="#007bff" />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </Container>
//       )}
//     </ServiceRenderer>
//   );
// };

// export default ItemsPriceTrends;

// "use client";

// import React, { useState } from "react";
// import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { FaDownload } from "react-icons/fa";
// import { priceTrendsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// const ItemsPriceTrends = ({
//   apiResponse = {
//     etag: null,
//     currentPrice: {
//       itemId: "475",
//       item: {
//         id: "475",
//         outletId: "1",
//         name: "Biryani Mixed Rice",
//         unit: "GM",
//         unitQuantity: "1000",
//         unitPrice: 98,
//         categoryId: 18,
//         categoryName: "Base Items",
//         disabled: false,
//         alias: "Biryani Mixed Rice - 1000GM",
//         moq: 5000,
//         itemTypeId: 2,
//         itemType: "Base Item",
//         itemDescription: null,
//         perishable: false,
//         shelfLifeDays: 0,
//         hsnCode: null,
//         brandName: null,
//         storageLocation: null,
//         createdBy: null,
//         updatedBy: null,
//       },
//       price: 83,
//       startDate: "2025-08-24",
//       endDate: "2050-01-01",
//     },
//     lowestPrice: {
//       itemId: "475",
//       item: {
//         id: "475",
//         outletId: "1",
//         name: "Biryani Mixed Rice",
//         unit: "GM",
//         unitQuantity: "1000",
//         unitPrice: 98,
//         categoryId: 18,
//         categoryName: "Base Items",
//         disabled: false,
//         alias: "Biryani Mixed Rice - 1000GM",
//         moq: 5000,
//         itemTypeId: 2,
//         itemType: "Base Item",
//         itemDescription: null,
//         perishable: false,
//         shelfLifeDays: 0,
//         hsnCode: null,
//         brandName: null,
//         storageLocation: null,
//         createdBy: null,
//         updatedBy: null,
//       },
//       price: 80.7,
//       startDate: "2025-07-04",
//       endDate: "2025-07-04",
//     },
//     highestPrice: {
//       itemId: "475",
//       item: {
//         id: "475",
//         outletId: "1",
//         name: "Biryani Mixed Rice",
//         unit: "GM",
//         unitQuantity: "1000",
//         unitPrice: 98,
//         categoryId: 18,
//         categoryName: "Base Items",
//         disabled: false,
//         alias: "Biryani Mixed Rice - 1000GM",
//         moq: 5000,
//         itemTypeId: 2,
//         itemType: "Base Item",
//         itemDescription: null,
//         perishable: false,
//         shelfLifeDays: 0,
//         hsnCode: null,
//         brandName: null,
//         storageLocation: null,
//         createdBy: null,
//         updatedBy: null,
//       },
//       price: 93.4,
//       startDate: "2025-06-07",
//       endDate: "2025-06-07",
//     },
//     percentageOfChange: 2.85,
//     list: [
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 92.5,
//         startDate: "2025-06-05",
//         endDate: "2025-06-05",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 92.7,
//         startDate: "2025-06-06",
//         endDate: "2025-06-06",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 93.4,
//         startDate: "2025-06-07",
//         endDate: "2025-06-07",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 91.2,
//         startDate: "2025-06-08",
//         endDate: "2025-06-08",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 91.3,
//         startDate: "2025-06-09",
//         endDate: "2025-06-10",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 90.6,
//         startDate: "2025-06-11",
//         endDate: "2025-06-11",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 91,
//         startDate: "2025-06-12",
//         endDate: "2025-06-12",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 90.2,
//         startDate: "2025-06-13",
//         endDate: "2025-06-13",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 90.5,
//         startDate: "2025-06-14",
//         endDate: "2025-06-14",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 91.3,
//         startDate: "2025-06-15",
//         endDate: "2025-06-15",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 93,
//         startDate: "2025-06-16",
//         endDate: "2025-06-16",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 90.1,
//         startDate: "2025-06-17",
//         endDate: "2025-06-17",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.6,
//         startDate: "2025-06-18",
//         endDate: "2025-06-18",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 92.4,
//         startDate: "2025-06-19",
//         endDate: "2025-07-03",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 80.7,
//         startDate: "2025-07-04",
//         endDate: "2025-07-04",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.9,
//         startDate: "2025-07-05",
//         endDate: "2025-07-05",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.2,
//         startDate: "2025-07-06",
//         endDate: "2025-07-06",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 85.8,
//         startDate: "2025-07-07",
//         endDate: "2025-07-07",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.3,
//         startDate: "2025-07-08",
//         endDate: "2025-07-08",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.3,
//         startDate: "2025-07-09",
//         endDate: "2025-07-09",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84,
//         startDate: "2025-07-10",
//         endDate: "2025-07-11",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.3,
//         startDate: "2025-07-12",
//         endDate: "2025-07-12",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.5,
//         startDate: "2025-07-13",
//         endDate: "2025-07-13",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.8,
//         startDate: "2025-07-14",
//         endDate: "2025-07-14",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.9,
//         startDate: "2025-07-15",
//         endDate: "2025-07-15",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.2,
//         startDate: "2025-07-16",
//         endDate: "2025-07-16",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.4,
//         startDate: "2025-07-17",
//         endDate: "2025-07-17",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.9,
//         startDate: "2025-07-18",
//         endDate: "2025-07-18",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.4,
//         startDate: "2025-07-19",
//         endDate: "2025-07-19",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.5,
//         startDate: "2025-07-20",
//         endDate: "2025-07-20",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.4,
//         startDate: "2025-07-21",
//         endDate: "2025-07-21",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.7,
//         startDate: "2025-07-22",
//         endDate: "2025-07-22",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.8,
//         startDate: "2025-07-23",
//         endDate: "2025-07-25",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.4,
//         startDate: "2025-07-26",
//         endDate: "2025-07-26",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83,
//         startDate: "2025-07-27",
//         endDate: "2025-07-27",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.6,
//         startDate: "2025-07-28",
//         endDate: "2025-07-29",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.1,
//         startDate: "2025-07-30",
//         endDate: "2025-07-30",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.1,
//         startDate: "2025-07-31",
//         endDate: "2025-07-31",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.2,
//         startDate: "2025-08-01",
//         endDate: "2025-08-01",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.6,
//         startDate: "2025-08-02",
//         endDate: "2025-08-02",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 84.2,
//         startDate: "2025-08-03",
//         endDate: "2025-08-05",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 82.4,
//         startDate: "2025-08-06",
//         endDate: "2025-08-06",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.2,
//         startDate: "2025-08-07",
//         endDate: "2025-08-07",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 81.6,
//         startDate: "2025-08-08",
//         endDate: "2025-08-09",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83.3,
//         startDate: "2025-08-10",
//         endDate: "2025-08-23",
//       },
//       {
//         itemId: "475",
//         item: {
//           id: "475",
//           outletId: "1",
//           name: "Biryani Mixed Rice",
//           unit: "GM",
//           unitQuantity: "1000",
//           unitPrice: 98,
//           categoryId: 18,
//           categoryName: "Base Items",
//           disabled: false,
//           alias: "Biryani Mixed Rice - 1000GM",
//           moq: 5000,
//           itemTypeId: 2,
//           itemType: "Base Item",
//           itemDescription: null,
//           perishable: false,
//           shelfLifeDays: 0,
//           hsnCode: null,
//           brandName: null,
//           storageLocation: null,
//           createdBy: null,
//           updatedBy: null,
//         },
//         price: 83,
//         startDate: "2025-08-24",
//         endDate: "2050-01-01",
//       },
//     ],
//   },
// }) => {
//   const [view, setView] = useState("table");
//   const data = priceTrendsDataFormatter(apiResponse);

//   return (
//     <Container fluid className="p-4 bg-white rounded shadow-sm">
//       {/* Top Summary Section */}
//       <Row className="mb-4 text-center">
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#eaf0ff" }}
//           >
//             <h6 className="text-muted">Current Price</h6>
//             <h4 className="fw-bold text-primary">
//               ₹{apiResponse?.currentPrice?.price}
//             </h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#fff5e6" }}
//           >
//             <h6 className="text-muted">Highest Price</h6>
//             <h4 className="fw-bold text-warning">
//               ₹{apiResponse?.highestPrice?.price}
//             </h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#fce8f3" }}
//           >
//             <h6 className="text-muted">Lowest Price</h6>
//             <h4 className="fw-bold text-danger">
//               ₹{apiResponse?.lowestPrice?.price}
//             </h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#e9f8ef" }}
//           >
//             <h6 className="text-muted">Total Change</h6>
//             <h4 className="fw-bold text-success">
//               {apiResponse?.percentageOfChange}%
//             </h4>
//           </Card>
//         </Col>
//       </Row>

//       {/* Controls */}
//       <Row className="mb-3 d-flex justify-content-between">
//         <Col>
//           <h5 className="fw-bold">Price Change History</h5>
//           <p className="text-muted">Monthly price trends and variations</p>
//         </Col>
//         <Col className="d-flex justify-content-end align-items-center">
//           <Button variant="outline-secondary" className="me-2">
//             <FaDownload className="me-2" /> Export
//           </Button>
//           <Button
//             variant={view === "table" ? "primary" : "outline-primary"}
//             className="me-2"
//             onClick={() => setView("table")}
//           >
//             Table View
//           </Button>
//           <Button
//             variant={view === "chart" ? "primary" : "outline-primary"}
//             onClick={() => setView("chart")}
//           >
//             Chart View
//           </Button>
//         </Col>
//       </Row>

//       {/* Table View */}
//       {view === "table" && (
//         <Table striped bordered hover responsive className="align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Price (₹/1000GM)</th>
//               <th>Price Difference</th>
//               <th>Change %</th>
//               <th>Trend</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx}>
//                 <td>{row.startDate}</td>
//                 <td>{row.endDate}</td>
//                 <td>₹{row.price}</td>
//                 <td
//                   className={
//                     row.priceDiff > 0
//                       ? "text-success"
//                       : row.priceDiff < 0
//                       ? "text-danger"
//                       : "text-muted"
//                   }
//                 >
//                   {row.priceDiff > 0 ? "+" : ""}
//                   {row.priceDiff}
//                 </td>
//                 <td>{row.changePercent}%</td>
//                 <td className="d-flex align-items-center gap-2">
//                   {row.trendIcon} {row.trendText}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Chart View */}
//       {view === "chart" && (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="startDate" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="price" fill="#007bff" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </Container>
//   );
// };

// export default ItemsPriceTrends;
