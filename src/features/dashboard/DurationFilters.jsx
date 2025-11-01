"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, handleCustomChange, handlePreset } from "@/utils";
import { presetOptions } from "@/constants";
import "./css/datefilter.module.css";
import { IconCaretDown } from "@tabler/icons-react";

export default function DurationFilters({ useAppContext }) {
  const { startDate, endDate, setStartDate, setEndDate } = useAppContext;
  const [active, setActive] = useState("today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const [dropdownContainer, setDropdownContainer] = useState(null);
  const [calendarContainer, setCalendarContainer] = useState(null);

  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

      useEffect(() => {
        if (!startDate || !endDate) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const start = new Date(startDate);
        const end = new Date(endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const isSameDay = (d1, d2) =>
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        // Monday as start of week
        const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
        const diff = day === 0 ? -6 : 1 - day;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + diff);

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        if (isSameDay(start, today) && isSameDay(end, today)) {
            setActive("today");
        } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
            setActive("yesterday");
        } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
            setActive("thisweek");
        } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
            setActive("thismonth");
        } else {
            setActive("custom");
        }
    }, [startDate, endDate]);


  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setDropdownContainer(el);
    const cal = document.createElement("div");
    document.body.appendChild(cal);
    setCalendarContainer(cal);
    return () => {
      document.body.removeChild(el);
      document.body.removeChild(cal);
    };
  }, []);

  // Helper for smart position to prevent overflow
  function getCalendarPosition(rect) {
    const calendarWidth = 600; // match .custom-range-container-popup min-width
    const windowWidth = window.innerWidth;
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;

    if (left + calendarWidth > windowWidth - 20) {
      left = windowWidth - calendarWidth - 20;
      if (left < 12) left = 12;
    }
    return { top, left };
  }

  
