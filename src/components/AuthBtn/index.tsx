import React, { useMemo, useEffect, useState } from "react";
import { useAccount, useSignMessage, useConnect } from "wagmi";
import { SiweMessage } from "siwe";

import { getNonce, login } from "@/api/user";
import { userUserStore } from "@/store";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

interface IAuthBtn {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
}
export const AuthBtn: React.FC<IAuthBtn> = (props) => {
  const { onClick, children, className } = props;
  const [ready, setReady] = useState(false);
  const { updateToken, getCurrentUser } = userUserStore();
  const { signMessageAsync } = useSignMessage();
  const { connectors, connect } = useConnect();
  const { isConnected, address } = useAccount();
  const { userInfo } = userUserStore();

  const connector = useMemo(() => {
    const item = connectors.find((item) => item.id === "io.metamask");
    return item;
  }, [connectors]);

  const handleConnect = () => {
    if (!connector) {
      toast("这里需要先下载metaMask钱包", {
        icon: "😬",
        duration: 5000,
      });
      return;
    }
    connect({ connector });
  };

  async function createSiweMessage(address, statement) {
    const domain = window.location.host;
    const origin = window.location.origin;
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
    try {
      const message = await createSiweMessage(
        address,
        "Sign in with Ethereum to the app."
      );

      const signature = await signMessageAsync({
        message,
        account: address,
      });

      const { result } = await login({
        signature,
        message,
        share: localStorage.getItem("address"),
      });
      updateToken(result.token);
      localStorage.setItem("token", result.token);
      getCurrentUser();
    } catch (error) {
      console.log(error, "fsdfs");
    }
  }
  const renderChildren = () => {
    if (!isConnected) {
      return <Button>connect wallet</Button>;
    }
    if (!userInfo.address) {
      return <Button>login in</Button>;
    }
    return children;
  };
  return (
    <div
      className={className}
      onClick={() => {
        if (!isConnected) {
          handleConnect();
          return;
        }
        if (!userInfo.address) {
          signInWithEthereum();
          return;
        }
        onClick && onClick();
      }}
    >
      {renderChildren()}
    </div>
  );
};
