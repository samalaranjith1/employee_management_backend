"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommonCard from "./CommonCard";
import { handleNavigation } from "@/utils";
import { useDashboardContext } from "@/contexts/DashboardContext";
import "@/app/globals.css";

export default function ConsumptionCard({
  title,
  percentage,
  percentageChange,
  icon,
  textColor,
  bgColor,
  rows,
  routeUrl,
  params = {},
}) {
  const { dashboardFilter,startDate,endDate } = useDashboardContext();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) return null;

  return (
    <div
      onClick={() =>
        handleNavigation({
          router,
          url: `sp/${routeUrl}`,
          params: { startDate: startDate, endDate: endDate ,departments:'2'},
        })
      }
      style={{ cursor: "pointer"}}
      className="col-md-4"
    >
      <CommonCard
        bgColor={bgColor}
        style={{
          // minWidth: isMobile ? "88vw" : "31.5vw",
          minWidth: isMobile ? "88%" : "98%", 
          flexShrink: 0,
          borderRadius: "12px",
          // border: "0.1px solid #c0bfc7", // Medium gray border like Figma
          backgroundColor: bgColor || "#faf8f7", // Pastel background close to Figma
          // color: textColor || "#000000",
          boxShadow: "none", // Remove drop shadow, use subtle border
          cursor: "pointer",
          // padding: "16px 20px", // Consistent padding
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h6
              className="c_small_text_semi_bold c_gray_3"
              style={{
                letterSpacing: "0.05em",
              }}
            >
              {title}
            </h6>
            <h4
              className="fw-bold mb-0"
              style={{
                color: "#000000",
                lineHeight: 1.1,
              }}
            >
              {percentage}
            </h4>
          </div>
          <div>{icon}</div>
        </div>

        <ul className="list-unstyled mt-3">
          {rows.map((row, idx) => (
            <li
              key={idx}
              className="d-flex justify-content-between align-items-center mb-1 rounded p-1 c_small_text_regular"
              style={{
                backgroundColor: row.highlightBg || "transparent",
                color: "black",
              }}
            >
              <span
                // className="text-secondary"
                style={{
                  color: textColor,
                  // fontWeight: "bold",
                }}
              >
                {row.label}
              </span>
              <span className="fw-bold" >
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </CommonCard>
    </div>
  );
}
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import CommonCard from "./CommonCard";
// import { handleNavigation } from "@/utils";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// export default function ConsumptionCard({
//   title,
//   percentage,
//   percentageChange,
//   icon,
//   textColor,
//   bgColor,
//   rows,
//   routeUrl,
//   params = {},
// }) {
//   const { dashboardFilter,startDate,endDate } = useDashboardContext();
//   const [isClient, setIsClient] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
//     setIsMobile(window.innerWidth <= 768);

//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!isClient) return null;

//   return (
//     <div
//       onClick={() =>
//         handleNavigation({
//           router,
//           url: `sp/${routeUrl}`,
//           params: { startDate: startDate, endDate: endDate ,departments:'2'},
//         })
//       }
//       style={{ cursor: "pointer" }}
//     >
//       {/* <CommonCard
//         bgColor={bgColor}
//         textColor={textColor}
//         style={{
//           minWidth: isMobile ? "88vw" : "30vw",
//           flexShrink: 0,
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           border: "2px solid gray",
//           backgroundColor: bgColor || "#fff",
//           color: textColor || "#000",
//           cursor: "pointer",
//         }}
//       >
//        */}
//       <CommonCard
//         bgColor={bgColor}
//         style={{
//           minWidth: isMobile ? "88vw" : "30vw",
//           flexShrink: 0,
//           borderRadius: "12px",
//           border: "1.5px solid #c0bfc7", // Medium gray border like Figma
//           backgroundColor: bgColor || "#faf8f7", // Pastel background close to Figma
//           color: textColor || "#000000",
//           boxShadow: "none", // Remove drop shadow, use subtle border
//           cursor: "pointer",
//           padding: "16px 20px", // Consistent padding
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <div>
//             <h6
//               className="text-uppercase fw-bold"
//               style={{
//                 fontSize: "0.8rem",
//                 letterSpacing: "0.05em",
//                 color: "#a1a1a1", // Muted gray color for heading
//               }}
//             >
//               {title}
//             </h6>
//             <h4
//               className="fw-bold mb-0"
//               style={{
//                 fontSize: "1.5rem",
//                 color: textColor || "#000000",
//                 lineHeight: 1.1,
//               }}
//             >
//               {percentage}
//             </h4>
//           </div>
//           <div>{icon}</div>
//         </div>

//         <ul className="list-unstyled mt-3">
//           {rows.map((row, idx) => (
//             <li
//               key={idx}
//               className="d-flex justify-content-between align-items-center mb-1 rounded p-1"
//               style={{
//                 backgroundColor: row.highlightBg || "transparent",
//                 color: "black",
//               }}
//             >
//               <span
//                 // className="text-secondary"
//                 style={{
//                   fontSize: "0.9rem",
//                   color: textColor,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {row.label}
//               </span>
//               <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
//                 {row.value}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </CommonCard>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import CommonCard from "./CommonCard";

// export default function ConsumptionCard({
//   title,
//   percentage,
//   percentageChange,
//   icon,
//   textColor,
//   bgColor,
//   rows,
// }) {
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//       const handleResize = () => setIsMobile(window.innerWidth < 768);
//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }, []);
//   return (
//     <CommonCard
//       bgColor={bgColor}
//       textColor={textColor}
//       style={{
//         minWidth: isMobile?"88vw":"30vw",
//         flexShrink: 0,
//         borderRadius: "12px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         border: "2px solid gray",
//         backgroundColor: bgColor || "#fff",
//         color: textColor || "#000",
//       }}
//     >
//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <div>
//           <h6
//             className="text-secondary fw-bold text-uppercase"
//             style={{ fontSize: "0.8rem" }}
//           >
//             {title}
//           </h6>
//           <h4 className="fw-bold mb-0">{percentage}</h4>
//           {/* <span className="text-success fw-bold" style={{ fontSize: "0.9rem" }}>
//             {percentageChange}
//           </span> */}
//         </div>
//         <div>{icon}</div>
//       </div>
//       <ul className="list-unstyled mt-3">
//         {rows.map((row, idx) => (
//           <li
//             key={idx}
//             className="d-flex justify-content-between align-items-center mb-1 rounded p-1"
//             style={{
//               backgroundColor: row.highlightBg || "transparent",
//               color: "black",
//             }}
//           >
//             <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
//               {row.label}
//             </span>
//             <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
//               {row.value}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </CommonCard>
//   );
// }
