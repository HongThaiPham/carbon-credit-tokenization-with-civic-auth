"use client";
import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useUser } from "@civic/auth-web3/react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2Icon } from "lucide-react";

export const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const ConnectWalletButton = ({}) => {
  const { user, signIn, signOut, isLoading } = useUser();
  const { publicKey } = useWallet();

  const doSignIn = useCallback(async () => {
    console.log("Starting sign-in process");
    await toast.promise(signIn, {
      pending: "Signing in...",
      success: "Sign-in completed successfully",
      error: "Sign-in failed",
    });
  }, [signIn]);

  const doSignOut = useCallback(() => {
    console.log("Starting sign-out process");
    signOut()
      .then(() => {
        console.log("Sign-out completed successfully");
      })
      .catch((error) => {
        console.error("Sign-out failed:", error);
      });
  }, [signOut]);

  if (!isLoading) {
    return (
      <Button disabled>
        <span className="animate-pulse">Loading...</span>
        <Loader2Icon className="ml-2 animate-spin" />
      </Button>
    );
  }

  if (!user)
    return (
      <>
        <Button onClick={doSignIn}>SignIn</Button>
      </>
    );

  return (
    <>
      <Button onClick={doSignOut}>{publicKey?.toBase58()}</Button>
    </>
  );
};

export default ConnectWalletButton;
