"use client";

export default function Page() {
  return (
    <div
      style={{
        width: "100%",          // parent container
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "flex-start", // optional, top align
      }}
    >
      <div
        style={{
          width: "100%",        // keep container full width
          height: "100%",
          overflow: "hidden",   // hide the overflowing zoomed iframe
          display: "flex",
          justifyContent: "center", // center iframe inside
        }}
      >
        <iframe
          src="https://flavourheaven.in/tools/manage_store_purchase.html"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            transform: "scale(1.2)",       // zoom iframe content
            transformOrigin: "top center", // center zoom
          }}
          allowFullScreen
        />
      </div>
    </div>
  );
}


// "use client";
// export default async function Page({ params }) {
//   return <div>Page</div>;
// }
