"use client";
import NavHeader from "@/components/NavHeader";
import NoAuthorize from "@/components/NoAuthorize";
import useRwaConfig from "@/hooks/useRwaConfig";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { publicKey } = useWallet();
  const { data } = useRwaConfig();
  return (
    <>
      <NavHeader navs={[]} />

      {!data || !publicKey || !data.authority.equals(publicKey) ? (
        <NoAuthorize />
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="p-3 space-y-6">{children}</div>
        </div>
      )}
    </>
  );
}
