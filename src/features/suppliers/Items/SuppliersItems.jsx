import React from "react";
import { Card, Table } from "react-bootstrap";
import { suppliersItemsDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";

const SuppliersItems = ({
  apiData = {
    etag: null,
    list: [
      {
        dt: null,
        supplierId: "3",
        itemId: "55",
        item: {
          id: "55",
          outletId: "1",
          name: "DISH WASHER",
          unit: "ML",
          unitQuantity: "1000",
          unitPrice: 70,
          categoryId: 15,
          categoryName: "Housekeeping Material",
          disabled: false,
          alias: "DISH WASHER - 1000ML",
          moq: 6867,
          itemTypeId: 1,
          itemType: "Store Item",
          itemDescription: null,
          perishable: false,
          shelfLifeDays: 0,
          hsnCode: null,
          brandName: null,
          storageLocation: null,
          createdBy: null,
          updatedBy: null,
        },
        supplier: {
          id: "3",
          outletId: "1",
          name: "AAIMATA SUPER MART",
          contactName: null,
          phone: null,
          email: null,
          address: null,
          taxId: null,
          supplierTypeId: 1,
          supplierType: "Suppliers",
          countryId: 1,
          country: "India",
          stateId: 24,
          state: "Telangana",
          cityId: 6,
          city: "Hyderabad",
          disabled: false,
          createdBy: null,
          updatedBy: null,
        },
        quantity: 20000,
        itemPrice: 70,
        totalPrice: 1400,
      },
      {
        dt: null,
        supplierId: "3",
        itemId: "77",
        item: {
          id: "77",
          outletId: "1",
          name: "SWASTIK CHILLI POWDER",
          unit: "GM",
          unitQuantity: "500",
          unitPrice: 137,
          categoryId: 7,
          categoryName: "Indian Grocery",
          disabled: false,
          alias: "SWASTIK CHILLI POWDER - 500GM",
          moq: 2467,
          itemTypeId: 1,
          itemType: "Store Item",
          itemDescription: null,
          perishable: false,
          shelfLifeDays: 0,
          hsnCode: null,
          brandName: null,
          storageLocation: null,
          createdBy: null,
          updatedBy: null,
        },
        supplier: {
          id: "3",
          outletId: "1",
          name: "AAIMATA SUPER MART",
          contactName: null,
          phone: null,
          email: null,
          address: null,
          taxId: null,
          supplierTypeId: 1,
          supplierType: "Suppliers",
          countryId: 1,
          country: "India",
          stateId: 24,
          state: "Telangana",
          cityId: 6,
          city: "Hyderabad",
          disabled: false,
          createdBy: null,
          updatedBy: null,
        },
        quantity: 5000,
        itemPrice: 115,
        totalPrice: 1150,
      },
      {
        dt: null,
        supplierId: "3",
        itemId: "56",
        item: {
          id: "56",
          outletId: "1",
          name: "FLOAR CLEANER",
          unit: "ML",
          unitQuantity: "1000",
          unitPrice: 50,
          categoryId: 15,
          categoryName: "Housekeeping Material",
          disabled: false,
          alias: "FLOAR CLEANER - 1000ML",
          moq: 3000,
          itemTypeId: 1,
          itemType: "Store Item",
          itemDescription: null,
          perishable: false,
          shelfLifeDays: 0,
          hsnCode: null,
          brandName: null,
          storageLocation: null,
          createdBy: null,
          updatedBy: null,
        },
        supplier: {
          id: "3",
          outletId: "1",
          name: "AAIMATA SUPER MART",
          contactName: null,
          phone: null,
          email: null,
          address: null,
          taxId: null,
          supplierTypeId: 1,
          supplierType: "Suppliers",
          countryId: 1,
          country: "India",
          stateId: 24,
          state: "Telangana",
          cityId: 6,
          city: "Hyderabad",
          disabled: false,
          createdBy: null,
          updatedBy: null,
        },
        quantity: 20000,
        itemPrice: 50,
        totalPrice: 1000,
      },
    ],
  },
}) => {
  const { items } = suppliersItemsDataFormatter(apiData);

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-0">
        <Table borderless responsive className="align-middle mb-0">
          <thead>
            <tr style={{ color: "#6B7280", fontSize: "14px" }}>
              <th className="fw-semibold">Item</th>
              <th className="fw-semibold">Purchase Qty</th>
              <th className="fw-semibold">Purchase Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} style={{ fontSize: "14px" }}>
                <td>
                  <div className="d-flex align-items-center">
                    {item.icon}
                    <div>
                      <div className="fw-semibold" style={{ color: "#1A1A1A" }}>
                        {item.name}
                      </div>
                      <div style={{ color: "#6B7280", fontSize: "12px" }}>
                        {item.type} . {item.unitInfo}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ color: "#1A1A1A" }}>{item.quantity}</td>
                <td style={{ color: "#1A1A1A" }}>
                  ₹{item.value.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SuppliersItems;
