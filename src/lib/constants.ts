import { NavbarItemType } from "@/types/Navbar.type";

export const NAVBAR_ITEMS: NavbarItemType[] = [
  {
    label: "Admin",
    link: "/admin",
  },
  {
    label: "Minter",
    link: "/minter",
  },
  {
    label: "Consumer",
    link: "/consumer",
  },
];

export enum NFTRole {
  MINTER = "MINTER",
  CONSUMER = "CONSUMER",
}

export const DEFAULT_TOKEN_URI =
  "https://raw.githubusercontent.com/HongThaiPham/summer-bootcamp-anchor-token2022-stake/main/app/assets/"

export const MINTER_ROLE_NFT_METADATA = {
  name: "Minter Role NFT",
  symbol: "MINTER",
  uri: `${DEFAULT_TOKEN_URI}/token-minter-info.json`,
}

export const CONSUMER_ROLE_NFT_METADATA = {
  name: "Consumer Role NFT",
  symbol: "CONSUMER",
  uri: `${DEFAULT_TOKEN_URI}/token-consumer-info.json`,
}

export const TOKEN_METADATA = {
  name: "Carbon Credit Token",
  symbol: "CCT",
  uri: `${DEFAULT_TOKEN_URI}/token-cct-info.json`,
}