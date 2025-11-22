// components/common/DateRangePills.js
"use client";
import React from "react";
import { applyDateRange } from "@/utils";

export default function DateRangePills({
  activeDateRange,
  setActiveDateRange,
  setStartDate,
  setEndDate,
  styles,
}) {
  const dateOptions = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Custom",
  ];

  const handleClick = (range) => {
    setActiveDateRange(range);
    const { start, end } = applyDateRange(range);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div style={styles.pillRow} className="d-flex flex-wrap mb-4">
      {dateOptions.map((range) => (
        <button
          key={range}
          style={styles.datePill(activeDateRange === range)}
          onClick={() => handleClick(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
// "use client";
// import React, { useState } from "react";
// import { format, startOfWeek, startOfMonth, subDays } from "date-fns";

// export default function DateRangeFilter({
//   options = ["Today", "Yesterday", "This Week", "This Month", "Custom"],
//   active,
//   onChange,
//   styles,
// }) {
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");

//   const handleSelect = (option) => {
//     let startDt, endDt;
//     const today = new Date();

//     switch (option) {
//       case "Today":
//         startDt = endDt = format(today, "yyyy-MM-dd");
//         break;
//       case "Yesterday":
//         startDt = endDt = format(subDays(today, 1), "yyyy-MM-dd");
//         break;
//       case "This Week":
//         startDt = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
//         endDt = format(today, "yyyy-MM-dd");
//         break;
//       case "This Month":
//         startDt = format(startOfMonth(today), "yyyy-MM-dd");
//         endDt = format(today, "yyyy-MM-dd");
//         break;
//       case "Custom":
//         startDt = customStart;
//         endDt = customEnd;
//         break;
//       default:
//         return;
//     }

//     if (startDt && endDt && new Date(startDt) > new Date(endDt)) {
//       alert("Start date must be before End date");
//       return;
//     }

//     onChange?.({ option, startDt, endDt });
//   };

//   return (
//     <div>
//       {options.map((option) => (
//         <button
//           key={option}
//           style={styles?.datePill(option === active)}
//           onClick={() => handleSelect(option)}
//         >
//           {option}
//         </button>
//       ))}

//       {active === "Custom" && (
//         <div style={{ marginTop: 10, display: "flex", gap: 12 }}>
//           <div>
//             <label style={{ fontWeight: 600 }}>Start Date</label>
//             <input
//               type="date"
//               value={customStart}
//               onChange={(e) => {
//                 setCustomStart(e.target.value);
//                 handleSelect("Custom");
//               }}
//             />
//           </div>
//           <div>
//             <label style={{ fontWeight: 600 }}>End Date</label>
//             <input
//               type="date"
//               value={customEnd}
//               onChange={(e) => {
//                 setCustomEnd(e.target.value);
//                 handleSelect("Custom");
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
