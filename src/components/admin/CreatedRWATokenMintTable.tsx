"use client";
import useRwaTokenCreated from "@/hooks/useRwaTokenCreated";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { KeyIcon, CoinsIcon, MousePointerClickIcon } from "lucide-react";
import NetworkExplorerLink from "../NetworkExplorerLink";
import useTokenMetadata from "@/hooks/useTokenMetadata";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";

const CreatedRWATokenMintTable = () => {
  const { data } = useRwaTokenCreated();
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center p-2 bg-muted rounded-md">
        <span className="font-medium">Created RWAs token mint</span>
      </div>
      <div>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              A list of all created RWAs token mint. You can grant minter role
              to users to allow them to mint RWAs token.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <span className="flex items-center gap-1">
                    <KeyIcon className="h-4 w-4" />
                    Mint
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">Name</span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">Symbol</span>
                </TableHead>

                <TableHead>
                  <span className="flex items-center gap-1 justify-end">
                    <CoinsIcon className="h-4 w-4" />
                    Supply
                  </span>
                </TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((account) => (
                <RWATokenMintTableRow
                  key={account.rwaMint}
                  mint={account.rwaMint}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CreatedRWATokenMintTable;

const RWATokenMintTableRow = ({ mint }: { mint: string }) => {
  const { data, isLoading } = useTokenMetadata(mint);
  if (isLoading)
    return (
      <TableRow key={mint}>
        <TableCell className="font-medium">
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-4" />
        </TableCell>
      </TableRow>
    );
  return (
    <TableRow key={mint}>
      <TableCell className="font-medium">
        <NetworkExplorerLink addressOrTx={mint} />
      </TableCell>
      <TableCell className="font-medium">
        {data?.metadata?.name || "N/A"}
      </TableCell>
      <TableCell className="font-medium">
        {data?.metadata?.symbol || "N/A"}
      </TableCell>
      <TableCell className="text-right">{data?.mintInfo.supply}</TableCell>
      <TableCell className="text-right">
        <Link href={`/admin/mint/${mint}`}>
          <Button variant={"ghost"} size={"icon"}>
            <MousePointerClickIcon className="size-4 stroke-indigo-500" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};
