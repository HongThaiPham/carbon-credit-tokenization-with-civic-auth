"use client";
import { useQuery } from "@tanstack/react-query";
import React, { memo } from "react";
import { getHistory } from "../app/(console)/_actions/history.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonWapper from "@/components/SkeletonWapper";
import NetworkExplorerLink from "@/components/NetworkExplorerLink";
import useTokenMetadata from "@/hooks/useTokenMetadata";
type Props = {
  type: "MINT" | "RETIRE";
};
const HistoryTable: React.FC<Props> = ({ type }) => {
  const { data, isPending } = useQuery({
    queryKey: ["transactionHistory", type],
    queryFn: () => getHistory(type),
  });
  return (
    <SkeletonWapper isLoading={isPending}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tx ID</TableHead>
            <TableHead>Token Mint</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.id ? <NetworkExplorerLink addressOrTx={item.id} /> : null}
              </TableCell>
              <TableCell>
                {item.mint ? (
                  <NetworkExplorerLink addressOrTx={item.mint} />
                ) : null}
              </TableCell>
              <TableCell>
                {item.token_account ? (
                  <NetworkExplorerLink addressOrTx={item.token_account} />
                ) : null}
              </TableCell>
              <TableCell>
                {item.mint && item.amount ? (
                  <RenderAmount mint={item.mint} amount={item.amount} />
                ) : null}
              </TableCell>
              <TableCell className="text-right">
                {new Date(item.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SkeletonWapper>
  );
};

export default HistoryTable;

const RenderAmount = memo(
  ({ mint, amount }: { mint: string; amount: string }) => {
    const { data, isPending } = useTokenMetadata(mint);
    if (!data) return null;
    return (
      <SkeletonWapper isLoading={isPending}>
        {(
          BigInt(amount) / BigInt(10 ** data?.mintInfo.decimals)
        ).toLocaleString()}{" "}
        <span className="font-semibold">{data.metadata?.symbol}</span>
      </SkeletonWapper>
    );
  }
);

RenderAmount.displayName = "RenderAmount";
