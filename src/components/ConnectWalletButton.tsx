"use client";
import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useUser } from "@civic/auth-web3/react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2Icon } from "lucide-react";
import { ExistingWeb3UserContext, userHasWallet } from "@civic/auth-web3";
import { stringCompact } from "@/lib/utils";

export const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const ConnectWalletButton = ({}) => {
  const { connect } = useWallet();

  const userContext = useUser();

  console.log(
    "ConnectWalletButton",
    userContext.user,
    (userContext as ExistingWeb3UserContext)?.solana?.address
  );

  const doSignIn = useCallback(async () => {
    console.log("Starting sign-in process");
    await toast.promise(userContext.signIn().then(connect), {
      pending: "Signing in...",
      success: "Sign-in completed successfully",
      error: "Sign-in failed",
    });
  }, [connect, userContext]);

  const doSignOut = useCallback(async () => {
    console.log("Starting sign-out process");
    await toast.promise(userContext.signOut, {
      pending: "Signing out...",
      success: "Sign-out completed successfully",
      error: "Sign-out failed",
    });
  }, [userContext.signOut]);

  const createWallet = () => {
    if (userContext.user && !userHasWallet(userContext)) {
      // Once the wallet is created, we can connect it straight away
      return userContext.createWallet().then(connect);
    }
  };

  if (userContext.isLoading) {
    return (
      <Button disabled>
        <span className="animate-pulse">Loading...</span>
        <Loader2Icon className="ml-2 animate-spin" />
      </Button>
    );
  }
  if (!userContext.user)
    return (
      <>
        <Button onClick={doSignIn}>SignIn</Button>
      </>
    );

  if (userContext.user) {
    return (
      <div>
        {!userHasWallet(userContext) ? (
          <>
            <Button onClick={createWallet}>Create Wallet</Button>
          </>
        ) : (
          <>
            <Button onClick={doSignOut}>
              {stringCompact(userContext.solana.address, 6)}
            </Button>
          </>
        )}
      </div>
    );
  }
};

export default ConnectWalletButton;
