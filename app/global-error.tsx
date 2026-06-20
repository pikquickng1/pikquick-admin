"use client";

/**
 * Override of Next.js's built-in /_global-error page.
 *
 * The built-in implementation triggers Next.js 16.1.6's
 * `workUnitAsyncStorage` invariant during prerender. Providing a
 * user-owned copy opts the build out of the built-in prerender path
 * for this route.
 *
 * See app/layout.tsx for context.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ marginBottom: 16, color: "#555" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "8px 16px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
