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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AuthBtn } from "@/components/AuthBtn";
import { userUserStore } from "@/store";
import toast from "react-hot-toast";

const Company = () => {
  const { userInfo } = userUserStore();
  const { id, companies } = userInfo;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id: companyId } = useParams();
  const address = searchParams.get("address");
  address && localStorage.setItem("address", address);
  const [company, setCompany] = useState<ICompany>();

  const handleGetCompanyDetail = async () => {
    const { result } = await getCompanyDetail(parseInt(companyId));
    setCompany(result);
  };
  useEffect(() => {
    if (companyId) {
      handleGetCompanyDetail();
    }
  }, [companyId]);
  useEffect(() => {
    if (!companyId) {
      setCompany(companies[0]);
    }
  }, [companies, companyId]);

  return (
    <div className={styles.company}>
      <Introduce companyId={companyId || company?.id}></Introduce>
      <Picture
        companyId={companyId || company?.id}
        userId={company?.userId}
      ></Picture>
      <Navbar
        companyId={companyId || company?.id}
        userId={company?.userId}
      ></Navbar>

      {(id === company?.userId || !company) && (
        // <AuthBtn
        // onClick={() => {
        //   navigate(`/addJob/${companyId || company?.id}`);
        // }}
        // >
        <Fab
          color="primary"
          aria-label="add"
          className={styles.add}
          onClick={() => {
            if (!company) {
              toast("先要完善项目/团队/公司信息", {
                icon: "😬",
                duration: 5000,
              });
              return;
            }
            navigate(`/addJob/${companyId || company?.id}`);
          }}
        >
          <i className="iconfont icon-tianjia1"></i>
        </Fab>
        // </AuthBtn>
      )}
    </div>
  );
};
export default Company;
