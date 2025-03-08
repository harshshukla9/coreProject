import { ethers } from "ethers";
import { networkInfo } from "./data";

export const getProvider = (chainId = 1115) => {
  // const rpc = networkInfo[chainId].rpc;
  return new ethers.JsonRpcProvider("https://rpc.test.btcs.network");
};

export const getContract = (target, abi, chainId) => {
  // const rpc = networkInfo[chainId].rpc;
  const provider = new ethers.JsonRpcProvider("https://rpc.test.btcs.network");
  return new ethers.Contract(target, abi, provider);
};
