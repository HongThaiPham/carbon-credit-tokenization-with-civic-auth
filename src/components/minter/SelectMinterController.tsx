"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useConnection } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";
import { getTokenMetadata } from "@solana/spl-token";
import { stringCompact } from "@/lib/utils";
import useUserRoleAccountsbyUser from "@/hooks/useUserRoleAccountsbyUser";
import { NFTRole } from "@/lib/constants";
type Props = {
  onChange?: (value: string) => void;
};
const SelectMinterController: React.FC<Props> = ({ onChange }) => {
  const { data } = useUserRoleAccountsbyUser(NFTRole.MINTER);
  const handleChange = (value: string) => {
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
          {data?.map((acc) => (
            <SelectMintItem key={acc.mint} mint={acc.rwaMint} />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMinterController;

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
