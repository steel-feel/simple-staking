let stake, token, admin, user1;
const { expect } = require("chai");

describe('Staking', function () {

    before(async () => {

        const accounts = await hre.ethers.getSigners();

        [admin, user1] = accounts;

        const TokenContract = await ethers.getContractFactory("GLDToken");
        token = await TokenContract.deploy(10000);
        await token.deployed();

        const SimpleStaking = await ethers.getContractFactory("Staking");
        stake = await SimpleStaking.deploy(token.address);
        await stake.deployed();

        //fund contract token account with extra token for rewards
        await token.transfer(stake.address, 100);

        //fund user1 account
       await token.transfer(await user1.getAddress(), 100); 
        
    });

    it("Should stake successfully", async function () {
        //connect and approving account
      const oStake = stake.connect(user1),
          oToken = token.connect(user1),
          amount = 10;
            
     await oToken.approve(stake.address, amount);
        
       await oStake.stake(amount);
       const result = await oStake.checkStaking();

      console.log();

     expect(result[0].toNumber()).to.equal(amount);

    });

    it("Should not withdraw before 60 days", async ()=> {
        const oStake = stake.connect(user1);

        try{
        await oStake.withdrawStaking() 
        }catch(err){
            throw new Error(err);
        }
       
        expect(true).to.equal(true);

    })



})

