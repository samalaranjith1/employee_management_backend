"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
  Container,
  Button,
  Col,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import {
  FaBell,
  FaUserCircle,
  FaStore,
  FaBars,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import NavPanel from "./NavPanel";
import Profile from "./Profile";
import styles from "./Header.module.css";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { IconBell, IconChefHat, IconChefHatFilled, IconMapPin, IconMenu2 } from "@tabler/icons-react";

// 🔹 Reusable debounce hook
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function Header() {
  const router = useRouter();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState("/");
  const [isMobile, setMobile] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 600);

  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

  useEffect(() => {
    const updateMinWidth = () => setMobile(window.innerWidth < 900);
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  const handleNavClick = (path) => {
    setActiveTab(path);
    window.location.href = path;
  };

  // 🔹 Debounced API Search
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://flavourheaven.in/costonomy-services/outlet/1/search?q=${encodeURIComponent(
            debouncedSearch
          )}&limit=10`
        );
        const data = await response.json();
        setSearchResults(data || []);
        setShowResults(true);
      } catch (err) {
        console.error("Search API error:", err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  const navItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/insights", label: "Actionable Insights" },
  ];

  const renderSearchResults = () => (
    <ListGroup
      className="searchDropdown"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "#fff",
        zIndex: 1050,
        border: "1px solid #ddd",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      {loading && (
        <ListGroup.Item className="text-center text-muted">
          Searching...
        </ListGroup.Item>
      )}

      {!loading &&
        showResults &&
        searchResults.length === 0 &&
        debouncedSearch && (
          <ListGroup.Item className="text-center text-muted">
            No results found
          </ListGroup.Item>
        )}

      {!loading &&
        searchResults.map((result, idx) => (
          <ListGroup.Item
            key={idx}
            action
            className="d-flex justify-content-between align-items-center"
            onClick={() =>
              handleNavigation({
                router,
                url: `/${result?.redirectUrl?.match(/[a-zA-Z]/g).join("")}s`,
                params: {
                  items: result?.redirectUrl?.match(/\/(\d+)$/),
                  products: result?.redirectUrl?.match(/\/(\d+)$/),
                  suppliers: result?.redirectUrl?.match(/\/(\d+)$/),
                  departments: result?.redirectUrl?.match(/\/(\d+)$/),
                },
              })
            }
            style={{ cursor: "pointer" }}
          >
            <span>{result?.name || result?.title}</span>
            <small className="text-primary">{result?.type || ""}</small>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );

  return (
    <div className={styles.headerFix} style={{ maxWidth: '900px', width: '100%' }}>
      <Navbar expand="lg" className={`${styles.navbar} px-3 shadow-sm headerFix`}>

        <Container fluid className="align-items-center justify-content-between">
          {/* Left Section */}
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="link"
              className={`${styles.buttonIcon} p-0`}
              onClick={() => setShowNavPanel(true)}
            >
              <div style={{
                padding: '8px',
                borderRadius: '50%',
                border: '0.1px solid #eee',

              }}>
                <IconMenu2 size={24} strokeWidth={2} />
              </div>
            </Button>

            <Navbar.Brand href="/" className={styles.brand}>
              <div style={{
                backgroundColor: '#FF5D00',
                padding: '4px',
                borderRadius: '12px', // optional, for rounded background
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="d-none d-lg-flex">
                <IconChefHatFilled size={20} color="white" />
              </div>

              <span style={{ color: '#FF6000', fontSize: '16px', fontWeight: '700', fontFamily: 'Montserrat' }}>Costonomy</span>
            </Navbar.Brand>
          </div>

          {/* Center Nav */}
          <Col
            md={4}
            className="d-none d-md-flex justify-content-center align-items-center"
          >
            <Nav className={styles.navLinksContainer}>
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setHoveredTab(item.path)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`${styles.navLink} ${activeTab === item.path ? styles.navLinkActive : ""
                    }`}
                  style={{
                    color:
                      activeTab === item.path
                        ? "#fff"
                        : hoveredTab === item.path
                          ? "#ff7a30"
                          : "#999",
                  }}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          {/* Right Section */}
          <div className={styles.rightSection} style={{ position: "relative" }}>
            {!isMobile ? (
              // <div style={{ position: "relative", width: "250px" }}>
              //   <Form className="d-none d-lg-flex">
              //     <FormControl
              //       type="search"
              //       placeholder="Search..."
              //       className={styles.formControlSearch}
              //       value={searchQuery}
              //       onChange={(e) => setSearchQuery(e.target.value)}
              //       onFocus={() => setShowResults(true)}
              //       onBlur={() =>
              //         setTimeout(() => setShowResults(false), 200)
              //       }
              //     />
              //   </Form>

              //   {showResults && renderSearchResults()}
              // </div>
              <Button
                variant="link"
                className={`${styles.buttonIcon} p-0 `}
                onClick={toggleMobileSearch}
              >
                <FaSearch size={18} />
              </Button>
            ) : (
              <>
                <Button
                  variant="link"
                  className={`${styles.buttonIcon} p-0 d-lg-none`}
                  onClick={toggleMobileSearch}
                >
                  <FaSearch size={18} />
                </Button>
              </>
            )}

            {/* Outlet Dropdowns */}
            <Dropdown
              align="end"
              className={`${styles.dropdownWrapper} d-none d-lg-flex`}
            >
              <Dropdown.Toggle className={styles.dropdownToggle}>
                <div style={{
                  backgroundColor: '#FFF4ED',
                  padding: '8px',
                  border: '1px solid #eee',
                  borderRadius: '50%',
                  color: '#ff6000'
                }}>
                  <IconMapPin size={20} stroke={2} color="#ff6000" />
                </div>
                {/* <span className={styles.outletDot} /> */}
                <span className="fw-medium">Mumbai Central</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Mumbai Central</Dropdown.Item>
                <Dropdown.Item>Outlet 2</Dropdown.Item>
                <Dropdown.Item>Outlet 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end" className="d-lg-none">
              <Dropdown.Toggle
                variant="link"
                className="text-dark p-0 border-0"
                style={{ boxShadow: "none" }}
              >
                <FaStore size={18} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Outlet 1</Dropdown.Item>
                <Dropdown.Item>Outlet 2</Dropdown.Item>
                <Dropdown.Item>Outlet 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant="link"
              className={`${styles.buttonIcon} me-2 p-0 d-none d-lg-flex`}
            >
              <div style={{
                  backgroundColor: '#fff',
                  padding: '8px',
                  border: '1px solid #eee',
                  borderRadius: '50%',
                }}>
                {/* <span className={styles.outletDot} /> */}
                  <IconBell size={24} stroke={2} />
                </div>
            </Button>

            {/* <Button
              variant="link"
              className={`${styles.buttonIcon} p-0`}
              onClick={() => setShowProfilePanel(true)}
            >
              <FaUserCircle size={24} />
            </Button> */}
          </div>
        </Container>
      </Navbar>

      {/* Mobile Search Overlay Below Navbar */}
      <div style={{ position: 'relative', width: '100%' }}>
        {showMobileSearch && (
        <div
          className={styles.mobileSearchBar}
          style={{
            position: "absolute",
            top: "56px", // just below navbar
            // left: 0,
            // right: 0,
            background: "#fff",
            zIndex: 1100,
            padding: "8px 16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <Form className="d-flex mb-2">
            <FormControl
              type="search"
              placeholder="Search..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setShowMobileSearch(false)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowMobileSearch(false)}
            >
              Close
            </Button>
          </Form>
          {showResults && renderSearchResults()}
        </div>
      )}
      </div>

      {/* Panels */}
      <Offcanvas
        show={showNavPanel}
        onHide={() => setShowNavPanel(false)}
        style={{ width: "280px" }}
      >
        <NavPanel onSelect={() => setShowNavPanel(false)} />
      </Offcanvas>

      <Offcanvas
        show={showProfilePanel}
        onHide={() => setShowProfilePanel(false)}
        style={{ width: "280px" }}
        placement="end"
      >
        <Profile onSelect={() => setShowProfilePanel(false)} />
      </Offcanvas>
    </div>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   Nav,
//   Form,
//   FormControl,
//   Dropdown,
//   Container,
//   Button,
//   Col,
//   Offcanvas,
//   ListGroup,
// } from "react-bootstrap";
// import {
//   FaBell,
//   FaUserCircle,
//   FaStore,
//   FaBars,
//   FaSearch,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import NavPanel from "./NavPanel";
// import Profile from "./Profile";
// import styles from "./Header.module.css";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";

// // 🔹 Reusable debounce hook
// function useDebounce(value, delay = 500) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }

// export default function Header() {
//   const router = useRouter()
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [showNavPanel, setShowNavPanel] = useState(false);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const [activeTab, setActiveTab] = useState("/");
//   const [isMobile, setMobile] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const debouncedSearch = useDebounce(searchQuery, 600);

//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

//   useEffect(() => {
//     const updateMinWidth = () => setMobile(window.innerWidth < 900);
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);

//   useEffect(() => {
//     setActiveTab(window.location.pathname);
//   }, []);

//   const handleNavClick = (path) => {
//     setActiveTab(path);
//     window.location.href = path;
//   };

//   // 🔹 Debounced API Search
//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!debouncedSearch) {
//         setSearchResults([]);
//         setShowResults(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://flavourheaven.in/costonomy-services/outlet/1/search?q=${encodeURIComponent(
//             debouncedSearch
//           )}&limit=10`
//         );
//         const data = await response.json();
//         setSearchResults(data || []); // depends on API response format
//         setShowResults(true);
//       } catch (err) {
//         console.error("Search API error:", err);
//         setSearchResults([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [debouncedSearch]);

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/insights", label: "Actionable Insights" },
//   ];

//   return (
//     <Navbar expand="lg" className={`${styles.navbar} px-3 shadow-sm`}>
//       <Container fluid className="align-items-center justify-content-between">
//         {/* Left Section */}
//         <div className="d-flex align-items-center gap-3">
//           <Button
//             variant="link"
//             className={`${styles.buttonIcon} p-0`}
//             onClick={() => setShowNavPanel(true)}
//           >
//             <FaBars />
//           </Button>

//           <Navbar.Brand href="/" className={styles.brand}>
//             <FaStore size={24} className="d-none d-lg-flex" />
//             <span>Costonomy</span>
//           </Navbar.Brand>
//         </div>

//         {/* Center Nav */}
//         <Col
//           md={4}
//           className="d-none d-md-flex justify-content-center align-items-center"
//         >
//           <Nav className={styles.navLinksContainer}>
//             {navItems.map((item) => (
//               <Nav.Link
//                 key={item.path}
//                 onClick={() => handleNavClick(item.path)}
//                 onMouseEnter={() => setHoveredTab(item.path)}
//                 onMouseLeave={() => setHoveredTab(null)}
//                 className={`${styles.navLink} ${activeTab === item.path ? styles.navLinkActive : ""
//                   }`}
//                 style={{
//                   color:
//                     activeTab === item.path
//                       ? "#fff"
//                       : hoveredTab === item.path
//                         ? "#ff7a30"
//                         : "#999",
//                 }}
//               >
//                 {item.label}
//               </Nav.Link>
//             ))}
//           </Nav>
//         </Col>

//         {/* Right Section */}
//         <div className={styles.rightSection} style={{ position: "relative" }}>
//           {!isMobile ? (
//             <div style={{ position: "relative", width: "250px" }}>
//               <Form className="d-none d-lg-flex">
//                 <FormControl
//                   type="search"
//                   placeholder="Search..."
//                   className={styles.formControlSearch}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={() => setShowResults(true)}
//                   onBlur={() => setTimeout(() => setShowResults(false), 200)}
//                 />
//               </Form>

//               {/* 🔹 Search Results Dropdown */}
//               {showResults && (
//                 <ListGroup
//                   className="searchDropdown"
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     right: 0,
//                     background: "#fff",
//                     zIndex: 1050,
//                     border: "1px solid #ddd",
//                     maxHeight: "300px",
//                     overflowY: "auto",
//                   }}
//                 >
//                   {loading && (
//                     <ListGroup.Item className="text-center text-muted">
//                       Searching...
//                     </ListGroup.Item>
//                   )}

//                   {!loading && showResults && searchResults.length === 0 && debouncedSearch && (
//                     <ListGroup.Item className="text-center text-muted">
//                       No results found
//                     </ListGroup.Item>
//                   )}

//                   {!loading &&
//                     searchResults.map((result, idx) => (
//                       <ListGroup.Item
//                         key={idx}
//                         action
//                         className="d-flex justify-content-between align-items-center"
//                         onClick={() =>
//                           handleNavigation({
//                             router,
//                             url: `/${result?.redirectUrl?.match(/[a-zA-Z]/g).join('')}s`,
//                             params: { items: result?.redirectUrl?.match(/\/(\d+)$/),
//                               products: result?.redirectUrl?.match(/\/(\d+)$/),
//                               suppliers: result?.redirectUrl?.match(/\/(\d+)$/),
//                               departments: result?.redirectUrl?.match(/\/(\d+)$/),
//                             },
//                           })
//                         }
//                         style={{ cursor: "pointer" }}
//                       >
//                         <span>{result?.name || result?.title}</span>
//                         <small className="text-primary" >
//                           {result?.type || ""}
//                         </small>
//                       </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//               )}
//             </div>
//           ) : (
//             <Button
//               variant="link"
//               className={`${styles.buttonIcon} p-0 d-lg-none`}
//               onClick={toggleMobileSearch}
//             >
//               <FaSearch size={18} />
//             </Button>
//           )}

//           {/* Outlet Dropdowns */}
//           <Dropdown
//             align="end"
//             className={`${styles.dropdownWrapper} d-none d-lg-flex`}
//           >
//             <Dropdown.Toggle className={styles.dropdownToggle}>
//               <FaMapMarkerAlt className={styles.navbarIcon} />
//               <span className={styles.outletDot} />
//               <span className="fw-medium">Mumbai Central</span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>Mumbai Central</Dropdown.Item>
//               <Dropdown.Item>Outlet 2</Dropdown.Item>
//               <Dropdown.Item>Outlet 3</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           <Dropdown align="end" className="d-lg-none">
//             <Dropdown.Toggle
//               variant="link"
//               className="text-dark p-0 border-0"
//               style={{ boxShadow: "none" }}
//             >
//               <FaStore size={18} />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>Outlet 1</Dropdown.Item>
//               <Dropdown.Item>Outlet 2</Dropdown.Item>
//               <Dropdown.Item>Outlet 3</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           <Button
//             variant="link"
//             className={`${styles.buttonIcon} me-2 p-0 d-none d-lg-flex`}
//           >
//             <FaBell size={20} />
//           </Button>

//           <Button
//             variant="link"
//             className={`${styles.buttonIcon} p-0`}
//             onClick={() => setShowProfilePanel(true)}
//           >
//             <FaUserCircle size={24} />
//           </Button>
//         </div>
//       </Container>
//          {/* Mobile Search Bar */}
//          {showMobileSearch && (
//           <div className={styles.mobileSearchBar}>
//             <Form className="d-flex w-100">
//               <FormControl
//                 type="search"
//                 placeholder="Search..."
//                 autoFocus
//                 className="me-2"
//               />
//               <Button
//                 variant="outline-secondary"
//                 onClick={() => setShowMobileSearch(false)}
//               >
//                 Close
//               </Button>
//             </Form>
//           </div>
//         )}

//       {/* Panels */}
//       <Offcanvas
//         show={showNavPanel}
//         onHide={() => setShowNavPanel(false)}
//         style={{ width: "280px" }}
//       >
//         <NavPanel onSelect={() => setShowNavPanel(false)} />
//       </Offcanvas>

//       <Offcanvas
//         show={showProfilePanel}
//         onHide={() => setShowProfilePanel(false)}
//         style={{ width: "280px" }}
//         placement="end"
//       >
//         <Profile onSelect={() => setShowProfilePanel(false)} />
//       </Offcanvas>
//     </Navbar>
//   );
// }



// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   Nav,
//   Form,
//   FormControl,
//   Dropdown,
//   Container,
//   Button,
//   Col,
//   Offcanvas,
// } from "react-bootstrap";
// import {
//   FaBell,
//   FaUserCircle,
//   FaStore,
//   FaBars,
//   FaSearch,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import NavPanel from "./NavPanel";
// import Profile from "./Profile";
// import styles from "./Header.module.css";

// export default function Header() {
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [showNavPanel, setShowNavPanel] = useState(false);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const [activeTab, setActiveTab] = useState("/"); // default active page
//   const [isMobile, setMobile] = useState(false);

//   const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

//   // Update window width for responsive design
//   useEffect(() => {
//     const updateMinWidth = () => setMobile(window.innerWidth < 900);
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);

