// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TTFICO is ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public BUSD;
    IERC20 public TOKEN;
    struct Sale {
        address buyer;
        uint256 tokenAmount;
        uint256 investAmount;
    }

    uint256 public constant DEV_FEE = 6; //6%
    uint256 public constant PERCENT_DIVIDER = 100;
    address public devAddress = 0xAae3e755df3cCDEcb6D719946782058041678fc3;
    address public owner = 0xa0B6fE2886C8f53539E5085142194AF8E732F608;
    uint256 public constant HARDCAP = 200_000 ether;
    uint256 public constant MIN_INVEST_AMOUNT = 30 ether;
    uint256 public constant MAX_INVEST_AMOUNT = 1500 ether;

    mapping(address => Sale) public sales;
    mapping(uint256 => address) public investors;
    uint256 public totalInverstorsCount;
    address public admin;
    uint256 public initDate;
    uint256 public busdtoToken = 3030;
    uint256 public busdDivider = 1000;

    uint256 public totalInvested;
    uint256 public totalTokenSale;
    bool public isActive = false;

    event SaleEvent(
        address indexed _investor,
        uint256 indexed _investAmount,
        uint256 indexed _tokenAmount
    );

    constructor(address _BUSD, address _TOKEN) {
        admin = msg.sender;
        BUSD = IERC20(_BUSD);
        TOKEN = IERC20(_TOKEN);
        initDate = block.timestamp;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }
    modifier saleIsActive() {
        require(isActive, "sale is not active");
        _;
    }

    function setBusdtoToken(uint256 _busdtoToken) external onlyAdmin {
        busdtoToken = _busdtoToken;
    }

    function setOwner(address _owner) external onlyAdmin {
        owner = _owner;
    }

    function start() external onlyAdmin {
        require(!isActive, "ICO is already active");
        isActive = true;
    }

    function stop() external onlyAdmin {
        require(isActive, "ICO is not active");
        isActive = false;
    }

    function buy(uint256 _amountBUSD) external saleIsActive nonReentrant {
        require(
            _amountBUSD >= MIN_INVEST_AMOUNT,
            "busd must be greater than MIN_INVEST_AMOUNT"
        );
        require(
            _amountBUSD <= MAX_INVEST_AMOUNT,
            "busd must be less than MAX_INVEST_AMOUNT"
        );
        uint256 amount = _amountBUSD;
        if (amount > getReserveToInvest()) {
            amount = getReserveToInvest();
            isActive = false;
        }

        Sale memory sale = sales[msg.sender];

        if (sale.investAmount == 0) {
            sales[msg.sender].buyer = msg.sender;
            investors[totalInverstorsCount] = msg.sender;
            totalInverstorsCount = totalInverstorsCount.add(1);
        }

        uint256 tokenAmount = amount.mul(busdtoToken).div(busdDivider);

        sales[msg.sender].tokenAmount = sale.tokenAmount.add(tokenAmount);
        sales[msg.sender].investAmount = sale.investAmount.add(amount);

        totalInvested = totalInvested.add(amount);
        totalTokenSale = totalTokenSale.add(tokenAmount);
        uint256 dev_fee = amount.mul(DEV_FEE).div(PERCENT_DIVIDER);
        BUSD.transferFrom(msg.sender, devAddress, dev_fee);
        BUSD.transferFrom(msg.sender, owner, amount.sub(dev_fee));
        TOKEN.transfer(msg.sender, tokenAmount);

        emit SaleEvent(msg.sender, amount, tokenAmount);
        require(
            sales[msg.sender].investAmount <= MAX_INVEST_AMOUNT,
            "you can't invest more than MAX_INVEST_AMOUNT"
        );
        require(
            totalInvested <= HARDCAP,
            "total invested must be less than HARDCAP"
        );
    }

    function withdrawDividens() public onlyAdmin {
        uint256 amount = BUSD.balanceOf(address(this));
        uint256 dev_fee = amount.mul(DEV_FEE).div(PERCENT_DIVIDER);
        BUSD.transfer(devAddress, dev_fee);
        BUSD.transfer(owner, amount.sub(dev_fee));
        TOKEN.transfer(owner, TOKEN.balanceOf(address(this)));
    }

    function finish() external onlyAdmin {
        isActive = false;
        withdrawDividens();
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    function getReserveToInvest() public view returns (uint256) {
        return HARDCAP.sub(totalInvested);
    }

    function getAllInvestorsAdress() public view returns (address[] memory) {
        address[] memory _investors = new address[](totalInverstorsCount);
        for (uint256 i; i < totalInverstorsCount; i++) {
            _investors[i] = investors[i];
        }
        return _investors;
    }

    function getAllTokens() public view returns (uint256[] memory) {
        uint256[] memory _tokens = new uint256[](totalInverstorsCount);
        for (uint256 i; i < totalInverstorsCount; i++) {
            _tokens[i] = sales[investors[i]].tokenAmount;
        }
        return _tokens;
    }

    function getAllInvestorAndTokes() public view returns (Sale[] memory) {
        Sale[] memory _investors = new Sale[](totalInverstorsCount);
        for (uint256 i; i < totalInverstorsCount; i++) {
            _investors[i] = sales[investors[i]];
        }
        return _investors;
    }

    function getAllInvestorAndTokesByindex(uint256 _first, uint256 last)
        public
        view
        returns (Sale[] memory)
    {
        uint256 length = last.sub(_first).add(1);
        Sale[] memory _investors = new Sale[](length);
        for (uint256 i; i < length; i++) {
            _investors[i] = sales[investors[_first + i]];
        }
        return _investors;
    }

    struct SaleToken {
        address buyer;
        uint256 tokenAmount;
    }

    function getAllInvestors() external view returns (SaleToken[] memory) {
        SaleToken[] memory _investors = new SaleToken[](totalInverstorsCount);
        for (uint256 i; i < totalInverstorsCount; i++) {
            _investors[i] = SaleToken(
                investors[i],
                sales[investors[i]].tokenAmount
            );
        }
        return _investors;
    }

    function getTokensByInvestor(address investor)
        public
        view
        returns (uint256)
    {
        return sales[investor].tokenAmount;
    }

    function getInvestByInvestor(address investor)
        public
        view
        returns (uint256)
    {
        return sales[investor].investAmount;
    }

    fallback() external {
        revert();
    }
}
