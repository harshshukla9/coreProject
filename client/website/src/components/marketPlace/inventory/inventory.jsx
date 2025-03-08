import React, { useEffect, useContext, useState } from 'react';
import { fetchNFTs, fetchMetadata } from '@/utils/alchemy/nftFetch';
import None from "../none";
import InventoryCard from "./inventoryCard";
import { getProvider } from "@/utils/provider/provider";
import {
  fetchAllTheUserImportedItems,
  fetchAllTheUserImportedItemAddresses,
} from "@/utils/utils";
import { ContextAPI } from "@/utils/contextAPI/latchContextAPI";
import bridgeJson from "../../../abis/bridge.json";
import { Contract } from "ethers";
import Loading from "@/components/loading/loading";

export default function Inventory() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    unImportedItemList,
    setUnImportedItemList,
    importedItemList,
    setImportedItemList,
  } = useContext(ContextAPI);

  const loadInventory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Define wallet address
      const walletAddress = '0x95eb891Db4b8c87b663d0B7738C689B160A7258e';
      const contractAddress = '0x32B2d52AB5F7257B992C313Cf2d9D6c66cE5f6a4';
      const rpcUrl = 'https://rpc.test.btcs.network';

      // 1. Get provider and set up bridge contract
      const provider = await getProvider(1115);
      
      // 2. Fetch unimported NFTs first - this part works
      const fetchedNfts = await fetchNFTs(walletAddress, contractAddress, rpcUrl);
      setNfts(fetchedNfts);
      setUnImportedItemList(fetchedNfts);
      
      // 3. Try/catch block specifically for the bridge contract interactions
      try {
        // Verify the bridge contract address is correct
        const bridge = new Contract(
          bridgeJson.address,
          bridgeJson.abi,
          provider
        );
        
        // Check if the contract exists at this address with a simple call
        // that doesn't modify state
        //await bridge.estimateGas.fetchAllTheUserImportedItemAddresses(walletAddress);
        
        // If we get here, the contract exists and the method is available
        const importedItemAddresses = 
          await fetchAllTheUserImportedItemAddresses(bridge, walletAddress);
        
        if (importedItemAddresses && importedItemAddresses.length > 0) {
          const importedNfts = {};
          
          // Fetch imported NFT IDs
          await Promise.all(
            importedItemAddresses.map(async (itemAddress) => {
              const ids = await fetchAllTheUserImportedItems(
                bridge,
                walletAddress, // Make sure we're using walletAddress here, not address
                itemAddress
              );
              if (ids && ids.length > 0) {
                importedNfts[itemAddress] = ids;
              }
            })
          );
          
          // Only proceed if we have imported NFTs
          if (Object.keys(importedNfts).length > 0) {
            // Fetch metadata for imported NFTs
            const importedItems = await Promise.all(
              Object.entries(importedNfts).flatMap(([itemAddress, ids]) =>
                ids.map((id) => fetchMetadata(itemAddress, id, rpcUrl))
              )
            );
            
            setImportedItemList(importedItems.filter(Boolean));
          } else {
            setImportedItemList([]);
          }
        } else {
          setImportedItemList([]);
        }
      } catch (bridgeError) {
        console.error('Bridge contract error:', bridgeError);
        setImportedItemList([]); // Set to empty array if bridge contract fails
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[300px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="marketBox w-full mx-auto">
      <div className="w-full flex flex-col justify-center items-start">
        <h1 className="w-full subTitle2 marketBoxHead">Inventory</h1>
      </div>

      {error ? (
        <div className="w-full flex flex-col justify-center items-center min-h-[300px]">
          <div>Error: {error}</div>
        </div>
      ) : nfts && nfts.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5 p-4 max-h-[700px] overflow-y-scroll customizedScrollbar">
          {/* Unimported Items */}
          {nfts.map((item, index) => (
            <InventoryCard
              key={`unimported_${item.itemAddress}_${item.tokenId}_${index}`}
              itemAddress={item.itemAddress}
              tokenId={item.tokenId}
              imgSrc={item.imgSrc}
              name={item.tokenName}
              isImported={false}
            />
          ))}

          {/* Imported Items */}
          {importedItemList && importedItemList.length > 0 && importedItemList.map((item, index) => (
            <InventoryCard
              key={`imported_${item.itemAddress}_${item.tokenId}_${index}`}
              itemAddress={item.itemAddress}
              tokenId={item.tokenId}
              imgSrc={item.imgSrc}
              name={item.tokenName}
              isImported={true}
            />
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[300px] flex flex-col justify-center items-center">
          <None />
        </div>
      )}
    </div>
  );
}