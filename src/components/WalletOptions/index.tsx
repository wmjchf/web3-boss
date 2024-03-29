import React, { FC } from "react";
import { Connector, useConnect } from "wagmi";

interface IWalletOption {
  connector: Connector;
  onClick: () => void;
}

const WalletOption: FC<IWalletOption> = ({ connector, onClick }) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  );
};

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();
  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
};
