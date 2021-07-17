// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IToken {
     function transfer(address recipient, uint256 amount) external;
     function transferFrom(address sender, address recipient, uint256 amount) external;
     function balanceOf(address account)  view external returns(uint256);
}