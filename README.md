# EventPass 🎫

**Decentralized Ticketing System on OneChain — Secure, Verifiable, and Tradable NFTs**

EventPass transforms event ticketing by leveraging blockchain technology. Each ticket is minted as a unique NFT tied to a wallet, ensuring authenticity, eliminating duplication, and enabling seamless verification and secondary trading.

## 🌐 Overview

Traditional ticketing systems suffer from fraud, duplication, scalping, and lack of transparency. Users often rely on centralized platforms that control issuance, resale, and validation.

EventPass solves this by introducing a **fully decentralized ticketing infrastructure** where tickets are:

* **Authentic** → minted as unique NFTs
* **Non-duplicable** → secured by blockchain
* **Verifiable** → instantly checkable on-chain
* **User-owned** → stored in your wallet
* **Tradable** → transferable without intermediaries

This unlocks a new era of transparent and programmable event experiences.

## ❗ The Problem

* Fake and duplicate tickets
* Lack of trust in secondary marketplaces
* Centralized control over ticket issuance
* No programmable or interactive ticket experiences
* Poor post-event engagement

## 💡 The Solution

EventPass mints each ticket as a **non-fungible token (NFT)** on OneChain. These tickets are cryptographically secure, owned by users, and verifiable in real time.

With built-in support for transfers and validation, EventPass enables **trustless ticketing and resale markets**, while also opening the door to **collectibles and post-event utility**.

## ✨ Key Features

* **NFT-Based Ticketing**
  Each ticket is a unique on-chain asset linked to a wallet

* **Secure Issuance**
  Organizers can issue tickets directly to user wallets

* **Ownership & Transferability**
  Users can hold, transfer, or trade tickets freely

* **On-Chain Verification**
  Instantly verify ticket authenticity and status

* **Check-In Mechanism**
  Mark tickets as used during event entry

* **AI-Powered Event Descriptions**
  Generate high-quality, engaging event descriptions using GPT-based rewriting

* **Collectibles & Engagement**
  Tickets can act as digital souvenirs or unlock post-event experiences

## ⚙️ How It Works

1. Organizer creates an event and issues NFT tickets
2. Tickets are minted on-chain and sent to user wallets
3. Users view and manage tickets via the frontend
4. At entry, tickets are verified and marked as used
5. Tickets remain as collectibles or can be traded

## 📦 Deployed Contract

* **Network:** OneChain Testnet

* **Package ID:**
  `0x373edb82cdfd49e316ed4cc5f224ed61cd2f7d49c9bc4737cba63e0a80ab4eee`

* **Deploy Transaction:**
  `DpuugYARoxXXFK2MKgmrELQWQkCxkdXfgBwLuGrwWpUt`

* **Explorer Links:**
  [https://onescan.cc/testnet/packageDetail?packageId=0x373edb82cdfd49e316ed4cc5f224ed61cd2f7d49c9bc4737cba63e0a80ab4eee](https://onescan.cc/testnet/packageDetail?packageId=0x373edb82cdfd49e316ed4cc5f224ed61cd2f7d49c9bc4737cba63e0a80ab4eee)
  [https://onescan.cc/testnet/transactionBlocksDetail?digest=DpuugYARoxXXFK2MKgmrELQWQkCxkdXfgBwLuGrwWpUt](https://onescan.cc/testnet/transactionBlocksDetail?digest=DpuugYARoxXXFK2MKgmrELQWQkCxkdXfgBwLuGrwWpUt)

## 🛠 Tech Stack

**Smart Contract**

* Move (OneChain)

**Frontend**

* React
* TypeScript
* Vite

**Wallet Integration**

* @mysten/dapp-kit

**AI Integration**

* GPT-4o-mini (for event description enhancement)

**Network**

* OneChain Testnet

## 🔍 Use Cases

* **Event Ticketing Platforms**
  Replace centralized ticket providers

* **Concerts & Festivals**
  Prevent fraud and enable resale markets

* **Conferences & Hackathons**
  Issue verifiable participation passes

* **NFT Collectibles**
  Turn tickets into digital memorabilia

* **Exclusive Access Systems**
  Use tickets as access keys for communities or content

## 🚀 Why EventPass Stands Out

* **Fraud-Proof Ticketing** — no duplication or fake entries
* **User Ownership** — tickets live in user wallets
* **Decentralized Resale** — no middlemen or restrictions
* **Programmable Utility** — beyond just entry (collectibles, perks)
* **AI-Enhanced UX** — better event creation experience
* **Hackathon-Ready Innovation** — real-world Web3 application

## 🔮 Future Improvements

* Dynamic NFT tickets (metadata updates after events)
* Royalty mechanisms for organizers on resale
* QR / NFC-based check-in system
* Multi-event ticket bundles
* Integration with identity systems (like ChainProfile)
* Analytics dashboard for organizers

## ⚙️ Contract API

```move
// Issue a ticket NFT to a recipient
public fun issue(event_name: vector<u8>, event_date: vector<u8>, seat: vector<u8>, recipient: address, ctx: &mut TxContext)

// Check in (mark ticket as used)
public fun check_in(ticket: &mut Ticket, ctx: &mut TxContext)

// Burn ticket
public fun burn(ticket: Ticket, ctx: &TxContext)
```

## 💻 Local Development

```bash
~/.cargo/bin/one move build --path contracts
~/.cargo/bin/one client publish --gas-budget 50000000 contracts
cd frontend && npm install && npm run dev
```

Set in `frontend/.env`:

```env
VITE_PACKAGE_ID=<package_id>
VITE_OPENAI_KEY=<openai_api_key>
```

## 📄 License

MIT License