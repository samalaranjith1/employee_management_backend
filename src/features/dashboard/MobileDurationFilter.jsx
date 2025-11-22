"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleCustomChange, handlePreset } from "@/utils";
import { presetOptions } from "@/constants";
import "./css/datefilterMobile.custom.css";
import { set } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";
import { FaCaretDown } from "react-icons/fa";

export default function MobileDurationFilters({ useAppContext }) {
    const { startDate, endDate, setStartDate, setEndDate } = useAppContext;
    const [active, setActive] = useState("today");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [modalContainer, setModalContainer] = useState(null);
    const containerRef = useRef(null);

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

    useEffect(() => {
        const modal = document.createElement("div");
        document.body.appendChild(modal);
        setModalContainer(modal);
        return () => { document.body.removeChild(modal); };
    }, []);

    const stateChanges = { setActive, setShowCalendar, setStartDate, setEndDate };

    const handleSelect = (key) => {
        handlePreset(key, stateChanges);
        if (key === "custom") {
            setActive("custom");
            setShowCalendar(true);
            setShowDropdown(false);
        } else {
            setShowCalendar(true);
            setShowDropdown(false);
        }
    };

    const handleCloseModal = () => setShowCalendar(false);

    const renderDropdown = () => {
        if (!showDropdown || !containerRef.current) return null;
        const rect = containerRef.current.getBoundingClientRect();
        return createPortal(
            <div
                className="date-dropdown-menu"
                style={{
                    position: "absolute",
                    top: rect.bottom + window.scrollY + 4,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    zIndex: 10000,
                }}
            >
                {presetOptions.map(({ key, label }) => (
                    <div
                        key={key}
                        className={`date-dropdown-item ${active === key ? "active" : ""}`}
                        onClick={() => handleSelect(key)}
                    >
                        {label}
                    </div>
                ))}
            </div>,
            document.body
        );
    };

    // Modal content (bottom sheet style)
    const renderModal = () => {
        if (!(showCalendar) || !modalContainer) return null;
        return createPortal(
            <>
                <div className="modal-overlay" onClick={handleCloseModal}></div>
                <div className="date-modal-root" role="dialog">
                    <div className="date-modal-header">
                        <span className="date-modal-title">Select Date</span>
                        <button
                            className="date-modal-close"
                            aria-label="Close"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                    </div>

                    <div className="date-modal-options">
                        {presetOptions
                            .filter(opt => opt.key !== "custom")
                            .map(({ key, label }) => (
                                <label className="date-radio-label" key={key}>
                                    <input
                                        type="radio"
                                        checked={active === key}
                                        onChange={() => {
                                            handleSelect(key);
                                            setShowCalendar(false);
                                        }}
                                    />
                                    <span className="custom-radio" />
                                    <span className="date-radio-text">{label}</span>
                                    <span className="date-radio-side" />
                                </label>
                            ))}
                    </div>

                    <div className="date-modal-pickerbox">
                        <DatePicker
                            selectsRange
                            startDate={startDate ? new Date(startDate) : null}
                            endDate={endDate ? new Date(endDate) : null}
                            onChange={(dates) => {
                                handleSelect("custom");
                                handleCustomChange(dates, stateChanges)
                            }}
                            inline
                            calendarClassName="modal-datepicker"
                        />
                    </div>

                    <label className="date-radio-label custom-trigger" style={{ marginLeft: 8 }}>
                        <input
                            type="radio"
                            checked={active === "custom"}
                            readOnly
                        />
                        <span className="custom-radio custom" />
                        <span className="date-radio-text">Custom</span>
                    </label>

                    <div className="date-modal-footer">
                        <button
                            onClick={handleCloseModal}
                            className="date-modal-save"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </>,
            modalContainer
        );
    };

    return (
        <span
            ref={containerRef}
        >
            <span
                onClick={() => {
                    setShowDropdown(!showDropdown);
                    setShowCalendar(true);
                }}
                // onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid #ff6000")}
                // onMouseLeave={(e) => (e.currentTarget.style.borderColor = "1px solid black")}
                style={{
                    border: "1px solid black",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "10px",
                    transition: "border-color 0.2s ease",
                }}
            >
                <IconCalendar />
                <FaCaretDown style={{ marginLeft: "1px", marginBottom: "2px" }} />
            </span>
            {renderModal()}
        </span>
    )
    //   return (
    //     <span ref={containerRef}>
    //       {/* <div style={{border:'1px solid black',padding:''}}> */}
    //         <span
    //         //   className="date-dropdown-btn"
    //           onClick={() => {setShowDropdown(!showDropdown);
    //             setShowCalendar(true);
    //           }}
    //           style={{border:'1px solid black',padding:'4px 8px',borderRadius:'4px', cursor:'pointer'}}
    //         >
    //             <IconCalendar /><FaCaretDown style={{marginLeft:'1px', marginBottom:'2px'}} />
    //           {/* {presetOptions.find((o) => o.key === active)?.label || "Select Date"} */}
    //         </span>
    //         {/* {renderDropdown()} */}
    //         {renderModal()}
    //       {/* </div> */}
    //     </span>
    //   );
}