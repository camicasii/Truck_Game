// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./LockERC20V2.sol";

contract TruckLock is LockContract {
    IERC20 public token;

    constructor (address _token) {
        token = IERC20(_token);        
    }

    function Lock() public onlyOwner {
        deposit(token, 10_500_000 ether, 364, 0x4135244a8bBa101196E9CC67B56Afa6A9388eAF4);
        deposit(token, 24_000_000 ether, 364, 0x2C93171B09f3f3202257bE9951F4B7E202DEbf4b);
        deposit(token, 39_000_000 ether, 364, 0x9C5171d5BaC8760951BB2D054903af4D8CCc1540);
        deposit(token, 1_000_000 ether, 8, 0xD2AD108CbC8b3E08a630Ab8A085F9436f085A6F4);
        deposit(token, 215_000_000 ether, 10, 0xE8668A0BB51CAf17C428442bD84E46C2B2A31061);        
    }
}