//   // Update active tab based on current URL
//   useEffect(() => {
//     setActiveTab(window.location.pathname);
//   }, []);

//   const handleNavClick = (path) => {
//     setActiveTab(path);
//     window.location.href = path; // simple navigation
//   };

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/insights", label: "Actionable Insights" },
//   ];

//   return (
//     <Navbar expand="lg" className={`${styles.navbar} px-3 shadow-sm`}>
//       <Container fluid className="align-items-center justify-content-between">
//         {/* Left Section: Menu & Brand */}
//         <div className="d-flex align-items-center gap-3">
//           <Button
//             variant="link"
//             className={`${styles.buttonIcon} p-0`}
//             onClick={() => setShowNavPanel(true)}
//           >
//             <FaBars />
//           </Button>

//           <Navbar.Brand href="/" className={styles.brand}>
//             <FaStore size={24} className="d-none d-lg-flex" />
//             <span>Costonomy</span>
//           </Navbar.Brand>
//         </div>

//         {/* Center Navigation (Desktop Only) */}
//         <Col
//           md={4}
//           className="d-none d-md-flex justify-content-center align-items-center"
//         >
//           <Nav className={styles.navLinksContainer}>
//             {navItems.map((item) => (
//               <Nav.Link
//                 key={item.path}
//                 onClick={() => handleNavClick(item.path)}
//                 onMouseEnter={() => setHoveredTab(item.path)}
//                 onMouseLeave={() => setHoveredTab(null)}
//                 className={`${styles.navLink} ${
//                   activeTab === item.path ? styles.navLinkActive : ""
//                 }`}
//                 style={{
//                   color:
//                     activeTab === item.path
//                       ? "#fff"
//                       : hoveredTab === item.path
//                       ? "#ff7a30"
//                       : "#999",
//                 }}
//               >
//                 {item.label}
//               </Nav.Link>
//             ))}
//           </Nav>
//         </Col>

