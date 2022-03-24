// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./IPoolRewards.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract  PoolRewards is IPoolRewards, AccessControl {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    modifier onlyOwner() {
        require(hasRole(OWNER_ROLE, _msgSender()), "Only owner");
        _;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OWNER_ROLE, msg.sender);
    }

    function balanceOf(address _token) external view override returns(uint) {
       return IERC20(_token).balanceOf(address(this));
    }

    function withdraw(address _token, address _to, uint _amount) external override onlyOwner {
        IERC20(_token).transfer(_to, _amount);
    }

    fallback() external {
        revert();
    }
}
