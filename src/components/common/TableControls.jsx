"use client";

import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import '@/app/globals.css';
import { FaSearch, FaFilter, FaFileExport } from "react-icons/fa";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { IconFilter, IconFilterCog } from "@tabler/icons-react";

export function TableControls({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  filtersConfig = {},
  handleExport,
  searchable = true,
  filterable = true,
  exportable = true,
}) {
  const {isMobile}=useDashboardContext()
  return (
    <div
      className="d-flex justify-content-between align-items-center flex-wrap gap-2 c_bg_gray_5 pt-4"
      style={{ padding: "0 10px" }}
    >
      {/* 🔹 Search */}
      {searchable && (
        <InputGroup
          className="flex-grow-1 flex-md-grow-0"
          style={{ minWidth: "100px", maxWidth: isMobile?'200px':"250px" }}
        >
          <InputGroup.Text>
            <FaSearch style={{ color: "#aaa" }} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      )}

      {/* 🔹 Filters + Export */}
      <div className="d-flex align-items-center ms-auto gap-2">
        {/* Desktop Filters and Export */}
        <div className="d-none d-md-flex gap-2">
          {filterable &&
            Object.keys(filtersConfig).map((key) => (
              <Form.Select
                key={key}
                value={filters[key]}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                }
                style={{
                  width: "180px",
                  backgroundColor: "#FF6000",
                  color: "#fff",
                  border: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {filtersConfig[key].map((option, idx) => (
                  <option
                    key={idx}
                    value={option}
                    style={{
                      backgroundColor: "#FF6000",
                      color: "#fff",
                    }}
                  >
                    {option}
                  </option>
                ))}
              </Form.Select>
            ))}

          {exportable && (
            <Button
              style={{
                backgroundColor: "#FF6000",
                color: "#fff",
                border: "none",
                fontWeight: "500",
              }}
              onClick={handleExport}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#E65500")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#FF6000")
              }
            >
              Export
            </Button>
          )}
        </div>

        {/* Mobile Filters + Export (visible only on mobile) */}
        <div className="d-flex d-md-none gap-2">
          {filterable &&
          <div> 
            <div style={{marginLeft:"+10px",marginBottom:'-20px'}}><FaFilter size={20}color="#FF6000"/></div>
           { Object.keys(filtersConfig).map((key) => (
              <Form.Select
                key={key}
                value={filters[key]}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                }
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  backgroundColor: "#f4f7fc",
                  color: "#f4f7fc",
                  border: "none",
                  width: "40px",
                  // height: "40px",
                  padding: "0",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                title="Filter"
              >
                {filtersConfig[key].map((option, idx) => (
                  <option key={idx} value={option}>
                     {option}
                  </option>
                ))}
              </Form.Select>
            ))}
            </div>}

          {exportable && (
            <Button
              style={{
                backgroundColor: "#FF6000",
                border: "none",
                // width: "40px",
                // height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleExport}
            >
              <FaFileExport color="#fff" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
// "use client";

// import React from "react";
// import { Form, Button, InputGroup } from "react-bootstrap";
// import '@/app/globals.css';
// import { FaSearch } from "react-icons/fa";

// export function TableControls({
//   searchTerm,
//   setSearchTerm,
//   filters,
//   setFilters,
//   filtersConfig = {},
//   handleExport,
//   searchable = true,
//   filterable = true,
//   exportable = true,
// }) {
//   return (
//     <div
//       className="d-flex justify-content-between align-items-center flex-wrap gap-2 c_bg_gray_5 pt-4"
//       style={{ padding: "0 10px" }}
//     >
//       {/* 🔹 Search */}
//       {searchable && (
//         <InputGroup style={{ width: "250px" }}>
//           <InputGroup.Text>
//             <FaSearch style={{ color: "#aaa" }} />
//           </InputGroup.Text>
//           <Form.Control
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </InputGroup>
//       )}

//       {/* 🔹 Filters + Export */}
//       <div className="d-flex gap-2">
//         {filterable &&
//           Object.keys(filtersConfig).map((key) => (
//             <Form.Select
//               key={key}
//               value={filters[key]}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, [key]: e.target.value }))
//               }
//               style={{
//                 width: "180px",
//                 backgroundColor: "#FF6000",
//                 color: "#fff",
//                 border: "none",
//                 fontWeight: "500",
//                 cursor: "pointer",
//               }}
//             >
//               {filtersConfig[key].map((option, idx) => (
//                 <option
//                   key={idx}
//                   value={option}
//                   style={{
//                     backgroundColor: "#FF6000",
//                     color: "#fff",
//                   }}
//                 >
//                   {option}
//                 </option>
//               ))}
//             </Form.Select>
//           ))}

//         {exportable && (
//           <Button
//             style={{
//               backgroundColor: "#FF6000",
//               color: "#fff",
//               border: "none",
//               fontWeight: "500",
//             }}
//             onClick={handleExport}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.backgroundColor = "#E65500")
//             }
//             onMouseOut={(e) =>
//               (e.currentTarget.style.backgroundColor = "#FF6000")
//             }
//           >
//             Export
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }
