import { Suspense } from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      Header
      <Suspense fallback={<p>Loading Page.....</p>}>
        <Outlet />
      </Suspense>
      footer
    </div>
  );
};

export default AdminLayout;