//         {/* Right Section */}
//         <div className={styles.rightSection}>
//           {/* Responsive Search */}
//           {!isMobile ? (
//             <Form className="d-none d-lg-flex">
//               <FormControl
//                 type="search"
//                 placeholder="Search..."
//                 className={styles.formControlSearch}
//               />
//             </Form>
//           ) : (
//             <Button
//               variant="link"
//               className={`${styles.buttonIcon} p-0 d-lg-none`}
//               onClick={toggleMobileSearch}
//             >
//               <FaSearch size={18} />
//             </Button>
//           )}

//           {/* Outlet Dropdown (Desktop) */}
//           <Dropdown
//             align="end"
//             className={`${styles.dropdownWrapper} d-none d-lg-flex`}
//             popperConfig={{
//               modifiers: [
//                 { name: "preventOverflow", options: { boundary: "viewport" } },
//                 { name: "flip", enabled: false },
//               ],
//             }}
//           >
//             <Dropdown.Toggle className={styles.dropdownToggle}>
//               <FaMapMarkerAlt className={styles.navbarIcon} />
//               <span className={styles.outletDot} />
//               <span className="fw-medium">Mumbai Central</span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>Mumbai Central</Dropdown.Item>
//               <Dropdown.Item>Outlet 2</Dropdown.Item>
//               <Dropdown.Item>Outlet 3</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           {/* Mobile Outlet Dropdown */}
//           <Dropdown align="end" className="d-lg-none">
//             <Dropdown.Toggle
//               variant="link"
//               className="text-dark p-0 border-0"
//               style={{ boxShadow: "none" }}
//             >
//               <FaStore size={18} />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>Outlet 1</Dropdown.Item>
//               <Dropdown.Item>Outlet 2</Dropdown.Item>
//               <Dropdown.Item>Outlet 3</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           {/* Notifications (Desktop Only) */}
//           <Button
//             variant="link"
//             className={`${styles.buttonIcon} me-2 p-0 d-none d-lg-flex`}
//           >
//             <FaBell size={20} />
//           </Button>

