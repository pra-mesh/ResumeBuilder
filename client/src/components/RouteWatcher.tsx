import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentPage, setLimit } from "@/slices/userSlice";

const RouteWatcher = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    const prevPath = prevPathRef?.current;
    const currentPath = location?.pathname;
    if (
      prevPath.startsWith("/admin/users") &&
      !currentPath.startsWith("/admin/users")
    ) {
      dispatch(setLimit(10));
      dispatch(setCurrentPage(1));
    }
  });
  return null;
};

export default RouteWatcher;
