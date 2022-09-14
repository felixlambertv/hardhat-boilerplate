import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";

dotenv.config();
const { ALCHEMY_API_KEY_MUMBAI, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 80001, //Polygon Testnet Mumbai
      forking: {
        url: ALCHEMY_API_KEY_MUMBAI || "",
        blockNumber: 28095139, //forking from specific block number
      },
    },
    mumbai: {
      url: ALCHEMY_API_KEY_MUMBAI,
      accounts: [], //list of private keys
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
