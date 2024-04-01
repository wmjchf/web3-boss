import React, { useEffect, useState, useRef } from "react";
import Fab from "@mui/material/Fab";
import { Navbar } from "./components/Navbar";
import { Introduce } from "./components/Introduce";
import { Picture } from "./components/Picture";
import styles from "./index.less";
import { getCompanyListByAddress, ICompany } from "@/api/company";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { JobModal } from "./components/JobModal";

export const Company = () => {
  const { address } = useAccount();
  const modalRef = useRef<any>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<ICompany>();
  const handleCompanyList = async () => {
    const { result } = await getCompanyListByAddress(address);
    result.total > 0 && setCompany(result.list[0]);
  };
  useEffect(() => {
    if (address) {
      handleCompanyList();
    }
  }, [address]);
  return (
    <div className={styles.company}>
      <Introduce companyId={company?.id}></Introduce>
      <Picture companyId={company?.id} address={company?.address}></Picture>
      <Navbar></Navbar>
      <Fab
        color="primary"
        aria-label="add"
        className={styles.add}
        onClick={() => {
          navigate("/addJob");
        }}
      >
        {/* <AddIcon /> */}
      </Fab>
    </div>
  );
};
