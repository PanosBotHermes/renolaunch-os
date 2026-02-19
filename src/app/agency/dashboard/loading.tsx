export default function AgencyDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="glass-card h-24 rounded-card" />
      <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="glass-card h-36 rounded-card" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="glass-card h-[420px] rounded-card" />
        <div className="glass-card h-[420px] rounded-card" />
      </div>
    </div>
  );
}
