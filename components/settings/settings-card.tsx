export default function SettingsCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring justify-between  p-3 px-4 rounded-xl border border-input ${className}`}
    >
      {children}
    </div>
  );
}
