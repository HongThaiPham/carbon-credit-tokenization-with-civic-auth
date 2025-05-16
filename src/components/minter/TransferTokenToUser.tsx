"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useTransferToken from "@/hooks/useTransferToken";
import { ArrowRightLeftIcon, Loader2, SendIcon } from "lucide-react";
type Props = {
  mint?: string;
  receiver?: string;
};
const TransferTokenToUser: React.FC<Props> = ({ mint, receiver }) => {
  const [open, setOpen] = useState(false);
  const [mintAddress, setMintAddress] = useState(mint || "");
  const [address, setAddress] = useState(receiver || "");
  const [amount, setAmount] = useState(0);
  const { mutate, isPending } = useTransferToken(mintAddress, address, amount);
  const handler = () => {
    mutate();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="space-x-2" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin size-3" />
          ) : (
            <ArrowRightLeftIcon className="size-3" />
          )}
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>Transfer Token</DialogTitle>
            <DialogDescription>
              Transfer token to another user
            </DialogDescription>
          </DialogHeader>
        </DialogHeader>
        <div className="space-y-4">
          {!mint ? (
            <>
              <Label>Token mint</Label>
              <Input
                placeholder="Token mint"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
              />
            </>
          ) : null}
          {!receiver ? (
            <>
              <Label>Address</Label>
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          ) : null}
          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <div className="flex justify-end">
            <Button disabled={isPending} onClick={handler}>
              {isPending ? (
                <Loader2 className="animate-spin size-3" />
              ) : (
                <SendIcon className="size-3" />
              )}
              Transfer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferTokenToUser;
