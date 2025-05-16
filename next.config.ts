import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/profile_images/**",
      },
    ],
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID as string,
  ...(process.env.WEBPACK_ENABLE_SOLANA_WALLET_ADAPTER === "true"
    ? { enableSolanaWalletAdapter: true }
    : {}),
});

export default withCivicAuth(nextConfig);
