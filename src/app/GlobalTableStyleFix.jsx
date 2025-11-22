"use client";
import { useEffect } from "react";

export default function GlobalSmartTableEnhancer() {
  useEffect(() => {
    const enhanceTables = () => {
      const tables = document.querySelectorAll("table");

      tables.forEach((table) => {
        // Table alignment
        table.style.setProperty("text-align", "left", "important");
        table.style.setProperty("width", "100%", "important");

        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");

          cells.forEach((cell, index) => {
            if (cell.dataset.enhanced === "true") return;

            const text = cell.textContent?.trim() || "";

            // Apply general alignment
            cell.style.setProperty("vertical-align", "top", "important");
            cell.style.setProperty("text-align", "left", "important");

            // 💰 Auto-format numbers
            if (!isNaN(text) && text !== "") {
              const num = Number(text);
              if (!isNaN(num)) {
                cell.textContent = num.toLocaleString("en-IN");
              }
            }

            // 🔠 Handle subtext (2nd line)
            if (cell.innerHTML.includes("<br>")) {
              const [main, sub] = cell.innerHTML.split(/<br\s*\/?>/);
              if (sub) {
                const subText = sub.replace(/<[^>]+>/g, "").trim().toLowerCase();
                cell.innerHTML = `
                  <div>${main.trim()}</div>
                  <div class="text-secondary" 
                       style="font-size:12px !important;
                              text-transform:lowercase !important;">
                    ${subText}
                  </div>
                `;
              }
            }

            // 🔴 First column style
            if (index === 0) {
              cell.style.setProperty("font-weight", "700", "important");
              cell.style.setProperty("color", "#ff0000", "important");
            }

            // ✅ Mark as enhanced
            cell.dataset.enhanced = "true";
          });
        });
      });
    };

    enhanceTables();

    // Watch DOM for table changes
    const observer = new MutationObserver(enhanceTables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
