// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface ITTF{
     function transferFrom(address from, address to, uint value) external returns(bool);
      function balanceOf(address owner) external view returns(uint);
}

contract Claim {
    IERC20 public TOKEN;
    ITTF public TOKEN2;   

    address public admin;
    address constant public DEAD_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    bool public isActive;
    uint public totalClaimed;
    uint public claims;
    mapping(uint => address) public claimers;

    event WithdrawEvent(address indexed _investor, uint _tokenAmount);

    struct User {
        uint tokenClaimed;
    }

    mapping(address => User) public users;

    constructor(IERC20 _token, ITTF _token2) {
        admin = msg.sender;
        TOKEN = _token;
        TOKEN2 =_token2;
    }

        modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier canWithdraw() {
        require(isActive, "can not withdraw");
        _;
    }

    function starTWithDraw() external onlyAdmin {
        require(!isActive, "ICO is already active");
        isActive = true;
    }

    function stop() external onlyAdmin {
        require(isActive, "ICO is not active");
        isActive = false;
    }

    function withdrawTokens() external canWithdraw {
        require(users[msg.sender].tokenClaimed == 0, "you cant withdraw twice");
        uint balanceOf_ = TOKEN2.balanceOf(msg.sender);
        require(balanceOf_ > 0, "balanceOf > 0");        
        users[msg.sender].tokenClaimed = balanceOf_;
        TOKEN2.transferFrom(msg.sender,DEAD_ADDRESS, users[msg.sender].tokenClaimed);
        TOKEN.transfer(msg.sender, users[msg.sender].tokenClaimed);
        totalClaimed += users[msg.sender].tokenClaimed;
        claimers[claims] = msg.sender;
        claims++;
        emit WithdrawEvent(msg.sender, users[msg.sender].tokenClaimed);
    }

    function finish() external onlyAdmin {
        isActive = false;
        withdrawDividens();
    }

    function withdrawDividens() public onlyAdmin {
        TOKEN.transfer(admin, TOKEN.balanceOf(address(this)));
    }

    function getAllClaimers() external view returns (address[] memory) {
        address[] memory _claimers = new address[](claims);
        for(uint i; i < claims; i++) {
            _claimers[i] = claimers[i];
        }
        return _claimers;
    }


}
