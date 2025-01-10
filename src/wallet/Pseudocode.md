# Wallet Integration Pseudocode

- We plan to support non-custodial wallets:
  - Metamask / WalletConnect
  - Possibly multiple blockchains (BNB, Avalanche, Solana, etc.)

- Steps to integrate:
  1. Install `ethers.js` or `web3.js`
  2. Add a "Connect Wallet" button in the Navbar or a separate page
  3. Use the library's provider to handle chain switching, signing transactions, etc.
  4. Store addresses in Auth0 or in a separate user DB

- For now, this is just a placeholder.
