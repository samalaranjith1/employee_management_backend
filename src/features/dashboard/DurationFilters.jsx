"use client";
import { useState, useEffect, useRef } from "react";
import {
  ButtonGroup,
  Button,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { handleCustomChange, handlePreset } from "@/utils";
import { presetOptions } from "@/constants";
import "./css/datefilter.module.css";

export default function DurationFilters({useAppContext}) {
  // const { startDate, endDate, setStartDate, setEndDate } =
  //   useDashboardContext();
  const { startDate, endDate, setStartDate, setEndDate } =
    useAppContext;
  const [active, setActive] = useState("today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef(null);

  const stateChanges = {
    setActive,
    setShowCalendar,
    setStartDate,
    setEndDate,
  };

  useEffect(() => {
    handlePreset("today", stateChanges);
  }, []);

  // Auto-switch between button group and modal based on width
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const requiredWidth = presetOptions.length * 110;
        setIsCompact(containerWidth < requiredWidth);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleSelect = (key) => {
    handlePreset(key, stateChanges);

    // ✅ If "custom", keep modal open for date picking
    if (key === "custom") {
      setActive("custom");
    } else {
      setShowModal(false); // close for other options
    }
  };

  return (
    <Container fluid ref={containerRef}>
      <div className="p-0">
        {isCompact ? (
          <>
            <Button
              variant="outline-primary"
              className="d-flex justify-content-between align-items-center w-100"
              onClick={() => setShowModal(true)}
            >
              <FaFilter className="me-2" />
              {presetOptions.find((o) => o.key === active)?.label}
            </Button>

            {/* ✅ Bottom Modal for mobile */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              dialogClassName="bottom-modal"
              contentClassName="bottom-modal-content"
              backdropClassName="bottom-backdrop"
            >
              <Modal.Body className="text-center">
                <Form>
                  {presetOptions.map(({ key, label }) => (
                    <Form.Check
                      key={key}
                      type="radio"
                      name="presetFilter"
                      id={`radio-${key}`}
                      label={label}
                      checked={active === key}
                      onChange={() => handleSelect(key)}
                      className={`mb-2 ${
                        active === key ? "text-orange fw-bold" : "text-dark"
                      }`}
                    />
                  ))}
                </Form>

                {/* ✅ Show DatePicker only for "custom" */}
                {active === "custom" && (
                  <div className="mt-3">
                    <DatePicker
                      selectsRange
                      startDate={startDate ? new Date(startDate) : null}
                      endDate={endDate ? new Date(endDate) : null}
                      onChange={(dates) => {
                        handleCustomChange(dates, stateChanges)
                        if (dates){
                          const [start,end] =dates;
                          if (start && end) setShowModal(false)
                        }
                      }
                      }
                      inline
                    />
                    <div className="d-flex justify-content-end mt-2">
                      {/* <Button
                        variant="success"
                        size="sm"
                        onClick={() => setShowModal(false)}
                      >
                        Apply
                      </Button> */}
                    </div>
                  </div>
                )}
              </Modal.Body>
            </Modal>
          </>
        ) : (
          // ✅ Full view (desktop button group)
          <ButtonGroup className="gap-2 flex-wrap">
            {presetOptions.map(({ key, label }) => (
              <Button
                key={key}
                variant={active === key ? "success" : "outline-primary"}
                className="border px-3"
                onClick={() => handlePreset(key, stateChanges)}
                size="sm"
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </div>
    </Container>
  );
}


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
