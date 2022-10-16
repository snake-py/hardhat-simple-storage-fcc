const { expect, assert } = require('chai');

describe('SimpleStorage', () => {
    let simpleStorageFactory, simpleStorage;

    beforeEach(async () => {
        // Get the ContractFactory and Signers here.
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it('Start with a favorite number of 0', async () => {
        expect(await simpleStorage.retrieve()).to.not.equal(1);
        expect(await simpleStorage.retrieve()).to.equal(0);
    });

    it('should update when we call store', async () => {
        const newValue = 5;
        await simpleStorage.store(newValue);
        expect(await simpleStorage.retrieve()).to.equal(newValue);
        expect(await simpleStorage.retrieve()).to.not.equal(newValue + 1);
    });

    it('should add a person', async () => {
        const newPerson = 'John';
        const favoriteNumber = '5';
        await simpleStorage.addPerson(newPerson, favoriteNumber);
        const people = await simpleStorage.people(0);
        expect(people[0]).to.equal(favoriteNumber.toString());
        expect(people[1]).to.equal(newPerson);
    });
});
