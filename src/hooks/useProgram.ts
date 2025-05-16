"use client";
import { useMemo } from "react";
import * as idlRwa from "@/artifacts/idl/rwa_tokenization.json";
import * as idlHook from "@/artifacts/idl/token_transfer_hook.json";
import { Program } from "@coral-xyz/anchor";
import { useAnchorProvider } from "./useAnchorProvider";
import { RwaTokenization } from "@/artifacts/types/rwa_tokenization";
import { TokenTransferHook } from "@/artifacts/types/token_transfer_hook";

export function useRwaProgram() {
  const provider = useAnchorProvider();

  const program = useMemo(
    () => new Program<RwaTokenization>(idlRwa, provider),
    [provider]
  );

  return program;
}

export function useTransferHookProgram() {
  const provider = useAnchorProvider();

  const program = useMemo(
    () => new Program<TokenTransferHook>(idlHook, provider),
    [provider]
  );

  return program;
}
