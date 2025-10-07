"use client";

import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { productSummaryOverViewDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";
import { useProductSummary } from "@/services/product-service";
import { useProductsContext } from "@/contexts/ProductsContext";
import { IconChartHistogram } from "@tabler/icons-react";

export default function ProductSummaryOverView() {
  const { startDate, endDate } = useProductsContext();

  return (
    <Container fluid className="p-3">
      <ServiceRenderer
        queryHook={useProductSummary}
        queryKey={[
          "productSummary",
          ,
          100,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useProductSummary(100, { startdt: startDate, enddt: endDate }).queryFn
        }
        queryArgs={[
          100,
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={productSummaryOverViewDataFormatter}
        shimmerCount={3}
      >
        {(formatted) => (
          <>
            {/* Header */}
            <Row className="mb-3">
              <Col>
                <div className="d-flex align-items-center">
                  <div style={{
                    background: '#f75614', // orange gradient for Figma match
                    borderRadius: '12px',
                    padding: '8px',
                    display: 'inline-block'
                  }}>
                    <IconChartHistogram stroke={2} color="#fff" size={24} />
                  </div>
                  <div style={{ marginLeft: '5px' }}>
                    <h6 className="mb-0 fw-bold">Summary Overview</h6>
                    <small className="text-muted">
                      Real-time consumption metrics and performance indicators
                    </small>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Top Summary Cards */}
            <Row className="mb-4">
              {["expense", "payment", "dues"].map((key, idx) => (
                <Col key={idx} md={4} className="mb-3">
                  <Card
                    style={{
                      backgroundColor: formatted[key].bg,
                      borderRadius: "12px",
                      border: "none",
                    }}
                    className="shadow-sm"
                  >
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        {formatted[key].icon}
                        <h6 className="fw-bold mb-0">{formatted[key].title}</h6>
                      </div>
                      {(formatted[key].items || []).map((item, i) => (
                        <Row key={i} className="mb-2">
                          <Col xs={7}>
                            <small className="text-muted">{item.label}</small>
                          </Col>
                          <Col xs={5} className="text-end fw-semibold">
                            {item.value}
                          </Col>
                        </Row>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* Footer Metrics */}
            <Row
              className="g-3 flex-nowrap hide-scrollbar"
              style={{
                overflowX: "auto",
                flex: "1",
                display: "flex",
                alignItems: "center",
                background: "#F3FFF8",
                // borderRadius: "12px",
                boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)",
                whiteSpace: "nowrap",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
              }}
            >
              <style jsx>{`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `}</style>

              {(formatted.footer || []).map((f, i) => (
                <Col key={i} style={{ minWidth: "200px" }}>
                  <Card
                    className="p-3 border-0 h-100"
                    style={{ backgroundColor: f.bg }}
                  >
                    <Row className="align-items-center h-100 flex-nowrap">
                      {/* Icon Column */}
                      <Col
                        xs="auto"
                        className="d-flex justify-content-center align-items-center"
                      >
                        {f.icon}
                      </Col>

                      {/* Text Column */}
                      <Col>
                        <h6 className="fw-bold mb-1">{f.label}</h6>
                        <p className="mb-0 fw-semibold">{f.value}</p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>

          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}
// "use client";

// import { productSummaryOverViewDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";
// import React from "react";
// import { Card, Row, Col, Container } from "react-bootstrap";

// const ProductSummaryOverView = ({
//   apiData = {
//     etag: null,
//     id: "100",
//     product: {
//       id: "100",
//       outletId: "1",
//       name: "Butter Chicken (Half)",
//       departmentId: 2,
//       departmentName: "NORTH INDIAN",
//       masterProductId: 93,
//       masterProductName: "Butter Chicken",
//       categoryId: 0,
//       categoryName: null,
//       price: 279,
//       makingCost: 106,
//       costPercentage: 37.99,
//       marginPercentage: 62.01,
//       veg: false,
//       imageUrl: null,
//       preparationTime: 0,
//       variation: "FULL",
//       displayOrder: 0,
//       description: null,
//       pieceCount: 1,
//       pieceQuantity: 1,
//       pieceUnit: "GM",
//       disabled: false,
//       createdTs: null,
//       updatedTs: null,
//       createdBy: null,
//       updatedBy: null,
//     },
//     summary: {
//       dt: "100",
//       startDate: "2025-07-04",
//       endDate: "2025-08-04",
//       orders: 47,
//       netSales: 15031,
//       discount: 877,
//       tax: 715,
//       itemsSold: 47,
//       totalSales: 15908,
//       totalMakingCost: 4982,
//       efficiency: 66.86,
//       recipe: null,
//     },
//   },
// }) => {
//   const formatted = productSummaryOverViewDataFormatter(apiData);

//   return (
//     <Container fluid className="p-3">
//       {/* Header */}
//       <Row className="mb-3">
//         <Col>
//           <div className="d-flex align-items-center">
//             <span className="bg-danger text-white p-2 rounded me-2">📊</span>
//             <div>
//               <h6 className="mb-0 fw-bold"> Summary Overview</h6>
//               <small className="text-muted">
//                 Real-time consumption metrics and performance indicators
//               </small>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Top Summary Cards */}
//       <Row className="mb-4">
//         {["expense", "payment", "dues"].map((key, idx) => (
//           <Col key={idx} md={4} className="mb-3">
//             <Card
//               style={{
//                 backgroundColor: formatted[key].bg,
//                 borderRadius: "12px",
//                 border: "none",
//               }}
//               className="shadow-sm"
//             >
//               <Card.Body>
//                 <div className="d-flex align-items-center mb-3">
//                   {formatted[key].icon}
//                   <h6 className="fw-bold mb-0">{formatted[key].title}</h6>
//                 </div>
//                 {(formatted[key].items || []).map((item, i) => (
//                   <Row key={i} className="mb-2">
//                     <Col xs={7}>
//                       <small className="text-muted">{item.label}</small>
//                     </Col>
//                     <Col xs={5} className="text-end fw-semibold">
//                       {item.value}
//                     </Col>
//                   </Row>
//                 ))}
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Footer Metrics */}
//       <Row className="g-3">
//         {(formatted.footer || []).map((f, i) => (
//           <Col key={i} md className="d-flex">
//             <Card
//               style={{
//                 backgroundColor: f.bg,
//                 borderRadius: "12px",
//                 border: "none",
//               }}
//               className="flex-fill text-center py-3 shadow-sm"
//             >
//               <div className="mb-2 fs-4 text-dark">{f.icon}</div>
//               <h6 className="fw-bold mb-0">{f.label}</h6>
//               <div className="fw-semibold">{f.value}</div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default ProductSummaryOverView;
