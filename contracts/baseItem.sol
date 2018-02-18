pragma solidity ^0.4.0;

import './withdrawable.sol';

contract BaseItem is Withdrawable {
    address public issuer; // issuer of contract
    address public payout; // where to send funds on auctionEnd
    address public trustedRedeemer; // who gives good or service to highBidder
                                    // could do multiple 
    address public highBidder; 
    uint public bid;
    bool public redeemed; // has been redeemed for good or service
    uint public auctionEnd; // in minutes from initialization
    bool public auctionEnded;

    event BidAccepted(address highBidder, uint bid);
    event ItemRedeemed(address highBidder, uint bid, address trustedRedeemer);
    event AuctionComplete(address winner, uint bid);

     modifier issuerOnly() {
        require(msg.sender == issuer);
        _;
    }
    
    // Constructor, issuer sets minimum price via bid
    function BaseItem(uint _bid, uint _durationMinutes, address _trustedRedeemer, address _payout) public{
        issuer = msg.sender;
        // in Constructor sets minimum price / starting bid
        bid = _bid;
        trustedRedeemer = _trustedRedeemer;
        payout = _payout;
        
        auctionEnd = now + (_durationMinutes * 1 minutes);
    }
    
    function bid() public payable{
        require(!redeemed);
        require(now < auctionEnd);
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
    
    // Ends the primary market sale, highest bidder 
    // is now the owner, and the state changes to Seconday if available
    function settleAuction() public issuerOnly {
        // 1) check conditions
        require(!auctionEnded);
        require(now >= auctionEnd);
        
        // 2) update state
        auctionEnded = true;
        AuctionComplete(highBidder, bid);
        
        // 3) interact with address
        if (highBidder != 0){
            // withdrawls to issuer of contract 
            pendingWithdrawals[payout] = bid;
        }
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