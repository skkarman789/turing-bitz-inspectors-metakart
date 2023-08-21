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


    struct FCMinted{
        address  from;
        address    to;
        uint256  amount;
        uint256  issueTime;
        string   Activity;
    }


    FCMinted[] fc;

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

    function TFC(address recipient,uint256 amount, string memory Activity)
        internal  
        onlyValidRecipient(recipient)
    {
        _transfer(admin,recipient, amount);
        fc.push(FCMinted(admin,recipient,amount,block.timestamp, Activity));
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
        TFC(recipient,earnedTokens,"spendAndEarn");
    }


    function spend(address recipient,uint256 Amount) external  onlyPositiveAmount(Amount) onlyValidRecipient(recipient) {
        uint256 maxFCPerOrder = 200 wei;
        uint256 earnedTokens = Amount.div(10); 

        if (earnedTokens > maxFCPerOrder) {
            earnedTokens = maxFCPerOrder;
        } 
        if (earnedTokens > balanceOf(recipient)) {
            earnedTokens = balanceOf(recipient);
        }

        _burn(recipient, earnedTokens); 
        _mint(admin, earnedTokens);
        emit Transfer(recipient,admin, earnedTokens);
        fc.push(FCMinted(recipient,admin,earnedTokens, block.timestamp,"spend"));
    }


    function Referred (address recipient)
        external
        onlyValidRecipient(recipient){
        TFC(recipient, 100 wei ,"Referrals");
    }


    function SocialMediaInteraction (address recipient)
        onlyAdmin public
        onlyValidRecipient(recipient){
            TFC(recipient,100 wei ,"SocialMedia");

    }
    function getfc() public view returns(FCMinted[] memory){
        return fc;
    }
    function checkFc(address recipient,uint256 Amount) public  onlyPositiveAmount(Amount) onlyValidRecipient(recipient) view returns(uint256){
        uint256 cc=0;
            if(balanceOf(recipient)==0){
                return cc;
            }
            else{
                uint256 maxFCPerOrder = 200 wei;
                uint256 earnedTokens = Amount.div(10);
                if (earnedTokens > maxFCPerOrder) {
                    cc = maxFCPerOrder;
                } 
                if (earnedTokens < maxFCPerOrder) {
                    cc = earnedTokens;
                } 
                if (earnedTokens > balanceOf(recipient)) {
                    cc = balanceOf(recipient);}
            }
        return cc;
    }
}