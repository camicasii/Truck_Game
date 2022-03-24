// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LockContract is Ownable {
    using SafeMath for uint;
    mapping(uint => address) public lockedERC20;
    mapping(address => uint) public lockERC20ID;
    uint public lockedERC20Count;
    uint constant public TIME_STEP = 1 days;

    bool startBlock;

    struct widrawHandler {
        uint tokensBlock;
        uint nextWithdrawDate;
    }

    mapping(address => mapping(address => widrawHandler)) public widrawHandlerMap;


    constructor() {
        
    }

    function startBlocking() external onlyOwner {
        startBlock = true;
    }

    function canDeposit(IERC20 _token, address _to) public view returns (bool) {
        return widrawHandlerMap[address(_token)][_to].nextWithdrawDate == 0;
    }

    function deposit(IERC20 _token, uint _amount, uint _days) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(canDeposit(_token, msg.sender), "Can't deposit");
        uint daysInDay = _days.mul(TIME_STEP);

        if(lockERC20ID[address(_token)] == 0) {
            lockedERC20Count++;
            lockedERC20[lockedERC20Count] = address(_token);
            lockERC20ID[address(_token)] = lockedERC20Count;
        }

        widrawHandlerMap[address(_token)][msg.sender].tokensBlock = _amount;
        widrawHandlerMap[address(_token)][msg.sender].nextWithdrawDate = block.timestamp.add(daysInDay);
        _token.transferFrom(msg.sender, address(this), _amount);
    }

    function deposit(IERC20 _token, uint _amount, uint _days, address _user) internal {
        require(_amount > 0, "Amount must be greater than 0");
        require(canDeposit(_token, _user), "Can't deposit");
        uint daysInDay = _days.mul(TIME_STEP);

        if(lockERC20ID[address(_token)] == 0) {
            lockedERC20Count++;
            lockedERC20[lockedERC20Count] = address(_token);
            lockERC20ID[address(_token)] = lockedERC20Count;
        }

        widrawHandlerMap[address(_token)][_user].tokensBlock = _amount;
        widrawHandlerMap[address(_token)][_user].nextWithdrawDate = block.timestamp.add(daysInDay);
        _token.transferFrom(msg.sender, address(this), _amount);
    }

    function userCanWithdraw(address _token, address _user) public view returns (bool) {
        if(!startBlock) {
            return true;
        }
        if(widrawHandlerMap[address(_token)][_user].nextWithdrawDate < block.timestamp) {
            if(widrawHandlerMap[address(_token)][_user].tokensBlock > 0) {
                return true;
            }
        }
        return false;
    }

    function userWithdradrawSeconds(address _token, address _user) public view returns (uint){
        if(widrawHandlerMap[address(_token)][_user].nextWithdrawDate > block.timestamp) {
            return widrawHandlerMap[address(_token)][_user].nextWithdrawDate.sub(block.timestamp);
        }
        else {
            return 0;
        }
    }

    function userWithdrawDays(address _token, address _user) external view returns (uint){
        return userWithdradrawSeconds(_token, _user).div(TIME_STEP);
    }

    function userWithdraw(address _token) external {
        require(userCanWithdraw(_token, msg.sender), "User canot withdraw");
        uint _amount = widrawHandlerMap[address(_token)][msg.sender].tokensBlock;

        IERC20(_token).transfer(msg.sender, _amount);
        delete widrawHandlerMap[address(_token)][msg.sender].nextWithdrawDate;
        delete widrawHandlerMap[address(_token)][msg.sender].tokensBlock;
    }

    function getDate() view external returns(uint) {
        return block.timestamp;
    }

}
