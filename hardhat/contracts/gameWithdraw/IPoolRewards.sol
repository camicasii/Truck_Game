// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface  IPoolRewards {
    
    function balanceOf(address _token) external view returns(uint);

    function withdraw(address _token, address _to, uint _amount) external;

}
