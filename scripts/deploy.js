const { ethers, run, network } = require('hardhat');

const main = async () => {
    // Hardhat's ether wrapper will do all of the importing and creation for us
    // RPC and private keys will be injected for development by hardhat
    const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    console.log('Deploying SimpleStorage...');
    const simpleStorage = await SimpleStorageFactory.deploy(); // response of the transaction
    console.log('SimpleStorage deployed to:', simpleStorage.address);
    const deployed = await simpleStorage.deployed(); // receipt of the transaction
    if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
        console.log('Waiting for 6 blocks before verification...');
        await simpleStorage.deployTransaction.wait(6); // wait 6 blocks before the verification process starts
        await verify(simpleStorage.address, []);
    }
    console.log('Interacting with SimpleStorage...');
    await contractInteractions(simpleStorage);
};

const contractInteractions = async (contract) => {
    const currentValue = await contract.retrieve();
    console.log('Current value:', currentValue.toString());
    const newValue = 5;
    console.log('Setting value to:', newValue);
    const transaction = await contract.store(newValue);
    await transaction.wait();
    const updatedValue = await contract.retrieve();
    console.log('Updated value:', updatedValue.toString());
};

const verify = async (contractAddress, args) => {
    console.log('Verifying contract...');
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.includes('already verified')) {
            console.log('Contract already verified');
        } else {
            console.error(error);
        }
    }
};

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}
