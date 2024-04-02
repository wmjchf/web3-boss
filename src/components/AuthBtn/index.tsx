import React, { useMemo, useEffect, useState } from "react";
import { useAccount, useSignMessage, useConnect } from "wagmi";
import { SiweMessage } from "siwe";

import { getNonce, login } from "@/api/user";

interface IAuthBtn {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}
export const AuthBtn: React.FC<IAuthBtn> = (props) => {
  const { onClick, children } = props;
  const [ready, setReady] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { connectors, connect } = useConnect();
  const { isConnected, address } = useAccount();

  const connector = useMemo(() => {
    const item = connectors.find((item) => !item.icon);
    return item;
  }, []);
  const handleConnect = () => {
    if (!ready) {
      alert("请下载metaMask钱包");
      return;
    }
    connect({ connector });
  };
  useEffect(() => {
    connector.getProvider().then((provider) => {
      setReady(!!provider);
    });
  }, [connector]);
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
  }

  return (
    <div
      onClick={() => {
        if (!isConnected) {
          handleConnect();
          return;
        }
        if (!localStorage.getItem("token")) {
          signInWithEthereum();
          return;
        }
        onClick && onClick();
      }}
    >
      {children}
    </div>
  );
};
