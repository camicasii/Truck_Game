// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ICO {
    using SafeMath for uint;
    struct Sale {
        uint investAmount;
        uint tokenAmount;
    }

    mapping(address => Sale) public sales;
    address public admin;
    uint public end;
    uint public duration = 3 days;
    uint public initDate;
    uint public BNBtoToken = 140000;//bnb price = 300, token price = 0.001
    IERC20 public token;

    uint public totalInvested;
    uint public totalSale;
    uint public totalInverstors;

    event SaleEvent (address indexed _investor, uint indexed _investAmount, uint indexed _tokenAmount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        admin = msg.sender;
    }

    modifier icoActive() {
        require(
          hasStarted() && block.timestamp < end && getTokenBalance() > 0, 
          'ICO must be active'
        );
        _;
    }

    modifier icoNotActive() {
        require(end == 0, 'ICO should not be active');
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }

    function hasStarted() public view returns (bool) {
        return end > 0;
    }

    function start()
        external
        onlyAdmin
        icoNotActive {
        require(getTokenBalance() > 0, 'Token must be in the contract');
        end = block.timestamp.add(duration);
        initDate = block.timestamp;
    }

    function extendDuration(uint time) external onlyAdmin {
        require(hasStarted(), 'ICO must be started');
        end = end.add(time);
    }

    function buy()
        external
        icoActive payable {
        uint tokenAmount = msg.value.mul(BNBtoToken);
        require(tokenAmount <= getTokenBalance(), 'Not enough tokens left for sale');
        require(msg.value > 0, 'Must buy at least 1 bnb');
        token.transfer(msg.sender, tokenAmount);
        Sale memory sale = sales[msg.sender];

        if(sale.investAmount == 0) {
            totalInverstors = totalInverstors.add(1);
        }
        sales[msg.sender].tokenAmount = sale.tokenAmount.add(tokenAmount);
        sales[msg.sender].investAmount = sale.investAmount.add(msg.value);

        totalInvested = totalInvested.add(msg.value);
        totalSale = totalSale.add(tokenAmount);
        emit SaleEvent(msg.sender, msg.value, tokenAmount);
    }

    function withdrawDividens(uint amount) external onlyAdmin {
        payable(admin).transfer(amount);
    }

    function getTokenBalance() public view returns (uint) {
        return token.balanceOf(address(this));
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function canFinish() public view returns (bool) {
        return block.timestamp >= initDate.add(duration);
    }

    function finish() external onlyAdmin {
        require(hasStarted(), 'ICO must be started');
        require(canFinish(), 'the ICO must be active for 3 days');
        token.transfer(admin, getTokenBalance());
        payable(admin).transfer(getBalance());
        end = block.timestamp;
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

}
