"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import IssueRoleNftButton from "./IssueRoleNftButton";
import { isAddress } from "@solana/kit";
import { NFTRole } from "@/lib/constants";
type Props = {
  mint: string;
  role: NFTRole;
};
const IssueNftForm: React.FC<Props> = ({ role, mint }) => {
  const [address, setAddress] = useState("");
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Wallet Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <IssueRoleNftButton
        to={address}
        disabled={!isAddress(address)}
        role={role}
        mint={mint}
      />
    </div>
  );
};

export default IssueNftForm;
