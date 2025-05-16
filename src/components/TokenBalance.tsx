"use client";
import useTokenBalance from "@/hooks/useTokenBalance";
import React from "react";
type Props = {
  account: string;
  mint: string;
};
const TokenBalance: React.FC<Props> = ({ account, mint }) => {
  const { data } = useTokenBalance(mint, account);
  return <span>{data?.value.uiAmountString}</span>;
};

export default TokenBalance;
