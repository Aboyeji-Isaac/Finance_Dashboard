"use client";

import ProtectedRoute from "./lib/ProtectedRoute";
import DashboardContent from "./DashboardContent";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
