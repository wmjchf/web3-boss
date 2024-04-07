import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import KeepAlive from "react-activation";
import BasicLayout from "@/layout/Basic";
import { Jobs } from "@/page/Jobs";

import { Company } from "@/page/Company";
import { AddJob } from "@/page/AddJob";
import { UpdateJob } from "@/page/UpdateJob";
import { Job } from "@/page/Job";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/jobs"}></Navigate>,
      },
      {
        path: "jobs",
        element: (
          <KeepAlive key={"jobs"}>
            <Jobs></Jobs>
          </KeepAlive>
        ),
      },

      {
        path: "company",
        element: (
          <KeepAlive key={"company"}>
            <Company></Company>
          </KeepAlive>
        ),
        children: [
          {
            path: ":id",
            element: <Company></Company>,
          },
        ],
      },
      {
        path: "addJob/:companyId",
        element: <AddJob></AddJob>,
      },
      {
        path: "updateJob/:id",
        element: <UpdateJob></UpdateJob>,
      },
      {
        path: "job/:id",
        element: <Job></Job>,
      },
    ],
  },
]);

export default router;
