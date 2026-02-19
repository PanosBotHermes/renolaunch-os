'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body style={{ backgroundColor: '#080C14', color: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Something went wrong</h2>
          <button onClick={reset} style={{ background: '#6366F1', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.25rem', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
