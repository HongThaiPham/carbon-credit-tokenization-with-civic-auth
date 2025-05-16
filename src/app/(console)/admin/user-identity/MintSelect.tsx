"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRwaTokenCreated from "@/hooks/useRwaTokenCreated";
import { stringCompact } from "@/lib/utils";
import { web3 } from "@coral-xyz/anchor";
import { getTokenMetadata } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";
import { useController } from "react-hook-form";

const MintSelect = () => {
  const { data } = useRwaTokenCreated();

  const { field, formState } = useController({
    name: "mint",
  });

  return (
    <Select
      disabled={formState.disabled}
      key={field.value}
      value={field.value.toString()}
      defaultValue={field.value.toString()}
      onValueChange={field.onChange}
    >
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Token mint" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => (
          <SelectMintItem key={item.rwaMint} mint={item.rwaMint} />
        ))}
      </SelectContent>
    </Select>
  );
};

export default MintSelect;

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
