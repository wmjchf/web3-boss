import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";

import BasicLayout from "@/layout/Basic";
import { Jobs } from "@/page/Jobs";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "jobs",
        element: <Jobs></Jobs>,
      },
    ],
  },
]);

export default router;
