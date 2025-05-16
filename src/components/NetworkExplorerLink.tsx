import { getExplorerUrl, stringCompact } from "@/lib/utils";
import { isAddress } from "@solana/kit";
import React from "react";
type Props = {
  addressOrTx: string;
};
const NetworkExplorerLink: React.FC<Props> = ({ addressOrTx }) => {
  return (
    <a
      href={getExplorerUrl(addressOrTx)}
      target="_blank"
      className="text-blue-500 flex items-center gap-1"
    >
      {isAddress(addressOrTx) ? addressOrTx : stringCompact(addressOrTx, 16)}
    </a>
  );
};

export default NetworkExplorerLink;
