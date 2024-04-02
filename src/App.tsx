import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";
import { config } from "./wagmi/config";
import router from "./router";
import { getCurrentUser } from "./api/user";

const queryClient = new QueryClient();
export const App = () => {
  const handleGetCurrentUser = async () => {
    const result = await getCurrentUser();
    console.log(result, "fsfds");
  };
  useEffect(() => {
    // handleGetCurrentUser();
  }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <ConnectWallet></ConnectWallet> */}
        {/* <EditorLayout></EditorLayout> */}
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>

    // <EditorLayout></EditorLayout>
  );
};
