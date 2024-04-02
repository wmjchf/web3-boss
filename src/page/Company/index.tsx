import React, { useEffect, useState, useRef } from "react";
import Fab from "@mui/material/Fab";
import { Navbar } from "./components/Navbar";
import { Introduce } from "./components/Introduce";
import { Picture } from "./components/Picture";
import styles from "./index.less";
import {
  getCompanyDetail,
  getCompanyListByAddress,
  ICompany,
} from "@/api/company";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthBtn } from "@/components/AuthBtn";
import { userUserStore } from "@/store";

export const Company = () => {
  const { userInfo } = userUserStore();
  const { address } = userInfo;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  const [company, setCompany] = useState<ICompany>();
  const handleCompanyList = async () => {
    const { result } = await getCompanyListByAddress(address);
    result.total > 0 && setCompany(result.list[0]);
  };
  useEffect(() => {
    if (address && !companyId) {
      handleCompanyList();
    }
  }, [address, companyId]);
  const handleGetCompanyDetail = async () => {
    const { result } = await getCompanyDetail(parseInt(companyId));
    setCompany(result);
  };
  useEffect(() => {
    if (companyId) {
      handleGetCompanyDetail();
    }
  }, [companyId]);
  return (
    <div className={styles.company}>
      <Introduce companyId={companyId || company?.id}></Introduce>
      <Picture
        companyId={companyId || company?.id}
        address={company?.address}
      ></Picture>
      <Navbar
        companyId={companyId || company?.id}
        caddress={company?.address}
      ></Navbar>

      {address === company?.address && (
        <AuthBtn
          onClick={() => {
            navigate(`/addJob/${companyId || company?.id}`);
          }}
        >
          <Fab color="primary" aria-label="add" className={styles.add}></Fab>
        </AuthBtn>
      )}
    </div>
  );
};
