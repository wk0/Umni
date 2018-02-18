pragma solidity ^0.4.0;

import './baseItem.sol';
import './lookup.sol';

contract Factory {
    // for now, one factory, one batch for simplicity
    address[] public itemContracts;
    bool public createdBatch = false;
    address public owner;
    uint256 i = 0;

    event MadeBatch(address[] itemContracts);

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
    
    // When creating the factory, have to provide Lookup address
    function Factory(address lookupAdress, string itemName) public {
        owner = msg.sender;
        Lookup lookupInstance = Lookup(lookupAdress);
        
        // registration on lookup service
        // setFactory(address a, Factory b)
        lookupInstance.setFactory(owner, this);
        // setName(address a, string b)
        lookupInstance.setName(owner, itemName);
    }

    // Create <quantity> items
    function createBatch (uint quantity, string name, uint bid, uint durationMinutes, address trustedRedeemer, address payout) public ownerOnly {
        require(!createdBatch); // enforces one Factory one batch for simplicity
        require(quantity > 0);
        
        for(i; i < quantity; i++){
            address newItem = new BaseItem(name, bid, durationMinutes, trustedRedeemer, payout);
            itemContracts.push(newItem);
        } 
        
        createdBatch = true;
        MadeBatch(itemContracts);
    } 
}