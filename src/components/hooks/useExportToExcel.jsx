// hooks/useExportToExcel.js
import { useCallback } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function useExportToExcel() {
  const exportToExcel = useCallback(
    async ({ data, columns, fileName = "Report.xlsx" }) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");

      // 🔹 Define columns
      worksheet.columns = columns.map((col) => ({
        header: col.header,
        key: col.key,
        width: col.width || 20,
      }));

      // 🔹 Add table data
      data.forEach((row) => worksheet.addRow(row));

      // 🔹 Style header row
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF007ACC" },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // 🔹 Style table rows
      worksheet.eachRow((row, rowIndex) => {
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

        if (rowIndex > 1 && rowIndex % 2 === 0) {
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFF2F2F2" }, // Light gray
            };
          });
        }
      });

      // 🔹 Save file
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), fileName);
    },
    []
  );

  return { exportToExcel };
}
