"use server";
import supabaseServer from "@/lib/supabase.server";

export async function getHistory(type: "MINT" | "RETIRE") {
  const { data, error } = await supabaseServer
    .from("mint-transactions")
    .select("*")
    .filter("type", "eq", type)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching history:", error);
    return [];
  }
  return data;
}

export async function insertHistory(
  tx: string,
  mint: string,
  account: string,
  amount: string,
  type: "MINT" | "RETIRE"
) {
  return supabaseServer
    .from("mint-transactions")
    .insert({ id: tx, mint, token_account: account, amount, type })
    .select("*");
}
