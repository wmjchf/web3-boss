import React, { useEffect, Suspense } from "react";
import { RouterProvider, useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";
import { config } from "./wagmi/config";
import router from "./router";
import { userUserStore } from "./store";

const queryClient = new QueryClient();

export const App = () => {
  const { getCurrentUser } = userUserStore();

  const init = async () => {
    await getCurrentUser();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <ConnectWallet></ConnectWallet> */}
        {/* <EditorLayout></EditorLayout> */}
        <Suspense fallback={<div>12</div>}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>

        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>

    // <EditorLayout></EditorLayout>
  );
};
