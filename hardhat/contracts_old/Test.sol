//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Test {
    string private greeting;
    uint public test_;
    address public dast_;
    address public dast2_;

    constructor(string memory _greeting, uint _test, address _dast) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
        test_ = _test;
        dast_=_dast;
        dast2_=_dast;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
    
    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
