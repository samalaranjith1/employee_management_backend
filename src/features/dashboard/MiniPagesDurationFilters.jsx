"use client";
import { useState, useEffect, useRef } from "react";
import {
  ButtonGroup,
  Button,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { handleCustomChange, handlePreset } from "@/utils";
import { presetOptions } from "@/constants";
import "./css/datefilter.module.css";
import { usePathname } from "next/navigation";

export default function MiniPagesDurationFilters({useAppContext}) {
  // const { startDate, endDate, setStartDate, setEndDate } =
  //   useDashboardContext();
  const { startDate, endDate, setStartDate, setEndDate } =
    useAppContext;
  const [active, setActive] = useState("today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = usePathname()
  const isEndDF = ['/products','/departments','/items','/dashboard','/suppliers'].includes(location)

  const containerRef = useRef(null);

  const stateChanges = {
    setActive,
    setShowCalendar,
    setStartDate,
    setEndDate,
    setShowModal,
  };

  // useEffect(() => {
  //   handlePreset("today", stateChanges);
  // }, []);
  useEffect(() => {
    if (!startDate || !endDate) return;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
  
    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  
    // Monday as start of week
    const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
    const diff = day === 0 ? -6 : 1 - day;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + diff);
  
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
    if (isSameDay(start, today) && isSameDay(end, today)) {
      setActive("today");
    } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
      setActive("yesterday");
    } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
      setActive("thisweek");
    } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
      setActive("thismonth");
    } else {
      setActive("custom");
    }
  }, [startDate, endDate]);
  

  // Auto-switch between button group and modal based on width
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const requiredWidth = presetOptions.length * 110;
        setIsCompact(containerWidth < requiredWidth);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleSelect = (key) => {
    handlePreset(key, stateChanges);
    console.log('ramarama')

    // ✅ If "custom", keep modal open for date picking
    if (key === "custom") {
      setActive("custom");
    } else {
      setShowModal(false); // close for other options
    }
  };

  return (
    <Container fluid ref={containerRef}>
      <div className="p-0">
        {isCompact || isEndDF ? (
          <>
            <Button
              variant="outline-primary"
              className="d-flex justify-content-between align-items-center w-100"
              onClick={() => setShowModal(true)}
            >
              <FaFilter className="me-2" />
              {presetOptions.find((o) => o.key === active)?.label}
            </Button>

            {/* ✅ Bottom Modal for mobile */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              dialogClassName="bottom-modal"
              contentClassName="bottom-modal-content"
              backdropClassName="bottom-backdrop"
            >
              <Modal.Body className="text-center">
                <Form>
                  {presetOptions.map(({ key, label }) => (
                    <Form.Check
                      key={key}
                      type="radio"
                      name="presetFilter"
                      id={`radio-${key}`}
                      label={label}
                      checked={active === key}
                      onChange={() => handleSelect(key)}
                      className={`mb-2 ${
                        active === key ? "text-orange fw-bold" : "text-dark"
                      }`}
                    />
                  ))}
                </Form>

                {/* ✅ Show DatePicker only for "custom" */}
                {active === "custom" && (
                  <div className="mt-3">
                    <DatePicker
                      selectsRange
                      startDate={startDate ? new Date(startDate) : null}
                      endDate={endDate ? new Date(endDate) : null}
                      onChange={(dates) => {
                        handleCustomChange(dates, stateChanges);
                        if (dates) {
                          const [start, end] = dates;
                          if (start && end) setShowModal(false);
                        }
                      }}
                      inline
                    />
                    <div className="d-flex justify-content-end mt-2">
                      {/* <Button
                        variant="success"
                        size="sm"
                        onClick={() => setShowModal(false)}
                      >
                        Apply
                      </Button> */}
                    </div>
                  </div>
                )}
              </Modal.Body>
            </Modal>
          </>
        ) : (
          // ✅ Full view (desktop button group)
          <div className="d-none d-md-flex">
            <ButtonGroup
              className="gap-2 flex-wrap"
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {presetOptions.map(({ key, label }) => {
                const isActive = active === key;
                return (
                  <Button
                    key={key}
                    onClick={() => handleSelect(key)}
                    size="sm"
                    style={{
                      borderRadius: "40px",
                      padding: "8px 20px",
                      fontSize: "15px",
                      fontWeight: isActive ? 600 : 500,
                      border: isActive
                        ? "1.8px solid #FF6600" // bright orange border
                        : "1.5px solid #E0E0E0", // light gray border
                      color: isActive ? "#FF6600" : "#4F4F4F", // orange active, gray inactive
                      backgroundColor: isActive ? "#FFF6F0" : "#FFFFFF", // light orange background when active
                      transition: "all 0.2s ease-in-out",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = isActive
                        ? "#FFF3EB"
                        : "#F8F8F8"; // subtle hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = isActive
                        ? "#FFF6F0"
                        : "#FFFFFF";
                    }}
                  >
                    {label}
                  </Button>
                );
              })}

              {active === "custom" && showCalendar && (
                <div
                  className="mt-3"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DatePicker
                    selectsRange
                    startDate={startDate ? new Date(startDate) : null}
                    endDate={endDate ? new Date(endDate) : null}
                    onChange={(dates) => {
                      handleCustomChange(dates, stateChanges);
                      if (dates) {
                        const [start, end] = dates;
                        if (start && end) setShowCalendar(false);
                      }
                    }}
                    inline
                  />
                </div>
              )}
            </ButtonGroup>
            </div>
        )}
      </div>
    </Container>
  );
}