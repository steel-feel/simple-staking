const { expect } = require("chai");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

let staking, gold;

describe('Staking', function () {

    before(async () => {

        const accounts = await hre.ethers.getSigners();

        [admin, user1] = accounts;

        // ERC20 token contract for reward and staking 
        const GLDTokenFactory = await hre.ethers.getContractFactory("GLDToken");
        gold = await GLDTokenFactory.deploy(100);
        await gold.deployed();
      
        // Staking contract
        const StakingFactory = await hre.ethers.getContractFactory("Staking");
        staking = await StakingFactory.deploy(gold.address,1);    
        await staking.deployed();
      
        //fund user1 account
        await gold.transfer(await user1.getAddress(), 100);

    });

    it("Create pool" , async () => {
        await expect(staking.createPool(gold.address)) 
        .to.emit(staking, 'PoolCreated')
        .withArgs(0);
    })

    it("Should stake successfully", async function () {
        //connect approving account
        const oStake = staking.connect(user1),
            oToken = gold.connect(user1),
            amount = 10,
            poolId = 0;

        await oToken.approve(staking.address, amount);

        await expect(oStake.deposit(poolId, amount))
        .to.emit(staking, 'Deposit')
        .withArgs(user1.address,poolId,amount);

    });

    it("Harvest tokens", async () => {
        const poolId = 0;
        const oStake = staking.connect(user1);

        //mine 10 blocks to generate staking rewards
        await helpers.mine(10) ;
         
        await expect(oStake.harvestRewards(poolId))
        .to.emit(staking, 'HarvestRewards')
        .withArgs(user1.address,poolId, 11 );

    });

    it("Withdraw tokens", async ()=> {
        const poolId = 0;
        const oStake = staking.connect(user1);
        
        //mine 10 blocks to generate staking rewards
        await helpers.mine(10) ;

        await expect(oStake.withdraw(poolId))
        .to.emit(staking, 'Withdraw')
        .withArgs(user1.address,poolId, 10 );

    })



})

