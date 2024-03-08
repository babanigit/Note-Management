

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protection = () => {
  const token = localStorage.getItem("token");
//   const token2 = localStorage.getItem(token1);
  console.log("from protection")
  return <>{token ? <Outlet /> : <Navigate to="/sorry" replace={true} />}</>;
};

export default Protection;
