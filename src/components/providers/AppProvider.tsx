"use client";
import React, { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "../ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";

const queryClient = new QueryClient();

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaProvider>
        <CivicAuthProvider>
          <Toaster richColors position="bottom-right" />
          <AppThemeProvider>{children}</AppThemeProvider>
          <ToastContainer />
        </CivicAuthProvider>
      </SolanaProvider>
    </QueryClientProvider>
  );
};
