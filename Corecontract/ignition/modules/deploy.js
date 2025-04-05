const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy Latch
  console.log("Deploying Latch...");
  const Latch = await ethers.getContractFactory("Latch");
  const latch = await Latch.deploy();
  await latch.waitForDeployment();
  console.log("Latch deployed to:", await latch.getAddress());

  // Deploy BridgeVault
  console.log("Deploying BridgeVault...");
  const BridgeVault = await ethers.getContractFactory("BridgeVault");
  const bridgeVault = await BridgeVault.deploy();
  await bridgeVault.waitForDeployment();
  console.log("BridgeVault deployed to:", await bridgeVault.getAddress());

  // Deploy Bridge
  console.log("Deploying Bridge...");
  const Bridge = await ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy(await bridgeVault.getAddress());
  await bridge.waitForDeployment();
  console.log("Bridge deployed to:", await bridge.getAddress());

  // Deploy TeamVault
  console.log("Deploying TeamVault...");
  const TeamVault = await ethers.getContractFactory("TeamVault");
  const teamVault = await TeamVault.deploy(
    "0x000000000000000000000000000000000000dEaD", // GasBack testnet address
    await latch.getAddress(),
    deployer.address
  );
  await teamVault.waitForDeployment();
  console.log("TeamVault deployed to:", await teamVault.getAddress());

  // Deploy TokenMarket
  console.log("Deploying TokenMarket...");
  const TokenMarket = await ethers.getContractFactory("TokenMarket");
  const tokenMarket = await TokenMarket.deploy(await latch.getAddress());
  await tokenMarket.waitForDeployment();
  console.log("TokenMarket deployed to:", await tokenMarket.getAddress());

  // Deploy Items
  console.log("Deploying Items...");
  const Items = await ethers.getContractFactory("Items");
  const items = await Items.deploy(
    "0x000000000000000000000000000000000000dEaD", // GasBack testnet address
    await latch.getAddress(),
    deployer.address,
    await teamVault.getAddress()
  );
  await items.waitForDeployment();
  console.log("Items deployed to:", await items.getAddress());

  // Deploy RaidVault
  console.log("Deploying RaidVault...");
  const RaidVault = await ethers.getContractFactory("RaidVault");
  const raidVault = await RaidVault.deploy(
    await latch.getAddress(),
    deployer.address
  );
  await raidVault.waitForDeployment();
  console.log("RaidVault deployed to:", await raidVault.getAddress());

  // Deploy Raid
  console.log("Deploying Raid...");
  const Raid = await ethers.getContractFactory("Raid");
  const raid = await Raid.deploy(
    await latch.getAddress(),
    deployer.address,
    await raidVault.getAddress(),
    await teamVault.getAddress()
  );
  await raid.waitForDeployment();
  console.log("Raid deployed to:", await raid.getAddress());

  // Deploy PvpVault
  console.log("Deploying PvpVault...");
  const PvpVault = await ethers.getContractFactory("PvpVault");
  const pvpVault = await PvpVault.deploy(
    await latch.getAddress(),
    deployer.address
  );
  await pvpVault.waitForDeployment();
  console.log("PvpVault deployed to:", await pvpVault.getAddress());

  // Deploy Pvp
  console.log("Deploying Pvp...");
  const Pvp = await ethers.getContractFactory("Pvp");
  const pvp = await Pvp.deploy(
    await latch.getAddress(),
    deployer.address,
    await pvpVault.getAddress(),
    await teamVault.getAddress()
  );
  await pvp.waitForDeployment();
  console.log("Pvp deployed to:", await pvp.getAddress());

  // Grant roles
  console.log("Granting roles...");
  const TOKEN_MINTER = "0x262c70cb68844873654dc54487b634cb00850c1e13c785cd0d96a2b89b829472";
  const DISTRIBUTOR = "0x85faced7bde13e1a7dad704b895f006e704f207617d68166b31ba2d79624862d";
  const MANAGER = "0xaf290d8680820aad922855f39b306097b20e28774d6c1ad35a20325630c3a02c";
  const SERVER_ADDRESS = "0xdd6F329349626182A9a1Bd7F0B1c3FDf7E8e6131";

  await latch.grantRole(TOKEN_MINTER, await tokenMarket.getAddress());
  await bridgeVault.grantRole(MANAGER, await bridge.getAddress());
  await pvpVault.grantRole(DISTRIBUTOR, await pvp.getAddress());
  await raidVault.grantRole(DISTRIBUTOR, await raid.getAddress());
  await pvp.grantRole(MANAGER, SERVER_ADDRESS);
  await raid.grantRole(MANAGER, SERVER_ADDRESS);

  // Initialize Items
  console.log("Initializing Items...");
  //await items.registerForGasback();
  await items.setBaseURI("https://rose-cheap-jaguar-233.mypinata.cloud/ipfs/bafybeihu5p24wubukadze54afr4t44bxdw2tqk6th4f5he7jkxvdqye6wy/");
  
  const SWORD_ID = 0;
  const SHIELD_ID = 1;
  const BOOTS_ID = 2;
  const SWORD_STATS = [10, 0, -2, 100];
  const SHIELD_STATS = [0, 12, -3, 100];
  const BOOTS_STATS = [0, 5, 5, 100];
  const PRICE_LIST = [
    ethers.parseEther("300"),
    ethers.parseEther("500"),
    ethers.parseEther("700"),
  ];

  await items.initializeItems(
    [SWORD_ID, SHIELD_ID, BOOTS_ID],
    PRICE_LIST,
    [SWORD_STATS, SHIELD_STATS, BOOTS_STATS]
  );

  console.log("All contracts deployed and initialized successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // on modules folder we have to deploy npx hardhat run deploy.js --network core_testnet