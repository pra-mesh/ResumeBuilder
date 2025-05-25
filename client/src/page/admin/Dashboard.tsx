import { Suspense, lazy } from "react";

import { withErrorBoundary } from "@/components/ErrorFallback";
const HeavyReport = lazy(() => import("./Report2"));
const UserReport = lazy(() => import("./users/Users"));
import Report1 from "./Report1";
import { useSelector } from "react-redux";

import PrivateComponents from "@/components/PrivateComponents";

const SafeReport1 = withErrorBoundary(Report1);
const SafeReport2 = withErrorBoundary(HeavyReport);
const SafeUsers = withErrorBoundary(UserReport);

const Dashboard = () => {
  const { users } = useSelector((state: any) => state.users);

  return (
    <div>
      <h1>Dashboard</h1>
      <SafeReport1 />
      <Suspense fallback={<div>Report 2 is loading...</div>}>
        <SafeReport2 />
      </Suspense>
      <PrivateComponents adminOnly>
        <SafeUsers />
      </PrivateComponents>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
};

export default Dashboard;
