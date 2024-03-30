import React from "react";
import { createBrowserRouter } from "react-router-dom";

import BasicLayout from "@/layout/Basic";
import { Jobs } from "@/page/Jobs";
import { Company } from "@/page/Company";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "jobs",
        element: <Jobs></Jobs>,
      },
      {
        path: "company",
        element: <Company></Company>,
      },
    ],
  },
]);

export default router;
