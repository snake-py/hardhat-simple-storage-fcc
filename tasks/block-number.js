const { task } = require('hardhat/config');

task('block-number', 'Prints the current block number').setAction(async (_, hre) => {
    // hre hardhat runtime environment (hre) is a global object
    // that contains all the information about the current hardhat execution context
    const { ethers } = hre;
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(blockNumber);
});

module.exports = {};
