import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";

import BasicLayout from "@/layout/Basic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
  },
]);

export default router;
