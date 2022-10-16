require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');
// plugins
require('@nomiclabs/hardhat-etherscan');
require('hardhat-gas-reporter');
require('solidity-coverage');
// my tasks
require('./tasks/block-number');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.17',
    defaultNetwork: 'hardhat', // hardhat would add this by default
    networks: {
        goerli: {
            url: process.env.GOERLI_RPC_URL,
            accounts: [process.env.GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
            accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
            chainId: 31337, // hardhat has always this chainId
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: 'USD',
        outputFile: 'gas-report.txt',
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: 'ETH', // default: ETH but you can change it to other tokens which are shown in the documentation of gas-reporter
    },
};
