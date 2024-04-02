import React from "react";
import { createBrowserRouter } from "react-router-dom";

import BasicLayout from "@/layout/Basic";
import { Jobs } from "@/page/Jobs";

import { Company } from "@/page/Company";
import { AddJob } from "@/page/AddJob";
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
      {
        path: "addJob/:companyId",
        element: <AddJob></AddJob>,
      },
    ],
  },
]);

export default router;
