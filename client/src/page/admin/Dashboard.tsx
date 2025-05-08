import { Suspense, lazy } from "react";

import { withErrorBoundary } from "@/components/ErrorFallback";
const HeavyReport = lazy(() => import("./Report2"));
import Report1 from "./Report1";
const SafeReport1 = withErrorBoundary(Report1);
const SafeReport2 = withErrorBoundary(HeavyReport);
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SafeReport1 />
      <Suspense fallback={<div>Report 2 is loading...</div>}>
        <SafeReport2 />
      </Suspense>
    </div>
  );
};

export default Dashboard;
