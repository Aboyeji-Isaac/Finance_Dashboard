
import DashboardStats from "./components/DashboardStarts";
import WorkingCapitalChart from "./components/WorkingCapitalchats";
import RecentInvoices from "./components/RecentInvoices";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <WorkingCapitalChart />
      <RecentInvoices />
    </div>
  );
}
