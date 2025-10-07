"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { departmentHealthDataFormatter } from "@/utils/data_formatters/departmentPage";
import { useDepartmentHealth } from "@/services/department-service";
import { IconChartHistogram } from "@tabler/icons-react";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function DepartmentHealth() {
  const { startDate, endDate } = useDepartmentContext();
  const [startDateWC, setStartDateWC] = useState(startDate);
  const [endDateWC, setEndDateWC] = useState(endDate);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("default", { month: "long" })
    );
  }, []);

  const handleMonthChange = (monthIndex) => {
    setSelectedMonth(monthIndex);
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year, monthIndex, 1);
    const end = monthIndex === now.getMonth() ? now : new Date(year, monthIndex + 1, 0);
    setStartDateWC(formatDate(start));
    setEndDateWC(formatDate(end));
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <ComponentHeader
          title="Department Health"
          description="Real-time consumption metrics and performance indicators"
          titleColor="#000"
                  titleIcon={<div style={{
          background: '#FF6254',
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconChartHistogram stroke={2} color="#fff" size={24} />
        </div>}
          onPrev={() => scroll("left")}
          onNext={() => scroll("right")}
        />
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="rounded-pill px-3"
            style={{
              border: "1px solid #ddd",
              fontWeight: 500,
            }}
          >
            {months[selectedMonth]}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {months.map((month, i) => (
              <Dropdown.Item key={month} onClick={() => handleMonthChange(i)}>
                {month}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ServiceRenderer
        queryHook={useDepartmentHealth}
        queryKey={["departmentHealth", 2, { startdt: startDateWC, enddt: endDateWC }]}
        queryArgs={[
          2,
          {
            startdt: startDateWC,
            enddt: endDateWC,
            outlet: 1,
            userId: 7,
          },
        ]}
        formatter={departmentHealthDataFormatter}
        shimmerCount={3}
      >
        {(cards) => (
          <div
            ref={scrollRef}
            className="d-flex overflow-auto"
            style={{
              scrollSnapType: isMobile ? "x mandatory" : "none",
              gap: 16,
              paddingBottom: 8,
            }}
          >
            {cards.map((card, idx) => (
              <Card
                key={idx}
                className="flex-shrink-0"
                style={{
                  width: isMobile ? "90vw" : "18vw",
                  borderRadius: 16,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: "1px solid #eee",
                  padding: 16,
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Title with small arrow */}
                <div
                  className="d-flex justify-content-between align-items-center mb-2"
                  style={{ fontSize: "0.9rem", fontWeight: "600", color: card.color }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="pe-1">{card.title}</span>
                    <FaArrowTrendUp />
                  </div>
                </div>

                {/* Percentage inside a colored circle */}
                <div
                  className="d-flex justify-content-center align-items-center mb-3"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    border: `2px solid ${card.color}`,
                    backgroundColor: `${card.color}22`, // 22 hex ~ 13% opacity
                    color: card.color,
                    fontWeight: "700",
                    // fontSize: "1.5rem",
                  }}
                >
                  {card.percentage}
                </div>

                {/* Sale */}
                <div className="d-flex justify-content-between mb-1">
                  <span style={{ color: card.color, fontWeight: "600" }}>Sale</span>
                  <span style={{ color: card.color, fontWeight: "600" }}>{card.sale}</span>
                </div>

                {/* Consumption */}
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: "#000",}}>Consumption</span>
                  <span style={{ fontWeight: "700" }}>{card.consumption}</span>
                </div>

                {/* Net Consumption */}
                <div
                  className="text-center"
                  style={{ fontSize: "0.85rem", color: "#999" }}
                >
                  Net Consumption: {card.netConsumption}
                </div>
              </Card>
            ))}
          </div>
        )}
      </ServiceRenderer>
    </Container>
  );
}
// "use client";

// import React, { useState, useMemo, useEffect, useRef } from "react";
// import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";
// import { FaChartLine } from "react-icons/fa";
// import { departmentHealthDataFormatter } from "@/utils/data_formatters/departmentPage";
// import { useDepartmentHealth } from "@/services/department-service";

// export default function DepartmentHealth() {
//   const { startDate, endDate  } = useDepartmentContext();
//   const [startDateWC, setStartDateWC] = useState(startDate)
//   const [endDateWC, setEndDateWC] = useState(endDate);

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [isMobile, setIsMobile] = useState(false);
//   const scrollRef = useRef();

//   // Detect mobile/desktop
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Generate months for dropdown
//   const months = useMemo(() => {
//     return Array.from({ length: 12 }, (_, i) =>
//       new Date(0, i).toLocaleString("default", { month: "long" })
//     );
//   }, []);

//   // Handle month change
//   const handleMonthChange = (monthIndex) => {
//     setSelectedMonth(monthIndex);
//     const now = new Date();
//     const year = now.getFullYear();
//     const start = new Date(year, monthIndex, 1);
//     const end =
//       monthIndex === now.getMonth() ? now : new Date(year, monthIndex + 1, 0);
//     setStartDateWC(formatDate( start));
//     setEndDateWC(formatDate(end));
//   };

//   // Scroll Left/Right for Desktop
//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const scrollAmount = direction === "left" ? -300 : 300;
//     scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   };

//   return (
//     <Container fluid>
//       {/* Header with < > buttons */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <ComponentHeader
//           title="Department Health"
//           description="Real-time consumption metrics and performance indicators"
//           titleColor="#000"
//           titleIcon={<FaChartLine size={28} color="#FF5C00" />}
//           onPrev={() => scroll("left")}
//           onNext={() => scroll("right")}
//         />
//         <Dropdown>
//           <Dropdown.Toggle
//             variant="light"
//             className="rounded-pill px-3"
//             style={{
//               border: "1px solid #ddd",
//               fontWeight: "500",
//             }}
//           >
//             {months[selectedMonth]}
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {months.map((month, i) => (
//               <Dropdown.Item key={month} onClick={() => handleMonthChange(i)}>
//                 {month}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <ServiceRenderer
//         queryHook={useDepartmentHealth}
//         queryKey={[
//           "departmentHealth",
//           2,
//           { startdt: startDateWC, enddt: endDateWC },
//         ]}
//         queryArgs={[
//           2,
//           {
//             startdt: startDateWC,
//             enddt: endDateWC,
//             outlet: 1,
//             userId: 7,
//           },
//         ]}
//         formatter={departmentHealthDataFormatter}
//         shimmerCount={3}
//       >
//         {(cards) => (
//           <div
//             ref={scrollRef}
//             className="d-flex overflow-auto"
//             style={{
//               scrollSnapType: isMobile ? "x mandatory" : "none",
//               gap: "16px",
//               paddingBottom: "8px",
//             }}
//           >
//             {cards.map((card, idx) => (
//               <Card
//                 key={idx}
//                 className="flex-shrink-0"
//                 style={{
//                   width: isMobile ? "90vw" : "18vw",
//                   borderRadius: "16px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                   border: "1px solid #eee",
//                   padding: "16px",
//                   scrollSnapAlign: "start",
//                 }}
//               >
//                 {/* Title + Icon */}
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h6
//                     className="mb-0 fw-bold"
//                     style={{ color: card.color, fontSize: "0.9rem" }}
//                   >
//                     {card.title}
//                   </h6>
//                   {card.icon}
//                 </div>

//                 {/* Percentage */}
//                 <div
//                   className="mb-2"
//                   style={{
//                     fontSize: "1.5rem",
//                     fontWeight: "700",
//                     color: card.color,
//                   }}
//                 >
//                   {card.percentage}
//                 </div>

//                 {/* Sale */}
//                 <div className="d-flex justify-content-between">
//                   <span className="text-muted">Sale</span>
//                   <span style={{ color: card.color, fontWeight: 600 }}>
//                     {card.sale}
//                   </span>
//                 </div>

//                 {/* Consumption */}
//                 <div className="d-flex justify-content-between">
//                   <span className="text-muted">Consumption</span>
//                   <span className="fw-bold">{card.consumption}</span>
//                 </div>

//                 {/* Net Consumption */}
//                 <div
//                   className="mt-2 text-center text-muted"
//                   style={{ fontSize: "0.85rem" }}
//                 >
//                   Net Consumption: {card.netConsumption}
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </ServiceRenderer>
//     </Container>
//   );
// }
