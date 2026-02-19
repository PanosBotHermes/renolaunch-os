'use client';

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#05080F",
          color: "#E8EDF5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "Inter, system-ui, sans-serif",
          margin: 0,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.035)",
            borderRadius: "12px",
            padding: "24px",
            width: "100%",
            maxWidth: "380px",
            textAlign: "center",
            backdropFilter: "blur(20px)",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", margin: 0, marginBottom: "0.875rem", fontWeight: 600 }}>
            Something went wrong
          </h2>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: "44px",
              border: "none",
              borderRadius: "10px",
              padding: "0 18px",
              cursor: "pointer",
              color: "#fff",
              fontWeight: 500,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
