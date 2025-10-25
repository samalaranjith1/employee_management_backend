"use client";
import React, { useEffect } from "react";
import DurationFilters from "@/features/dashboard/DurationFilters"; // ✅ use DateFilter directly
import "./navbar.module.css";
import "@/app/globals.css";
import MobileDurationFilters from "@/features/dashboard/MobileDurationFilter";
import { useDashboardContext } from "@/contexts/DashboardContext";

const SecondNavBar = ({ tabs, activeTab, setActiveTab, useAppContext }) => {
  const { isMobile } = useDashboardContext()
  return (
    <div
      className="scrollmenu"
      style={{
        display: "flex",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
        width: "99.2%",
        whiteSpace: "nowrap",
        msOverflowStyle: "none",
        boxShadow: "2px 2px 6px gray",
      }}
    >
      {/* ✅ Tabs container */}
      <div
        className="tabs-wrapper"
        style={{
          display: "flex",
          flex: isMobile?"0 0 80vw":'', // occupy 85% of viewport width on mobile
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {tabs.map((label) => (
          <div
            key={label}
            onClick={() => setActiveTab(label)}
            className={`dashboard-tab ${activeTab === label
                ? "c_normal_text_extra_bold c_black_1"
                : "c_normal_text_regular c_gray_3"
              }`}
            aria-pressed={activeTab === label}
            type="button"
            style={{
              flex: "0 0 auto",
              padding: "10px 16px",
              borderBottom:
                activeTab === label
                  ? "3px solid red"
                  : "3px solid transparent",
              boxSizing: "border-box",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* ✅ Desktop Duration Filter (unchanged) */}
      <div
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        className="mt-1 d-none d-md-flex"
      >
        <DurationFilters useAppContext={useAppContext} />
      </div>

      {/* ✅ Mobile Duration Filter (now fixed width on right) */}
      <div
        style={{
          flex: "0 0 20vw", // remaining 15%
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginLeft: "-30px",
        }}
        className="mt-1 d-md-none d-flex"
      >
        <MobileDurationFilters useAppContext={useAppContext} />
      </div>
    </div>

    // <div
    //   className="scrollmenu"
    //   style={{
    //     display: "flex",
    //     overflowX: "auto",
    //     WebkitOverflowScrolling: "touch",
    //     scrollbarWidth: "none",
    //     scrollBehavior: "smooth",
    //     width: "99.2%",
    //     whiteSpace: "nowrap",
    //     msOverflowStyle: "none",
    //     boxShadow: "2px 2px 6px gray",
    //   }}
    // >
    //   {tabs.map((label) => (
    //     <div
    //       key={label}
    //       onClick={() => setActiveTab(label)
    //       }
    //       className={`dashboard-tab ${activeTab === label ? "c_normal_text_extra_bold c_black_1" : "c_normal_text_regular c_gray_3"}`}
    //       aria-pressed={activeTab === label}
    //       type="button"
    //       style={{
    //         flex: "0 0 auto",
    //         padding: "10px 16px",
    //         borderBottom:
    //           activeTab === label ? "3px solid red" : "3px solid transparent",
    //         boxSizing: "border-box",
    //       }}
    //     >
    //       {label}
    //     </div>
    //   ))}

    //   {/* ✅ Correct component to hook into context */}
    //   <div
    //     style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
    //     className="mt-1 d-none d-md-flex"
    //   >
    //     <DurationFilters useAppContext={useAppContext}/>
    //   </div>
    //   <div
    //     style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
    //     className="mt-1 d-md-none d-sm-flex"
    //   >
    //     <MobileDurationFilters useAppContext={useAppContext}/>
    //   </div>
    // </div>
  );
};

export default SecondNavBar;
// "use client"
// import React, { useEffect, useState } from 'react';
// import DurationFilters from "@/features/dashboard/DurationFilters";
// import './navbar.module.css'; // ensure your CSS file is imported

// const SecondNavBar = ({ activeTab, setActiveTab }) => {
//   const tabs = [
//     "Dashboard",
//     "Sales",
//     "Consumption",
//     "Closing",
//     "Purchase",
//     "Recipe",
//     "Stock",
//     "Item Price",
//     "Wastage"
//   ];

//   // State to track window width for responsive DurationFilters display
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div
//       className="scrollmenu"
//       style={{
//         display: "flex",
//         overflowX: "auto",
//         WebkitOverflowScrolling: "touch",
//         scrollbarWidth: "none",
//         scrollBehavior: "smooth",
//         width: "100%",
//         // backgroundColor: "#e5e4f3ff",
//         whiteSpace: "nowrap",
//         msOverflowStyle: "none",
//         boxShadow: "2px 2px 6px gray" // hide scrollbar for IE and Edge
//       }}
//     >
//       {tabs.map((label) => (
//         <div
//           key={label}
//           onClick={() => setActiveTab(label)}
//           className={`dashboard-tab ${activeTab === label ? "active" : ""}`}
//           aria-pressed={activeTab === label}
//           type="button"
//           style={{
//             flex: "0 0 auto",
//             padding: "10px 16px", // balanced padding
//             borderBottom: activeTab === label ? "3px solid red" : "3px solid transparent", // reserve space always
//             boxSizing: "border-box" // ensures padding + border inside total size
//           }}
//         >
//           {label}
//         </div>

//       ))}
//       <div style={{ marginLeft: "auto", display: "flex" }} className='d-none d-md-flex mt-1'>
//         <DurationFilters />
//       </div>

//     </div>
//   );
// };

// export default SecondNavBar;
