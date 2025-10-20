"use client";
import React from "react";
import CommonCard from "./CommonCard";
import "@/app/globals.css";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function ProductPerformanceSummaryCards({
  summary,
  cardsContainerRef,
}) {
  const { isMobile } = useDashboardContext();

  return (
    <div
      ref={cardsContainerRef}
      className="d-flex gap-3 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        paddingBottom: "10px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {summary.map(
        ({ label, value, amount, bgColor, textColor, description, icon }, idx) => (
          <div
            key={idx}
            style={{
              flex: isMobile ? "0 0 100%" : "0 0 auto", // ✅ Full width on mobile
              minWidth: isMobile ? "100%" : "290px", // ensures consistent card width
              maxWidth: isMobile ? "100%" : "300px",
            }}
          >
            <div
              style={{
                backgroundColor: bgColor,
                borderRadius: "12px",
                padding: "5px",
              }}
            >
              <div className="d-flex align-items-center justify-content-between p-2">
                {/* Column 1: Label + Value + Amount */}
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#6d6d6d",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      marginTop: 4,
                      color: "#232425",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      marginTop: 2,
                      color: textColor,
                    }}
                  >
                    {description}
                  </div>
                </div>

                {/* Column 2: Icon */}
                <div>{icon}</div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
// "use client";
// import React from "react";
// import CommonCard from "./CommonCard";
// import '@/app/globals.css';
// import { useDashboardContext } from "@/contexts/DashboardContext";

// export default function ProductPerformanceSummaryCards({
//   summary,
//   cardsContainerRef,
// }) {
//   const {isMobile} = useDashboardContext()
//   return (
//     <div
//       ref={cardsContainerRef}
//       className="d-flex gap-3 mb-4"
//       style={{
//         overflowX: "auto",
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//         paddingBottom: "10px",
//         WebkitOverflowScrolling: "touch",
//       }}
//     >
//       {summary.map(({ label, value, amount, bgColor, textColor, description, icon }, idx) => (
//         <div className={isMobile?"col-sm-12":'col-sm-12'}>
//           <div
//           style={{
//             backgroundColor:bgColor,
//             borderRadius:"12px",
//             padding:"5px"
//           }}
//         >
//           <div className="d-flex align-items-center justify-content-between p-2">
//             {/* Column 1: Label + Value + Amount */}
//             <div>
//               <div style={{ fontSize: "14px", fontWeight: 600,color:'#6d6d6d' }}>{label}</div>
//               <div style={{ fontSize: "24px", fontWeight: "800", marginTop: 4 ,color:"#232425"}}>
//                 {value}
//               </div>
//               <div style={{ fontSize: "12px", marginTop: 2, color: textColor }}>{description}</div>
//             </div>

//             {/* Column 2: Icon */}
//             <div>
//               {icon}
//             </div>
//           </div>

//           {/* <div style={{ fontSize: "14px", fontWeight: 600 }}>{label}</div>
//           <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: 4 }}>
//             {value}
//           </div>
//           <div style={{ fontSize: "14px", marginTop: 2 }}>{amount}</div> */}
//         </div>
//           </div>
//       ))}
//     </div>
//   );
// }
