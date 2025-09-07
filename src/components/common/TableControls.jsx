"use client";

import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export function TableControls({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  filtersConfig = {},
  handleExport,
  searchable = true,
  filterable = true,
  exportable = true,
}) {
  return (
    <div
      className="d-flex justify-content-between align-items-center flex-wrap gap-2 bg-light pt-4"
      style={{ padding: "0 10px" }}
    >
      {/* 🔹 Search */}
      {searchable && (
        <InputGroup style={{ width: "250px" }}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      )}

      {/* 🔹 Filters + Export */}
      <div className="d-flex gap-2">
        {filterable &&
          Object.keys(filtersConfig).map((key) => (
            <Form.Select
              key={key}
              value={filters[key]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [key]: e.target.value }))
              }
              style={{
                width: "180px",
                backgroundColor: "#FF6000",
                color: "#fff",
                border: "none",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {filtersConfig[key].map((option, idx) => (
                <option
                  key={idx}
                  value={option}
                  style={{
                    backgroundColor: "#FF6000",
                    color: "#fff",
                  }}
                >
                  {option}
                </option>
              ))}
            </Form.Select>
          ))}

        {exportable && (
          <Button
            style={{
              backgroundColor: "#FF6000",
              color: "#fff",
              border: "none",
              fontWeight: "500",
            }}
            onClick={handleExport}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#E65500")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF6000")
            }
          >
            Export
          </Button>
        )}
      </div>
    </div>
  );
}
