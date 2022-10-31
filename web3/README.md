# Card Das - Online Multiplayer Card das game

![Sreenshot]()

## Steps

0. `mkdir card-das && cd card-das`
1. `npx hardhat` -> y → typescript → enter → enter
2. `npm install @openzeppelin/contracts dotenv @nomiclabs/hardhat-ethers` + Hardhat packages `npm install --save-dev "hardhat@^2.12.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"`
3. Install [Core](https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb), a Metamask smart wallet alternative built for Avalanche dApps
4. Turn on the testnet mode by: opening up the Core extension -> click the hamburger menu on the top left -> go to advanced -> turn on the testnet mode
5. Fund your wallet from the [Avax Faucet](https://faucet.avax.network/)
6. Create a `.env` file and specify a PRIVATE_KEY variable.
7. To get to the private key, do the following steps:
8. Open up the Core extension -> click the hamburger menu on the top left -> go to security and privacy -> click show recovery phase -> enter your password -> copy the phrase -> go to [wallet.avax.network](https://wallet.avax.network/) -> click access wallet -> choose mnemonic key phrase -> paste what the words we’ve copied from Core -> on the sidebar click manage keys -> view c-chain private key -> copy -> paste it in the .env file
9. Copy the `hardhat.config.ts` file from the GitHub gist down in the description
10. Copy the `deploy.ts` script from the GitHub gist down in the description
11. Compile the contract by running the `npx hardhat compile` command
12. Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network fuji` command
    Move the `/artifacts/contracts/CardDas.json` file to the `/contract` folder on the frontend
    Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application

Some commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
