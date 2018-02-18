pragma solidity ^0.4.0;

import './withdrawable.sol';

contract BaseItem is Withdrawable {
    address public issuer; // issuer of contract
    address public payout;// where to send funds on redemption
    address public trustedRedeemer; // who gives good or service to highBidder
                                    // could do multiple 
    address public highBidder; 
    uint public bid;
    bool public redeemed;
    
    event BidAccepted(address highBidder, uint bid);
    event ItemRedeemed(address highBidder, uint bid, address trustedRedeemer);
    
    // Constructor, issuer sets minimum price via bid
    function BaseItem(uint _bid, address _trustedRedeemer, address _payout) public{
        issuer = msg.sender;
        // in Constructor sets minimum price / starting bid
        bid = _bid;
        trustedRedeemer = _trustedRedeemer;
        payout = _payout;
    }
    
    function bid() public payable{
        require(!redeemed);
        require(msg.value > bid);
        
        // checks to make sure there is a current high bidder
        if (highBidder != 0){
            // this should return the escrow of the prior highBidder
            pendingWithdrawals[highBidder] = bid;
        }
        
        // Now update the state to show the new high bidder
        highBidder = msg.sender;
        bid = msg.value;
        BidAccepted(highBidder, bid);
    }
    
    function redeemed() public {
        require(!redeemed);
        require(msg.sender == trustedRedeemer);
        
        // item state is redeemed, broadcast
        redeemed = true;
        ItemRedeemed(highBidder, bid, trustedRedeemer);
        
        // send the final bid to the payout address
        pendingWithdrawals[payout] = bid;
    }
}