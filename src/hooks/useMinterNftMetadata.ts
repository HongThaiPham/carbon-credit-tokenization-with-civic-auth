import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { toast } from "react-toastify";
import { convertMetadataToObject } from "@/lib/utils";
import { web3 } from "@coral-xyz/anchor";
import { fromLegacyPublicKey } from "@solana/compat";
import {
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from "@solana/kit";
import { getTokenMetadata } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";

const useMinterNftMetadata = (minter: string, mint: string) => {
  const program = useRwaProgram();
  const addressEncoder = getAddressEncoder();
  const { connection } = useConnection();
  return useQuery({
    queryKey: ["minterNftMetadata", minter],
    queryFn: async () => {
      if (!minter) {
        toast.error("Wallet not connected");
        return;
      }
      const [nftMinterMintAddress] = await getProgramDerivedAddress({
        programAddress: fromLegacyPublicKey(program.programId),
        seeds: [
          Buffer.from("m"),
          addressEncoder.encode(address(mint)),
          addressEncoder.encode(address(minter)),
        ],
      });

      const metadata = await getTokenMetadata(
        connection,
        new web3.PublicKey(nftMinterMintAddress)
      );

      const { available_credits, minted_credits } = convertMetadataToObject(
        metadata?.additionalMetadata
      );

      return {
        availableCredits: Number(available_credits),
        mintedCredits: Number(minted_credits),
      };
    },
  });
};

export default useMinterNftMetadata;
