"use client";

import React, { useState } from "react";
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
import { FaDownload } from "react-icons/fa";
import { stockTrendsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemLeftoverStockHistory } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

const ItemsStockTrends = () => {
  const { startDate, endDate } = useItemsContext();
  const [view, setView] = useState("table");

  return (
    <ServiceRenderer
      queryHook={useItemLeftoverStockHistory}
      queryKey={[
        "itemLeftoverStockHistory",
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useItemLeftoverStockHistory({ startdt: startDate, enddt: endDate })
          .queryFn
      }
      queryArgs={[475,{ startdt: startDate, enddt: endDate,outlet:1,userId:7 }]}
      formatter={stockTrendsDataFormatter}
      shimmerCount={1}
    >
      {({cardsData,data}) => (
        <Container fluid className="p-4 bg-white rounded shadow-sm">
          {/* Top Summary Section */}
          <Row className="mb-4 text-center g-3">
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#f0f4ff" }}
              >
                <h6 className="text-muted">Current Stock</h6>
                <h4 className="fw-bold text-primary">
                  {cardsData?.currentStock?.toLocaleString()} GM
                </h4>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#e9f8ef" }}
              >
                <h6 className="text-muted">Latest Price</h6>
                <h4 className="fw-bold text-success">
                  ₹{cardsData?.currentPrice} per 1000 GM
                </h4>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#fff7e6" }}
              >
                <h6 className="text-muted">Total Purchase</h6>
                <h4 className="fw-bold text-warning">
                  {cardsData?.totalPurchase?.toLocaleString()} GM
                </h4>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#f8f0ff" }}
              >
                <h6 className="text-muted">Total Consumption</h6>
                <h4 className="fw-bold text-purple">
                  {cardsData?.totalConsumption?.toLocaleString()} GM
                </h4>
              </Card>
            </Col>
          </Row>

          {/* Controls */}
          <Row className="mb-3 d-flex justify-content-between align-items-center">
            <Col>
              <h5 className="fw-bold">Stock Movement History</h5>
              <p className="text-muted">
                Daily stock trends and purchase patterns
              </p>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <Button variant="warning" className="me-2 text-white">
                <FaDownload className="me-2" /> Export
              </Button>
              <Button
                variant={view === "table" ? "warning" : "outline-warning"}
                className="me-2"
                onClick={() => setView("table")}
              >
                Table View
              </Button>
              <Button
                variant={view === "chart" ? "warning" : "outline-warning"}
                onClick={() => setView("chart")}
              >
                Chart View
              </Button>
            </Col>
          </Row>

          {/* Table View */}
          {view === "table" && (
            <Table
              bordered
              hover
              responsive
              className="align-middle text-center"
            >
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Purchase Qty</th>
                  <th>Consumption Qty</th>
                  <th>Closing Qty</th>
                  <th>Closing Date</th>
                  <th>Leftover Stock</th>
                  <th>Leftover Stock Value</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.date}</td>
                    <td>₹{row.price}</td>
                    <td
                      className={
                        row.purchaseQty > 0
                          ? "text-success fw-bold"
                          : "text-muted"
                      }
                    >
                      {row.purchaseQty.toLocaleString()} GM
                    </td>
                    <td
                      className={
                        row.consumptionQty > 0
                          ? "text-danger fw-bold"
                          : "text-muted"
                      }
                    >
                      {row.consumptionQty.toLocaleString()} GM
                    </td>
                    <td
                      className={
                        row.closingQty > 0
                          ? "bg-primary text-white rounded px-2"
                          : "text-muted"
                      }
                    >
                      {row.closingQty.toLocaleString()} GM
                    </td>
                    <td>{row.closingDate}</td>
                    <td className="text-primary fw-bold">
                      {row.leftoverStock.toLocaleString()} GM
                    </td>
                    <td className="text-success fw-bold">
                      ₹{row.leftoverStockValue}
                    </td>
                    <td>{row.trendIcon}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Chart View */}
          {view === "chart" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leftoverStock" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Container>
      )}
    </ServiceRenderer>
  );
};

export default ItemsStockTrends;

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
// import { stockTrendsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// const ItemsStockTrends = ({
//   apiResponse = {
//     etag: "1113780170",
//     id: "475",
//     item: {
//       id: "475",
//       outletId: "1",
//       name: "Biryani Mixed Rice",
//       unit: "GM",
//       unitQuantity: "1000",
//       unitPrice: 98,
//       categoryId: 18,
//       categoryName: "Base Items",
//       disabled: false,
//       alias: "Biryani Mixed Rice - 1000GM",
//       moq: 5000,
//       itemTypeId: 2,
//       itemType: "Base Item",
//       itemDescription: null,
//       perishable: false,
//       shelfLifeDays: 0,
//       hsnCode: null,
//       brandName: null,
//       storageLocation: null,
//       createdBy: null,
//       updatedBy: null,
//     },
//     currentStock: 717300,
//     currentPrice: 84.2,
//     totalPurchase: 460800,
//     totalConsumption: 0,
//     list: [
//       {
//         dt: "2025-07-04",
//         unitPrice: 80.7,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 12000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 968.4,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 24396.9,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 268500,
//       },
//       {
//         dt: "2025-07-05",
//         unitPrice: 82.9,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 27000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 2238.3,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 26635.2,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 295500,
//       },
//       {
//         dt: "2025-07-06",
//         unitPrice: 84.2,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 13000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1094.6,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 27729.8,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 308500,
//       },
//       {
//         dt: "2025-07-07",
//         unitPrice: 85.8,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 7600,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 652.1,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 28381.9,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 316100,
//       },
//       {
//         dt: "2025-07-08",
//         unitPrice: 83.3,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 26000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 2165.8,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 30547.7,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 342100,
//       },
//       {
//         dt: "2025-07-09",
//         unitPrice: 84.3,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10400,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 876.7,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 31424.4,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 352500,
//       },
//       {
//         dt: "2025-07-10",
//         unitPrice: 84,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 24000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 2016,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 33440.4,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 376500,
//       },
//       {
//         dt: "2025-07-11",
//         unitPrice: 84,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 24000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 2016,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 35456.4,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 400500,
//       },
//       {
//         dt: "2025-07-12",
//         unitPrice: 82.3,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 24000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 600,
//         purchaseClosingValue: 0,
//         purchaseValue: 1975.2,
//         consumptionValue: 0,
//         consumptionClosingValue: 49.4,
//         leftoverStockValue: 37431.6,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 424500,
//       },
//       {
//         dt: "2025-07-13",
//         unitPrice: 82.5,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 6800,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 561,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 37992.6,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 431300,
//       },
//       {
//         dt: "2025-07-14",
//         unitPrice: 83.8,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 8000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 670.4,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 38663,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 439300,
//       },
//       {
//         dt: "2025-07-15",
//         unitPrice: 84.9,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 849,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 39512,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 449300,
//       },
//       {
//         dt: "2025-07-16",
//         unitPrice: 82.2,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 11000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 904.2,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 40416.2,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 460300,
//       },
//       {
//         dt: "2025-07-17",
//         unitPrice: 83.4,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 834,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 41250.2,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 470300,
//       },
//       {
//         dt: "2025-07-18",
//         unitPrice: 82.9,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 39000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 3233.1,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 44483.3,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 509300,
//       },
//       {
//         dt: "2025-07-19",
//         unitPrice: 83.4,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 834,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 45317.3,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 519300,
//       },
//       {
//         dt: "2025-07-20",
//         unitPrice: 82.5,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 28000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 2310,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 47627.3,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 547300,
//       },
//       {
//         dt: "2025-07-21",
//         unitPrice: 83.4,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 834,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 48461.3,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 557300,
//       },
//       {
//         dt: "2025-07-22",
//         unitPrice: 83.7,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 9000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 753.3,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 49214.6,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 566300,
//       },
//       {
//         dt: "2025-07-23",
//         unitPrice: 83.8,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 838,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 50052.6,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 576300,
//       },
//       {
//         dt: "2025-07-25",
//         unitPrice: 83.8,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 838,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 50890.6,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 586300,
//       },
//       {
//         dt: "2025-07-26",
//         unitPrice: 84.4,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 14000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1181.6,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 52072.2,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 600300,
//       },
//       {
//         dt: "2025-07-27",
//         unitPrice: 83,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 16000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1328,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 53400.2,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 616300,
//       },
//       {
//         dt: "2025-07-28",
//         unitPrice: 82.6,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 12000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 991.2,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 54391.4,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 628300,
//       },
//       {
//         dt: "2025-07-30",
//         unitPrice: 83.1,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 20000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1662,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 56053.4,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 648300,
//       },
//       {
//         dt: "2025-07-31",
//         unitPrice: 84.1,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 23000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1934.3,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 57987.7,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 671300,
//       },
//       {
//         dt: "2025-08-01",
//         unitPrice: 84.2,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 18000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1515.6,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 59503.3,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 689300,
//       },
//       {
//         dt: "2025-08-02",
//         unitPrice: 84.6,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 10000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 846,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 60349.3,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 699300,
//       },
//       {
//         dt: "2025-08-03",
//         unitPrice: 84.2,
//         purchaseClosingQuantity: 0,
//         purchaseQuantity: 18000,
//         consumptionQuantity: 0,
//         consumptionClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseValue: 1515.6,
//         consumptionValue: 0,
//         consumptionClosingValue: 0,
//         leftoverStockValue: 61864.9,
//         latestPurchaseClosingDate: "-",
//         status: "GREEN",
//         reconcillation: null,
//         leftOverStockQuantity: 717300,
//       },
//     ],
//   },
// }) => {
//   const [view, setView] = useState("table");
//   const data = stockTrendsDataFormatter(apiResponse);

//   return (
//     <Container fluid className="p-4 bg-white rounded shadow-sm">
//       {/* Top Summary Section */}
//       <Row className="mb-4 text-center g-3">
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#f0f4ff" }}
//           >
//             <h6 className="text-muted">Current Stock</h6>
//             <h4 className="fw-bold text-primary">
//               {apiResponse?.currentStock?.toLocaleString()} GM
//             </h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#e9f8ef" }}
//           >
//             <h6 className="text-muted">Latest Price</h6>
//             <h4 className="fw-bold text-success">
//               ₹{apiResponse?.currentPrice} per 1000 GM
//             </h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#fff7e6" }}
//           >
//             <h6 className="text-muted">Total Purchase</h6>
//             <h4 className="fw-bold text-warning">
//               {apiResponse?.totalPurchase?.toLocaleString()} GM
//             </h4>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card
//             className="p-3 border-0 shadow-sm rounded-lg"
//             style={{ backgroundColor: "#f8f0ff" }}
//           >
//             <h6 className="text-muted">Total Consumption</h6>
//             <h4 className="fw-bold text-purple">
//               {apiResponse?.totalConsumption?.toLocaleString()} GM
//             </h4>
//           </Card>
//         </Col>
//       </Row>

//       {/* Controls */}
//       <Row className="mb-3 d-flex justify-content-between align-items-center">
//         <Col>
//           <h5 className="fw-bold">Stock Movement History</h5>
//           <p className="text-muted">Daily stock trends and purchase patterns</p>
//         </Col>
//         <Col className="d-flex justify-content-end align-items-center">
//           <Button variant="warning" className="me-2 text-white">
//             <FaDownload className="me-2" /> Export
//           </Button>
//           <Button
//             variant={view === "table" ? "warning" : "outline-warning"}
//             className="me-2"
//             onClick={() => setView("table")}
//           >
//             Table View
//           </Button>
//           <Button
//             variant={view === "chart" ? "warning" : "outline-warning"}
//             onClick={() => setView("chart")}
//           >
//             Chart View
//           </Button>
//         </Col>
//       </Row>

//       {/* Table View */}
//       {view === "table" && (
//         <Table bordered hover responsive className="align-middle text-center">
//           <thead className="table-light">
//             <tr>
//               <th>Date</th>
//               <th>Price</th>
//               <th>Purchase Qty</th>
//               <th>Consumption Qty</th>
//               <th>Closing Qty</th>
//               <th>Closing Date</th>
//               <th>Leftover Stock</th>
//               <th>Leftover Stock Value</th>
//               <th>Trend</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx}>
//                 <td>{row.date}</td>
//                 <td>₹{row.price}</td>
//                 <td
//                   className={
//                     row.purchaseQty > 0 ? "text-success fw-bold" : "text-muted"
//                   }
//                 >
//                   {row.purchaseQty.toLocaleString()} GM
//                 </td>
//                 <td
//                   className={
//                     row.consumptionQty > 0
//                       ? "text-danger fw-bold"
//                       : "text-muted"
//                   }
//                 >
//                   {row.consumptionQty.toLocaleString()} GM
//                 </td>
//                 <td
//                   className={
//                     row.closingQty > 0
//                       ? "bg-primary text-white rounded px-2"
//                       : "text-muted"
//                   }
//                 >
//                   {row.closingQty.toLocaleString()} GM
//                 </td>
//                 <td>{row.closingDate}</td>
//                 <td className="text-primary fw-bold">
//                   {row.leftoverStock.toLocaleString()} GM
//                 </td>
//                 <td className="text-success fw-bold">
//                   ₹{row.leftoverStockValue}
//                 </td>
//                 <td>{row.trendIcon}</td>
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
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="leftoverStock" fill="#ff9800" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </Container>
//   );
// };

// export default ItemsStockTrends;
