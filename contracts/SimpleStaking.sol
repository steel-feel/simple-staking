// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './IToken.sol';

contract Staking {
     uint8 public constant reward = 1;
     uint64 public constant minStakingDay =  5184000000;

     mapping(address => uint256) private userStakings;
     mapping(address => uint256) private endTime;
     
     IToken private token;

    constructor(address _erc20contract){
            token = IToken(_erc20contract);
          //  minStakingDay = _stakingTime;
    }
    
    function stake(uint256 amount) external returns (bool) {
        
        userStakings[msg.sender] += amount;
        token.transferFrom(msg.sender, address(this), amount);
        endTime[msg.sender] = block.timestamp + minStakingDay;
        
       return true;
    }
    
    function checkStaking() view external returns (uint256, uint256)
    {
        return (userStakings[msg.sender] , endTime[msg.sender] );
    }

    function withdrawStaking() external returns(bool){
        require(userStakings[msg.sender] > 0, "No balance for withdrawal");
        require(block.timestamp > endTime[msg.sender], "Could not withdraw before maturity");
        require(token.balanceOf(address(this)) > userStakings[msg.sender] +  reward, "Ran out of rewards, please contact admin"  );
        
        userStakings[msg.sender] = 0;
        endTime[msg.sender] = 0;
        
        token.transfer(msg.sender, userStakings[msg.sender]  );
        
        return true;
    }    
}
    
    
    
    
