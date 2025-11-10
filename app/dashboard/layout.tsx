// app/dashboard/layout.tsx

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
