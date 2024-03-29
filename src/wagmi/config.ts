import { http, createConfig } from "wagmi";
import { localhost } from "./definedChain";
import { mainnet, goerli } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, goerli],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
});
