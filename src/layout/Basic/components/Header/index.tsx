import React, { useMemo, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { SiweMessage } from "siwe";
import styles from "./index.less";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { connectors, connect } = useConnect();
  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [ready, setReady] = useState(false);
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
    if (!ready) {
      alert("请下载metaMask钱包");
      return;
    }
    connect({ connector });
  };
  const handleDisConnect = () => {
    disconnect();
  };

  async function createSiweMessage(address, statement) {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      // nonce: await res.text(),
    });
    return message.prepareMessage();
  }
  async function signInWithEthereum() {
    // const signer = await provider.getSigner();
    // const message = await createSiweMessage(
    //     await signer.getAddress(),
    //     'Sign in with Ethereum to the app.'
    // );
    // const signature = await signer.signMessage(message);
    // const res = await fetch(`${BACKEND_ADDR}/verify`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message, signature }),
    //     credentials: 'include'
    // });
    // console.log(await res.text());
    signMessage({ message: "hello world", account: address });
  }
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.placeholder}></div>
      </div>
      <div className={styles.right}>
        {!isConnected ? (
          <Button variant="contained" size="large" onClick={handleConnect}>
            Connect Wallet
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              size="large"
              onClick={signInWithEthereum}
              className={styles.seek}
            >
              我要应聘
            </Button>
            <Button variant="contained" size="large" onClick={handleDisConnect}>
              我要招人
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
