"use client";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useUser } from "@civic/auth-web3/react";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const { user } = useUser();

  if (user) {
    redirect("/admin/user-identity");
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      LoginPage
      <ConnectWalletButton />
    </div>
  );
};

export default LoginPage;
