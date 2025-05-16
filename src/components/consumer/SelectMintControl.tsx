"use client";
import React, { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useUserMint from "@/hooks/useUserMint";
import { useConnection } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";
import { getTokenMetadata } from "@solana/spl-token";
import { stringCompact } from "@/lib/utils";
type Props = {
  onChange?: (value: string) => void;
};
const SelectMintControl: React.FC<Props> = ({ onChange }) => {
  const { data } = useUserMint();
  const [mint, setMint] = React.useState<string | null>(null);

  const tokenAccount = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.userTokenAccounts.find(
      (tokenAccount) => tokenAccount.account.data.parsed.info.mint === mint
    );
  }, [data, mint]);
  const handleChange = (value: string) => {
    setMint(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <div className="space-y-4">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Token mint" />
        </SelectTrigger>
        <SelectContent>
          {data?.userMints.map((mint) => (
            <SelectMintItem key={mint} mint={mint} />
          ))}
        </SelectContent>
      </Select>
      {mint ? (
        <div>
          <div>
            Mint: <span>{mint}</span>
          </div>
          <div>
            Token Account: <span>{tokenAccount?.pubkey.toString()}</span>
          </div>
          <div>
            Token Account Balance:{" "}
            <span>
              {
                tokenAccount?.account.data.parsed.info.tokenAmount
                  .uiAmountString
              }
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SelectMintControl;

const SelectMintItem = ({ mint }: { mint: string }) => {
  const { connection } = useConnection();
  const [metadata, setMetadata] = React.useState<{
    name: string;
    symbol: string;
  }>({
    name: "",
    symbol: "",
  });
  useEffect(() => {
    getTokenMetadata(connection, new web3.PublicKey(mint)).then((metadata) => {
      setMetadata({
        name: metadata?.name ?? "",
        symbol: metadata?.symbol ?? "",
      });
    });
  }, [connection, mint]);
  return (
    <SelectItem value={mint}>
      [<b>{metadata.symbol}</b>] {metadata.name} {stringCompact(mint)}
    </SelectItem>
  );
};