const handleApplyClick = () => {
  if (typeof handleApply === "function") {
    handleApply({ startDate: tempStart, endDate: tempEnd });
  }
  setStartDate(formatDate(tempStart));
  setEndDate(formatDate(tempEnd));
  setShowCalendar(false);
};

  const handleSelect = (key) => {
    handlePreset(key, { setActive, setShowCalendar, setStartDate, setEndDate });
    if (key === "custom") {
      setActive("custom");
      setShowCalendar(true);
      setShowDropdown(false);
    } else {
      setShowCalendar(false);
      setShowDropdown(false);
    }
  };

  const renderDropdown = () => {
    if (!showDropdown || !dropdownContainer || !containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    return createPortal(
      // <div
      //   className="date-dropdown-menu"
      //   style={{
      //     position: "absolute",
      //     top: rect.bottom + window.scrollY + 4,
      //     left: rect.left + window.scrollX,
      //     width: rect.width,
      //     zIndex: 10000,
      //   }}
      // >
      //   {presetOptions.map(({ key, label }) => (
      //     <div
      //       key={key}
      //       className={`date-dropdown-item ${active === key ? "active" : ""}`}
      //       onClick={() => handleSelect(key)}
      //     >
      //       {label}
      //     </div>
      //   ))}
      // </div>,
      <div
  className="date-dropdown-menu"
  style={{
    position: "absolute",
    top: rect.bottom + window.scrollY + 4,
    left: rect.left + window.scrollX,
    width: rect.width,
    zIndex: 10000,
  }}
>
  {presetOptions.map(({ key, label }) => (
    <div
      key={key}
      className={`date-dropdown-item ${active === key ? "active" : ""}`}
      onClick={() => handleSelect(key)}
      style={{
        border:'1px solid #ddd',
        padding:'8px 12px',
        cursor:'pointer',
        backgroundColor: active === key ? '#f0f0f0' : '#fff',
      }}
    >
      {label} 
    </div>
  ))}
</div>,
      dropdownContainer
    );
  };

  const renderCalendar = () => {
    if (
      !(active === "custom" && showCalendar) ||
      !calendarContainer ||
      !containerRef.current
    )
      return null;

    const rect = containerRef.current.getBoundingClientRect();
    const { top, left } = getCalendarPosition(rect);
    return createPortal(
  <div
    className="custom-range-container-popup card"
    style={{
      position: "absolute",
      top,
      left,
      zIndex: 10000,
    }}
  >
    <div className="custom-calendar-wrapper side-by-side">
      <DatePicker
        selectsRange
        startDate={tempStart ? new Date(tempStart) : null}
        endDate={tempEnd ? new Date(tempEnd) : null}
        onChange={(dates) => {
          const [start, end] = dates;
          setTempStart(start);
          setTempEnd(end);
        }}
        inline
        monthsShown={2}
        calendarClassName="side-by-side-datepicker"
      />
    </div>

    <div className="custom-range-footer side-by-side">
      <div className="date-range-display">
        <span className="start-date">
          {tempStart
            ? new Date(tempStart).toLocaleDateString("en-GB")
            : "Start Date"}
        </span>
        <span className="separator"> - </span>
        <span className="end-date">
          {tempEnd
            ? new Date(tempEnd).toLocaleDateString("en-GB")
            : "End Date"}
        </span>
      </div>
          <div className="action-buttons">
        <Button
          variant="outline-secondary"
          className="cancel-btn"
          onClick={() => setShowCalendar(false)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="apply-btn"
          onClick={handleApplyClick}
        >
          Apply
        </Button>
      </div>
    </div>
  </div>,
  calendarContainer
);

    return createPortal(
      <div
        className="custom-range-container-popup"
        style={{
          position: "absolute",
          top,
          left,
          zIndex: 10000,
        }}
      >
        <div className="custom-calendar-wrapper side-by-side">
          <DatePicker
            selectsRange
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            onChange={(dates) => handleCustomChange(dates, {
              setActive, setShowCalendar, setStartDate, setEndDate
            })}
            inline
            monthsShown={2}
            calendarClassName="side-by-side-datepicker"
          />
        </div>
        <div className="custom-range-footer side-by-side">
          <div className="date-range-display">
            <span className="start-date">
              {startDate
                ? new Date(startDate).toLocaleDateString("en-GB")
                : "Start Date"}
            </span>
            <span className="separator"> - </span>
            <span className="end-date">
              {endDate
                ? new Date(endDate).toLocaleDateString("en-GB")
                : "End Date"}
            </span>
          </div>
          <div className="action-buttons">
            <Button
              variant="outline-secondary"
              className="cancel-btn"
              onClick={() => setShowCalendar(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="apply-btn"
              onClick={() => setShowCalendar(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>,
      calendarContainer
    );
  };

  return (
    <Container fluid ref={containerRef}>
      <div className="date-filter-wrapper" style={{padding:'5px 10px',borderRadius:'10px',border:'1px solid #ddd'}}>
        <div
          // variant="outline-light"
          // className="date-dropdown-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {presetOptions.find((o) => o.key === active)?.label || "Select Date"} <span style={{marginLeft:'20px'}}><IconCaretDown size={16} /></span> 
        </div>
        {renderDropdown()}
        {renderCalendar()}
      </div>
    </Container>
  );
}
// "use client";
// import { useState, useEffect, useRef } from "react";
// import {
//   ButtonGroup,
//   Button,
//   Container,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { FaFilter } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { handleCustomChange, handlePreset } from "@/utils";
// import { presetOptions } from "@/constants";
// import "./css/datefilter.module.css";
// import { usePathname } from "next/navigation";

// export default function DurationFilters({useAppContext}) {
//   // const { startDate, endDate, setStartDate, setEndDate } =
//   //   useDashboardContext();
//   const { startDate, endDate, setStartDate, setEndDate } =
//     useAppContext;
//   const [active, setActive] = useState("today");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [isCompact, setIsCompact] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const location = usePathname()
//   const isEndDF = ['/products','/departments','/items','/dashboard','/suppliers'].includes(location)

//   const containerRef = useRef(null);

//   const stateChanges = {
//     setActive,
//     setShowCalendar,
//     setStartDate,
//     setEndDate,
//     setShowModal,
//   };

//   // useEffect(() => {
//   //   handlePreset("today", stateChanges);
//   // }, []);
//   useEffect(() => {
//     if (!startDate || !endDate) return;
  
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
  
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
  
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     start.setHours(0, 0, 0, 0);
//     end.setHours(0, 0, 0, 0);
  
//     const isSameDay = (d1, d2) =>
//       d1.getFullYear() === d2.getFullYear() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getDate() === d2.getDate();
  
//     // Monday as start of week
//     const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
//     const diff = day === 0 ? -6 : 1 - day;
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() + diff);
  
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
//     if (isSameDay(start, today) && isSameDay(end, today)) {
//       setActive("today");
//     } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
//       setActive("yesterday");
//     } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
//       setActive("thisweek");
//     } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
//       setActive("thismonth");
//     } else {
//       setActive("custom");
//     }
//   }, [startDate, endDate]);
  

//   // Auto-switch between button group and modal based on width
//   useEffect(() => {
//     const checkWidth = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const requiredWidth = presetOptions.length * 110;
//         setIsCompact(containerWidth < requiredWidth);
//       }
//     };

//     checkWidth();
//     window.addEventListener("resize", checkWidth);
//     return () => window.removeEventListener("resize", checkWidth);
//   }, []);

//   const handleSelect = (key) => {
//     handlePreset(key, stateChanges);

//     // ✅ If "custom", keep modal open for date picking
//     if (key === "custom") {
//       setActive("custom");
//     } else {
//       setShowModal(false); // close for other options
//     }
//   };

//   return (
//     <Container fluid ref={containerRef}>
//       <div className="p-0">
//         {isCompact || isEndDF ? (
//           <>
//             <Button
//               variant="outline-primary"
//               className="d-flex justify-content-between align-items-center w-100"
//               onClick={() => setShowModal(true)}
//             >
//               <FaFilter className="me-2" />
//               {presetOptions.find((o) => o.key === active)?.label}
//             </Button>

//             {/* ✅ Bottom Modal for mobile */}
//             <Modal
//               show={showModal}
//               onHide={() => setShowModal(false)}
//               dialogClassName="bottom-modal"
//               contentClassName="bottom-modal-content"
//               backdropClassName="bottom-backdrop"
//             >
//               <Modal.Body className="text-center">
//                 <Form>
//                   {presetOptions.map(({ key, label }) => (
//                     <Form.Check
//                       key={key}
//                       type="radio"
//                       name="presetFilter"
//                       id={`radio-${key}`}
//                       label={label}
//                       checked={active === key}
//                       onChange={() => handleSelect(key)}
//                       className={`mb-2 ${
//                         active === key ? "text-orange fw-bold" : "text-dark"
//                       }`}
//                     />
//                   ))}
//                 </Form>

//                 {/* ✅ Show DatePicker only for "custom" */}
//                 {active === "custom" && (
//                   <div className="mt-3">
//                     <DatePicker
//                       selectsRange
//                       startDate={startDate ? new Date(startDate) : null}
//                       endDate={endDate ? new Date(endDate) : null}
//                       onChange={(dates) => {
//                         handleCustomChange(dates, stateChanges);
//                         if (dates) {
//                           const [start, end] = dates;
//                           if (start && end) setShowModal(false);
//                         }
//                       }}
//                       inline
//                     />
//                     <div className="d-flex justify-content-end mt-2">
//                       {/* <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => setShowModal(false)}
//                       >
//                         Apply
//                       </Button> */}
//                     </div>
//                   </div>
//                 )}
//               </Modal.Body>
//             </Modal>
//           </>
//         ) : (
//           // ✅ Full view (desktop button group)
//           <div className="d-none d-md-flex">
//             <ButtonGroup
//               className="gap-2 flex-wrap"
//               style={{
//                 display: "flex",
//                 gap: "12px",
//                 flexWrap: "wrap",
//                 alignItems: "center",
//               }}
//             >
//               {presetOptions.map(({ key, label }) => {
//                 const isActive = active === key;
//                 return (
//                   <Button
//                     key={key}
//                     onClick={() => handleSelect(key)}
//                     size="sm"
//                     style={{
//                       borderRadius: "40px",
//                       padding: "8px 20px",
//                       fontSize: "15px",
//                       fontWeight: isActive ? 600 : 500,
//                       border: isActive
//                         ? "1.8px solid #FF6600" // bright orange border
//                         : "1.5px solid #E0E0E0", // light gray border
//                       color: isActive ? "#FF6600" : "#4F4F4F", // orange active, gray inactive
//                       backgroundColor: isActive ? "#FFF6F0" : "#FFFFFF", // light orange background when active
//                       transition: "all 0.2s ease-in-out",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = isActive
//                         ? "#FFF3EB"
//                         : "#F8F8F8"; // subtle hover
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = isActive
//                         ? "#FFF6F0"
//                         : "#FFFFFF";
//                     }}
//                   >
//                     {label}
//                   </Button>
//                 );
//               })}

//               {active === "custom" && showCalendar && (
//                 <div
//                   className="mt-3"
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <DatePicker
//                     selectsRange
//                     startDate={startDate ? new Date(startDate) : null}
//                     endDate={endDate ? new Date(endDate) : null}
//                     onChange={(dates) => {
//                       handleCustomChange(dates, stateChanges);
//                       if (dates) {
//                         const [start, end] = dates;
//                         if (start && end) setShowCalendar(false);
//                       }
//                     }}
//                     inline
//                   />
//                 </div>
//               )}
//             </ButtonGroup>
//             </div>
//         )}
//       </div>
//     </Container>
//   );
// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import {
//   ButtonGroup,
//   Button,
//   Row,
//   Col,
//   Dropdown,
//   Container,
// } from "react-bootstrap";
// import { FaFilter } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { handleCustomChange, handlePreset } from "@/utils";
// import { presetOptions } from "@/constants";

// export default function DateFilter() {
//   const { startDate, endDate, setStartDate, setEndDate } =
//     useDashboardContext();
//   const [active, setActive] = useState("today");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [isCompact, setIsCompact] = useState(false);

//   const containerRef = useRef(null);

//   const stateChanges = {
//     setActive,
//     setShowCalendar,
//     setStartDate,
//     setEndDate,
//   };

//   useEffect(() => {
//     handlePreset("today", stateChanges);
//   }, []);

//   // 🔹 Auto-switch between button group and dropdown based on width
//   useEffect(() => {
//     const checkWidth = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const requiredWidth = presetOptions.length * 110; // ~110px per button
//         setIsCompact(containerWidth < requiredWidth);
//       }
//     };

//     checkWidth();
//     window.addEventListener("resize", checkWidth);
//     return () => window.removeEventListener("resize", checkWidth);
//   }, []);

//   return (
//     <Container fluid ref={containerRef}>
//       <div className="p-0">
//         {isCompact ? (
//           // ✅ Compact view (mobile-like dropdown)
//           <Dropdown>
//             <Dropdown.Toggle
//               variant="outline-primary"
//               id="dropdown-basic"
//               className="d-flex justify-content-between align-items-center w-100"
//             >
//               <span className="d-flex align-items-center">
//                 <FaFilter className="me-2" />
//                 {presetOptions.find((o) => o.key === active)?.label}
//               </span>
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="w-100">
//               {presetOptions.map(({ key, label }) => (
//                 <Dropdown.Item
//                   key={key}
//                   active={active === key}
//                   onClick={() => handlePreset(key, stateChanges)}
//                 >
//                   {label}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         ) : (
//           // ✅ Full view (button group)
//           <ButtonGroup className="gap-2 flex-wrap">
//             {presetOptions.map(({ key, label }) => (
//               <Button
//                 key={key}
//                 variant={active === key ? "success" : "outline-primary"}
//                 className="border px-3"
//                 onClick={() => handlePreset(key, stateChanges)}
//                 size="sm"
//               >
//                 {label}
//               </Button>
//             ))}
//           </ButtonGroup>
//         )}
//       </div>

//       {showCalendar && (
//         <Row className="mt-3 d-flex justify-content-center">
//           <Col xs="auto" className="p-0 pt-1 bg-primary">
//             <DatePicker
//               selectsRange
//               startDate={startDate ? new Date(startDate) : null}
//               endDate={endDate ? new Date(endDate) : null}
//               onChange={(dates) => handleCustomChange(dates, stateChanges)}
//               inline
//             />
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";
// import {
//   ButtonGroup,
//   Button,
//   Row,
//   Col,
//   Dropdown,
//   Container,
// } from "react-bootstrap";
// import { FaFilter } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { handleCustomChange, handlePreset } from "@/utils";
// import { presetOptions } from "@/constants";

// export default function DateFilter() {
//   const { startDate, endDate, setStartDate, setEndDate } =
//     useDashboardContext();
//   const [active, setActive] = useState("today");
//   const [showCalendar, setShowCalendar] = useState(false);

//   const containerStyle = {
//     position: "relative",
//     position: "fixed-top",
//   };

//   const buttonStyle = {
//     borderRadius: "8px",
//   };

//   const dropdownToggleStyle = {
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   };

//   const dropdownMenuStyle = {
//     width: "100%",
//   };

//   const stateChanges = {
//     setActive,
//     setShowCalendar,
//     setStartDate,
//     setEndDate,
//   };

//   useEffect(() => {
//     handlePreset("today",stateChanges);
//   }, []);

//   return (
//     <Container fluid style={containerStyle}>
//       {/* Desktop view */}
//       <div className="d-none d-md-block p-3">
//         <ButtonGroup className="gap-2 flex-wrap">
//           {presetOptions.map(({ key, label }) => (
//             <Button
//               key={key}
//               variant={active === key ? "success" : "outline-primary"}
//               className="border px-3"
//               onClick={() => handlePreset(key,stateChanges)}
//               style={buttonStyle}
//               size="sm"
//             >
//               {label}
//             </Button>
//           ))}
//         </ButtonGroup>
//       </div>

//       {/* Mobile view */}
//       <div className="d-md-none p-2">
//         <Dropdown>
//           <Dropdown.Toggle
//             variant="outline-primary"
//             id="dropdown-basic"
//             style={dropdownToggleStyle}
//             className="d-flex justify-content-between align-items-center"
//           >
//             <span style={{ display: "inline-flex", alignItems: "center" }}>
//               <FaFilter style={{ marginRight: "10px" }} />
//               {presetOptions.find((o) => o.key === active)?.label}
//             </span>
//           </Dropdown.Toggle>

//           <Dropdown.Menu style={dropdownMenuStyle}>
//             {presetOptions.map(({ key, label }) => (
//               <Dropdown.Item
//                 key={key}
//                 active={active === key}
//                 onClick={() => handlePreset(key,stateChanges)}
//               >
//                 {label}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {showCalendar && (
//         <Row className="mt-3 d-flex justify-content-center">
//           <Col xs="auto" className="p-0 pt-1 bg-primary">
//             <DatePicker
//               selectsRange
//               startDate={startDate ? new Date(startDate) : null}
//               endDate={endDate ? new Date(endDate) : null}
//               onChange={(dates)=>handleCustomChange(dates,stateChanges)}
//               inline
//             />
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }
