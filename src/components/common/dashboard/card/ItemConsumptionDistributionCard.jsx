"use client";
import React from "react";
import CommonCard from "./CommonCard";
import '@/app/globals.css'
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function ItemConsumptionDistributionCard({
  summary,
  scrollRef,
}) {
  const { isMobile } = useDashboardContext();
  return (
    <div
      ref={scrollRef}
      className="d-flex gap-3 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {summary.map((item, idx) => (
        <div
          key={idx}
          className={isMobile ? "col-sm-12" : "col-md-3"}
          style={{
            // prevent shrinking in the horizontal scroll container
            flex: "0 0 auto",
            // mobile: take ~88vw so it looks full-width with some padding
            width: isMobile ? "88vw" : undefined,
            minWidth: isMobile ? "88vw" : undefined,
            // ensure full width on desktop column if needed
            maxWidth: isMobile ? "88vw" : undefined,
          }}
        >
          <div
            style={{
              backgroundColor: item.color,
              padding: "15px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              {/* Column 1: stacked text */}
              <div className="d-flex flex-column" style={{ gap: 4 }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6d6d6d",
                    paddingBottom: "10px",
                  }}
                >
                  {item.label}
                </div>
                <p
                  className="c_black_2 c_small_text_extra_bold"
                  style={{ fontSize: "24px", margin: 0 }}
                >
                  {item.value}
                </p>
                <div style={{ fontSize: "12px", color: item.textColor }}>
                  {item.amount}
                </div>
              </div>

              {/* Column 2: icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  marginTop: "10px",
                  marginLeft: "auto",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// "use client";
// import React from "react";
// import CommonCard from "./CommonCard";
// import '@/app/globals.css'
// import { useDashboardContext } from "@/contexts/DashboardContext";
// export default function ItemConsumptionDistributionCard({
//   summary,
//   scrollRef,
// }) {
//   const { isMobile } = useDashboardContext()
//   return (
//     <div
//       ref={scrollRef}
//       className="d-flex gap-3 mb-4"
//       style={{
//         overflowX: "auto",
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//       }}
//     >
//       {summary.map((item, idx) => (
//         <div
//           className={isMobile ? "col-sm-12 w-100" : "col-md-3"}

//         // style={{
//         //   width: "100%",
//         //   maxWidth: "88vw", // makes xcard take 88% width on mobile
//         // }}
//         >
//           <div
//             style={{
//               backgroundColor: item.color,
//               padding: "15px",
//               borderRadius: "10px",
//             }}
//           >
//             <div className="d-flex items-center justify-between">
//               {/* Column 1: stacked text */}
//               <div className="flex flex-col" style={{ gap: 4 }}>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     color: "#6d6d6d",
//                     paddingBottom: "10px",
//                   }}
//                 >
//                   {item.label}
//                 </div>
//                 <p
//                   className="c_black_2 c_small_text_extra_bold"
//                   style={{ fontSize: "24px" }}
//                 >
//                   {item.value}
//                 </p>
//                 <div style={{ fontSize: "12px", color: item.textColor }}>
//                   {item.amount}
//                 </div>
//               </div>

//               {/* Column 2: icon */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 12,
//                   width: 48,
//                   height: 48,
//                   flexShrink: 0,
//                   marginTop: "10px",
//                   marginLeft: "auto",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "#fff",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {item.icon}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

      
//       ))}
//     </div>
//   );
// }
// "use client";
// import React from "react";
// import CommonCard from "./CommonCard";
// import '@/app/globals.css'
// import { useDashboardContext } from "@/contexts/DashboardContext";
// export default function ItemConsumptionDistributionCard({
//   summary,
//   scrollRef,
// }) {
//   const { isMobile } = useDashboardContext()
//   return (
//     <div
//       ref={scrollRef}
//       className="d-flex gap-3 mb-4"
//       style={{
//         overflowX: "auto",
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//       }}
//     >
//       {summary.map((item, idx) => (
//         <div
//           className={isMobile ? "col-sm-12 w-100" : "col-md-3"}

//         // style={{
//         //   width: "100%",
//         //   maxWidth: "88vw", // makes xcard take 88% width on mobile
//         // }}
//         >
//           <div
//             style={{
//               backgroundColor: item.color,
//               padding: "15px",
//               borderRadius: "10px",
//             }}
//           >
//             <div className="d-flex items-center justify-between">
//               {/* Column 1: stacked text */}
//               <div className="flex flex-col" style={{ gap: 4 }}>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     color: "#6d6d6d",
//                     paddingBottom: "10px",
//                   }}
//                 >
//                   {item.label}
//                 </div>
//                 <p
//                   className="c_black_2 c_small_text_extra_bold"
//                   style={{ fontSize: "24px" }}
//                 >
//                   {item.value}
//                 </p>
//                 <div style={{ fontSize: "12px", color: item.textColor }}>
//                   {item.amount}
//                 </div>
//               </div>

//               {/* Column 2: icon */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 12,
//                   width: 48,
//                   height: 48,
//                   flexShrink: 0,
//                   marginTop: "10px",
//                   marginLeft: "auto",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "#fff",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {item.icon}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         //   <div
//         //   style={{
//         //     backgroundColor:item.color,
//         //     padding:'15px',
//         //     borderRadius:'10px'
//         //   }}
//         //   className="col-md-3 col-sm-6"
//         //   // minWidth="280px"
//         //   // style={{ flex: "0 0 auto" }}
//         // >
//         //   <div
//         //     className="d-flex items-center justify-between"
//         //   >
//         //     {/* Column 1: stacked text */}
//         //     <div className="flex flex-col" style={{ gap: 4 }}>
//         //       <div style={{ fontSize: "14px", color: "#6d6d6d",paddingBottom:'10px' }}
//         //        >{item.label}</div>
//         //       <p className="c_black_2 c_small_text_extra_bold" style={{fontSize:'24px'}}>{item.value}</p>
//         //       <div style={{ fontSize: "12px", color: `${item.textColor}` }}>{item.amount}</div>
//         //     </div>

//         //     {/* Column 2: icon (centered) with dark bg */}
//         //     <div
//         //       style={{
//         //         display: "flex",
//         //         alignItems: 'center',
//         //         justifyContent: "center",
//         //         borderRadius: 12,
//         //         width: 48,
//         //         height: 48,
//         //         flexShrink: 0,
//         //         marginTop:"+10px",
//         //         marginLeft: 'auto',// prevents icon box from shrinking
//         //       }}
//         //     >
//         //       {/* ensure icon inherits white color */}
//         //       <span style={{ color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
//         //         {item.icon}
//         //       </span>
//         //     </div>
//         //   </div>
//         // </div>
//       ))}
//     </div>
//   );
// }
