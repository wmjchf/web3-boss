import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { Navbar } from "./components/Navbar";
import { Introduce } from "./components/Introduce";
import { Picture } from "./components/Picture";
import styles from "./index.less";
import { getCompanyListByAddress, ICompany } from "@/api/company";
import { useAccount } from "wagmi";

export const Company = () => {
  const { address } = useAccount();
  const [company, setCompany] = useState<ICompany>();
  const handleCompanyList = async () => {
    const { result } = await getCompanyListByAddress(address);
    result.total > 0 && setCompany(result.list[0]);
  };
  useEffect(() => {
    handleCompanyList();
  }, []);
  return (
    <div className={styles.company}>
      <Introduce companyId={company?.id}></Introduce>
      <Picture companyId={company?.id}></Picture>
      <Navbar></Navbar>
      <Fab color="primary" aria-label="add" className={styles.add}>
        {/* <AddIcon /> */}
      </Fab>
    </div>
  );
};
