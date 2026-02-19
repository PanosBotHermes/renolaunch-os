export default function AgencyClientsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="glass-card h-20 rounded-card" />
      <div className="glass-card h-20 rounded-card" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="glass-card h-72 rounded-card" />
        ))}
      </div>
    </div>
  );
}