//           {/* Profile (All Devices) */}
//           <Button
//             variant="link"
//             className={`${styles.buttonIcon} p-0`}
//             onClick={() => setShowProfilePanel(true)}
//           >
//             <FaUserCircle size={24} />
//           </Button>
//         </div>

//         {/* Mobile Search Bar */}
//         {showMobileSearch && (
//           <div className={styles.mobileSearchBar}>
//             <Form className="d-flex w-100">
//               <FormControl
//                 type="search"
//                 placeholder="Search..."
//                 autoFocus
//                 className="me-2"
//               />
//               <Button
//                 variant="outline-secondary"
//                 onClick={() => setShowMobileSearch(false)}
//               >
//                 Close
//               </Button>
//             </Form>
//           </div>
//         )}
//       </Container>

//       {/* Side Panels */}
//       <Offcanvas
//         show={showNavPanel}
//         onHide={() => setShowNavPanel(false)}
//         style={{ width: "280px" }}
//       >
//         <NavPanel onSelect={() => setShowNavPanel(false)} />
//       </Offcanvas>

//       <Offcanvas
//         show={showProfilePanel}
//         onHide={() => setShowProfilePanel(false)}
//         style={{ width: "280px" }}
//         placement="end"
//       >
//         <Profile onSelect={() => setShowProfilePanel(false)} />
//       </Offcanvas>
//     </Navbar>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   Nav,
//   Form,
//   FormControl,
//   Dropdown,
//   Container,
//   Button,
//   Col,
//   Offcanvas,
// } from "react-bootstrap";
// import {
//   FaBell,
//   FaUserCircle,
//   FaStore,
//   FaBars,
//   FaSearch,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import NavPanel from "./NavPanel";
// import Profile from "./Profile";

