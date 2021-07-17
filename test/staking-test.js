let stake;
const { expect } = require("chai");

describe('Staking', function () {

    before(function () {
        const TokenContract = await ethers.getContractFactory("GLDToken");
        oToken = await TokenContract.deploy(10000);
        await oToken.deployed();

        const SimpleStaking = await ethers.getContractFactory("SimpleStaking");
        stake = await SimpleStaking.deploy(oToken.address);
        await stake.deployed();

        //fund 2 accounts

    });

    it("Should stake successfully", async function () {
        // const Greeter = await ethers.getContractFactory("Greeter");
        // const greeter = await Greeter.deploy("Hello, world!");
        // await greeter.deployed();

        // expect(await greeter.greet()).to.equal("Hello, world!");

        // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        // // wait until the transaction is mined
        // await setGreetingTx.wait();

        // expect(await greeter.greet()).to.equal("Hola, mundo!");




    });



})

