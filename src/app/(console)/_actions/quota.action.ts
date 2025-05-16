"use server";
import { RwaTokenization } from "@/artifacts/types/rwa_tokenization";
import supabaseServer from "@/lib/supabase.server";
import { AnchorProvider, BN, Program, web3 } from "@coral-xyz/anchor";
import * as idlRwa from "@/artifacts/idl/rwa_tokenization.json";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { MINTER_ROLE_NFT_METADATA } from "@/lib/constants";

const connection = new web3.Connection(
  process.env.NEXT_PUBLIC_RPC_URL as string,
  "confirmed"
);
const admin = web3.Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(process.env.ADMIN_PRIVATE_KEY as string))
);
const wallet = new NodeWallet(admin);

const provider = new AnchorProvider(connection, wallet, {
  commitment: "processed",
});
const program = new Program<RwaTokenization>(idlRwa, provider);

export async function updateQuota(id: string, value: number) {
  return supabaseServer
    .from("credit-quota")
    .update({ credit_amount: value })
    .eq("id", id);
}

export async function updateQuotaOnchain(
  receiver: string,
  mint: string,
  amount: number
) {
  const result = await program.methods
    .updateQuotaCredit(new BN(amount))
    .accounts({
      receiver,
      authority: admin.publicKey,
      permissionedMint: mint,
    })
    .rpc();

  console.log("Quota updated successfully", result);

  return result;
}

export async function getQuotaItem() {
  const { data, error } = await supabaseServer
    .from("credit-quota")
    .select("*")
    .order("org_name", { ascending: true });

  if (error) {
    console.error("Error fetching quota items:", error);
    return [];
  }

  return data;
}

export async function updateQuotaIdentity(
  id: string,
  wallet: string,
  mint: string
) {
  const { data, error } = await supabaseServer
    .from("credit-quota")
    .update({ wallet, mint })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating user identity:", error);
    return null;
  }

  if (data.wallet && data.mint) {
    await issueMinterRole(data.wallet, data.mint);
  }

  if (data.credit_amount) {
    await updateQuotaOnchain(wallet, mint, data.credit_amount);
  }

  return data;
}

export async function issueMinterRole(to: string, mint: string) {
  const result = await program.methods
    .issueMinterCert(
      MINTER_ROLE_NFT_METADATA.name,
      MINTER_ROLE_NFT_METADATA.symbol,
      MINTER_ROLE_NFT_METADATA.uri
    )
    .accounts({
      receiver: to,
      permissionedMint: mint,
    })
    .rpc();

  console.log("Minter role issued successfully", result);
  return result;
}
