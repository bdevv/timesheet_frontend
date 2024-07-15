import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = useSelector((state) => state.tab.token);
  console.log("🚀 ~ PrivateRoutes ~ token:", token);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
