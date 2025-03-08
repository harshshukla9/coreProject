import { ethers } from 'ethers';

// ERC1155 ABI definition
const erc1155ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function uri(uint256 id) view returns (string)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
  "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)"
];

// Utility function for fetching data from a URL
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

// Fetch NFTs owned by a specific address
export const fetchNFTs = async (walletAddress, contractAddress, rpcUrl) => {
    console.log("hi")
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, erc1155ABI, provider);

    // Get current block and set a reasonable range
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 100000);

    // Find all transfer events
    const transferSingleFilter = contract.filters.TransferSingle(null, null, walletAddress);
    const transferBatchFilter = contract.filters.TransferBatch(null, null, walletAddress);

    const singleEvents = await contract.queryFilter(transferSingleFilter, fromBlock);
    const batchEvents = await contract.queryFilter(transferBatchFilter, fromBlock);

    // Process events to get token IDs
    const tokenIds = new Set();

    for (const event of singleEvents) {
      tokenIds.add(event.args.id.toString());
    }

    for (const event of batchEvents) {
      for (const id of event.args.ids) {
        tokenIds.add(id.toString());
      }
    }

    // Check balances and fetch metadata
    const nfts = [];
    for (const tokenId of tokenIds) {
      const balance = await contract.balanceOf(walletAddress, tokenId);

      if (balance > 0) {
        try {
          const tokenURI = await contract.uri(tokenId);
          const metadata = await fetchMetadata(tokenURI, tokenId);

          nfts.push({
            itemAddress: contractAddress,
            tokenId: tokenId.toString(),
            balance: balance.toString(),
            imgSrc: processImageUrl(metadata?.image) || "/images/notfound/notFound.png",
            tokenName: metadata?.name || `Token #${tokenId}`,
            metadata
          });
        } catch (error) {
          console.error(`Error fetching metadata for token ${tokenId}:`, error);
        }
      }
    }

    return nfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error.message);
    return [];
  }
};

// Process and fetch metadata for a specific NFT
export const fetchMetadata = async (uri, tokenId) => {
  if (!uri) return null;
  
  // Handle ipfs:// URIs
  let processedUri = uri;
  if (processedUri.startsWith('ipfs://')) {
    processedUri = processedUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  // Handle {id} placeholder in URI
  if (processedUri.includes('{id}')) {
    const hexTokenId = ethers.zeroPadValue(ethers.toBeHex(tokenId), 32).substring(2);
    processedUri = processedUri.replace('{id}', hexTokenId);
  }

  try {
    const metadata = await fetchData(processedUri);
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error.message);
    return null;
  }
};

// Helper function to process image URLs
const processImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('ipfs://')) {
    return imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return imageUrl;
};