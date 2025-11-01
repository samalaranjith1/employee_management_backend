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
      <body style={{ fontFamily: "var(--font-nunito-sans)" }}>
        <div className="app-container" style={{
          maxWidth: "1280px", // limit the width
          margin: "0 auto",   // center horizontally
          width: "100%",      // make it responsive for smaller screens
          // padding: "0 16px",  // optional inner padding
        }}>
          <GlobalDashboardProvider>
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
          </GlobalDashboardProvider>
        </div>
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
