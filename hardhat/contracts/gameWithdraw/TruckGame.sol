// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./IPoolRewards.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract TruckGame is AccessControl {
    using EnumerableSet for EnumerableSet.UintSet;
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    IERC20 public _token;
    IPoolRewards public poolRewards;
    uint256 public nonce;
    address public admin;
    uint256 public userId;

    struct Nonce {
        uint256 amount;
        uint256 amountSend;
        bool type_;
        uint256 time;
        uint256 blockNumber;
        bool approve;
    }

    struct User {
        address userAddress;
        uint256 balance;
        uint256[] nonces;
        uint256 lastWithdraw;
    }

    mapping(address => User) public users;
    mapping(uint256 => Nonce) public nonces;
    mapping(uint256 => address) public idToUsers;

    event UserExchange(
        address user_,
        uint256 amount_,
        uint256 nonce,
        uint256 timestamp
    );
    event Withdraw(
        address user_,
        uint256 amount_,
        uint256 nonce,
        uint256 timestamp
    );
    event UserWithdraw(
        address user_,
        uint256 nonce,
        uint256 timestamp,
        uint256 amount_
    );

    constructor(address token_, address _poolRewards) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OWNER_ROLE, msg.sender);
        _token = IERC20(token_);
        poolRewards = IPoolRewards(_poolRewards);
        admin = msg.sender;
    }

    modifier onlyOwner() {
        require(hasRole(OWNER_ROLE, _msgSender()), "Only owner");
        _;
    }

    function nonceHandle(
        uint256 nonceId,
        uint256 amount,
        bool type_
    ) public {
        Nonce storage nonce_ = nonces[nonceId];
        nonce_.amount = amount;
        nonce_.time = block.timestamp;
        nonce_.type_ = type_;
        nonce_.blockNumber = block.number;
    }

    function setAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }

    function balanceOf() external view returns (uint256) {
        return _token.balanceOf(address(this));
    }

    function isUser(address user_) public view returns (bool) {
        User memory user = users[user_];
        return user.userAddress != address(0);
    }

    function ExchangeHandle(address _from, uint256 _amount) internal {
        _token.transferFrom(_from, address(poolRewards), _amount);
        nonce++;
        User storage user = users[_from];

        if (!isUser(_from)) {
            user.userAddress = _from;
            userId++;
            idToUsers[userId] = _from;
            user.lastWithdraw = block.timestamp;
        }
        nonceHandle(nonce, _amount, false);
        user.nonces.push(nonce);
        emit UserExchange(_from, _amount, nonce, block.timestamp);
    }

    function exchange(uint256 _amount) external {
        ExchangeHandle(msg.sender, _amount);
    }

    function exchangeFrom(address _from, uint256 _amount) external {
        ExchangeHandle(_from, _amount);
    }

    function ClaimUser() external {
        require(isUser(msg.sender), "user not found");
        User storage user = users[msg.sender];
        uint256 _amount = user.balance;
        user.balance = 0;
        user.lastWithdraw = block.timestamp;
        poolRewards.withdraw(address(_token), msg.sender, _amount);
        emit UserWithdraw(msg.sender, nonce, block.timestamp, _amount);
    }

    function withdraw(address _to, uint256 _amount) external onlyOwner {
        require(isUser(_to), "user not found");
        nonce++;
        User storage user = users[msg.sender];
        user.lastWithdraw = block.timestamp;
        nonceHandle(nonce, _amount, true);
        user.nonces.push(nonce);
        user.balance += _amount;
        Nonce storage nonce_ = nonces[nonce];
        nonce_.amountSend = _amount;
        emit Withdraw(msg.sender, _amount, nonce, block.timestamp);
    }

    fallback() external {
        revert();
    }
}
