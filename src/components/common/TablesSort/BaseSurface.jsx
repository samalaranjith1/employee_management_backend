"use client";
import React from "react";
import { Card } from "react-bootstrap";

/**
 * BaseSurface: common wrapper for all table-like cards
 * - title, subtitle, headerRight: optional header content
 * - containerStyle, headerStyle, bodyStyle: style hooks to preserve custom looks
 * - maxHeight: if provided, makes the body scroll vertically within that height
 * - children: ANY layout (tables, grids, lists) to keep original designs intact
 */
export default function BaseSurface({
  title,
  subtitle,
  headerRight,
  containerStyle = {},
  headerStyle = {},
  bodyStyle = {},
  maxHeight,
  children,
}) {
  return (
    <Card style={{ borderRadius: 12, border: "none", ...containerStyle }} >
      {(title || subtitle || headerRight) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            ...headerStyle,
          }}
        >
          <div>
            {title && <div style={{ fontWeight: 700 }}>{title}</div>}
            {subtitle && (
              <div style={{ fontSize: 12, color: "#777" }}>{subtitle}</div>
            )}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}

      <div
        style={{
          padding: 12,
          ...(maxHeight ? { maxHeight, overflowY: "auto" } : {}),
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </Card>
  );
}