// export default function Header() {
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [showNavPanel, setShowNavPanel] = useState(false);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const [activeTab, setActiveTab] = useState("/"); // default active page
//   const [isMobile, setMobile] = useState("0");

//   const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

//   // Update window width for responsive design
//   useEffect(() => {
//     const updateMinWidth = () => setMobile(window.innerWidth < 900);
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);

//   // Update active tab based on current URL
//   useEffect(() => {
//     setActiveTab(window.location.pathname);
//   }, []);

//   const handleNavClick = (path) => {
//     setActiveTab(path);
//     window.location.href = path; // simple navigation, can replace with next/router if using Next.js
//   };

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/insights", label: "Actionable Insights" },
//   ];

//   return (
//     <Navbar
//       bg="light"
//       expand="lg"
//       className="px-3 shadow-sm fixed-top"
//       style={{
//         background: "linear-gradient(90deg, #f4e5daff, #ffb347)", // choose option
//         color: "#fff",
//       }}
//     >
//       <Container fluid className="align-items-center justify-content-between">
//         {/* Left Section: Menu & Brand */}
//         <div className="d-flex align-items-center gap-3">
//           <Button
//             variant="link"
//             className="p-0 text-dark"
//             onClick={() => setShowNavPanel(true)}
//           >
//             <FaBars />
//           </Button>

