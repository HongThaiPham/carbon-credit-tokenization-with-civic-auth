"use client";
import React from "react";
import { Button } from "../ui/button";
import useCreateAtaAccount from "@/hooks/useCreateAtaAccount";
import { Loader2, SaveIcon } from "lucide-react";
type Props = {
  mint: string;
  to: string;
};
const CreateAtaAccountForUser: React.FC<Props> = ({ mint, to }) => {
  const { mutateAsync, isPending } = useCreateAtaAccount(mint, to);
  const handler = async () => {
    await mutateAsync();
  };
  return (
    <Button
      onClick={handler}
      disabled={isPending}
      className="space-x-2"
      size={"sm"}
    >
      {isPending ? (
        <Loader2 className="animate-spin size-3" />
      ) : (
        <SaveIcon className="size-3" />
      )}
      Create ATA Account
    </Button>
  );
};

export default CreateAtaAccountForUser;
