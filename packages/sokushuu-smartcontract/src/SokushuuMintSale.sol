// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ICollectionOwnershipNFT} from "./ICollectionOwnershipNFT.sol";

contract SokushuuMintSale {
    address immutable public i_feeRecipientAddress;
    uint256 immutable public i_withdrawFeePercentage;
    uint256 public claimableFee;
    uint256 constant public MINIMUM_CLAIMABLE = 0.5 ether;
    uint256 constant public WITHDRAW_FEE_PERCENTAGE_DIVISOR = 100000;

    mapping(address => uint256) public mintSaleBalance;
    mapping(address => address) public NFTCollectionOwner;

    error error_InvalidNFTCollection();
    error error_InvalidNFTCollectionOwner();
    error error_InvalidRecipient();
    error error_InvalidMintAmount();
    error error_UserDoesNotHaveSale();
    error error_InsufficientBalance();
    error error_NotFeeRecipient();
    error error_InsufficientClaimableFee();

    event Deploy(address indexed nftCollection, address indexed owner, uint256 mintPrice);
    event Mint(address indexed nftCollection, address indexed recipient, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(uint256 _withdrawFeePercentage, address _feeRecipientAddress) {
        i_withdrawFeePercentage = _withdrawFeePercentage;
        i_feeRecipientAddress = _feeRecipientAddress;
    }

    modifier onlyNFTCollectionContract() {
        
        _;
    }

    function deploy(address _nftCollection, uint256 _mintPrice) public {
        address owner = ICollectionOwnershipNFT(address(msg.sender)).owner();

        if (owner == address(0)) {
            revert error_InvalidNFTCollectionOwner();
        }

        NFTCollectionOwner[_nftCollection] = owner;
        emit Deploy(_nftCollection, owner, _mintPrice);
    }

    function mint(address _nftCollection, address _recipient) public payable onlyNFTCollectionContract {
        address owner = NFTCollectionOwner[_nftCollection];

        if (owner == address(0)) {
            revert error_InvalidNFTCollection();
        }

        if (_recipient == address(0)) {
            revert error_InvalidRecipient();
        }

        if (msg.value == 0) {
            revert error_InvalidMintAmount();
        }

        mintSaleBalance[owner] += msg.value;
        emit Mint(_nftCollection, _recipient, msg.value);
    }

    function withdraw(uint256 amount) public {
        if (mintSaleBalance[msg.sender] == 0) {
            revert error_UserDoesNotHaveSale();
        }

        if (amount > mintSaleBalance[msg.sender]) {
            revert error_InsufficientBalance();
        }

        if (amount < MINIMUM_CLAIMABLE) {
            revert error_InsufficientClaimableFee();
        }

        uint256 fee = (amount * i_withdrawFeePercentage) / WITHDRAW_FEE_PERCENTAGE_DIVISOR;
        uint256 claimableAmount = amount - fee;
        mintSaleBalance[msg.sender] -= amount;
        claimableFee += fee;

        payable(msg.sender).transfer(claimableAmount);

        emit Withdraw(msg.sender, amount);
    } 

    function claimFee() public {
        if (msg.sender != i_feeRecipientAddress) {
            revert error_NotFeeRecipient();
        }

        if (claimableFee < MINIMUM_CLAIMABLE) {
            revert error_InsufficientClaimableFee();
        }

        uint256 amountToClaim = claimableFee;
        claimableFee = 0;

        payable(i_feeRecipientAddress).transfer(amountToClaim);
    }

    /**
        =============
        View Functions
        =============
     */

    function getFeeSimulation(uint256 _amount, uint256 _withdrawFeePercentage) public pure returns (uint256) {
        return (_amount * _withdrawFeePercentage) / WITHDRAW_FEE_PERCENTAGE_DIVISOR;
    }

    function getClaimableFee() public view returns (uint256) {
        return claimableFee;
    }
    
}
