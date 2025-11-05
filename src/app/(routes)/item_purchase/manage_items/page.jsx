"use client";

export default function Page() {
  return (
    <div
      style={{
        width: "120vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://flavourheaven.in/tools/manage_store_purchase.html"
        style={{
          border: "none",
          width: "120%",
          height: "100%",
        }}
        allowFullScreen
      />
    </div>
  );
}
// "use client";
// export default async function Page({ params }) {
//   return <div>Page</div>;
// //https://flavourheaven.in/tools/manage_store_purchase.html
// }
