"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Dropdown,
  FormControl,
  Card,
} from "react-bootstrap";
import { FaArrowLeft, FaCalendarAlt, FaListUl } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, handleCustomChange, handlePreset } from "@/utils";

export default function ItemsSupplierProductsHeader({
  title = "Product Title",
  subtitle = "Category • Quantity",
  price = "",
  tabs,
  setActiveTab,
  activeTab,
  durationFilter,
  setDurationFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rawData = [],
}) {
  const dateFilters = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Custom",
  ];
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateSearch, setDateSearch] = useState("");
  const [tabSearch, setTabSearch] = useState("");

  const stateChanges = {
    setActive: setDurationFilter,
    setStartDate,
    setEndDate,
    setShowCalendar,
  };
  useEffect(()=>{
    handlePreset('Today', stateChanges);
  },[])
  const handleFilterClick = (label) => {
    handlePreset(label, stateChanges);
    setDurationFilter(label);
  };

  const handleDateChange = (dates) => {
    handleCustomChange(dates, stateChanges);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Top Header Section */}
      <div
        className="p-4"
        style={{
          background: "linear-gradient(90deg, #D75D1D 0%, #D94637 100%)",
          // borderBottomLeftRadius: "12px",
          // borderBottomRightRadius: "12px",
          color: "white",
        }}
      >
        <Container fluid>
          <Row className="align-items-center justify-content-between">
            {/* Left: Back + Product Info */}
            <Col>
              <div className="d-flex align-items-center gap-3">
                <FaArrowLeft size={22} color="white" />
                <div>
                  <h5 className="mb-0 fw-bold">{title}</h5>
                  <div style={{ fontSize: "14px", color: "#FBE9E7" }}>
                    {subtitle} 
                    {price && (
                      <span className="text-white">• {price}</span>
                    )}
                  </div>
                </div>
              </div>
            </Col>

            {/* Right: Date Filters (Desktop) */}
            {/* <Col xs="auto" className="d-none d-md-block">
              <div className="d-flex gap-2">
                {dateFilters.map((label) => (
                  <Button
                    key={label}
                    onClick={() => handleFilterClick(label)}
                    style={{
                      backgroundColor:
                        durationFilter === label ? "white" : "transparent",
                      color: durationFilter === label ? "#FF6A00" : "white",
                      fontWeight: durationFilter === label ? "600" : "500",
                      border:
                        durationFilter === label ? "none" : "1px solid white",
                      borderRadius: "20px",
                      padding: "4px 16px",
                    }}
                  >
                    {label}
                    {label === "Custom" ? " ▾" : ""}
                  </Button>
                ))}
              </div>
            </Col> */}
          </Row>

          {/* RawData Cards Inside Header */}
          {rawData.length > 0 && (
            <Row className="mt-4 g-3">
              {rawData.map((item, idx) => (
                <Col xs={12} md={3} key={idx}>
                  <Card
                    className="h-100 shadow-sm"
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Card.Body className="d-flex align-items-center gap-3">
                      {/* Icon on left */}
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "42px",
                          height: "42px",
                          background: "#FFF3E0", // light orange bg for icon circle
                          color: "#FF6A00",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Value + Title stacked on right */}
                      <div>
                        <div className="fw-bold fs-5 text-dark mb-0">
                          {item.value}
                        </div>
                        <div className="text-muted small">{item.label}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Mobile Filters (Dropdown style) */}
          {/* <Row className="d-flex d-md-none mt-3">
            <Col xs={12}>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  variant="light"
                  className="w-100 d-flex justify-content-between align-items-center px-3 py-2 shadow-sm"
                  style={{
                    borderRadius: "12px",
                    background: "#f9fafc",
                    fontWeight: 500,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <FaCalendarAlt style={{ color: "#6c757d" }} />{" "}
                    {durationFilter}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ minWidth: "220px", overflow: "hidden" }}
                  className="shadow-lg rounded-3 border-0 p-0"
                >
                  <div className="p-2 border-bottom">
                    <FormControl
                      size="sm"
                      type="text"
                      placeholder="Search..."
                      value={dateSearch}
                      onChange={(e) => setDateSearch(e.target.value)}
                    />
                  </div>
                  {dateFilters
                    .filter((f) =>
                      f.toLowerCase().includes(dateSearch.toLowerCase())
                    )
                    .map((label, idx) => (
                      <Dropdown.Item
                        key={idx}
                        active={label === durationFilter}
                        onClick={() => handleFilterClick(label)}
                        className="py-2 px-3"
                        style={{
                          fontWeight: label === durationFilter ? "600" : "400",
                          borderBottom:
                            idx !== dateFilters.length - 1
                              ? "1px solid #e9ecef"
                              : "none",
                        }}
                      >
                        {label}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row> */}

          {/* Calendar (only if Custom is chosen) */}
          {/* {showCalendar && (
            <Row className="mt-3 d-flex justify-content-center">
              <Col xs="auto" className="p-0 pt-1 bg-white rounded shadow-sm">
              <DatePicker
                selectsRange
                startDate={startDate ? new Date(startDate) : null}
                endDate={endDate ? new Date(endDate) : null}
                onChange={handleDateChange}
                inline
              />
              </Col>
            </Row>
          )} */}
        </Container>
      </div>

      {/* Tabs Section */}
      {/* <div style={{ background: "#F8F9FA", padding: "12px 24px" }}>
        <Nav
          variant="underline"
          className="justify-content-center gap-4 d-none d-md-flex"
          style={{ fontSize: "15px" }}
        >
          {tabs.map((tab) => (
            <Nav.Item key={tab}>
              <Nav.Link
                active={activeTab === tab}
                onClick={() => handleTabClick(tab)}
                style={{
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? "#FF6A00" : "#6c757d",
                  borderBottom:
                    activeTab === tab ? "2px solid #FF6A00" : "none",
                }}
              >
                {tab}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="d-md-none">
          <Dropdown className="w-100">
            <Dropdown.Toggle
              variant="light"
              className="w-100 d-flex justify-content-between align-items-center px-3 py-2 shadow-sm bg-success text-white"
              style={{
                borderRadius: "12px",
                background: "#f9fafc",
                fontWeight: 500,
                border: "1px solid #e5e7eb",
              }}
            >
              <span className="d-flex align-items-center gap-2">
                <FaListUl style={{ color: "#fff" }} /> {activeTab}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ minWidth: "220px", overflow: "hidden" }}
              className="shadow-lg rounded-3 border-0 p-0"
            >
              <div className="p-2 border-bottom">
                <FormControl
                  size="sm"
                  type="text"
                  placeholder="Search tabs..."
                  value={tabSearch}
                  onChange={(e) => setTabSearch(e.target.value)}
                />
              </div>
              {tabs
                .filter((tab) =>
                  tab.toLowerCase().includes(tabSearch.toLowerCase())
                )
                .map((tab, idx) => (
                  <Dropdown.Item
                    key={idx}
                    active={tab === activeTab}
                    onClick={() => handleTabClick(tab)}
                    className="py-2 px-3"
                    style={{
                      fontWeight: tab === activeTab ? "600" : "400",
                      borderBottom:
                        idx !== tabs.length - 1 ? "1px solid #e9ecef" : "none",
                    }}
                  >
                    {tab}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div> */}
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Nav,
//   Dropdown,
//   FormControl,
// } from "react-bootstrap";
// import { FaArrowLeft, FaCalendarAlt, FaListUl } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { handleCustomChange, handlePreset } from "@/utils";

// export default function ItemsSupplierProductsHeader({
//   title = "Product Title",
//   subtitle = "Category • Quantity",
//   price = "₹0.00",
//   tabs,
//   setActiveTab,
//   activeTab,
//   durationFilter,
//   setDurationFilter,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
// }) {
//   const dateFilters = [
//     "Today",
//     "Yesterday",
//     "This Week",
//     "This Month",
//     "Custom",
//   ];
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [dateSearch, setDateSearch] = useState("");
//   const [tabSearch, setTabSearch] = useState("");

//   const stateChanges = {
//     setActive: setDurationFilter,
//     setStartDate,
//     setEndDate,
//     setShowCalendar,
//   };

//   const handleFilterClick = (label) => {
//     handlePreset(label, stateChanges);
//     setDurationFilter(label);
//   };

//   const handleDateChange = (dates) => {
//     handleCustomChange(dates, stateChanges);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <>
//       {/* Top Header Section */}
//       <div
//         className="p-4"
//         style={{
//           background: "linear-gradient(90deg, #D75D1D 0%, #D94637 100%)",
//           padding: "16px 24px",
//           borderBottomLeftRadius: "12px",
//           borderBottomRightRadius: "12px",
//           color: "white",
//         }}
//       >
//         <Container fluid>
//           <Row className="align-items-center justify-content-between">
//             {/* Left: Back + Product Info */}
//             <Col>
//               <div className="d-flex align-items-center gap-3">
//                 <FaArrowLeft size={22} color="white" />
//                 <div>
//                   <h5 className="mb-0 fw-bold">{title}</h5>
//                   <div style={{ fontSize: "14px", color: "#FBE9E7" }}>
//                     {subtitle} •{" "}
//                     <span className="fw-semibold text-white">{price}</span>
//                   </div>
//                 </div>
//               </div>
//             </Col>

//             {/* Right: Date Filters (Desktop) */}
//             <Col xs="auto" className="d-none d-md-block">
//               <div className="d-flex gap-2">
//                 {dateFilters.map((label) => (
//                   <Button
//                     key={label}
//                     onClick={() => handleFilterClick(label)}
//                     style={{
//                       backgroundColor:
//                         durationFilter === label ? "white" : "transparent",
//                       color: durationFilter === label ? "#FF6A00" : "white",
//                       fontWeight: durationFilter === label ? "600" : "500",
//                       border:
//                         durationFilter === label ? "none" : "1px solid white",
//                       borderRadius: "20px",
//                       padding: "4px 16px",
//                     }}
//                   >
//                     {label}
//                     {label === "Custom" ? " ▾" : ""}
//                   </Button>
//                 ))}
//               </div>
//             </Col>
//           </Row>

//           {/* Mobile Filters (Dropdown style) */}
//           <Row className="d-flex d-md-none mt-3">
//             <Col xs={12}>
//               <Dropdown className="w-100">
//                 <Dropdown.Toggle
//                   variant="light"
//                   className="w-100 d-flex justify-content-between align-items-center px-3 py-2 shadow-sm"
//                   style={{
//                     borderRadius: "12px",
//                     background: "#f9fafc",
//                     fontWeight: 500,
//                     border: "1px solid #e5e7eb",
//                   }}
//                 >
//                   <span className="d-flex align-items-center gap-2">
//                     <FaCalendarAlt style={{ color: "#6c757d" }} />{" "}
//                     {durationFilter}
//                   </span>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu
//                   style={{ minWidth: "220px", overflow: "hidden" }}
//                   className="shadow-lg rounded-3 border-0 p-0"
//                 >
//                   <div className="p-2 border-bottom">
//                     <FormControl
//                       size="sm"
//                       type="text"
//                       placeholder="Search..."
//                       value={dateSearch}
//                       onChange={(e) => setDateSearch(e.target.value)}
//                     />
//                   </div>
//                   {dateFilters
//                     .filter((f) =>
//                       f.toLowerCase().includes(dateSearch.toLowerCase())
//                     )
//                     .map((label, idx) => (
//                       <Dropdown.Item
//                         key={idx}
//                         active={label === durationFilter}
//                         onClick={() => handleFilterClick(label)}
//                         className="py-2 px-3"
//                         style={{
//                           fontWeight: label === durationFilter ? "600" : "400",
//                           borderBottom:
//                             idx !== dateFilters.length - 1
//                               ? "1px solid #e9ecef"
//                               : "none",
//                         }}
//                       >
//                         {label}
//                       </Dropdown.Item>
//                     ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Col>
//           </Row>

//           {/* Calendar (only if Custom is chosen) */}
//           {showCalendar && (
//             <Row className="mt-3 d-flex justify-content-center">
//               <Col xs="auto" className="p-0 pt-1 bg-white rounded shadow-sm">
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={handleDateChange}
//                   inline
//                 />
//               </Col>
//             </Row>
//           )}
//         </Container>
//       </div>

//       {/* Tabs Section */}
//       <div style={{ background: "#F8F9FA", padding: "12px 24px" }}>
//         {/* Desktop Tabs */}
//         <Nav
//           variant="underline"
//           className="justify-content-center gap-4 d-none d-md-flex"
//           style={{ fontSize: "15px" }}
//         >
//           {tabs.map((tab) => (
//             <Nav.Item key={tab}>
//               <Nav.Link
//                 active={activeTab === tab}
//                 onClick={() => handleTabClick(tab)}
//                 style={{
//                   fontWeight: activeTab === tab ? 600 : 500,
//                   color: activeTab === tab ? "#FF6A00" : "#6c757d",
//                   borderBottom:
//                     activeTab === tab ? "2px solid #FF6A00" : "none",
//                 }}
//               >
//                 {tab}
//               </Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>

//         {/* Mobile Tabs (Dropdown style) */}
//         <div className="d-md-none">
//           <Dropdown className="w-100">
//             <Dropdown.Toggle
//               variant="light"
//               className="w-100 d-flex justify-content-between align-items-center px-3 py-2 shadow-sm bg-success text-white"
//               style={{
//                 borderRadius: "12px",
//                 background: "#f9fafc",
//                 fontWeight: 500,
//                 border: "1px solid #e5e7eb",
//               }}
//             >
//               <span className="d-flex align-items-center gap-2">
//                 <FaListUl style={{ color: "#fff" }} /> {activeTab}
//               </span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu
//               style={{ minWidth: "220px", overflow: "hidden" }}
//               className="shadow-lg rounded-3 border-0 p-0"
//             >
//               <div className="p-2 border-bottom">
//                 <FormControl
//                   size="sm"
//                   type="text"
//                   placeholder="Search tabs..."
//                   value={tabSearch}
//                   onChange={(e) => setTabSearch(e.target.value)}
//                 />
//               </div>
//               {tabs
//                 .filter((tab) =>
//                   tab.toLowerCase().includes(tabSearch.toLowerCase())
//                 )
//                 .map((tab, idx) => (
//                   <Dropdown.Item
//                     key={idx}
//                     active={tab === activeTab}
//                     onClick={() => handleTabClick(tab)}
//                     className="py-2 px-3"
//                     style={{
//                       fontWeight: tab === activeTab ? "600" : "400",
//                       borderBottom:
//                         idx !== tabs.length - 1 ? "1px solid #e9ecef" : "none",
//                     }}
//                   >
//                     {tab}
//                   </Dropdown.Item>
//                 ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { Container, Row, Col, Button, Nav } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { handleCustomChange, handlePreset } from "@/utils";

// export default function ItemsSupplierProductsHeader({
//   title = "Product Title",
//   subtitle = "Category • Quantity",
//   price = "₹0.00",
//   tabs,
//   setActiveTab,
//   activeTab,
//   durationFilter,
//   setDurationFilter,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
// }) {
//   // Fixed date filters
//   const dateFilters = [
//     "Today",
//     "Yesterday",
//     "This Week",
//     "This Month",
//     "Custom",
//   ];
//   const [showCalendar, setShowCalendar] = useState(false);

//   const stateChanges = {
//     setActive: setDurationFilter,
//     setStartDate,
//     setEndDate,
//     setShowCalendar,
//   };

//   const handleFilterClick = (label) => {
//     handlePreset(label, stateChanges);
//     setDurationFilter(label);
//   };

//   const handleDateChange = (dates) => {
//     handleCustomChange(dates, stateChanges);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <>
//       {/* Top Header Section */}
//       <div
//       className="p-4"
//         style={{
//           background: "linear-gradient(90deg, #D75D1D 0%, #D94637 100%)",
//           padding: "16px 24px",
//           borderBottomLeftRadius: "12px",
//           borderBottomRightRadius: "12px",
//           color: "white",
//         }}
//       >
//         <Container fluid>
//           <Row className="align-items-center justify-content-between">
//             {/* Left: Back + Product Info */}
//             <Col>
//               <div className="d-flex align-items-center gap-3">
//                 <FaArrowLeft size={22} color="white" />
//                 <div>
//                   <h5 className="mb-0 fw-bold">{title}</h5>
//                   <div style={{ fontSize: "14px", color: "#FBE9E7" }}>
//                     {subtitle} •{" "}
//                     <span className="fw-semibold text-white">{price}</span>
//                   </div>
//                 </div>
//               </div>
//             </Col>

//             {/* Right: Date Filters */}
//             <Col xs="auto">
//               <div className="d-flex gap-2">
//                 {dateFilters.map((label) => (
//                   <Button
//                     key={label}
//                     onClick={() => handleFilterClick(label)}
//                     style={{
//                       backgroundColor:
//                         durationFilter === label ? "white" : "transparent",
//                       color: durationFilter === label ? "#FF6A00" : "white",
//                       fontWeight: durationFilter === label ? "600" : "500",
//                       border:
//                         durationFilter === label ? "none" : "1px solid white",
//                       borderRadius: "20px",
//                       padding: "4px 16px",
//                     }}
//                   >
//                     {label}
//                     {label === "Custom" ? " ▾" : ""}
//                   </Button>
//                 ))}
//               </div>
//             </Col>
//           </Row>

//           {/* Calendar appears only if Custom is chosen */}
//           {showCalendar && (
//             <Row className="mt-3 d-flex justify-content-center">
//               <Col xs="auto" className="p-0 pt-1 bg-white rounded shadow-sm">
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={handleDateChange}
//                   inline
//                 />
//               </Col>
//             </Row>
//           )}
//         </Container>
//       </div>

//       {/* Tabs Section (separate from red background) */}
//       <div
//         style={{
//           background: "#F8F9FA",
//           padding: "12px 24px",
//         }}
//       >
//         <Nav
//           variant="underline"
//           className="justify-content-center gap-4"
//           style={{ fontSize: "15px" }}
//         >
//           {tabs.map((tab) => (
//             <Nav.Item key={tab}>
//               <Nav.Link
//                 active={activeTab === tab}
//                 onClick={() => handleTabClick(tab)}
//                 style={{
//                   fontWeight: activeTab === tab ? 600 : 500,
//                   color: activeTab === tab ? "#FF6A00" : "#6c757d",
//                   borderBottom:
//                     activeTab === tab ? "2px solid #FF6A00" : "none",
//                 }}
//               >
//                 {tab}
//               </Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>
//       </div>
//     </>
//   );
// }
