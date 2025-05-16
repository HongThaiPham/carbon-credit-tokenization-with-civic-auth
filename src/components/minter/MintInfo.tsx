"use client";
import useTokenMetadata from "@/hooks/useTokenMetadata";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { stringCompact } from "@/lib/utils";
import { Plus } from "lucide-react";
import IssueNftForm from "../admin/IssueNftForm";
import { NFTRole } from "@/lib/constants";
import UserRoleAccounts from "../admin/UserRoleAccounts";
import MintMoreRwaTokenModal from "./MintMoreRwaTokenModal";
type Props = {
  address: string;
};
const MintInfo: React.FC<Props> = ({ address }) => {
  const { data } = useTokenMetadata(address);
  if (!data) {
    return null;
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your RWA Token mint </CardTitle>
          <CardDescription>{address}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              Token Name: <strong>{data.metadata?.name}</strong>
            </div>
            <div className="flex justify-between">
              Symbol:<strong>{data.metadata?.symbol}</strong>
            </div>
            <div className="flex justify-between">
              Decimals:<strong>{data.mintInfo.decimals}</strong>
            </div>
            <div className="flex justify-between">
              Update authority:{" "}
              <strong> {data.metadata?.updateAuthority?.toString()}</strong>
            </div>
            <div className="flex justify-between">
              Current supply:
              <strong>
                {(
                  data.mintInfo.supply / BigInt(10 ** data.mintInfo.decimals)
                ).toLocaleString()}
              </strong>
            </div>
            <div className="flex justify-between">
              Token URI:{" "}
              <strong>
                <a
                  href={data.metadata?.uri?.toString()}
                  target="_blank"
                  className="text-blue-500"
                >
                  {stringCompact(data.metadata?.uri, 20)}
                </a>
              </strong>
            </div>
            <div className="flex justify-end items-center">
              <MintMoreRwaTokenModal mint={address} />
            </div>
          </div>
        </CardContent>
      </Card>
      {data.transferHook ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" /> Grant CONSUMER
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <IssueNftForm role={NFTRole.CONSUMER} mint={address} />
            </CardContent>
          </Card>
          <UserRoleAccounts role={NFTRole.CONSUMER} mint={address} />
        </>
      ) : null}
    </>
  );
};

export default MintInfo;
