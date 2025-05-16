"use client";
import React from "react";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";
export const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const ConnectWalletButton = ({}) => {
  return (
    <WalletMultiButtonDynamic
      style={{
        height: "40px",
        borderRadius: "5px",
      }}
    />
  );
};

export default ConnectWalletButton;
