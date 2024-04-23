import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import logo from "@/image/common/logo.png";
import { EllipsisMiddle } from "@/components/EllipsisMiddle";

import styles from "./index.less";
import { userUserStore } from "@/store";
import { useAccount } from "wagmi";
import { isMobile } from "@/utils/platform";
import toast from "react-hot-toast";
interface IHeader {
  onClick: () => void;
}
export const Header: React.FC<IHeader> = (props) => {
  const { onClick } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userInfo } = userUserStore();
  const { address } = userInfo;
  const { isConnected } = useAccount();
  const renderBtn = useMemo(() => {
    return pathname.includes("company") ? (
      <>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/jobs");
          }}
        >
          我要应聘
        </Button>

        {address && isConnected && (
          <EllipsisMiddle
            value={address}
            suffixCount={6}
            className={styles.address}
            onClick={onClick}
          ></EllipsisMiddle>
        )}
      </>
    ) : (
      <>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            if (isMobile()) {
              toast("需要在pc浏览器打开", {
                icon: "😬",
                duration: 5000,
              });
              return;
            } else {
              navigate("/company");
            }
          }}
        >
          我要招人
        </Button>
        {address && isConnected && (
          <EllipsisMiddle
            value={address}
            suffixCount={6}
            className={styles.address}
            onClick={onClick}
          ></EllipsisMiddle>
        )}
      </>
    );
    // if (!isConnected) {
    //   return (
    //     <AuthBtn>
    //       <Button variant={"contained"} size="large">
    //         Connect Wallet
    //       </Button>
    //     </AuthBtn>
    //   );
    // } else {
    //   if (localStorage.getItem("token")) {
    //     return pathname === "/company" ? (
    //       <>
    //         <Button
    //           variant="contained"
    //           size="large"
    //           onClick={() => {
    //             navigate("/jobs");
    //           }}
    //         >
    //           我要应聘
    //         </Button>

    //         <EllipsisMiddle
    //           value={address}
    //           suffixCount={6}
    //           className={styles.address}
    //         >
    //           <div className={styles.user__window}>
    //             <span
    //               className={styles.user__window__item}
    //               onClick={() => {
    //                 // disconnect();
    //                 localStorage.removeItem("token");
    //                 disconnect(
    //                   {},
    //                   {
    //                     onSuccess() {
    //                       location.reload();
    //                     },
    //                   }
    //                 );
    //               }}
    //             >
    //               退出登录
    //             </span>
    //           </div>
    //         </EllipsisMiddle>
    //       </>
    //     ) : (
    //       <>
    //         <Button
    //           variant="contained"
    //           size="large"
    //           onClick={() => {
    //             navigate("/company");
    //           }}
    //         >
    //           我要招人
    //         </Button>
    //         <EllipsisMiddle
    //           value={address}
    //           suffixCount={6}
    //           className={styles.address}
    //         ></EllipsisMiddle>
    //       </>
    //     );
    //   } else {
    //     return (
    //       <AuthBtn>
    //         <Button variant={"contained"} size="large">
    //           Login In
    //         </Button>
    //       </AuthBtn>
    //     );
    //   }
    // }
  }, [pathname, address]);

  return (
    <div className={styles.header}>
      <div
        className={styles.left}
        onClick={() => {
          navigate("/jobs", {
            replace: true,
          });
        }}
      >
        <img src={logo} alt="" />
        <span>FlowIn3</span>
      </div>
      <div className={styles.right}>{renderBtn}</div>
    </div>
  );
};
