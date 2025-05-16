"use client";
import { useUser } from "@civic/auth-web3/react";
import { embeddedWallet, userHasWallet } from "@civic/auth-web3";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const ProfilePage = () => {
  const userContext = useUser();
  const { publicKey, connect, connected } = useWallet();

  const createWallet = () => {
    if (userContext.user && !userHasWallet(userContext)) {
      // Once the wallet is created, we can connect it straight away
      return userContext.createWallet().then(connect);
    }
  };
  return (
    <div>
      {userContext.user && (
        <div>
          {!userHasWallet(userContext) && (
            <p>
              <button onClick={createWallet}>Create Wallet</button>
            </p>
          )}
          {userHasWallet(userContext) && (
            <>
              <p>Wallet address: {userContext.solana.address}</p>
              {/* <p>
                Balance:{" "}
                {balance?.data
                  ? `${(
                      BigInt(balance.data.value) / BigInt(1e18)
                    ).toString()} ${balance.data.symbol}`
                  : "Loading..."}
              </p> */}
              {connected ? (
                <p>Wallet is connected</p>
              ) : (
                <button>Connect Wallet</button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
