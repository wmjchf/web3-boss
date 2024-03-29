import React, { useEffect } from "react";
import { WebIrys } from "@irys/sdk";
import { useWalletClient } from "wagmi";
import { Button } from "antd";

export const Irys = () => {
  const client = useWalletClient();

  const getWebIrys = async () => {
    // Ethers5 provider

    const url = "https://devnet.irys.xyz";
    const token = "matic";
    // Devnet RPC URLs change often, use a recent one from https://chainlist.org
    const rpcURL = "";

    // Create a wallet object
    const wallet = { rpcUrl: rpcURL, name: "viemv2", provider: client.data };
    // Use the wallet object
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();

    return webIrys;
  };
  const uploadData = async () => {
    const webIrys = await getWebIrys();
    const dataToUpload = "GM world.";
    try {
      const receipt = await webIrys.upload(dataToUpload);
      console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    } catch (e) {
      console.log("Error uploading data ", e);
    }
  };
  useEffect(() => {
    if (client.data) {
      getWebIrys().then((irys) => {
        console.log(irys, "dd");
      });
    }
  }, [client]);
  return <Button onClick={uploadData}>上传数据</Button>;
};
