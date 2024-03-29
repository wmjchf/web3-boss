import React from "react";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useReadContract,
} from "wagmi";
import ChangeNameJSON from "./changeName.json";
export const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  // const result = useReadContract({
  //   functionName: "getName",
  //   address: "0x0B32a3F8f5b7E5d315b9E52E640a49A89d89c820",
  //   abi: ChangeNameJSON.abi,
  // });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
};
