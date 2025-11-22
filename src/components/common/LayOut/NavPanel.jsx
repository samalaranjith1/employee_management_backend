"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapse, ListGroup } from "react-bootstrap";
import {
  FaStore,
  FaChevronDown,
  FaChevronRight,
  FaBoxOpen,
  FaClipboardList,
  FaTruck,
  FaUtensils,
  FaBuilding,
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaUserFriends,
  FaFileInvoice,
  FaCubes,
  FaUsersCog,
  FaChartBar,
  FaList,
  FaDatabase,
} from "react-icons/fa";

export default function NavPanel({onSelect}) {
  const [openCategory, setOpenCategory] = useState(null);
  const pathname = usePathname();

  const handleToggle = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const menu = [
    {
      title: "Item Purchase",
      icon: <FaShoppingCart />,
      items: [
        {
          title: "Manage Purchase",
          icon: <FaClipboardList />,
          href: "/item_purchase/manage_purchase",
        },
        {
          title: "Manage Purchase Closing",
          icon: <FaClipboardList />,
          href: "/item_purchase/manage_purchase_closing",
        },
        {
          title: "Add/Remove Items",
          icon: <FaTruck />,
          href: "/item_purchase/items",
        },
        {
          title: "Add/Remove Suppliers",
          icon: <FaTruck />,
          href: "/item_purchase/suppliers",
        },
      ],
    },
    {
      title: "Item Consumption",
      icon: <FaUtensils />,
      items: [
        {
          title: "Manage Item Consumption",
          icon: <FaClipboardList />,
          href: "/item_consumption/manage_item_consumption",
        },
        {
          title: "Manage Item Consumption Closing",
          icon: <FaClipboardList />,
          href: "/item_consumption/manage_item_consumption_closing",
        },
        {
          title: "Manage Departments",
          icon: <FaBuilding />,
          href: "/item_consumption/manage_departments",
        },
      ],
    },
    {
      title: "Base Items",
      icon: <FaBoxOpen />,
      items: [
        {
          title: "Manage Purchase",
          icon: <FaClipboardList />,
          href: "/base_items/manage_purchase",
        },
        {
          title: "Manage Base Items",
          icon: <FaCubes />,
          href: "/base_items/manage_base_items",
        },
        {
          title: "Manage Recipe",
          icon: <FaUtensils />,
          href: "/base_items/manage_recipe",
        },
      ],
    },
    {
      title: "Sales",
      icon: <FaCashRegister />,
      items: [
        {
          title: "Upload Daily Sales",
          icon: <FaDatabase />,
          href: "/sales/upload_daily_sales",
        },
        {
          title: "Upload Petpooja Sales",
          icon: <FaDatabase />,
          href: "/sales/upload_petpooja_sales",
        },
        {
          title: "Upload Glokal Sales",
          icon: <FaDatabase />,
          href: "/sales/upload_glokal_sales",
        },
      ],
    },
    {
      title: "Expenses & Payments",
      icon: <FaMoneyBillWave />,
      items: [
        {
          title: "Manage Expenses",
          icon: <FaClipboardList />,
          href: "/expenses/manage_expenses",
        },
        {
          title: "Manage Payments",
          icon: <FaClipboardList />,
          href: "/expenses/manage_payments",
        },
      ],
    },
    {
      title: "Customers",
      icon: <FaUserFriends />,
      items: [
        {
          title: "Manage Customers",
          icon: <FaClipboardList />,
          href: "/customers/manage_customers",
        },
        {
          title: "Manage Invoices",
          icon: <FaFileInvoice />,
          href: "/customers/manage_invoices",
        },
      ],
    },
    {
      title: "Products",
      icon: <FaCubes />,
      items: [
        {
          title: "Manage Products",
          icon: <FaClipboardList />,
          href: "/products/manage_products",
        },
        {
          title: "Manage Recipe",
          icon: <FaUtensils />,
          href: "/products/manage_recipe",
        },
      ],
    },
    {
      title: "Payroll",
      icon: <FaUsersCog />,
      items: [
        {
          title: "Manage Employees",
          icon: <FaClipboardList />,
          href: "/payroll/manage_employees",
        },
        {
          title: "Manage Leaves",
          icon: <FaClipboardList />,
          href: "/payroll/manage_leaves",
        },
        {
          title: "Generate Payroll",
          icon: <FaClipboardList />,
          href: "/payroll/generate_payroll",
        },
      ],
    },
    {
      title: "Access Control",
      icon: <FaUsersCog />,
      items: [
        {
          title: "Manage Users",
          icon: <FaClipboardList />,
          href: "/access/manage_users",
        },
      ],
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      items: [
        {
          title: "Item Purchase",
          icon: <FaList />,
          href: "/reports/item_purchase",
        },
        {
          title: "Item Consumption",
          icon: <FaList />,
          href: "/reports/item_consumption",
        },
        {
          title: "Item Price change",
          icon: <FaList />,
          href: "/reports/item_price_change",
        },
        {
          title: "Item Forecast",
          icon: <FaList />,
          href: "/reports/item_forecast",
        },
        {
          title: "Leftover Stock",
          icon: <FaList />,
          href: "/reports/leftover_stock",
        },
        { title: "Sales", icon: <FaList />, href: "/reports/sales" },
        {
          title: "Top Selling Products",
          icon: <FaList />,
          href: "/reports/top_selling_products",
        },
        {
          title: "Bank Statement",
          icon: <FaList />,
          href: "/reports/bank_statement",
        },
        {
          title: "Department Budget",
          icon: <FaList />,
          href: "/reports/department_budget",
        },
      ],
    },
  ];

  return (
    <div
      style={{
        width: "280px",
        backgroundColor: "#fff",
        height: "100vh",
        overflowY: "auto",
        boxShadow: "2px 0px 8px rgba(0,0,0,0.05)",
        borderRight: "1px solid #f0f0f0",
        scrollbarWidth: "thin",
      }}
    >
      {/* Brand */}
      <div
        className="d-flex align-items-center p-3"
        style={{
          background: "linear-gradient(90deg, #ff9900, #ffb84d)",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        <FaStore size={24} className="me-2" />
        Costonomy
      </div>

      {/* Nav List */}
      <ListGroup variant="flush">
        {menu.map((cat, index) => (
          <div key={index}>
            <ListGroup.Item
              onClick={() => handleToggle(index)}
              className="d-flex justify-content-between align-items-center category-item"
              style={{
                cursor: "pointer",
                padding: "12px 16px",
                fontWeight: "600",
                border: "none",
                backgroundColor: "#fff",
                transition: "background 0.2s",
              }}
            >
              <div className="d-flex align-items-center">
                <span className="me-2">{cat.icon}</span>
                {cat.title}
              </div>
              {openCategory === index ? <FaChevronDown /> : <FaChevronRight />}
            </ListGroup.Item>

            <Collapse in={openCategory === index}>
              <div>
                {cat.items.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <ListGroup.Item
                      key={idx}
                      style={{
                        padding: "10px 16px 10px 40px",
                        border: "none",
                        backgroundColor: isActive ? "#fff7f0" : "#fafafa",
                        color: isActive ? "#ff6600" : "#555",
                        fontWeight: isActive ? "600" : "400",
                        borderLeft: isActive
                          ? "4px solid #ff6600"
                          : "4px solid transparent",
                        transition: "all 0.2s ease",
                      }}
                      className="hover-item"
                    >
                      <Link
                        href={item.href}
                        className="d-flex align-items-center text-decoration-none"
                        style={{
                          color: isActive ? "#ff6600" : "#555",
                          width: "100%",
                        }}
                        onClick={onSelect}
                      >
                        <span className="me-2">{item.icon}</span>
                        {item.title}
                      </Link>
                    </ListGroup.Item>
                  );
                })}
              </div>
            </Collapse>
          </div>
        ))}
      </ListGroup>

      <style jsx>{`
        .category-item:hover {
          background-color: #fff4e6;
        }
        .hover-item:hover {
          background-color: #fff0e0 !important;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
