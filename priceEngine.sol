pragma experimental ABIEncoderV2;


contract PreSaleWrapper {
    
    address priceEngine = 0xbfd5b36fa6f5de48d807397e9b68d0a0d694e38e;
    string[2] categories = ["Yeezy","iPhoneX"];
    
    struct Entity {
        uint suppliedQt;
        uint marketQt;
        uint supplyOrigin;
        uint supplyFactor;
    }
    
    mapping(string => Entity) itemlist;
    Entity[] itemArray;
    
    function PreSaleWrapper() public {
       log0('Invoked');
    }
    
    function addEntity(string name, uint _suppliedQt, uint _marketQt, uint _supplyOrigin, uint _supplyFactor) public  {        
        var entity_ = Entity(_suppliedQt, _marketQt, _supplyOrigin, _supplyFactor);
        log0('New Item Added');
        itemlist[name] = entity_;
        itemArray.push(entity_);
    }
    
    function setItemMarketQt(string _name, uint _marketQt) public {
        itemlist[_name].marketQt = _marketQt;
    }
    
    function getItem(string name) public constant returns (string, uint, uint, uint, uint) {   
        Entity entity_ = itemlist[name];
        return (name, entity_.suppliedQt, entity_.marketQt, entity_.supplyOrigin, entity_.supplyFactor);
    }
    
    function SetDemoMeta() public {
        addEntity(categories[0], 200, 570, 268421052600, 157894737);
        addEntity(categories[1], 600, 900, 101471429000, 5714286);
    }
    
    function getFairPriceMeta(string _name) public constant returns (uint, uint, uint, uint) {
        PreSaleCalc fairPrice = PreSaleCalc(0xbfd5b36fa6f5de48d807397e9b68d0a0d694e38e);
        return fairPrice.pxCalc(itemlist[_name].supplyOrigin,itemlist[_name].supplyFactor,itemlist[_name].suppliedQt,itemlist[_name].marketQt);
    }
}





contract PreSaleCalc {
    function pxCalc(uint _supplyOrigin, uint _supplyFactor, uint _suppliedQt, uint _marketQt) public constant returns (uint, uint, uint, uint) {
        uint equilPrice=_supplyOrigin+_suppliedQt*_supplyFactor;
        uint supplyPrice;
        if(_marketQt<=_suppliedQt){
            supplyPrice=equilPrice;
        }else{
            supplyPrice=_supplyOrigin+_marketQt*_supplyFactor;
        }
        return (equilPrice, supplyPrice, (supplyPrice-equilPrice), (_suppliedQt-_marketQt));
    }   
}
