pragma solidity ^0.4.0;

// VERY INCOMPLETE!

import './baseItem.sol';

contract Transferable is BaseItem {
    enum State {PRIMARY_MARKET, SETTLE, SECONDARY_MARKET, REDEEMED}
    State public currentState; // defaults to first enum
    
    uint public bid;
    uint public ask;
    
    address public owner;
    address public prev_owner;
    
    event BidAccepted(address highBidder, uint bid, State currentState);
    event Resold(address prev_owner, address owner, uint price);
    
    modifier ownerOnly() {
        require(msg.sender == highBidder);
        _;
    }
    
    // Constructor, issuer sets minimum price via bid
    function Transferable(uint _bid, address _trustedRedeemer, address _payout) public{
        issuer = msg.sender;
        // in Constructor sets minimum price / starting bid
        bid = _bid;
        trustedRedeemer = _trustedRedeemer;
        payout = _payout;
    }
    
    function bid() public payable{
        require(!redeemed);
        
        if(currentState == State.PRIMARY_MARKET){
            require(msg.value > bid);
                
            // checks to make sure there is a current high bidder
            if (highBidder != 0){
                // this should return the escrow of the prior highBidder
                pendingWithdrawals[highBidder] = bid;
            }
        
            // Now update the state to show the new high bidder
            highBidder = msg.sender;
            bid = msg.value;
            BidAccepted(highBidder, bid, currentState);
        }
        else if (currentState == State.SECONDARY_MARKET){
            require(msg.value > ask);
            
            // stores the current owner
            prev_owner = owner;
            
            // sends payment to owners address if filled
            if (owner != 0){
                pendingWithdrawals[owner] = ask;
            }
            
            // update new owner, broadcast resold
            owner = msg.sender;
            ask = msg.value;
            Resold(prev_owner, owner, msg.value);
        }
    }
    
    
    function ask() ownerOnly public {
        // create a price you would take on the secondary resale market
        
    }
}