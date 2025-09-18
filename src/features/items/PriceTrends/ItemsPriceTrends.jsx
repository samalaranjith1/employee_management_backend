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
import { priceTrendsDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemPriceChangeHistory } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

const ItemsPriceTrends = () => {
  const { startDate, endDate } = useItemsContext();
  const [view, setView] = useState("table");

  return (
    <ServiceRenderer
      queryHook={useItemPriceChangeHistory}
      queryKey={[
        "itemPriceChangeHistory",
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useItemPriceChangeHistory({ startdt: startDate, enddt: endDate })
          .queryFn
      }
      queryArgs={[
        475,
        { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
      ]}
      formatter={priceTrendsDataFormatter}
      shimmerCount={1}
    >
      {({ data, cardsData }) => (
        <Container fluid className="p-4 bg-white rounded shadow-sm">
          {/* Top Summary Section */}
          <Row className="mb-4 text-center">
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#eaf0ff" }}
              >
                <h6 className="text-muted">Current Price</h6>
                <h4 className="fw-bold text-primary">
                  ₹{cardsData.currentPrice}
                </h4>
                <h6 className="fw-bold text-primary">
                  {cardsData.curentPriceSub}
                </h6>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#fff5e6" }}
              >
                <h6 className="text-muted">Highest Price</h6>
                <h4 className="fw-bold text-warning">
                  ₹{cardsData.highestPrice}
                </h4>
                <h6 className="fw-bold text-warning">
                  {cardsData.highestPriceSub}
                </h6>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#fce8f3" }}
              >
                <h6 className="text-muted">Lowest Price</h6>
                <h4 className="fw-bold text-danger">
                  ₹{cardsData.lowestPrice}
                </h4>
                <h6 className="fw-bold text-danger">
                  {cardsData.lowestPriceSub}
                </h6>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                className="p-3 border-0 shadow-sm rounded-lg"
                style={{ backgroundColor: "#e9f8ef" }}
              >
                <h6 className="text-muted">Total Change</h6>
                <h4 className="fw-bold text-success">
                  {cardsData?.percentageOfChange}%
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
            <Col className="d-flex justify-content-end align-items-center">
              <Button variant="outline-secondary" className="me-2">
                <FaDownload className="me-2" /> Export
              </Button>
              <Button
                variant={view === "table" ? "primary" : "outline-primary"}
                className="me-2"
                onClick={() => setView("table")}
              >
                Table View
              </Button>
              <Button
                variant={view === "chart" ? "primary" : "outline-primary"}
                onClick={() => setView("chart")}
              >
                Chart View
              </Button>
            </Col>
          </Row>

          {/* Table View */}
          {view === "table" && (
            <Table striped bordered hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Price (₹/1000GM)</th>
                  <th>Price Difference</th>
                  <th>Change %</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.startDate}</td>
                    <td>{row.endDate}</td>
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
                      {row.priceDiff > 0 ? "+" : ""}
                      {row.priceDiff}
                    </td>
                    <td>{row.changePercent}%</td>
                    <td className="d-flex align-items-center gap-2">
                      {row.trendIcon} {row.trendText}
                    </td>
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
                <XAxis dataKey="startDate" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Container>
      )}
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
