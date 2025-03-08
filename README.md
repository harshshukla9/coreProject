# Coreverse Battle

## A Real-Time Blockchain Game Built on Core Chain

![Screenshot from 2025-03-08 19-22-05](https://github.com/user-attachments/assets/cdd4fdf2-fbaa-4df8-8aed-976a65a72a18)

Coreverse Battle is a real-time multiplayer game where players can join battles, collect NFTs with unique properties, and trade in-game currency. Built on Core Blockchain using Next.js for the frontend and Socket.io for real-time functionality.

## 🎮 Game Overview

Coreverse Battle allows multiple players to join real-time battles in an immersive blockchain gaming experience. The game features:

- Real-time multiplayer battles using Socket.io
- In-game currency (BattleToken) that can be swapped with CORE
- NFT marketplace with functional in-game items:
  - Swords: Increase player attack
  - Shields: Decrease player damage
  - Boots: Increase player speed
- Bridge contract to import purchased NFTs directly into gameplay

## 🔗 Smart Contracts

All contracts are deployed on Core Testnet:

| Contract | Address |
|----------|---------|
| BattleToken | 0x5daFb1BCB4Bb0849fA21551812be219DB3676F63 |
| BridgeVault | 0x235e6f21E9eeB71D2D030CaB4DA39e820305b882 |
| Bridge | 0x4Af6A171Fe07482Fe4e40a5283152DD317148303 |
| TeamVault | 0x41695e6e659fFC64D062D3885A53F7177BE1185a |
| TokenMarket | 0x01419824278b169aD700189661511384d950A79A |
| Items | 0x32B2d52AB5F7257B992C313Cf2d9D6c66cE5f6a4 |
| RaidVault | 0x7D7c2Bc6259182265C753f8979bA12e430941007 |
| Raid | 0xceb505e68577Ad5C221bc35ddaFc2F903212B706 |
| PvpVault | 0x618807363e1560b590f0f178663a146C48f82a48 |
| Pvp | 0x6feA0AD72e84e0F2450eEe4cfB3D6a522ff54602 |

## 💰 Tokenomics (use of Core Blockchain)

- **BattleToken (BattleToken)**: In-game currency used for purchasing NFTs and game features
- **Exchange Rate**: 1 CORE = 10^8 BattleToken
- **Utility**: Purchase NFTs, upgrade characters, participate in special events

## 🛠️ Technology Stack

- **Frontend**: Next.js
- **Backend**: Node.js
- **Real-time Communication**: Socket.io
- **Blockchain**: Core Chain
- **Smart Contracts**: Solidity

## 📋 Installation & Setup

### Prerequisites
- Node.js
- npm or yarn
- Metamask or other Web3 wallet configured for Core Chain

### Client Setup
```bash
cd client
cd website
npm i
npm run dev
```

### Server Setup
```bash
cd server
node server.js
```

### Core Chain Configuration for Metamask
- **Network Name**: Core Chain Testnet
- **RPC URL**: https://rpc.test.btcs.network/
- **Chain ID**: 1115
- **Currency Symbol**: CORE
- **Block Explorer URL**: https://scan.test.btcs.network/

## 🎬 Demo

### Video Demonstration

https://youtu.be/1Rzv0Civ6jE

*Click to watch demo video*

### Screenshots

![Screenshot from 2025-03-08 19-22-05](https://github.com/user-attachments/assets/e482e864-1011-4c23-929d-8ee9f46f2989)
![Screenshot from 2025-03-08 19-22-15](https://github.com/user-attachments/assets/d5ae5c63-bfff-4722-a4e9-3417e22071a0)
![Screenshot from 2025-03-08 19-22-24](https://github.com/user-attachments/assets/26014aef-7aa2-4f5f-ba3e-2c620f899baa)
![Screenshot from 2025-03-08 19-22-34](https://github.com/user-attachments/assets/aa7af07b-3f21-4a3f-86e0-ed4c79d05cf8)
![Screenshot from 2025-03-08 19-22-46](https://github.com/user-attachments/assets/2c9fe3bf-1a8d-4eed-a1ff-6bcfaf503376)
![Screenshot from 2025-03-08 19-22-57](https://github.com/user-attachments/assets/134e7735-a732-4fd1-ba03-8f9857691228)
![Screenshot from 2025-03-08 19-23-05](https://github.com/user-attachments/assets/77f7afd4-0325-49dc-a8d1-2053bfad9cf0)
![Screenshot from 2025-03-08 19-23-27](https://github.com/user-attachments/assets/14f3c905-a69b-404f-82a6-5f98bf1c89b2)

## 🚀 Future Enhancements

1. **Enhanced Gameplay Mechanics**
   - PvE dungeons and raids
   - Tournament system with blockchain-verified results
   - Seasonal gameplay with unique rewards

2. **Economic Improvements**
   - DAO governance for game parameters
   - Staking mechanisms for passive BattleToken earning
   - Community-created NFT marketplace

3. **Technical Upgrades**
   - Mobile application support
   - Cross-chain bridge to other ecosystems
   - Layer 2 integration for reduced gas fees

4. **Social Features**
   - Guilds and team battles
   - In-game chat system
   - Friend referral rewards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/harshshukla9/CoreVerseBattleground](https://github.com/harshshukla9/CoreVerseBattleground)

---

Built with ❤️ for the Core Chain Community
