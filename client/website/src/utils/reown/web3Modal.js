"use client";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from "@reown/appkit/networks";

require("dotenv").config();

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// Define Core DAO Testnet
const coreMainnet = defineChain({
  id: 1116, // Chain ID for Core Testnet
  name: "Core DAO ",
  rpcUrl: "	https://rpc.coredao.org/",
  explorerUrl: "https://scan.coredao.org",
  currency: {
    name: "CORE",
    symbol: "CORE",
    decimals: 18,
  },
  testnet: true,
});

const metadata = {
  name: "latch",
  description: "latch",
  url: "https://latch.netlify.app/", // origin must match your domain & subdomain
  icons: ["https://latch.netlify.app/"],
};

export const walletModal = createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [coreMainnet], // Added Core DAO Testnet
  defaultNetwork: coreMainnet, // Set Core Testnet as default
  projectId,
  allowUnsupportedChain: true,
  enableWalletConnect: true,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
  ],
  allWallets: "HIDE",
  features: {
    analytics: false,
    onramp: false,
    swaps: false,
    email: false,
    socials: [],
  },
});

export default function Web3Modal({ children }) {
  return children;
}
