import { ethers } from "ethers";
import { networkInfo } from "./data";

export const getProvider = (chainId = 1116) => {
  // const rpc = networkInfo[chainId].rpc;
  return new ethers.JsonRpcProvider("https://rpc.coredao.org");
};

export const getContract = (target, abi, chainId) => {
  // const rpc = networkInfo[chainId].rpc;
  const provider = new ethers.JsonRpcProvider("https://rpc.coredao.org");
  return new ethers.Contract(target, abi, provider);
};
