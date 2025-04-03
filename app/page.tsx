import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../components/content/Dashboard";
import { Suspense } from "react";
import { DashboardSkeleton } from "../components/content/LoadingStates";

export default function Home() {
  return (
    <MainLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </MainLayout>
  );
}
