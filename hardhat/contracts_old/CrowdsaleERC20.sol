// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        return a - b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryDiv}.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a % b;
    }
}


interface IBEP20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the token decimals.
     */
    function decimals() external view returns (uint8);

    /**
     * @dev Returns the token symbol.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the token name.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the bep token owner.
     */
    function getOwner() external view returns (address);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address _owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);


    function mint(address _to, uint256 _amount) external;


    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ICO {
    using SafeMath for uint;
    struct Sale {
        uint investAmount;
        uint tokenAmount;
        uint tokenClaim;
        uint claimCount;
        uint lastClaim;
    }

    uint public PERCENT_DIVIDER = 1000;
    uint public PERCENT_CLAIM = 250;

    mapping(address => Sale) public sales;
    address public admin;
    address public dev;
    uint public end;
    uint public duration = 3 minutes;
    uint public timeClaim = 2 minutes;

    uint public initDate;
    uint BUSDtoToken_divider = 100;
    uint[3] public BUSDtoToken = [10 ,20 ,30 ];//
    
    
    IBEP20 public token = IBEP20(0xd9145CCE52D386f254917e481eB44e9943F39138);
    IBEP20 public BUSD = IBEP20(0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8);

    uint public totalInvested;
    uint public totalSale;
    uint public totalInverstors;
    

    event SaleEvent (address indexed _investor, uint indexed _investAmount, uint indexed _tokenAmount);
    event ClaimEvent (address indexed _investor, uint indexed _Claim, uint indexed _date);

    //constructor(address _admin) {
    constructor() {        
        dev  = msg.sender;
        //admin = _admin;
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
   
    modifier  claimAvailable() {
        Sale memory sale = sales[msg.sender];   
        require(getClaimAvailable(), 'claim not available');
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
function buy2(uint valueBUSD)
        external
        view
       returns (uint){
        uint tokenAmount = valueBUSD.mul(BUSDtoToken_divider).div(getCurrentPrice());
        return tokenAmount;
    }
    
    
    
    function buy(uint valueBUSD)
        external
        icoActive {            
        Sale memory sale = sales[msg.sender];
        uint tokenAmount = getTokenAmountForBUSD(valueBUSD);
        require(sale.investAmount.add(valueBUSD) <= 15 ether , 'Not enough tokens left for sale');
        require(tokenAmount <= getTokenBalance(), 'Not enough tokens left for sale');
        require(BUSD.balanceOf(msg.sender) > valueBUSD, 'Must buy at least ');
        BUSD.transferFrom(msg.sender,address(this), tokenAmount);
        uint claim = tokenAmount.mul(PERCENT_CLAIM).div(PERCENT_DIVIDER);
        token.transfer(msg.sender, claim);        
        
        if(sale.investAmount == 0) {
            totalInverstors = totalInverstors.add(1);
        }
        sales[msg.sender].tokenAmount = sale.tokenAmount.add(tokenAmount);
        sales[msg.sender].investAmount = sale.investAmount.add(valueBUSD);
        sales[msg.sender].tokenClaim = sale.tokenClaim.add(claim);
        sales[msg.sender].claimCount = sale.claimCount.add(1);
        sales[msg.sender].lastClaim = block.timestamp;

        totalInvested = totalInvested.add(valueBUSD);
        totalSale = totalSale.add(tokenAmount);
        emit ClaimEvent(msg.sender, claim, block.timestamp);
        emit SaleEvent(msg.sender, valueBUSD, tokenAmount);
    }

    function claimToken()
        external
         {            
        Sale memory sale = sales[msg.sender];        
        
        require( sale.tokenClaim < sale.tokenAmount, 'max Not enough tokens left for sale');
        uint claim = sale.tokenAmount.mul(PERCENT_CLAIM).div(PERCENT_DIVIDER);        
        
        uint check = sale.tokenClaim.add(claim);
        
        if(sale.claimCount == 3){
            
        }

        
        if(check > sale.tokenAmount)
        {
            claim = sale.tokenAmount.sub(sale.tokenClaim);
        }
        require(token.balanceOf(address(this)) > claim, 'Must buy at least ');              
        token.transfer(msg.sender, claim);                        
        sales[msg.sender].tokenClaim = sale.tokenClaim.add(claim);
        sales[msg.sender].claimCount = sale.claimCount.add(1);
        sales[msg.sender].lastClaim = block.timestamp;           
        emit ClaimEvent(msg.sender, claim, block.timestamp);
    }

    

    function getClaimAvailable() public view returns (bool) {
        Sale memory sale = sales[msg.sender]; 
        return block.timestamp.sub(sale.lastClaim) >  timeClaim;
    }

       
    function withdrawDividens(uint amount) external onlyAdmin {
        payable(admin).transfer(amount);
    }
    
    function getTokenAmountForBUSD(uint valueBUSD) public view returns (uint) {
        return valueBUSD.mul(BUSDtoToken_divider).div(getCurrentPrice());
    }

    function getCurrentPrice() public view returns (uint) {
        if(initDate == 0)
        return BUSDtoToken[0];
        uint date = block.timestamp.sub(initDate).div(1 minutes);
        date = date > 2 ? 2 :date;
        return BUSDtoToken[date];
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
        //require(canFinish(), 'the ICO must be active for 3 days');
        token.transfer(admin, getTokenBalance());
        payable(admin).transfer(getBalance());
        end = block.timestamp;
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

}