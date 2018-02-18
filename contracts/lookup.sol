pragma solidity ^0.4.0;

import './baseItem.sol';
import './itemFactory.sol';

contract Lookup {
    mapping (address => Factory) public factories;
    mapping (address => string) public companyNames;
    address public owner;

    function Lookup() public {
        owner = msg.sender;
    }

    function setFactory(address a, Factory b) public {
        factories[a] = b;
    }

    function getFactory(address a) public constant returns(Factory) {
        return factories[a];
    }
    
    function setName(address a, string b) public{
        companyNames[a] = b;
    }

    function getName(address a) public constant returns(string){
        return companyNames[a];
    }
}
