import React from "react";
import { useAccount } from "wagmi";
import { Account } from "../Account";
import { WalletOptions } from "../WalletOptions";

export const ConnectWallet = () => {
  const account = useAccount();

  const { isConnected } = account;
  if (isConnected) return <Account />;
  return <WalletOptions />;
};
