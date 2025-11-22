import { Nunito_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/common/LayOut/Header";
import { GlobalDashboardProvider } from "@/contexts";
import Head from "next/head";

// ✅ Load Nunito Sans font
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // common weights (can adjust if needed)
});

// ✅ Metadata export supported in App Router
export const metadata = {
  title: "Costonomy",
  description: "Manage your restaurants easily with Costonomy.",
  keywords: "restaurant management, cost control, inventory, food service",
  authors: [{ name: "Ranjith" }],
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
    <html lang="en" className={nunitoSans.variable}>
      <body style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <GlobalDashboardProvider>
          {/* Fixed header that aligns with main content */}
          <header
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%", // not 100vw to avoid scrollbar offset
              zIndex: 1000,
              background: "#fff", // optional
              borderBottom: "1px solid #ddd",
            }}
          >
            {/* Inner container matches main width */}
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                height: "64px",
                display: "flex",
                alignItems: "center",
                padding: "0 16px", // add some horizontal breathing room
              }}
            >
              <Header />
            </div>
          </header>

          {/* Main content wrapper */}
          <div
            className="app-container px-md-3"
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              width: "100%",
              // padding: "0 16px",
              paddingTop: "64px", // matches header height
            }}
          >
            <main>
              {children}
            </main>
          </div>
        </GlobalDashboardProvider>
      </body>
    </html>
  );
}
{/* <GlobalDashboardProvider>
            <div className="px-md-3">
              <div style={{
                position: "fixed",
                top: 0,
                width: '100%',
                height: '64px',
                zIndex: 1000,
                // backgroundColor: '#fff',
                maxWidth: "1240px !important", // limit the width
                margin: "0 auto",   // center horizontally
                width: "96%",      // make it responsive for smaller screens
                // padding: "0 16px", // if header has transparent bg
              }}>
                <Header />
              </div>

              <main style={{ paddingTop: '64px' }}>
                {children}
              </main>
            </div>
          </GlobalDashboardProvider> */}

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
