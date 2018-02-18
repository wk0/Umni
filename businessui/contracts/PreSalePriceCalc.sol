pragma solidity ^0.4.0;

contract PreSaleCalc {
    
    uint marketQt;
    uint suppliedQt;
    uint marketPrice;
    
    function setSuppliedQt(uint _suppliedQt) public {
        suppliedQt = _suppliedQt;
    }
    
    function getSuppliedQt() public constant returns (uint){
        return suppliedQt;
    }
    
    
    function setMarketQt(uint _marketQt) public {
       marketQt = _marketQt;
    }
    
    function getMarketQt() public constant returns (uint){
        return marketQt;
    }
    
    function pxCalc() public constant returns (uint) {
        uint demandOrigin = 1500;
        uint demandFactor = 6;
        uint demandPrice = demandOrigin - demandFactor * suppliedQt;

        uint supplyOrigin = 268421052600;
        uint supplyFactor = 157894737;
        uint supplyPrice;
        
        if(marketQt <= suppliedQt){
            supplyPrice = supplyOrigin + suppliedQt*supplyFactor;
        }else{
            supplyPrice = supplyOrigin + marketQt*supplyFactor;
        }
       
        return (supplyPrice / 1000000);
        
    }   
}