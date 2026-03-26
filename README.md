# EventPass

A decentralized ticketing system built on **OneChain**. Each ticket is a unique NFT linked to a wallet — authentic, non-duplicable, and verifiable. Supports secondary trading, collectibles, and post-event engagement.

---

## Deployed Contracts (Testnet)

| Name | Address |
|------|---------|
| Package ID | `0x373edb82cdfd49e316ed4cc5f224ed61cd2f7d49c9bc4737cba63e0a80ab4eee` |
| Deploy Transaction | `DpuugYARoxXXFK2MKgmrELQWQkCxkdXfgBwLuGrwWpUt` |

- [View Package](https://onescan.cc/testnet/objectDetails?address=0x373edb82cdfd49e316ed4cc5f224ed61cd2f7d49c9bc4737cba63e0a80ab4eee)
- [View Deploy Tx](https://onescan.cc/testnet/transactionDetail?digest=DpuugYARoxXXFK2MKgmrELQWQkCxkdXfgBwLuGrwWpUt)

---

## Contract API

```move
// Issue a ticket NFT to a recipient
public fun issue(event_name: vector<u8>, event_date: vector<u8>, seat: vector<u8>, recipient: address, ctx: &mut TxContext)

// Check in (mark ticket as used)
public fun check_in(ticket: &mut Ticket, ctx: &mut TxContext)

// Burn ticket
public fun burn(ticket: Ticket, ctx: &TxContext)
```

---

## Local Development

```bash
~/.cargo/bin/one move build --path contracts
~/.cargo/bin/one client publish --gas-budget 50000000 contracts
cd frontend && npm install && npm run dev
```

Set in `frontend/.env`:
```env
VITE_PACKAGE_ID=<package_id>
```

## License
MIT
