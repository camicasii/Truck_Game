// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheTruckFarm is ERC20, Ownable {
  using SafeMath for uint256;
  uint256 public constant PERCENT_DIVIDER = 10000;

  // Transfer tax rate in basis points. (default 10%)
  uint256 public constant MaxtransferTaxRate = 1000;
  uint256 public transferTaxRate = 1000;
  address public feeAddress = address(0xAae3e755df3cCDEcb6D719946782058041678fc3);

  //whitelist
  mapping(address => bool) private isWhitelist;

  constructor() ERC20("TheTruckFarm", "TTF") {
    _mint(msg.sender, 300000000 * 10**decimals());
    isWhitelist[msg.sender] = true;
    isWhitelist[feeAddress] = true;
  }

  function setFeeAddress(address address_) external onlyOwner {
    feeAddress = address_;
  }

  function setTransferTaxRate(uint256 transferTaxRate_) external onlyOwner {
    if (transferTaxRate_ >= MaxtransferTaxRate)
      transferTaxRate_ = MaxtransferTaxRate;
    transferTaxRate = transferTaxRate_;
  }

  /// @dev overrides transfer function to meet Tokenomics
  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal virtual override {
    // swap and liquify
    bool isWhitelisted = isWhitelist[sender] || isWhitelist[recipient];
    if (isWhitelisted || transferTaxRate == 0) {
      super._transfer(sender, recipient, amount);
    } else {
      // default tax
      uint256 taxAmount = amount.mul(transferTaxRate).div(PERCENT_DIVIDER);

      // default transfer sent to recipient
      super._transfer(sender, feeAddress, taxAmount);
      super._transfer(sender, recipient, amount.sub(taxAmount));
    }
  }

  function setWhitelist(address Addrss, bool _bool) external onlyOwner {
    isWhitelist[Addrss] = _bool;
  }

  function userIsInWhitelist(address Addrss) external view returns (bool) {
    return isWhitelist[Addrss];
  }
}
