"use client";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardContent from "./DashboardContent";
import DashboardPage  from "./dashboard/page";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
