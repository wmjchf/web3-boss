import React, { useEffect, useState, useRef } from "react";
import Fab from "@mui/material/Fab";
import { Navbar } from "./components/Navbar";
import { Introduce } from "./components/Introduce";
import { Picture } from "./components/Picture";
import styles from "./index.less";
import { getCompanyListByAddress, ICompany } from "@/api/company";
import { useAccount } from "wagmi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { JobModal } from "./components/JobModal";
import { AuthBtn } from "@/components/AuthBtn";

export const Company = () => {
  const { address } = useAccount();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
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
      <Introduce companyId={companyId || company?.id}></Introduce>
      <Picture
        companyId={companyId || company?.id}
        address={company?.address}
      ></Picture>
      <Navbar></Navbar>

      <AuthBtn
        onClick={() => {
          navigate("/addJob");
        }}
      >
        <Fab color="primary" aria-label="add" className={styles.add}></Fab>
      </AuthBtn>
    </div>
  );
};
