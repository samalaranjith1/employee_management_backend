"use client";
import { useState, useEffect } from "react";
import {
  ButtonGroup,
  Button,
  Dropdown,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { FaCalendarAlt, FaListUl } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handlePreset, handleCustomChange } from "@/utils";

export const presetOptions = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "this_week", label: "This Week" },
  { key: "this_month", label: "This Month" },
  { key: "custom", label: "Custom" },
];

function DepartmentFilters({
  durationFilter,
  setDurationFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  navTabs,
  activeKey,
  setActiveKey,
}) {
  const [navSearch, setNavSearch] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateSearch, setDateSearch] = useState("");

  const filteredNavTabs = navTabs.filter((tab) =>
    tab.toLowerCase().includes(navSearch.toLowerCase())
  );

  const stateChanges = {
    setActive: setDurationFilter,
    setStartDate,
    setEndDate,
    setShowCalendar,
  };

  const handlePresetClick = (key) => {
    handlePreset(key, stateChanges);
  };

  useEffect(() => {
    handlePresetClick("today"); // default selection
  }, []);

  const handleDateChange = (dates) => {
    handleCustomChange(dates, stateChanges);
  };

  const handleNavSelect = (tab) => {
    setActiveKey(tab);
    setNavSearch("");
  };

  return (
    <>
      {/* Mobile view */}
      <div
        className="d-flex d-md-none justify-content-between align-items-center my-4 gap-2 p-3 shadow-sm"
        style={{ background: "#ffffff", borderRadius: "12px" }}
      >
        <Dropdown className="flex-fill">
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
              <FaListUl style={{ color: "#6c757d" }} />{" "}
              {activeKey.replace("-", " ")}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ minWidth: "220px", maxHeight: "250px", overflowY: "auto" }}
            className="shadow-lg rounded-3 border-0 p-0"
          >
            <div className="p-2 border-bottom sticky-top bg-white">
              <FormControl
                size="sm"
                type="text"
                placeholder="Search..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
              />
            </div>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filteredNavTabs.length > 0 ? (
                filteredNavTabs.map((tab, idx) => (
                  <Dropdown.Item
                    key={idx}
                    active={tab === activeKey}
                    onClick={() => handleNavSelect(tab)}
                    className="py-2 px-3"
                    style={{
                      fontWeight: tab === activeKey ? "600" : "400",
                      borderBottom:
                        idx !== filteredNavTabs.length - 1
                          ? "1px solid #e9ecef"
                          : "none",
                    }}
                  >
                    {tab}
                  </Dropdown.Item>
                ))
              ) : (
                <div className="text-muted text-center py-2">No results</div>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="flex-fill">
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
              {presetOptions.find((p) => p.key === durationFilter)?.label}
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
            {presetOptions
              .filter((p) =>
                p.label.toLowerCase().includes(dateSearch.toLowerCase())
              )
              .map((option, idx) => (
                <Dropdown.Item
                  key={idx}
                  active={option.key === durationFilter}
                  onClick={() => handlePresetClick(option.key)}
                  className="py-2 px-3"
                  style={{
                    fontWeight: option.key === durationFilter ? "600" : "400",
                    borderBottom:
                      idx !== presetOptions.length - 1
                        ? "1px solid #e9ecef"
                        : "none",
                  }}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Desktop view */}
      <div className="d-none d-md-block my-4">
        <div className="mb-3 w-100 d-flex justify-content-center">
          <ButtonGroup className="flex-wrap">
            {presetOptions.map((option) => (
              <Button
                key={option.key}
                variant={
                  option.key === durationFilter ? "outline-success" : "light"
                }
                style={{
                  marginRight: "6px",
                  borderRadius: "25px",
                  padding: "8px 16px",
                  fontWeight: option.key === durationFilter ? 600 : 500,
                }}
                onClick={() => handlePresetClick(option.key)}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        {showCalendar && (
          <Row className="mt-3 d-flex justify-content-center">
            <Col xs="auto" className="p-0 pt-1 bg-primary">
              <DatePicker
                selectsRange
                startDate={startDate ? new Date(startDate) : null}
                endDate={endDate ? new Date(endDate) : null}
                onChange={handleDateChange}
                inline
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default DepartmentFilters;
// "use client";
// import { useState, useEffect } from "react";
// import {
//   ButtonGroup,
//   Button,
//   Dropdown,
//   FormControl,
//   Row,
//   Col,
//   Container,
// } from "react-bootstrap";
// import { FaCalendarAlt, FaListUl, FaFilter } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { handlePreset, handleCustomChange } from "@/utils";

// export const presetOptions = [
//   { key: "today", label: "Today" },
//   { key: "yesterday", label: "Yesterday" },
//   { key: "this_week", label: "This Week" },
//   { key: "this_month", label: "This Month" },
//   { key: "custom", label: "Custom" },
// ];

// function DepartmentFilters({
//   durationFilter,
//   setDurationFilter,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   navTabs,
//   activeKey,
//   setActiveKey,
// }) {
//   const [navSearch, setNavSearch] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [dateSearch, setDateSearch] = useState("");

//   const filteredNavTabs = navTabs.filter((tab) =>
//     tab.toLowerCase().includes(navSearch.toLowerCase())
//   );

//   const handlePresetClick = (key) => {
//     setDurationFilter(key);
//     if (key === "custom") setShowCalendar(true);
//     else {
//       setShowCalendar(false);
//       setDurationFilter(key);
//       handlePreset(key, {
//         setActive: setDurationFilter,
//         setStartDate,
//         setShowCalendar,
//         setEndDate,
//       });
//     }
//   };

//   useEffect(() => {
//     handlePresetClick("today"); // default selection
//   }, []);

//   const handleDateChange = (dates) => {
//     handleCustomChange(dates, { setStartDate, setEndDate,setShowCalendar, setDurationFilter });
//   };

//   const handleNavSelect = (tab) => {
//     setActiveKey(tab);
//     setNavSearch("");
//   };

//   return (
//     <>
//       {/* Mobile view */}
//       <div
//         className="d-flex d-md-none justify-content-between align-items-center my-4 gap-2 p-3 shadow-sm"
//         style={{ background: "#ffffff", borderRadius: "12px" }}
//       >
//         <Dropdown className="flex-fill">
//           <Dropdown.Toggle
//             variant="light"
//             className="w-100 d-flex justify-content-between align-items-center px-3 py-2 shadow-sm"
//             style={{
//               borderRadius: "12px",
//               background: "#f9fafc",
//               fontWeight: 500,
//               border: "1px solid #e5e7eb",
//             }}
//           >
//             <span className="d-flex align-items-center gap-2">
//               <FaListUl style={{ color: "#6c757d" }} />{" "}
//               {activeKey.replace("-", " ")}
//             </span>
//           </Dropdown.Toggle>
//           <Dropdown.Menu
//             className="shadow-lg rounded-3 border-0 p-0"
//             style={{ minWidth: "220px", maxHeight: "250px", overflowY: "auto" }}
//           >
//             <div className="p-2 border-bottom sticky-top bg-white">
//               <FormControl
//                 size="sm"
//                 type="text"
//                 placeholder="Search..."
//                 value={navSearch}
//                 onChange={(e) => setNavSearch(e.target.value)}
//               />
//             </div>
//             <div style={{ maxHeight: "200px", overflowY: "auto" }}>
//               {filteredNavTabs.length > 0 ? (
//                 filteredNavTabs.map((tab, idx) => (
//                   <Dropdown.Item
//                     key={idx}
//                     active={tab === activeKey}
//                     onClick={() => handleNavSelect(tab)}
//                     className="py-2 px-3"
//                     style={{
//                       fontWeight: tab === activeKey ? "600" : "400",
//                       borderBottom:
//                         idx !== filteredNavTabs.length - 1
//                           ? "1px solid #e9ecef"
//                           : "none",
//                     }}
//                   >
//                     {tab}
//                   </Dropdown.Item>
//                 ))
//               ) : (
//                 <div className="text-muted text-center py-2">No results</div>
//               )}
//             </div>
//           </Dropdown.Menu>
//         </Dropdown>

//         <Dropdown className="flex-fill">
//           <Dropdown.Toggle
//             variant="light"
//             className="w-100 d-flex justify-content-between align-items-center px-3 py-2 shadow-sm"
//             style={{
//               borderRadius: "12px",
//               background: "#f9fafc",
//               fontWeight: 500,
//               border: "1px solid #e5e7eb",
//             }}
//           >
//             <span className="d-flex align-items-center gap-2">
//               <FaCalendarAlt style={{ color: "#6c757d" }} />{" "}
//               {presetOptions.find((p) => p.key === durationFilter)?.label}
//             </span>
//           </Dropdown.Toggle>
//           <Dropdown.Menu
//             className="shadow-lg rounded-3 border-0 p-0"
//             style={{ minWidth: "220px", overflow: "hidden" }}
//           >
//             <div className="p-2 border-bottom">
//               <FormControl
//                 size="sm"
//                 type="text"
//                 placeholder="Search..."
//                 value={dateSearch}
//                 onChange={(e) => setDateSearch(e.target.value)}
//               />
//             </div>
//             {presetOptions
//               .filter((p) =>
//                 p.label.toLowerCase().includes(dateSearch.toLowerCase())
//               )
//               .map((option, idx) => (
//                 <Dropdown.Item
//                   key={idx}
//                   active={option.key === durationFilter}
//                   onClick={() => handlePresetClick(option.key)}
//                   className="py-2 px-3"
//                   style={{
//                     fontWeight: option.key === durationFilter ? "600" : "400",
//                     borderBottom:
//                       idx !== presetOptions.length - 1
//                         ? "1px solid #e9ecef"
//                         : "none",
//                   }}
//                 >
//                   {option.label}
//                 </Dropdown.Item>
//               ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* Desktop view */}
//       <div className="d-none d-md-block my-4">
//         <div className="mb-3 w-100 d-flex justify-content-center">
//           <ButtonGroup className="flex-wrap">
//             {presetOptions.map((option) => (
//               <Button
//                 key={option.key}
//                 variant={
//                   option.key === durationFilter ? "outline-success" : "light"
//                 }
//                 style={{
//                   marginRight: "6px",
//                   borderRadius: "25px",
//                   padding: "8px 16px",
//                   fontWeight: option.key === durationFilter ? 600 : 500,
//                 }}
//                 onClick={() => handlePresetClick(option.key)}
//               >
//                 {option.label}
//               </Button>
//             ))}
//           </ButtonGroup>
//         </div>
//         {showCalendar && (
//           <Row className="mt-3 d-flex justify-content-center">
//             <Col xs="auto" className="p-0 pt-1 bg-primary">
//               <DatePicker
//                 selectsRange
//                 startDate={startDate ? new Date(startDate) : null}
//                 endDate={endDate ? new Date(endDate) : null}
//                 onChange={handleDateChange}
//                 inline
//               />
//             </Col>
//           </Row>
//         )}
//       </div>
//     </>
//   );
// }

// export default DepartmentFilters;
