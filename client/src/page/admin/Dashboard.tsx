import { Suspense, lazy } from "react";

import { withErrorBoundary } from "@/components/ErrorFallback";
const HeavyReport = lazy(() => import("./Report2"));
const UserReport = lazy(() => import("./Users"));
import Report1 from "./Report1";

const SafeReport1 = withErrorBoundary(Report1);
const SafeReport2 = withErrorBoundary(HeavyReport);
const SafeUsers = withErrorBoundary(UserReport);
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SafeReport1 />
      <Suspense fallback={<div>Report 2 is loading...</div>}>
        <SafeReport2 />
      </Suspense>
      <SafeUsers />
    </div>
  );
};

export default Dashboard;
