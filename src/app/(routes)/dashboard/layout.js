import { GlobalDashboardProvider } from "@/contexts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalDashboardProvider>{children}</GlobalDashboardProvider>
      </body>
    </html>
  );
}
