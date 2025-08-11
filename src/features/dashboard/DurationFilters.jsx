"use client";
import { useState, useEffect } from "react";
import { ButtonGroup, Button, Row, Col, Card, Dropdown } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfWeek, startOfMonth, subDays } from "date-fns";

export default function DateFilter({ onChange }) {
  const [active, setActive] = useState("today");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handlePreset = (type) => {
    setActive(type);
    setShowCalendar(false);

    const today = new Date();
    let start, end;

    switch (type) {
      case "yesterday":
        start = subDays(today, 1);
        end = subDays(today, 1);
        break;
      case "thisweek":
        start = startOfWeek(today, { weekStartsOn: 1 });
        end = today;
        break;
      case "thismonth":
        start = startOfMonth(today);
        end = today;
        break;
      case "custom":
        setShowCalendar(true);
        return;
      default: // today
        start = today;
        end = today;
    }

    setStartDate(start);
    setEndDate(end);
    if (onChange) onChange({ start, end });
  };

  const handleCustomChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      if (onChange) onChange({ start, end });
      setShowCalendar(false); // ✅ Close calendar after selection
    }
  };

  useEffect(() => {
    handlePreset("today"); // default selection
  }, []);

  const presetOptions = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "thisweek", label: "This Week" },
    { key: "thismonth", label: "This Month" },
    { key: "custom", label: "Custom" },
  ];

  return (
    <Card
      className="bg-white shadow-sm date-filter-card"
      body
      style={{
        position: "relative",
        position: "fixed-top",
      }}
    >
      {/* Desktop view: Horizontal Button Group */}
      <div className="d-none d-md-block">
        <ButtonGroup className="gap-2 flex-wrap">
          {presetOptions.map(({ key, label }) => (
            <Button
              key={key}
              variant={active === key ? "success" : "outline-dark"}
              className="border"
              onClick={() => handlePreset(key)}
              style={{
                borderRadius: "8px", // Change to "50px" for pill-shaped buttons
              }}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Mobile view: Dropdown with Filter icon */}
      <div className="d-md-none">
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-dark"
            id="dropdown-basic"
            className="w-100 d-flex justify-content-between align-items-center"
          >
            {presetOptions.find((o) => o.key === active)?.label}
            <FaFilter />
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100">
            {presetOptions.map(({ key, label }) => (
              <Dropdown.Item
                key={key}
                active={active === key}
                onClick={() => handlePreset(key)}
              >
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {showCalendar && (
        <Row className="mt-3">
          <Col>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleCustomChange}
              inline
            />
          </Col>
        </Row>
      )}
    </Card>
  );
}
