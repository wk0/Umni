pragma solidity ^0.4.0;

import './hype-BaseItem.sol';

contract Factory {
    // for now, one factory, one batch for simplicity
    address[] itemContracts;
    bool createdBatch = false;
    address owner;

    event MadeBatch(address[] itemContracts);

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
    
    function Factory() public {
        owner = msg.sender;
    }
    

    // Create <quantity> items
    function createBatch (uint quantity, uint bid, address trustedRedeemer, address payout) public ownerOnly {
        require(!createdBatch); // enforces one Factory one batch for simplicity
        for(uint i = 0; i < quantity; i++){
            address newItem = new BaseItem(bid, trustedRedeemer, payout);
            itemContracts.push(newItem);    
        } 
        
        createdBatch = true;
        MadeBatch(itemContracts);
    } 
}