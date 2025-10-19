"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Dropdown } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";
import '@/app/globals.css';

function HourlyForecastFilterCard({
  products,
  metrics,
  selectedProduct,
  selectedMetric,
  currentData,
  setSelectedMetric,
  setSelectedProduct,
  renderGraph,
}) {
  const [isMobile, setIsMobile] = useState("0");

  useEffect(() => {
    const updateMinWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  return (
    <Row>
      {/* Filters and Cards Sidebar */}
      <Col lg={3}>
        <div className="rounded-lg card border-0 shadow-sm mb-4">
            {/* <Card.Title className="h6 fw-bold mb-3">Filters</Card.Title> */}

            {/* Product Dropdown */}
            <div className="mb-3">
              <p className="c_black_3  mb-1 c_medium_text_semi_bold">Products</p>
              <Dropdown onSelect={(eventKey) => setSelectedProduct(eventKey)}>
                <Dropdown.Toggle
                  variant="light"
                  style={{
                    background:"#f4f4f4"
                  }}
                  className="w-100 text-start d-flex align-items-center justify-content-between c_small_text_semi_bold"
                >
                  {selectedProduct}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="w-100"
                  style={{ maxHeight: "50vh", overflowY: "auto" }}
                >
                  {products.map((product) => (
                    <Dropdown.Item
                      key={product}
                      eventKey={product}
                      active={selectedProduct === product}
                    >
                      {product}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Metric Dropdown */}
            <div className="mb-3">
              <p className="c_black_3  mb-1 c_medium_text_semi_bold">Metrics</p>
              <Dropdown onSelect={(eventKey) => setSelectedMetric(eventKey)}>
                <Dropdown.Toggle
                  variant="light"
                  style={{
                    background:"#f4f4f4"
                  }}
                  className="w-100 text-start d-flex align-items-center justify-content-between c_small_text_semi_bold"
                >
                  {/* <FaChartLine className="me-2" />  */}
                  {selectedMetric}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="w-100"
                  style={{ maxHeight: "50vh", overflowY: "auto" }}
                >
                  {metrics.map((metric) => (
                    <Dropdown.Item
                      key={metric}
                      eventKey={metric}
                      active={selectedMetric === metric}
                    >
                      {metric}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
        </div>

        {/* Daily Forecast Cards */}
        <Card
          className="rounded-lg shadow-sm mb-3"
          style={{ backgroundColor: "#f2f7ff", borderColor: "#f2f7ff" }}
        >
          <Card.Body>
            <div className="d-flex d-flex-row">
              <div>
                <h6 className="c_small_text_semi_bold c_gray_3">Daily Forecast</h6>
                <h4 className="c_heading_5 c_black_3 fw-800">
                  {currentData.dailyForecast}
                </h4>
              </div>
              <div style={{ marginLeft: "auto" }}>
                {currentData.dailyForecastIcon}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          className="rounded-lg shadow-sm mb-3"
          style={{ backgroundColor: "#edffed", borderColor: "#edffed" }}
        >
          <Card.Body>
            <div className="d-flex d-flex-row">
              <div>
                <h6 className="c_small_text_semi_bold c_gray_3">Actual So Far</h6>
                <h4 className="c_heading_5 c_black_3 fw-800">{currentData.actualSoFar}</h4>
              </div>
              <div style={{ marginLeft: "auto" }}>
                {currentData.actualSoFarIcon}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          className="rounded-lg shadow-sm mb-3"
          style={{ backgroundColor: "#f5f1ff", borderColor: "#f5f1ff" }}
        >
          <Card.Body>
            <div className="d-flex d-flex-row">
              <div>
                <h6 className="c_small_text_semi_bold c_gray_3">Remaining Target</h6>
                <h4 className="c_heading_5 c_black_3 fw-800">
                  {currentData.remainingTarget}
                </h4>
              </div>
              <div style={{ marginLeft: "auto" }}>
                {currentData.remainingTargetIcon}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Graph and Data */}
      <Col lg={9}>
        <Card className="rounded-lg shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className="h6 c_medium_text_semi_bold mb-0">
                {selectedMetric} Forecast by Hour
              </Card.Title>
            </div>
            <div
              className="position-relative text-center"
              style={{
                width: isMobile ? "98vw" : "100%",
                marginLeft: isMobile ? "-40px" : "0px",
              }}
            >
              {renderGraph()}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default HourlyForecastFilterCard;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Dropdown } from "react-bootstrap";
// import { FaChartLine } from "react-icons/fa";

// function HourlyForecastFilterCard({
//   products,
//   metrics,
//   selectedProduct,
//   selectedMetric,
//   currentData,
//   setSelectedMetric,
//   setSelectedProduct,
//   renderGraph,
// }) {
//   const [isMobile, setIsMobile] = useState("0");

//   useEffect(() => {
//     const updateMinWidth = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);
//   return (
//     <Row>
//       {/* Filters and Cards Sidebar */}
//       <Col lg={3}>
//         <Card className="rounded-lg shadow-sm mb-4">
//           <Card.Body>
//             <Card.Title className="h6 fw-bold mb-3">Filters</Card.Title>
//             <div className="mb-3">
//               <p className="text-secondary mb-1">Products</p>
//               <Dropdown onSelect={(eventKey) => setSelectedProduct(eventKey)}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   className="w-100 text-start d-flex align-items-center justify-content-between"
//                 >
//                   {selectedProduct}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu className="w-100">
//                   {products.map((product) => (
//                     <Dropdown.Item
//                       key={product}
//                       eventKey={product}
//                       active={selectedProduct === product}
//                     >
//                       {product}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//             <div className="mb-3">
//               <p className="text-secondary mb-1">Metrics</p>
//               <Dropdown onSelect={(eventKey) => setSelectedMetric(eventKey)}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   className="w-100 text-start d-flex align-items-center justify-content-between"
//                 >
//                   <FaChartLine className="me-2" /> {selectedMetric}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu className="w-100">
//                   {metrics.map((metric) => (
//                     <Dropdown.Item
//                       key={metric}
//                       eventKey={metric}
//                       active={selectedMetric === metric}
//                     >
//                       {metric}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//           </Card.Body>
//         </Card>

//         {/* Daily Forecast Cards */}
//         <Card
//           className="rounded-lg shadow-sm mb-3"
//           style={{ backgroundColor: "#e9f1ff", borderColor: "#e9f1ff" }}
//         >
//           <Card.Body>
//             <div className="d-flex d-flex-row">
//               <div>
//                 <h6 className="fw-bold mb-1 text-primary">Daily Forecast</h6>
//                 <h4 className="fw-bold text-dark">{currentData.dailyForecast}</h4>
//               </div>
//               <div style={{ marginLeft: "auto" }}>
//                 {currentData.dailyForecastIcon}
//               </div>
//             </div>

//           </Card.Body>
//         </Card>
//         <Card
//           className="rounded-lg shadow-sm mb-3"
//           style={{ backgroundColor: "#dff8e9", borderColor: "#dff8e9" }}
//         >
//           <Card.Body>
//             <div className="d-flex d-flex-row">

//               <div>
//                 <h6 className="fw-bold mb-1 text-success">Actual So Far</h6>
//                 <h4 className="fw-bold text-dark">{currentData.actualSoFar}</h4>
//               </div>
//               <div style={{ marginLeft: "auto" }}>
//                 {currentData.actualSoFarIcon}
//               </div>
//             </div>

//           </Card.Body>
//         </Card>
//         <Card
//           className="rounded-lg shadow-sm mb-3"
//           style={{ backgroundColor: "#ffe9e9", borderColor: "#ffe9e9" }}
//         >
//           <Card.Body>
//             <div className="d-flex d-flex-row">
//               <div>
//                 <h6 className="fw-bold mb-1 text-danger">Remaining Target</h6>
//                 <h4 className="fw-bold text-dark">{currentData.remainingTarget}</h4>
//               </div>
//               <div style={{ marginLeft: "auto" }}>
//                 {currentData.remainingTargetIcon}</div>
//             </div>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Graph and Data */}
//       <Col lg={9}>
//         <Card className="rounded-lg shadow-sm mb-4">
//           <Card.Body>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <Card.Title className="h6 fw-bold mb-0">
//                 {selectedMetric} Forecast by Hour
//               </Card.Title>
//               {/* <div className="d-flex align-items-center">
//                 <div className="me-3">
//                   <span
//                     className="dot"
//                     style={{ backgroundColor: "#007bff" }}
//                   ></span>
//                   <small className="text-secondary ms-1">Forecast</small>
//                 </div>
//                 <div>
//                   <span
//                     className="dot"
//                     style={{ backgroundColor: "#28a745" }}
//                   ></span>
//                   <small className="text-secondary ms-1">Actual</small>
//                 </div>
//               </div> */}
//             </div>
//             <div
//               className="position-relative text-center"
//               style={{ width: isMobile ? "98vw" : '100%', marginLeft: isMobile ? "-40px" : '0px' }}
//             >
//               {renderGraph()}
//             </div>
//           </Card.Body>
//         </Card>

//         {/* Current Hour Card */}
//         {/* <Card className="rounded-lg shadow-sm mb-2">
//           <Card.Body>
//             <p className="mb-0 text-secondary">
//               Current Hour (5 PM) - Forecast:{" "}
//               <span className="text-primary fw-bold">₹1,420</span> | Actual:{" "}
//               <span className="text-success fw-bold">₹1,368</span>
//             </p>
//           </Card.Body>
//         </Card> */}
//       </Col>
//     </Row>
//   );
// }

// export default HourlyForecastFilterCard;
