// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";
contract loyalty is ERC20{
    using SafeMath for uint256;

    uint256 _totalSupply = 1000000000 wei;
    uint8 public maxTokensPerOrder = 100 wei;
    uint8 public minTokensRequired = 200 wei;
    address public admin;

    enum ActivityType{
        Purchases,
        Referrals,
        SocialMedia
    }


    event FCMinted(
        address  indexed to,
        uint256  amount,
        uint256  issueTime,
        uint256  expiry,
        ActivityType Activity
        );

    
    event FCspent(
        address indexed from,
        uint256 amount,
        uint256 issueTime
        );

    constructor() ERC20("FlipCoins", "FC") {
        admin=msg.sender;
        _mint(admin,_totalSupply);
        
    }
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyValidRecipient(address recipient) {
        require(recipient != address(0), "Invalid recipient address");
        _;
    }

    modifier onlyPositiveAmount(uint256 amount) {
        require(amount > 0, "Amount must be greater than 0");
        _;
    }
    function isPlusMember(address recipient) public view returns (bool) {
        return balanceOf(recipient) >= minTokensRequired;
    }
    function balance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }
    function remainingTotalSupply() public view returns (uint256) {
    return balanceOf(admin);
    }

    function TFC(address recipient,uint256 amount, ActivityType Activity)
        internal  
        onlyValidRecipient(recipient)
        onlyPositiveAmount(amount)
    {
        _transfer(admin,recipient, amount);
        uint256 isueTime = block.timestamp;
        uint256 Expiry= isueTime.add(180 days);
        emit FCMinted(recipient, amount,isueTime,Expiry,Activity);
        emit Transfer(admin,recipient, amount);
    }

    function spendAndEarnTokens(address recipient, uint256 orderAmount )
        external  
        onlyPositiveAmount(orderAmount)
        onlyValidRecipient(recipient)
    {
        require(orderAmount >= 100  wei, "Order amount must be at least 100");
        uint256 earnedTokens = isPlusMember(recipient) ? orderAmount.div(25) : orderAmount.div(50);
        if (earnedTokens > maxTokensPerOrder) {
            earnedTokens = maxTokensPerOrder;
        }
        TFC(recipient,earnedTokens,ActivityType.Purchases);
    }


    function spend(address recipient,uint256 Amount) external  onlyPositiveAmount(Amount) onlyValidRecipient(recipient) {
    uint256 maxFCPerOrder = 200 wei;
    uint256 earnedTokens = Amount.div(10); // 10% discount 

    if (earnedTokens > maxFCPerOrder) {
        earnedTokens = maxFCPerOrder;
    } 
    if (earnedTokens > balanceOf(recipient)) {
        earnedTokens = balanceOf(recipient);
    }

    _burn(recipient, earnedTokens); 
    _mint(admin, earnedTokens);
    emit Transfer(recipient,admin, earnedTokens);
    emit FCspent(recipient,Amount, block.timestamp);
}


    function Referred (address recipient)
        external
        onlyValidRecipient(recipient){
        TFC(recipient, 100 wei ,ActivityType.Referrals);

    }


    function SocialMediaInteraction (address recipient)
        onlyAdmin public
        onlyValidRecipient(recipient){
            TFC(recipient,100 wei ,ActivityType.SocialMedia);

    }
}
