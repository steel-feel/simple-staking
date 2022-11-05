let stake, token, admin, user1;
const { expect } = require("chai");

describe('Staking', function () {

    before(async () => {

        const accounts = await hre.ethers.getSigners();

        [admin, user1] = accounts;

        const GLDTokenFactory = await hre.ethers.getContractFactory("GLDToken");
        const gold = await GLDTokenFactory.deploy(100000);
      
        await gold.deployed();
        console.log(`ERC 20 contract deployed at ${gold.address}`);
      
        // We get the contract to deploy
        const StakingFactory = await hre.ethers.getContractFactory("Staking");
        const staking = await StakingFactory.deploy(gold.address,5);
      
        await staking.deployed();
      
        console.log(`Staking contract deployed at ${staking.address}`);

        //fund user1 account
        await gold.transfer(await user1.getAddress(), 100);

    });

    it("Should stake successfully", async function () {
        //connect approving account
        const oStake = stake.connect(user1),
            oToken = token.connect(user1),
            amount = 10;

        await oToken.approve(stake.address, amount);

        await oStake.stake(amount);
        const result = await oStake.checkStaking();

        expect(result[0].toNumber()).to.equal(amount);

    });

    it("Should not withdraw before 60 days", async () => {
        const oStake = stake.connect(user1);

        try {
            await oStake.withdrawStaking()
        } catch (err) {
            throw new Error(err);
        }

        expect(true).to.equal(true);

    })



})

