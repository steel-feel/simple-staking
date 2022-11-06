# Simple Staking
Project📒 to demonstrate staking💰 of ERC20 based tokens over a period of blocks.
Inspired from **sushiswap masterchef** staking protocol.

## Working
1. Staking contracts rewards Fixed amount per block set at depployment of contract. 

2. Reward calculation on each deposit/reward-withdrawal event.  

3. Staking Reward is calculated based on share of total staked token and total block rewards tokens ; since last event.

**Share of token is calculated by**

`
share = StakedToken/TotalStakedToken
`

**Reward token calcucated by** _(happens at each event)_

`
userA accumulated rewards = ( (rewardperBlock*blocks Passed) * userShare ) + previous accumated rewards
`

### Example
A contract with _1 reward token_ per block. 

Let say *userA* 10 tokens at block _5_.

**At Block 5**

_Status_

userA staked token = 10 ,Total tokens = 10

**At Block 10, userB joins the party**

_Status_
userA staked token = 10,userB staked token = 10,Total tokens = 20

_Calculate rewards till the block_


=> (1*5)*1 + 0

=> 5

**At Block 15, userA harvest yields**

_Status_
userA staked token = 10
userB staked token = 10
Total tokens = 20

_Calculate rewards till the block_

=> (1*5)*0.5 + 5

=> 7.5

## Usage

### Installation

```bash 
npm install
```

### Deploy contracts

```bash 
npm run deploy
```

### Testing

```bash
npm test
```