//           <Navbar.Brand
//             href="/"
//             className="d-flex align-items-center gap-lg-2"
//             style={{ color: "rgb(255,92,0)" }}
//           >
//             <FaStore size={24} className="d-none d-lg-flex" />
//             <span className="fw-bold">Costonomy</span>
//           </Navbar.Brand>
//         </div>

//         {/* Center Navigation (Desktop Only) */}
//         <Col
//           md={6}
//           className="d-none d-md-flex justify-content-center align-items-center"
//         >
//           <Nav className="d-flex flex-row gap-4">
//             {navItems.map((item) => (
//               <Nav.Link
//                 key={item.path}
//                 onClick={() => handleNavClick(item.path)}
//                 onMouseEnter={() => setHoveredTab(item.path)}
//                 onMouseLeave={() => setHoveredTab(null)}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: 600,
//                   color:
//                     activeTab === item.path
//                       ? "#ff5016"
//                       : hoveredTab === item.path
//                       ? "#ff8a50"
//                       : "#333",
//                   borderBottom:
//                     activeTab === item.path
//                       ? "2px solid #ff5016"
//                       : hoveredTab === item.path
//                       ? "2px solid #ff8a50"
//                       : "2px solid transparent",
//                   transition: "all 0.2s ease",
//                   paddingBottom: "4px",
//                 }}
//               >
//                 {item.label}
//               </Nav.Link>
//             ))}
//           </Nav>
//         </Col>

