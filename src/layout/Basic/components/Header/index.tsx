import React, { useMemo, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSignMessage,
} from "wagmi";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { EllipsisMiddle } from "@/components/EllipsisMiddle";
import { SiweMessage } from "siwe";
import { getNonce, login } from "@/api/user";
import styles from "./index.less";

export const Header = () => {
  const { connectors, connect } = useConnect();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  const [ready, setReady] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const domain = window.location.host;
  const origin = window.location.origin;
  const connector = useMemo(() => {
    const item = connectors.find((item) => !item.icon);
    return item;
  }, []);
  useEffect(() => {
    connector.getProvider().then((provider) => {
      setReady(!!provider);
    });
  }, [connector]);

  const handleConnect = () => {
    // if (!ready) {
    //   alert("请下载metaMask钱包");
    //   return;
    // }
    connect({ connector });
  };
  const handleDisConnect = () => {
    disconnect();
  };

  async function createSiweMessage(address, statement) {
    const { result } = await getNonce();
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      nonce: result.nonce,
    });
    return message.prepareMessage();
  }
  async function signInWithEthereum() {
    const message = await createSiweMessage(
      address,
      "Sign in with Ethereum to the app."
    );

    const signature = await signMessageAsync({
      message,
      account: address,
    });

    const { result } = await login({ signature, message });

    localStorage.setItem("token", result.token);
    setIsLogin(true);
  }

  const renderBtn = useMemo(() => {
    if (!isConnected) {
      return (
        <Button variant="contained" size="large" onClick={handleConnect}>
          Connect Wallet
        </Button>
      );
    } else {
      if (isLogin) {
        return pathname === "/company" ? (
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

            <EllipsisMiddle
              value={address}
              suffixCount={6}
              className={styles.address}
            >
              <div className={styles.user__window}>
                <span
                  className={styles.user__window__item}
                  onClick={() => {
                    disconnect();
                  }}
                >
                  退出登录
                </span>
              </div>
            </EllipsisMiddle>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/company");
              }}
            >
              我要招人
            </Button>
            <EllipsisMiddle
              value={address}
              suffixCount={6}
              className={styles.address}
            ></EllipsisMiddle>
          </>
        );
      } else {
        return (
          <Button variant="contained" size="large" onClick={signInWithEthereum}>
            Login In
          </Button>
        );
      }
    }
  }, [isConnected, isLogin, pathname]);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.placeholder}>WorkThree</div>
      </div>
      <div className={styles.right}>{renderBtn}</div>
    </div>
  );
};
