import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/common/LayOut/Header";
import { GlobalDashboardProvider } from "@/contexts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata export supported in app router
export const metadata = {
  title: "Costonomy",
  description: "Manage your restaurants easily with Costonomy.",
  // viewport: "width=device-width, initial-scale=1",
  keywords: "restaurant management, cost control, inventory, food service",
  authors: [{ name: "Ranjith" }],
  // themeColor: "#3508ec",
  openGraph: {
    title: "Costonomy",
    description: "Manage your restaurants easily with Costonomy.",
    type: "website",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Costonomy",
    description: "Manage your restaurants easily with Costonomy.",
    images: ["https://yourwebsite.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <GlobalDashboardProvider>
          <Header />
          {children}
        </GlobalDashboardProvider>
      </body>
    </html>
  );
}
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <GlobalDashboardProvider>
//           <Header />
//           {children}
//         </GlobalDashboardProvider>
//       </body>
//     </html>
//   );
// }