//         {/* Right Section */}
//         <div className="d-flex align-items-center gap-3">
//           {/* Desktop Search */}
//           <Form className="d-none d-lg-flex">
//             <FormControl
//               type="search"
//               placeholder="Search..."
//               className="me-2"
//               style={{
//                 minWidth: isMobile < 900 ? "100px" : "0",
//                 marginLeft: isMobile < 900 ? "-50px" : "0",
//               }}
//             />
//           </Form>

//           {/* Mobile Search Icon */}
//           <Button
//             variant="link"
//             className="text-dark p-0 d-lg-none"
//             onClick={toggleMobileSearch}
//           >
//             <FaSearch size={18} />
//           </Button>

//           {/* Outlet Dropdown */}
//           <Dropdown align="end" className="d-none d-lg-flex">
//             <Dropdown.Toggle
//               variant="outline-dark"
//               className="d-flex align-items-center gap-2"
//             >
//               <FaMapMarkerAlt style={{ color: "rgb(255, 92, 0)" }} />
//               <span
//                 className="rounded-circle"
//                 style={{
//                   width: "8px",
//                   height: "8px",
//                   backgroundColor: "green",
//                   display: "inline-block",
//                 }}
//               />
//               <span className="fw-medium">Mumbai Central</span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>Mumbai Central</Dropdown.Item>
//               <Dropdown.Item>Outlet 2</Dropdown.Item>
//               <Dropdown.Item>Outlet 3</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           {/* Mobile Outlet */}
//           <Dropdown align="end" className="d-lg-none">
//             <Dropdown.Toggle
//               variant="link"
//               className="text-dark p-0 border-0"
//               style={{ boxShadow: "none" }}
//             >
//               <FaStore size={18} />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>Outlet 1</Dropdown.Item>
//               <Dropdown.Item>Outlet 2</Dropdown.Item>
//               <Dropdown.Item>Outlet 3</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           {/* Notifications (Desktop Only) */}
//           <Button
//             variant="link"
//             className="text-dark me-2 p-0 d-none d-lg-flex"
//           >
//             <FaBell size={20} />
//           </Button>

//           {/* Profile (All Devices) */}
//           <Button
//             variant="link"
//             className="text-dark p-0"
//             onClick={() => setShowProfilePanel(true)}
//           >
//             <FaUserCircle size={24} />
//           </Button>
//         </div>

//         {/* Mobile Search Bar */}
//         {showMobileSearch && (
//           <div className="position-absolute top-100 start-0 w-100 bg-white p-2 shadow-sm">
//             <Form className="d-flex w-100">
//               <FormControl
//                 type="search"
//                 placeholder="Search..."
//                 autoFocus
//                 className="me-2"
//               />
//               <Button
//                 variant="outline-secondary"
//                 onClick={() => setShowMobileSearch(false)}
//               >
//                 Close
//               </Button>
//             </Form>
//           </div>
//         )}
//       </Container>

//       {/* Side Panels */}
//       <Offcanvas
//         show={showNavPanel}
//         onHide={() => setShowNavPanel(false)}
//         style={{ width: "280px" }}
//       >
//         <NavPanel onSelect={() => setShowNavPanel(false)} />
//       </Offcanvas>

//       <Offcanvas
//         show={showProfilePanel}
//         onHide={() => setShowProfilePanel(false)}
//         style={{ width: "280px" }}
//         placement="end"
//       >
//         <Profile onSelect={() => setShowProfilePanel(false)} />
//       </Offcanvas>
//     </Navbar>
//   );
// }
