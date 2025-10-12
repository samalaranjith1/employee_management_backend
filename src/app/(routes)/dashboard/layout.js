import { GlobalDashboardProvider } from "@/contexts";

export default function RootLayout({ children }) {
  return (
      <div>
        <GlobalDashboardProvider>{children}</GlobalDashboardProvider>
      </div>
  );
}
