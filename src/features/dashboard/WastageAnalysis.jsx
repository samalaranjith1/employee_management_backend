
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaTrashAlt,
  FaBox,
  FaCalendarAlt,
  FaShoppingBag,
  FaDrumstickBite,
  FaLeaf,
  FaFish,
  FaAppleAlt,
  FaClock,
  FaUtensils,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function WastageAnalysis() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkScreen = () => setIsMobile(window.innerWidth < 768); // Bootstrap "md" breakpoint
      checkScreen();
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);
  const rawMaterialWastage = [
    {
      name: "Chicken Breast",
      category: "Poultry",
      qty: "12kg",
      price: 220,
      total: 2640,
      icon: <FaDrumstickBite />,
    },
    {
      name: "Basmati Rice",
      category: "Grains",
      qty: "8kg",
      price: 85,
      total: 680,
      icon: <FaLeaf />,
    },
    {
      name: "Fresh Salmon",
      category: "Seafood",
      qty: "5kg",
      price: 450,
      total: 2250,
      icon: <FaFish />,
    },
    {
      name: "Onions",
      category: "Vegetables",
      qty: "15kg",
      price: 35,
      total: 525,
      icon: <FaAppleAlt />,
    },
  ];

  const expiredItems = [
    {
      name: "Fresh Milk",
      category: "Dairy",
      qty: "10liters",
      price: 45,
      total: 450,
      date: "2025-01-05",
    },
    {
      name: "Yogurt Cups",
      category: "Dairy",
      qty: "24pieces",
      price: 8,
      total: 192,
      date: "2025-01-04",
    },
    {
      name: "Bread Loaves",
      category: "Bakery",
      qty: "6pieces",
      price: 25,
      total: 150,
      date: "2025-01-03",
    },
    {
      name: "Fresh Cheese",
      category: "Dairy",
      qty: "4kg",
      price: 95,
      total: 380,
      date: "2025-01-02",
    },
  ];

  const expiredProducts = [
    {
      name: "Chicken Biryani",
      category: "South Indian",
      price: 35,
      total: 280,
      qty: "8 portions",
      date: "2025-01-07",
    },
    {
      name: "Marinated Chicken",
      category: "Tandoor",
      price: 80,
      total: 240,
      qty: "3 kg",
      date: "2025-01-06",
    },
    {
      name: "Paneer Curry",
      category: "North Indian",
      price: 45,
      total: 225,
      qty: "5 portions",
      date: "2025-01-07",
    },
    {
      name: "Fried Rice",
      category: "Indo-Chinese",
      price: 60,
      total: 300,
      qty: "5 portions",
      date: "2025-01-07",
    },
  ];

  const cardStyle = {
    borderRadius: "20px",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    minWidth: "23vw",
    flex: "0 0 auto",
  };

  const statCard = (bg, icon, title, value, sub) => (
    <Card style={{ ...cardStyle, background: bg, color: "#fff" ,width:isMobile?'82vw':'23vw'}} >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>{title}</div>
          <h4 style={{ margin: "5px 0" }}>{value}</h4>
          {sub && <div style={{ fontSize: "13px", opacity: 0.8 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: "26px" }}>{icon}</div>
      </Card.Body>
    </Card>
  );

  const tableCardStyle = {
    ...cardStyle,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    height: "300px",
  };

  const scrollBodyStyle = {
    flex: 1,
    overflowY: "auto",
  };

  return (
    <Card fluid style={{ background: "#fff"}} className="p-3 m-2">
      <div className="mb-4">
        <h5 style={{ fontWeight: "600", color: "#0aa4b3" }}>
          <FaTrashAlt className="me-2" /> Wastage Analysis
        </h5>
        <p style={{ fontSize: "13px", color: "#666" }}>
          Track and minimize food waste across all categories
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {statCard(
          "linear-gradient(135deg,#9de8d4,#7cd1b8)",
          <FaExclamationTriangle />,
          "Total Wastage",
          "₹13,487"
        )}
        {statCard(
          "linear-gradient(135deg,#99dff5,#64c7e4)",
          <FaBox />,
          "Raw Material",
          "₹9,095",
          "8 items"
        )}
        {statCard(
          "linear-gradient(135deg,#a9b8ff,#7b8efc)",
          <FaCalendarAlt />,
          "Expired Items",
          "₹3,017",
          "6 items"
        )}
        {statCard(
          "linear-gradient(135deg,#b79cff,#9a7cf5)",
          <FaShoppingBag />,
          "Expired Products",
          "₹1,375",
          "5 products"
        )}
      </div>

      {/* Hide scrollbar for Webkit */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Tables */}
      <Row className="g-3 mt-3">
        <Col md={4}>
          <Card style={tableCardStyle}>
            <Card.Title className="d-flex align-items-center gap-2 mb-2">
              <FaBox style={{ color: "#00bcd4" }} /> Raw Material Wastage
            </Card.Title>
            <div style={scrollBodyStyle}>
              {rawMaterialWastage.map((item, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ fontSize: "20px", color: "#00bcd4" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: "500" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {item.category} • {item.qty} • ₹{item.price}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: "600" }}>₹{item.total}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={tableCardStyle}>
            <Card.Title className="d-flex align-items-center gap-2 mb-2">
              <FaClock style={{ color: "#3f51b5" }} /> Expired Items
            </Card.Title>
            <div style={scrollBodyStyle}>
              {expiredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                >
                  <div>
                    <div style={{ fontWeight: "500" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {item.category} • {item.qty} • ₹{item.price}
                    </div>
                    <div style={{ fontSize: "12px", color: "#3f51b5" }}>
                      Expired: {item.date}
                    </div>
                  </div>
                  <div style={{ fontWeight: "600" }}>₹{item.total}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={tableCardStyle}>
            <Card.Title className="d-flex align-items-center gap-2 mb-2">
              <FaUtensils style={{ color: "#7b1fa2" }} /> Expired Products
            </Card.Title>
            <div style={scrollBodyStyle}>
              {expiredProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                >
                  <div>
                    <div style={{ fontWeight: "500" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {item.category} • ₹{item.price}
                    </div>
                    <div style={{ fontSize: "12px", color: "#7b1fa2" }}>
                      Prepared: {item.date}
                    </div>
                  </div>
                  <div style={{ fontWeight: "600" }}>₹{item.total}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

// "use client";
// import React from "react";
// import { Card } from "react-bootstrap";
// import {
//   FaTrashAlt,
//   FaBox,
//   FaCalendarAlt,
//   FaShoppingBag,
//   FaDrumstickBite,
//   FaLeaf,
//   FaFish,
//   FaAppleAlt,
//   FaClock,
//   FaUtensils,
//   FaExclamationTriangle,
// } from "react-icons/fa";

// export default function WastageAnalysis() {
//   const rawMaterialWastage = [
//     {
//       name: "Chicken Breast",
//       category: "Poultry",
//       qty: "12kg",
//       price: 220,
//       total: 2640,
//       icon: <FaDrumstickBite />,
//     },
//     {
//       name: "Basmati Rice",
//       category: "Grains",
//       qty: "8kg",
//       price: 85,
//       total: 680,
//       icon: <FaLeaf />,
//     },
//     {
//       name: "Fresh Salmon",
//       category: "Seafood",
//       qty: "5kg",
//       price: 450,
//       total: 2250,
//       icon: <FaFish />,
//     },
//     {
//       name: "Onions",
//       category: "Vegetables",
//       qty: "15kg",
//       price: 35,
//       total: 525,
//       icon: <FaAppleAlt />,
//     },
//   ];

//   const expiredItems = [
//     {
//       name: "Fresh Milk",
//       category: "Dairy",
//       qty: "10liters",
//       price: 45,
//       total: 450,
//       date: "2025-01-05",
//     },
//     {
//       name: "Yogurt Cups",
//       category: "Dairy",
//       qty: "24pieces",
//       price: 8,
//       total: 192,
//       date: "2025-01-04",
//     },
//     {
//       name: "Bread Loaves",
//       category: "Bakery",
//       qty: "6pieces",
//       price: 25,
//       total: 150,
//       date: "2025-01-03",
//     },
//     {
//       name: "Fresh Cheese",
//       category: "Dairy",
//       qty: "4kg",
//       price: 95,
//       total: 380,
//       date: "2025-01-02",
//     },
//   ];

//   const expiredProducts = [
//     {
//       name: "Chicken Biryani",
//       category: "South Indian",
//       price: 35,
//       total: 280,
//       qty: "8 portions",
//       date: "2025-01-07",
//     },
//     {
//       name: "Marinated Chicken",
//       category: "Tandoor",
//       price: 80,
//       total: 240,
//       qty: "3 kg",
//       date: "2025-01-06",
//     },
//     {
//       name: "Paneer Curry",
//       category: "North Indian",
//       price: 45,
//       total: 225,
//       qty: "5 portions",
//       date: "2025-01-07",
//     },
//     {
//       name: "Fried Rice",
//       category: "Indo-Chinese",
//       price: 60,
//       total: 300,
//       qty: "5 portions",
//       date: "2025-01-07",
//     },
//   ];

//   const cardStyle = {
//     borderRadius: "20px",
//     padding: "20px",
//     background: "#fff",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     width:'30vw',
//     minWidth: "240px",
//     flex: "0 0 auto",
//   };

//   const statCard = (bg, icon, title, value, sub) => (
//     <Card style={{ ...cardStyle, background: bg, color: "#fff" }}>
//       <Card.Body className="d-flex align-items-center justify-content-between">
//         <div>
//           <div style={{ fontSize: "14px", opacity: 0.9 }}>{title}</div>
//           <h4 style={{ margin: "5px 0" }}>{value}</h4>
//           {sub && <div style={{ fontSize: "13px", opacity: 0.8 }}>{sub}</div>}
//         </div>
//         <div style={{ fontSize: "26px" }}>{icon}</div>
//       </Card.Body>
//     </Card>
//   );

//   const tableCardStyle = {
//     ...cardStyle,
//     padding: "10px",
//     display: "flex",
//     flexDirection: "column",
//     height: "300px",
//     flex: "0 0 auto",
//   };

//   const scrollBodyStyle = {
//     flex: 1,
//     overflowY: "auto",
//   };

//   return (
//     <Card fluid style={{ background: "#fff" }} className="p-3 m-2">
//       <div className="mb-4">
//         <h5 style={{ fontWeight: "600", color: "#0aa4b3" }}>
//           <FaTrashAlt className="me-2" /> Wastage Analysis
//         </h5>
//         <p style={{ fontSize: "13px", color: "#666" }}>
//           Track and minimize food waste across all categories
//         </p>
//       </div>

//       {/* Stat Cards - Horizontal scroll */}
//       <div
//         style={{
//           display: "flex",
//           gap: "15px",
//           overflowX: "auto",
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//       >
//         {statCard(
//           "linear-gradient(135deg,#9de8d4,#7cd1b8)",
//           <FaExclamationTriangle />,
//           "Total Wastage",
//           "₹13,487"
//         )}
//         {statCard(
//           "linear-gradient(135deg,#99dff5,#64c7e4)",
//           <FaBox />,
//           "Raw Material",
//           "₹9,095",
//           "8 items"
//         )}
//         {statCard(
//           "linear-gradient(135deg,#a9b8ff,#7b8efc)",
//           <FaCalendarAlt />,
//           "Expired Items",
//           "₹3,017",
//           "6 items"
//         )}
//         {statCard(
//           "linear-gradient(135deg,#b79cff,#9a7cf5)",
//           <FaShoppingBag />,
//           "Expired Products",
//           "₹1,375",
//           "5 products"
//         )}
//       </div>

//       {/* Hide scrollbar for Webkit */}
//       <style>
//         {`
//           div::-webkit-scrollbar {
//             display: none;
//           }
//           @media (max-width: 768px) {
//             .table-card {
//               width: 90vw;
//             }
//           }
//           @media (min-width: 769px) {
//             .table-card {
//               flex: 1;
//               min-width: 0;
//             }
//           }
//         `}
//       </style>

//       {/* Tables - Horizontal scroll on mobile */}
//       <div
//         style={{
//           display: "flex",
//           gap: "15px",
//           overflowX: "auto",
//           marginTop: "20px",
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//       >
//         {/* Raw Material Wastage */}
//         <Card style={tableCardStyle} className="table-card">
//           <Card.Title className="d-flex align-items-center gap-2 mb-2">
//             <FaBox style={{ color: "#00bcd4" }} /> Raw Material Wastage
//           </Card.Title>
//           <div style={scrollBodyStyle}>
//             {rawMaterialWastage.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="d-flex align-items-center justify-content-between py-2 border-bottom"
//               >
//                 <div className="d-flex align-items-center gap-3">
//                   <div style={{ fontSize: "20px", color: "#00bcd4" }}>
//                     {item.icon}
//                   </div>
//                   <div>
//                     <div style={{ fontWeight: "500" }}>{item.name}</div>
//                     <div style={{ fontSize: "12px", color: "#666" }}>
//                       {item.category} • {item.qty} • ₹{item.price}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Expired Items */}
//         <Card style={tableCardStyle} className="table-card">
//           <Card.Title className="d-flex align-items-center gap-2 mb-2">
//             <FaClock style={{ color: "#3f51b5" }} /> Expired Items
//           </Card.Title>
//           <div style={scrollBodyStyle}>
//             {expiredItems.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="d-flex align-items-center justify-content-between py-2 border-bottom"
//               >
//                 <div>
//                   <div style={{ fontWeight: "500" }}>{item.name}</div>
//                   <div style={{ fontSize: "12px", color: "#666" }}>
//                     {item.category} • {item.qty} • ₹{item.price}
//                   </div>
//                   <div style={{ fontSize: "12px", color: "#3f51b5" }}>
//                     Expired: {item.date}
//                   </div>
//                 </div>
//                 <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Expired Products */}
//         <Card style={tableCardStyle} className="table-card">
//           <Card.Title className="d-flex align-items-center gap-2 mb-2">
//             <FaUtensils style={{ color: "#7b1fa2" }} /> Expired Products
//           </Card.Title>
//           <div style={scrollBodyStyle}>
//             {expiredProducts.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="d-flex align-items-center justify-content-between py-2 border-bottom"
//               >
//                 <div>
//                   <div style={{ fontWeight: "500" }}>{item.name}</div>
//                   <div style={{ fontSize: "12px", color: "#666" }}>
//                     {item.category} • ₹{item.price}
//                   </div>
//                   <div style={{ fontSize: "12px", color: "#7b1fa2" }}>
//                     Prepared: {item.date}
//                   </div>
//                 </div>
//                 <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </Card>
//   );
// }
