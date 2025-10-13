"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { applyDateRange, formatDate } from "@/utils";
import { useTableControls } from "@/components/hooks/useTableControls";
import { useTableSort } from "@/components/hooks/useTableSort";
import { TableControls } from "@/components/common/TableControls";
import DOMPurify from "dompurify";
import DurationFilters from "@/features/dashboard/DurationFilters";
import SecondNavBar from "@/app/(routes)/dashboard/@Navbar/page";

export default function AnalyticsPage({
  title,
  subtitle,
  filters = [], // [{ key, label, value, onChange, options: [{ label, value }] }]
  dateRangeOptions = [],
  activeDateRange: activeDateRangeProp = "",
  onDateRangeChange: onDateRangeChangeProp,
  summaryCards = [],
  table = { columns: [], rows: [] },
  onFilter,
  onExport,
  onAnalyse,
  styles = {},
  pillRow,
  datePill,
  summaryCard,
  iconCircle,
  cardTitle,
  cardValue,
  tableHeader,
  analyser,
  exportBtn,
  filterBtn,
  search,
  startDate:startDateC,
  endDate:endDateC,
  onStartDateChange,
  onEndDateChange,
}) {
  const pathname = usePathname();
  const showOnlyTable = pathname === "/" || pathname === "/dashboard";

  // Date picker state
  const [activeDateRange, setActiveDateRange] = useState(activeDateRangeProp);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (activeDateRangeProp) setActiveDateRange(activeDateRangeProp);
  }, [activeDateRangeProp]);

  const handlePillClick = (range) => {
    setActiveDateRange(range);
    if (range === "Custom") {
      setStartDate(null);
      setEndDate(null);
      setIsDatePickerOpen(true);
    } else {
      const { start, end } = applyDateRange(range);
      setStartDate(formatDate(start));
      setEndDate(formatDate(end));
      onDateRangeChangeProp?.(range, start, end);
    }
  };
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleCustomDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateRangeChangeProp?.("Custom", start, end);
      setIsDatePickerOpen(false);
    }
  };

  // Sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(
    table.rows
  );

  // Determine column key for filtering
  const firstColKey = table.columns[0]?.key;
  const secondColKey = table.columns[1]?.key;
  // const isFirstColDate =
  //   sortedData.length > 0 &&
  //   firstColKey &&
  //   !isNaN(Date.parse(sortedData[0][firstColKey]));
  const isFirstColDate = useMemo(() => {
    if (!sortedData || sortedData.length === 0 || !firstColKey) return false;

    const value = sortedData[0]?.[firstColKey];
    if (!value) return false;

    const parsed = Date.parse(value);
    return !isNaN(parsed);
  }, [sortedData, firstColKey]);

  const filterColumnKey = isFirstColDate ? secondColKey : firstColKey;

  // Unique filter values
  const uniqueFilterValues = useMemo(() => {
    if (!filterColumnKey) return [];
    const vals = sortedData.map((row) => row[filterColumnKey]);
    return [...new Set(vals)].sort();
  }, [sortedData, filterColumnKey]);

  // Filters config for useTableControls
  const filtersConfig = filterColumnKey
    ? {
      [filterColumnKey]: ["All", ...uniqueFilterValues],
    }
    : {};

  // Table controls (search + filters)
  const {
    searchTerm,
    setSearchTerm,
    filters: tableFilters,
    setFilters,
    filteredData,
    handleExport,
  } = useTableControls({
    data: sortedData,
    columns: table.columns,
    searchFields: [filterColumnKey],
    filtersConfig,
    customFilter: (row, filtersState) =>
      Object.entries(filtersState).every(([key, val]) => {
        if (!val || val === "All") return true;
        return row[key] === val;
      }),
  });

  return (
    <div style={{ position: "relative", top: "-80px" }}>
      <>
        {!showOnlyTable && (
          <Container
            style={{
              borderRadius: 18,
              background: "#fff",
              boxShadow: "0 8px 24px rgba(44,37,68,0.08)",
              marginBottom: 36,
              padding: 0,
            }}
            className="mb-4"
          >
            <Card.Body style={{ padding: "32px 36px 24px 36px" }}>
              {/* ✅ External filters (updated like 2nd component) */}
              <Row className="mb-2">
                {filters.map((filter, idx) => {
                  const colSize =
                    filters.length > 0 ? Math.floor(12 / filters.length) : 12;
                  return (
                    <Col key={idx} md={colSize}>
                      <label
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          marginBottom: 6,
                        }}
                      >
                        {filter.label}
                      </label>
                      <select
                        value={filter.value}
                        onChange={(e) => filter.onChange?.(e.target.value)}
                        style={{
                          background: "#fcfcfd",
                          color: "#1d2d35",
                          borderRadius: 12,
                          border: "1.7px solid #edecec",
                          width: "100%",
                          fontSize: 16,
                          fontWeight: 500,
                          padding: "10px 18px",
                          marginBottom: 10,
                          marginTop: 5,
                          outline: "none",
                        }}
                      >
                        <option value="">All {filter.label}</option>
                        {filter.options.map((opt, i) => (
                          <option key={i} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </Col>
                  );
                })}
              </Row>
              <DurationFilters
                useAppContext={{
                  startDate: startDateC,
                  endDate: endDateC,
                  setStartDate: onStartDateChange,
                  setEndDate: onEndDateChange,
                }}
              />
              {/* <SecondNavBar
                tabs={[]}
                useAppContext={{
                  startDate: startDateC,
                  endDate: endDateC,
                  setStartDate: onStartDateChange,
                  setEndDate: onEndDateChange,
                }}
              /> */}
              {/* Date Range Pills */}
              {/* <Row className="mb-1" style={pillRow}>
                <Col>
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option}
                      style={datePill(option === activeDateRange)}
                      onClick={() => handlePillClick(option)}
                    >
                      {option}
                    </button>
                  ))}

                  {activeDateRange === "Custom" && isDatePickerOpen && (
                    <div style={{ marginTop: 12 }}>
                      <DatePicker
                        selected={startDate}
                        onChange={handleCustomDateChange}
                        startDate={startDate ? new Date(startDate) : null}
                        endDate={endDate ? new Date(endDate) : null}
                        selectsRange
                        inline
                      />
                    </div>
                  )}
                </Col>
              </Row> */}
            </Card.Body>
          </Container>
        )}

        {/* Summary Cards */}
        {/* <Row className="mb-4">
            {summaryCards.map((card) => (
              <Col key={card.id} md={4}>
                <Card style={summaryCard(card.bgColor)}>
                  <Card.Body style={{ padding: "18px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={iconCircle(card.iconBg)}>{card.icon}</div>
                      <div>
                        <div style={cardTitle}>{card.title}</div>
                        <div style={cardValue}>{card.value}</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row> */}
        <Row className="mb-4 justify-content-evenly">
          {summaryCards.map((card, index) => (
            <Col
              key={card.id}
              md={summaryCards.length === 2 ? 6 : 4} // 6 columns = 50% (≈ 50vw), else 4 (33.3%)
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  ...summaryCard(card.bgColor),
                  width: summaryCards.length === 2 ? "50vw" : "100%",
                }}
              >
                <Card.Body style={{ padding: "18px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={iconCircle(card.iconBg)}>{card.icon}</div>
                    <div>
                      <div style={cardTitle}>{card.title}</div>
                      <div style={cardValue}>{card.value}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
      {/* )} */}

      <Card
        style={{
          borderRadius: 22,
          boxShadow: "0 8px 18px rgba(44,37,68,0.09)",
          border: "none",
        }}
      >
        <Card.Body>
          <TableControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={tableFilters}
            setFilters={setFilters}
            filtersConfig={filtersConfig}
            handleExport={handleExport}
            searchable={true}
            filterable={true}
            exportable={true}
          />

          <div
            style={{
              maxHeight: "70vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            {/* <Table
              hover
              className="align-middle mb-0"
              style={{ minWidth: "100%" }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1000,
                  backgroundColor: "#fff",
                }}
              >
                <tr>
                  {table.columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{ ...tableHeader, cursor: "pointer" }}
                    >
                      {col.label}
                      {sortKey === col.key
                        ? direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      {table.columns.map((col) => {
                        const cellValue = row[col.key];

                        // Case 1: check if HTML string
                        const isHtmlString =
                          typeof cellValue === "string" &&
                          /<\/?[a-z][\s\S]*>/i.test(cellValue);

                        // Case 2: object (render its key: value pairs vertically)
                        const isObject =
                          cellValue &&
                          typeof cellValue === "object" &&
                          !Array.isArray(cellValue);

                        return (
                          <td
                            key={col.key}
                            style={{ fontSize: 16, fontWeight: 600 }}
                          >
                            {isHtmlString ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(cellValue),
                                }}
                              />
                            ) : isObject ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {Object.entries(cellValue).map(([k, v]) => (
                                  <span key={k}>
                                    {v !== null && v !== undefined
                                      ? String(v)
                                      : ""}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              cellValue
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={table.columns.length}
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#888",
                        fontStyle: "italic",
                      }}
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table> */}
            {/* <Table
              hover
              className="align-middle mb-0"
              style={{ minWidth: "100%" }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1000,
                  backgroundColor: "#fff",
                }}
              >
                <tr>
                  {table.columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{ ...tableHeader, cursor: "pointer" }}
                    >
                      {col.label}
                      {sortKey === col.key
                        ? direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      {table.columns.map((col) => {
                        const cellValue = row[col.key];

                        // Check if value looks like HTML
                        const isHtmlString =
                          typeof cellValue === "string" &&
                          /<\/?[a-z][\s\S]*>/i.test(cellValue);

                        return (
                          <td
                            key={col.key}
                            style={{ fontSize: 16, fontWeight: 600 }}
                          >
                            {isHtmlString ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(cellValue),
                                }}
                              />
                            ) : (
                              cellValue
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={table.columns.length}
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#888",
                        fontStyle: "italic",
                      }}
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table> */}
            <Table
              hover
              className="align-middle mb-0"
              style={{ minWidth: "100%" }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1000,
                  backgroundColor: "#fff",
                }}
              >
                <tr>
                  {table.columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{ ...tableHeader, cursor: "pointer" }}
                    >
                      {col.label}
                      {sortKey === col.key
                        ? direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      {table.columns.map((col) => (
                        <td
                          key={col.key}
                          style={{ fontSize: 16, fontWeight: 600 }}
                        >
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={table.columns.length}
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#888",
                        fontStyle: "italic",
                      }}
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

// "use client";
// import { Card, Col, Container, Row, Table } from "react-bootstrap";
// import { FaChartLine, FaDownload, FaFilter } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { applyDateRange, formatDate } from "@/utils"; // import your utility

// export default function AnalyticsPage({
//   title,
//   subtitle,
//   filters = [],
//   dateRangeOptions = [],
//   activeDateRange: activeDateRangeProp = "",
//   onDateRangeChange: onDateRangeChangeProp,
//   summaryCards = [],
//   table = { columns: [], rows: [] },
//   onFilter,
//   onExport,
//   onAnalyse,
//   styles = {},
//   pillRow,
//   datePill,
//   summaryCard,
//   iconCircle,
//   cardTitle,
//   cardValue,
//   tableHeader,
//   analyser,
//   exportBtn,
//   filterBtn,
//   search,
// }) {
//   const pathname = usePathname();
//   const showOnlyTable = pathname === "/" || pathname === "/dashboard";

//   // Local state
//   const [activeDateRange, setActiveDateRange] = useState(activeDateRangeProp);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     if (activeDateRangeProp) setActiveDateRange(activeDateRangeProp);
//   }, [activeDateRangeProp]);

//   // Date pill click
//   const handlePillClick = (range) => {
//     setActiveDateRange(range);

//     if (range === "Custom") {
//       // Keep dates null initially for custom
//       setStartDate(null);
//       setEndDate(null);
//     } else {
//       const { start, end } = applyDateRange(range);
//       setStartDate(start);
//       setEndDate(end);

//       onDateRangeChangeProp?.(range, start, end);
//     }
//   };

//   // When user selects custom dates
//   const handleCustomDateChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(formatDate(start));
//     setEndDate(formatDate(end));

//     // Call parent callback if provided
//     if (start && end) onDateRangeChangeProp?.("Custom", start, end);
//   };

//   return (
//     <div style={{ position: "relative", top: "-80px" }}>
//       {!showOnlyTable && (
//         <>
//           <Container
//             style={{
//               borderRadius: 18,
//               background: "#fff",
//               boxShadow: "0 8px 24px rgba(44,37,68,0.08)",
//               marginBottom: 36,
//               padding: 0,
//             }}
//             className="mb-4"
//           >
//             <Card.Body style={{ padding: "32px 36px 24px 36px" }}>
//               <Row className="mb-2">
//                 {filters.map((filter, idx) => {
//                   const colSize =
//                     filters.length > 0 ? Math.floor(12 / filters.length) : 12;
//                   return (
//                     <Col key={idx} md={colSize}>
//                       <label
//                         style={{
//                           fontWeight: 700,
//                           fontSize: 16,
//                           marginBottom: 6,
//                         }}
//                       >
//                         {filter.label}
//                       </label>
//                       <select
//                         value={filter.value}
//                         onChange={(e) => filter.onChange?.(e.target.value)}
//                         style={{
//                           background: "#fcfcfd",
//                           color: "#1d2d35",
//                           borderRadius: 12,
//                           border: "1.7px solid #edecec",
//                           width: "100%",
//                           fontSize: 16,
//                           fontWeight: 500,
//                           padding: "10px 18px",
//                           marginBottom: 10,
//                           marginTop: 5,
//                           outline: "none",
//                         }}
//                       >
//                         <option value="">All {filter.label}</option>
//                         {filter.options.map((opt, i) => (
//                           <option key={i} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     </Col>
//                   );
//                 })}
//               </Row>

//               {/* --- Date Range Pills --- */}
//               <Row className="mb-1" style={pillRow}>
//                 <Col>
//                   {dateRangeOptions.map((option) => (
//                     <button
//                       key={option}
//                       style={datePill(option === activeDateRange)}
//                       onClick={() => handlePillClick(option)}
//                     >
//                       {option}
//                     </button>
//                   ))}

//                   {/* Show date picker if Custom is selected */}
//                   {activeDateRange === "Custom" && (
//                     <div style={{ marginTop: 12 }}>
//                       <DatePicker
//                         selected={startDate}
//                         onChange={handleCustomDateChange}
//                         startDate={startDate}
//                         endDate={endDate}
//                         selectsRange
//                         inline
//                       />
//                     </div>
//                   )}
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Container>

//           {/* --- Summary Cards --- */}
//           <Row className="mb-4">
//             {summaryCards.map((card) => (
//               <Col key={card.id} md={4}>
//                 <Card style={summaryCard(card.bgColor)}>
//                   <Card.Body style={{ padding: "18px 22px" }}>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div style={iconCircle(card.iconBg)}>{card.icon}</div>
//                       <div>
//                         <div style={cardTitle}>{card.title}</div>
//                         <div style={cardValue}>{card.value}</div>
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}

//       {/* --- Table with Controls --- */}
//       <Card
//         style={{
//           borderRadius: 22,
//           boxShadow: "0 8px 18px rgba(44,37,68,0.09)",
//           border: "none",
//         }}
//       >
//         <Card.Body>
//           <div
//             className="d-flex justify-content-between mb-3 align-items-center"
//             style={{ flexWrap: "wrap" }}
//           >
//             <input style={search} placeholder="Search..." />
//             <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
//               <button style={analyser} onClick={onAnalyse}>
//                 <FaChartLine className="me-2" /> Analyser
//               </button>
//               <button style={exportBtn} onClick={onExport}>
//                 <FaDownload className="me-2" /> Export
//               </button>
//               <button style={filterBtn} onClick={onFilter}>
//                 <FaFilter className="me-2" /> Filter
//               </button>
//             </div>
//           </div>

//           <Table
//             hover
//             responsive
//             className="align-middle mb-0"
//             style={{ borderCollapse: "separate", borderSpacing: 0 }}
//           >
//             <thead>
//               <tr>
//                 {table.columns.map((col) => (
//                   <th key={col.key} style={tableHeader}>
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row, idx) => (
//                 <tr key={idx}>
//                   {table.columns.map((col) => (
//                     <td key={col.key} style={{ fontSize: 16, fontWeight: 600 }}>
//                       {row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
// "use client";
// import { Card, Col, Container, Row, Table } from "react-bootstrap";
// import { FaChartLine, FaDownload, FaFilter } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { applyDateRange } from "@/utils"; // import your utility

// export default function AnalyticsPage({
//   title,
//   subtitle,
//   filters = [],
//   dateRangeOptions = [],
//   activeDateRange: activeDateRangeProp = "",
//   onDateRangeChange: onDateRangeChangeProp,
//   summaryCards = [],
//   table = { columns: [], rows: [] },
//   onFilter,
//   onExport,
//   onAnalyse,
//   styles = {}, // Receive styles from props
//   pillRow,
//   datePill,
//   summaryCard,
//   iconCircle,
//   cardTitle,
//   cardValue,
//   tableHeader,
//   analyser,
//   exportBtn,
//   filterBtn,
//   search,
// }) {
//   const pathname = usePathname();
//   const showOnlyTable = pathname === "/" || pathname === "/dashboard";

//   // ✅ Local state for active pill
//   const [activeDateRange, setActiveDateRange] = useState(activeDateRangeProp);

//   // ✅ Local state for start/end date
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // ✅ Sync with prop if changes
//   useEffect(() => {
//     if (activeDateRangeProp) setActiveDateRange(activeDateRangeProp);
//   }, [activeDateRangeProp]);

//   // ✅ Date pill click handler using utility
//   const handlePillClick = (range) => {
//     setActiveDateRange(range);

//     // Use utility function
//     const { start, end } = applyDateRange(range);
//     setStartDate(start);
//     setEndDate(end);

//     // Call parent callback if provided
//     onDateRangeChangeProp?.(range, start, end);
//   };

//   return (
//     <div style={{ position: "relative", top: "-80px" }}>
//       {!showOnlyTable && (
//         <>
//           {/* --- Filters + Date Pills --- */}
//           <Container
//             style={{
//               borderRadius: 18,
//               background: "#fff",
//               boxShadow: "0 8px 24px rgba(44,37,68,0.08)",
//               marginBottom: 36,
//               padding: 0,
//             }}
//             className="mb-4"
//           >
//             <Card.Body style={{ padding: "32px 36px 24px 36px" }}>
//               <Row className="mb-2">
//                 {filters.map((filter, idx) => {
//                   const colSize =
//                     filters.length > 0 ? Math.floor(12 / filters.length) : 12;
//                   return (
//                     <Col key={idx} md={colSize}>
//                       <label
//                         style={{
//                           fontWeight: 700,
//                           fontSize: 16,
//                           marginBottom: 6,
//                         }}
//                       >
//                         {filter.label}
//                       </label>
//                       <select
//                         value={filter.value}
//                         onChange={(e) => filter.onChange?.(e.target.value)}
//                         style={{
//                           background: "#fcfcfd",
//                           color: "#1d2d35",
//                           borderRadius: 12,
//                           border: "1.7px solid #edecec",
//                           width: "100%",
//                           fontSize: 16,
//                           fontWeight: 500,
//                           padding: "10px 18px",
//                           marginBottom: 10,
//                           marginTop: 5,
//                           outline: "none",
//                         }}
//                       >
//                         <option value="">All {filter.label}</option>
//                         {filter.options.map((opt, i) => (
//                           <option key={i} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     </Col>
//                   );
//                 })}
//               </Row>

//               {/* --- Date Range Pills --- */}
//               <Row className="mb-1" style={pillRow}>
//                 <Col>
//                   {dateRangeOptions.map((option) => (
//                     <button
//                       key={option}
//                       style={datePill(option === activeDateRange)}
//                       onClick={() => handlePillClick(option)}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Container>

//           {/* --- Summary Cards --- */}
//           <Row className="mb-4">
//             {summaryCards.map((card) => (
//               <Col key={card.id} md={4}>
//                 <Card style={summaryCard(card.bgColor)}>
//                   <Card.Body style={{ padding: "18px 22px" }}>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div style={iconCircle(card.iconBg)}>{card.icon}</div>
//                       <div>
//                         <div style={cardTitle}>{card.title}</div>
//                         <div style={cardValue}>{card.value}</div>
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}

//       {/* --- Table with Controls --- */}
//       <Card
//         style={{
//           borderRadius: 22,
//           boxShadow: "0 8px 18px rgba(44,37,68,0.09)",
//           border: "none",
//         }}
//       >
//         <Card.Body>
//           <div
//             className="d-flex justify-content-between mb-3 align-items-center"
//             style={{ flexWrap: "wrap" }}
//           >
//             <input style={search} placeholder="Search..." />
//             <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
//               <button style={analyser} onClick={onAnalyse}>
//                 <FaChartLine className="me-2" /> Analyser
//               </button>
//               <button style={exportBtn} onClick={onExport}>
//                 <FaDownload className="me-2" /> Export
//               </button>
//               <button style={filterBtn} onClick={onFilter}>
//                 <FaFilter className="me-2" /> Filter
//               </button>
//             </div>
//           </div>

//           <Table
//             hover
//             responsive
//             className="align-middle mb-0"
//             style={{ borderCollapse: "separate", borderSpacing: 0 }}
//           >
//             <thead>
//               <tr>
//                 {table.columns.map((col) => (
//                   <th key={col.key} style={tableHeader}>
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row, idx) => (
//                 <tr key={idx}>
//                   {table.columns.map((col) => (
//                     <td key={col.key} style={{ fontSize: 16, fontWeight: 600 }}>
//                       {row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// "use client";
// import { Card, Col, Container, Row, Table } from "react-bootstrap";
// import { FaChartLine, FaDownload, FaFilter } from "react-icons/fa";
// import { usePathname } from "next/navigation";

// export default function AnalyticsPage({
//   title,
//   subtitle,
//   filters = [],
//   dateRangeOptions = [],
//   activeDateRange = "",
//   onDateRangeChange,
//   summaryCards = [],
//   table = { columns: [], rows: [] },
//   onFilter,
//   onExport,
//   onAnalyse,
//   styles = {}, // Receive styles from props
//   pillRow,
//   datePill,
//   summaryCard,
//   iconCircle,
//   cardTitle,
//   cardValue,
//   tableHeader,
//   analyser,
//   exportBtn,
//   filterBtn,
//   search,
// }) {
//   const pathname = usePathname();
//   const showOnlyTable = pathname === "/" || pathname === "/dashboard";

//   return (
//     <div style={{ position: "relative", top: "-80px" }}>
//       {/* ✅ Render everything except when on / or /dashboard */}
//       {!showOnlyTable && (
//         <>
//           {/* --- Filters + Date Pills --- */}
//           <Container
//             style={{
//               borderRadius: 18,
//               background: "#fff",
//               boxShadow: "0 8px 24px rgba(44,37,68,0.08)",
//               marginBottom: 36,
//               padding: 0,
//             }}
//             className="mb-4"
//           >
//             <Card.Body style={{ padding: "32px 36px 24px 36px" }}>
//               <Row className="mb-2">
//                 {filters.map((filter, idx) => {
//                   const colSize =
//                     filters.length > 0 ? Math.floor(12 / filters.length) : 12;

//                   return (
//                     <Col key={idx} md={colSize}>
//                       <label
//                         style={{
//                           fontWeight: 700,
//                           fontSize: 16,
//                           marginBottom: 6,
//                         }}
//                       >
//                         {filter.label}
//                       </label>
//                       <select
//                         value={filter.value}
//                         onChange={(e) => filter.onChange?.(e.target.value)}
//                         style={{
//                           background: "#fcfcfd",
//                           color: "#1d2d35",
//                           borderRadius: 12,
//                           border: "1.7px solid #edecec",
//                           width: "100%",
//                           fontSize: 16,
//                           fontWeight: 500,
//                           padding: "10px 18px",
//                           marginBottom: 10,
//                           marginTop: 5,
//                           outline: "none",
//                         }}
//                       >
//                         <option value="">All {filter.label}</option>
//                         {filter.options.map((opt, i) => (
//                           <option key={i} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     </Col>
//                   );
//                 })}
//               </Row>

//               {/* Date Range Pills */}
//               <Row className="mb-1" style={pillRow}>
//                 <Col>
//                   {dateRangeOptions.map((option) => (
//                     <button
//                       key={option}
//                       style={datePill(option === activeDateRange)}
//                       onClick={() => onDateRangeChange?.(option)}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Container>

//           {/* --- Summary Cards --- */}
//           <Row className="mb-4">
//             {summaryCards.map((card) => (
//               <Col key={card.id} md={4}>
//                 <Card style={summaryCard(card.bgColor)}>
//                   <Card.Body style={{ padding: "18px 22px" }}>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div style={iconCircle(card.iconBg)}>{card.icon}</div>
//                       <div>
//                         <div style={cardTitle}>{card.title}</div>
//                         <div style={cardValue}>{card.value}</div>
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}

//       {/* --- Table with Controls (always shown) --- */}
//       <Card
//         style={{
//           borderRadius: 22,
//           boxShadow: "0 8px 18px rgba(44,37,68,0.09)",
//           border: "none",
//         }}
//       >
//         <Card.Body>
//             <div
//               className="d-flex justify-content-between mb-3 align-items-center"
//               style={{ flexWrap: "wrap" }}
//             >
//               <input style={search} placeholder="Search..." />
//               <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
//                 <button style={analyser} onClick={onAnalyse}>
//                   <FaChartLine className="me-2" /> Analyser
//                 </button>
//                 <button style={exportBtn} onClick={onExport}>
//                   <FaDownload className="me-2" /> Export
//                 </button>
//                 <button style={filterBtn} onClick={onFilter}>
//                   <FaFilter className="me-2" /> Filter
//                 </button>
//               </div>
//             </div>

//           <Table
//             hover
//             responsive
//             className="align-middle mb-0"
//             style={{ borderCollapse: "separate", borderSpacing: 0 }}
//           >
//             <thead>
//               <tr>
//                 {table.columns.map((col) => (
//                   <th key={col.key} style={tableHeader}>
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row, idx) => (
//                 <tr key={idx}>
//                   {table.columns.map((col) => (
//                     <td key={col.key} style={{ fontSize: 16, fontWeight: 600 }}>
//                       {row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
// import { Card, Col, Container, Row, Table } from "react-bootstrap";
// import { FaChartLine, FaDownload, FaFilter } from "react-icons/fa";

// export default function AnalyticsPage({
//   title,
//   subtitle,
//   filters = [],
//   dateRangeOptions = [],
//   activeDateRange = "",
//   onDateRangeChange,
//   summaryCards = [],
//   table = { columns: [], rows: [] },
//   onFilter,
//   onExport,
//   onAnalyse,
//   styles = {}, // Receive styles from props
//   pillRow,
//   datePill,
//   summaryCard,
//   iconCircle,
//   cardTitle,
//   cardValue,
//   tableHeader,
//   analyser,
//   exportBtn,
//   filterBtn,
//   search,
// }) {
//   return (
//     <div style={{ position: "relative", top: "-80px" }}>
//       {/* --- Filters + Date Pills --- */}
//       <Container
//         style={{
//           borderRadius: 18,
//           background: "#fff",
//           boxShadow: "0 8px 24px rgba(44,37,68,0.08)",
//           marginBottom: 36,
//           padding: 0,
//         }}
//         className="mb-4"
//       >
//         <Card.Body style={{ padding: "32px 36px 24px 36px" }}>
//           {/* Filters */}
//           {/* <Row className="mb-2">
//             {filters.map((filter, idx) => (
//               <Col key={idx} md={4}>
//                 <label
//                   style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}
//                 >
//                   {filter.label}
//                 </label>
//                 <select
//                   value={filter.value}
//                   onChange={(e) => filter.onChange?.(e.target.value)}
//                   style={{
//                     background: "#fcfcfd",
//                     color: "#1d2d35",
//                     borderRadius: 12,
//                     border: "1.7px solid #edecec",
//                     width: "100%",
//                     fontSize: 16,
//                     fontWeight: 500,
//                     padding: "10px 18px",
//                     marginBottom: 10,
//                     marginTop: 5,
//                     outline: "none",
//                   }}
//                 >
//                   <option value="">All {filter.label}</option>
//                   {filter.options.map((opt, i) => (
//                     <option key={i} value={opt.value}>
//                       {opt.label}
//                     </option>
//                   ))}
//                 </select>
//               </Col>
//             ))}
//           </Row>
//            */}
//           <Row className="mb-2">
//             {filters.map((filter, idx) => {
//               // Compute column width dynamically (Bootstrap grid has 12 cols)
//               const colSize =
//                 filters.length > 0 ? Math.floor(12 / filters.length) : 12;

//               return (
//                 <Col key={idx} md={colSize}>
//                   <label
//                     style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}
//                   >
//                     {filter.label}
//                   </label>
//                   <select
//                     value={filter.value}
//                     onChange={(e) => filter.onChange?.(e.target.value)}
//                     style={{
//                       background: "#fcfcfd",
//                       color: "#1d2d35",
//                       borderRadius: 12,
//                       border: "1.7px solid #edecec",
//                       width: "100%",
//                       fontSize: 16,
//                       fontWeight: 500,
//                       padding: "10px 18px",
//                       marginBottom: 10,
//                       marginTop: 5,
//                       outline: "none",
//                     }}
//                   >
//                     <option value="">All {filter.label}</option>
//                     {filter.options.map((opt, i) => (
//                       <option key={i} value={opt.value}>
//                         {opt.label}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//               );
//             })}
//           </Row>

//           {/* Date Range Pills */}
//           <Row className="mb-1" style={pillRow}>
//             <Col>
//               {dateRangeOptions.map((option) => (
//                 <button
//                   key={option}
//                   style={datePill(option === activeDateRange)}
//                   onClick={() => onDateRangeChange?.(option)}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </Col>
//           </Row>
//         </Card.Body>
//       </Container>

//       {/* --- Summary Cards --- */}
//       <Row className="mb-4">
//         {summaryCards.map((card) => (
//           <Col key={card.id} md={4}>
//             <Card style={summaryCard(card.bgColor)}>
//               <Card.Body style={{ padding: "18px 22px" }}>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <div style={iconCircle(card.iconBg)}>{card.icon}</div>
//                   <div>
//                     <div style={cardTitle}>{card.title}</div>
//                     <div style={cardValue}>{card.value}</div>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* --- Table with Controls --- */}
//       <Card
//         style={{
//           borderRadius: 22,
//           boxShadow: "0 8px 18px rgba(44,37,68,0.09)",
//           border: "none",
//         }}
//       >
//         <Card.Body>
//           <div
//             className="d-flex justify-content-between mb-3 align-items-center"
//             style={{ flexWrap: "wrap" }}
//           >
//             <input style={search} placeholder="Search..." />
//             <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
//               <button style={analyser} onClick={onAnalyse}>
//                 <FaChartLine className="me-2" /> Analyser
//               </button>
//               <button style={exportBtn} onClick={onExport}>
//                 <FaDownload className="me-2" /> Export
//               </button>
//               <button style={filterBtn} onClick={onFilter}>
//                 <FaFilter className="me-2" /> Filter
//               </button>
//             </div>
//           </div>
//           <Table
//             hover
//             responsive
//             className="align-middle mb-0"
//             style={{ borderCollapse: "separate", borderSpacing: 0 }}
//           >
//             <thead>
//               <tr>
//                 {table.columns.map((col) => (
//                   <th key={col.key} style={tableHeader}>
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row, idx) => (
//                 <tr key={idx}>
//                   {table.columns.map((col) => (
//                     <td key={col.key} style={{ fontSize: 16, fontWeight: 600 }}>
//                       {row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
// "use client";

// import { Card, Col, Row, Table } from "react-bootstrap";
// import { FaChartLine, FaDownload, FaFilter } from "react-icons/fa";

// export default function AnalyticsPage({
//   title,
//   subtitle,
//   filters = [],
//   dateRangeOptions = [],
//   activeDateRange = "",
//   onDateRangeChange,
//   summaryCards = [],
//   table = { columns: [], rows: [] },
//   onFilter,
//   onExport,
//   onAnalyse,
//   styles = {}, // Receive styles from props
//   pillRow,
//   datePill,
//   summaryCard,
//   iconCircle,
//   cardTitle,
//   cardValue,
//   tableHeader,
//   analyser,
//   exportBtn,
//   filterBtn,
//   search,
// }) {
//   return (
//     <>
//       {/* No header here since page-level gradient header is in parent */}

//       {/* Filters */}
//       <Row className="mb-3">
//         {filters.map((filter, idx) => (
//           <Col key={idx} md={4}>
//             <label style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
//               {filter.label}
//             </label>
//             <select
//               value={filter.value}
//               onChange={(e) => filter.onChange?.(e.target.value)}
//               style={{
//                 background: "#fcfcfd",
//                 color: "#1d2d35",
//                 borderRadius: 12,
//                 border: "1.7px solid #edecec",
//                 width: "100%",
//                 fontSize: 16,
//                 fontWeight: 500,
//                 padding: "10px 18px",
//                 marginBottom: 10,
//                 marginTop: 5,
//                 outline: "none",
//               }}
//             >
//               <option value="">All {filter.label}</option>
//               {filter.options.map((opt, i) => (
//                 <option key={i} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           </Col>
//         ))}
//       </Row>

//       {/* Date Range Pills */}
//       <Row className="mb-4" style={pillRow}>
//         <Col>
//           {dateRangeOptions.map((option) => (
//             <button
//               key={option}
//               style={datePill(option === activeDateRange)}
//               onClick={() => onDateRangeChange?.(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </Col>
//       </Row>

//       {/* Summary Cards */}
//       <Row className="mb-4">
//         {summaryCards.map((card) => (
//           <Col key={card.id} md={4}>
//             <Card style={summaryCard(card.bgColor)}>
//               <Card.Body style={{ padding: "18px 22px" }}>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <div style={iconCircle(card.iconBg)}>{card.icon}</div>
//                   <div>
//                     <div style={cardTitle}>{card.title}</div>
//                     <div style={cardValue}>{card.value}</div>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Table with Controls */}
//       <Card
//         style={{
//           borderRadius: 22,
//           boxShadow: "0 8px 18px rgba(44,37,68,0.09)",
//           border: "none",
//         }}
//       >
//         <Card.Body>
//           <div
//             className="d-flex justify-content-between mb-3 align-items-center"
//             style={{ flexWrap: "wrap" }}
//           >
//             <input style={search} placeholder="Search..." />
//             <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
//               <button style={analyser} onClick={onAnalyse}>
//                 <FaChartLine className="me-2" /> Analyser
//               </button>
//               <button style={exportBtn} onClick={onExport}>
//                 <FaDownload className="me-2" /> Export
//               </button>
//               <button style={filterBtn} onClick={onFilter}>
//                 <FaFilter className="me-2" /> Filter
//               </button>
//             </div>
//           </div>
//           <Table
//             hover
//             responsive
//             className="align-middle mb-0"
//             style={{ borderCollapse: "separate", borderSpacing: 0 }}
//           >
//             <thead>
//               <tr>
//                 {table.columns.map((col) => (
//                   <th key={col.key} style={tableHeader}>
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row, idx) => (
//                 <tr key={idx}>
//                   {table.columns.map((col) => (
//                     <td key={col.key} style={{ fontSize: 16, fontWeight: 600 }}>
//                       {row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }

// import React from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   ButtonGroup,
//   Table,
//   Form,
// } from "react-bootstrap";
// import { FaFilter, FaDownload, FaChartLine } from "react-icons/fa";

// // Common Analytics Component
// export default function AnalyticsPage({
//   title,
//   subtitle,
//   filters = [], // [{label: "Departments", options: [...]}, ...]
//   dateRangeOptions = [
//     "Today",
//     "Yesterday",
//     "This Week",
//     "This Month",
//     "Custom",
//   ],
//   activeDateRange = "Today",
//   onDateRangeChange,
//   summaryCards = [], // [{id, title, value, icon, bgColor}]
//   table = { columns: [], rows: [] }, // {columns: [{key, label}], rows: [{colKey: value}]}
//   onFilter,
//   onExport,
//   onAnalyse,
// }) {
//   return (
//     <div className="p-3">
//       {/* Header */}
//       <div className="mb-4">
//         <h4>{title}</h4>
//         <p className="text-muted">{subtitle}</p>
//       </div>

//       {/* Filters */}
//       <Row className="mb-3">
//         {filters.map((filter, idx) => (
//           <Col key={idx} md={4}>
//             <Form.Group>
//               <Form.Label>{filter.label}</Form.Label>
//               <Form.Select
//                 value={filter.value}
//                 onChange={(e) => filter.onChange?.(e.target.value)}
//               >
//                 <option value="">All {filter.label}</option>
//                 {filter.options.map((opt, i) => (
//                   <option key={i} value={opt.value}>
//                     {opt.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         ))}
//       </Row>

//       {/* Date Range */}
//       <div className="mb-4">
//         <ButtonGroup>
//           {dateRangeOptions.map((option, idx) => (
//             <Button
//               key={idx}
//               variant={
//                 option === activeDateRange ? "primary" : "outline-secondary"
//               }
//               onClick={() => onDateRangeChange?.(option)}
//             >
//               {option}
//             </Button>
//           ))}
//         </ButtonGroup>
//       </div>

//       {/* Summary Cards */}
//       <Row className="mb-4">
//         {summaryCards.map((card) => (
//           <Col key={card.id} md={4} className="mb-3">
//             <Card
//               style={{ background: card.bgColor }}
//               className="shadow-sm h-100"
//             >
//               <Card.Body>
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                     style={{
//                       background: card.iconBg,
//                       width: 40,
//                       height: 40,
//                     }}
//                   >
//                     {card.icon}
//                   </div>
//                   <div>
//                     <div className="fw-bold">{card.title}</div>
//                     <h5>{card.value}</h5>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Table */}
//       <Card className="shadow-sm">
//         <Card.Body>
//           <div className="d-flex justify-content-between mb-3">
//             <Form.Control
//               style={{ maxWidth: "250px" }}
//               placeholder="Search..."
//             />
//             <div>
//               <Button variant="warning" className="me-2" onClick={onAnalyse}>
//                 <FaChartLine className="me-1" /> Analyser
//               </Button>
//               <Button variant="warning" className="me-2" onClick={onExport}>
//                 <FaDownload className="me-1" /> Export
//               </Button>
//               <Button variant="warning" onClick={onFilter}>
//                 <FaFilter className="me-1" /> Filter
//               </Button>
//             </div>
//           </div>
//           <Table hover responsive className="align-middle">
//             <thead className="bg-light">
//               <tr>
//                 {table.columns.map((col) => (
//                   <th key={col.key}>{col.label}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {table.columns.map((col) => (
//                     <td key={col.key}>{row[col.key]}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
