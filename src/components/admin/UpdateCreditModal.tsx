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
import useMinterNftMetadata from "@/hooks/useMinterNftMetadata";
import useUpdateMinterCredit from "@/hooks/useUpdateMinterCredit";
import { Loader2, SaveIcon } from "lucide-react";

type Props = {
  minter: string;
  mint: string;
};

const UpdateCreditModal: React.FC<Props> = ({ minter, mint }) => {
  const [open, setOpen] = useState(false);
  const { data } = useMinterNftMetadata(minter, mint);
  const [amount, setAmount] = useState(0);
  const { mutateAsync, isPending } = useUpdateMinterCredit(minter, mint);
  const handler = async () => {
    await mutateAsync(amount);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Update credit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Minting Limits</DialogTitle>
          <DialogDescription>
            This actions will update the minting limits for the minter address.
            <br /> Available credit: {data?.availableCredits}
            <br />
            Minted token amount: {data?.mintedCredits}
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
            <Button onClick={handler} disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <SaveIcon className="size-4" />
              )}
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCreditModal;
