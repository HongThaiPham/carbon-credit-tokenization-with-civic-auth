"use client";
import React from "react";
import SelectMintControl from "./SelectMintControl";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2, SendIcon } from "lucide-react";
import useConsumeRwaToken from "@/hooks/useConsumeRwaToken";

const ConsumeForm = () => {
  const [mint, setMint] = React.useState<string | null>(null);
  const [amount, setAmount] = React.useState<number>(0);
  const { mutateAsync, isPending } = useConsumeRwaToken();
  const handler = async () => {
    if (!mint || amount <= 0) {
      return;
    }
    await mutateAsync({ mint, amount });
    setAmount(0);
  };
  return (
    <div className="flex flex-col gap-4">
      <Label>Select token to retire</Label>
      <SelectMintControl onChange={setMint} />

      <Label>
        Amount to retire{" "}
        <span className="text-sm text-gray-500">
          (You can only retire the amount you have)
        </span>
      </Label>
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full max-w-xs"
      />
      <div className="flex justify-start">
        <Button disabled={isPending} onClick={handler}>
          {isPending ? (
            <Loader2 className="animate-spin size-3" />
          ) : (
            <SendIcon className="size-3" />
          )}
          Retire
        </Button>
      </div>
    </div>
  );
};

export default ConsumeForm;
