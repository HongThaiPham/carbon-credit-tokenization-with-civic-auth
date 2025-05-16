"use client";
import useUserRoleAccounts from "@/hooks/useUserRoleAccounts";
import { NFTRole } from "@/lib/constants";
import { CoinsIcon, KeyIcon, UserIcon } from "lucide-react";
import React from "react";
import UpdateCreditModal from "./UpdateCreditModal";
import CreateAtaAccountForUser from "../minter/CreateAtaAccountForUser";
import TransferTokenToUser from "../minter/TransferTokenToUser";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import NetworkExplorerLink from "../NetworkExplorerLink";
import TokenBalance from "../TokenBalance";
type Props = {
  role: NFTRole;
  mint: string;
};
const UserRoleAccounts: React.FC<Props> = ({ role, mint }) => {
  const { data } = useUserRoleAccounts(role, mint);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center p-2 bg-muted rounded-md">
        <span className="font-medium">{role}</span>
        <span className="text-muted-foreground">{data?.length} active</span>
      </div>
      <div>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              A list of all the accounts associated with the {role} role
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
                  <span className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    User
                  </span>
                </TableHead>
                {role === NFTRole.CONSUMER ? (
                  <TableHead>
                    <span className="flex items-center gap-1 justify-end">
                      <CoinsIcon className="h-4 w-4" />
                      Balance
                    </span>
                  </TableHead>
                ) : null}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((account) => (
                <TableRow key={account.controller}>
                  <TableCell className="font-medium">
                    <NetworkExplorerLink addressOrTx={account.mint} />
                  </TableCell>
                  <TableCell>
                    <NetworkExplorerLink addressOrTx={account.user} />
                  </TableCell>
                  {role === NFTRole.CONSUMER ? (
                    <TableCell className="text-right">
                      <TokenBalance account={account.user} mint={mint} />
                    </TableCell>
                  ) : null}
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      {role === NFTRole.MINTER ? (
                        <UpdateCreditModal
                          minter={account.user}
                          mint={account.rwaMint}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <CreateAtaAccountForUser
                            mint={mint!}
                            to={account.user}
                          />
                          <TransferTokenToUser
                            mint={mint!}
                            receiver={account.user}
                          />
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserRoleAccounts;
