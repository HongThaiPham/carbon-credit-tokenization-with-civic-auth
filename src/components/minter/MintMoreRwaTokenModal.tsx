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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useMintRwaToken from "@/hooks/useMintRwaToken";
import { Loader2, SendIcon } from "lucide-react";
type Props = {
  mint: string;
};
const MintMoreRwaTokenModal: React.FC<Props> = ({ mint }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const { mutateAsync, isPending } = useMintRwaToken(mint);
  const handler = async () => {
    await mutateAsync({ amount });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Mint More RWA Token</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mint RWA token</DialogTitle>
          <DialogDescription>
            This will mint more RWA token to your account
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
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
              Mint
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MintMoreRwaTokenModal;
