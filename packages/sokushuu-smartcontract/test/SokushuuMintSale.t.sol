// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {SokushuuMintSale} from "../src/SokushuuMintSale.sol";
import {CollectionOwnershipNFT} from "../src/CollectionOwnershipNFT.sol";

contract SampleContractTest {
    constructor() {}
}

contract SokushuuMintSaleTest is Test {
    SokushuuMintSale sokushuuMintSale;
    uint16 constant WITHDRAW_FEE_PERCENTAGE = 500 wei;

    address public alice = makeAddr("Alice");
    address public bob = makeAddr("Bob");
    address public feeRecipient = makeAddr("Fee Recipient");

    function setUp() public {
        sokushuuMintSale = new SokushuuMintSale(WITHDRAW_FEE_PERCENTAGE, feeRecipient);
    }

    function test_Deployment() public view {
        assertEq(sokushuuMintSale.i_withdrawFeePercentage(), 500 wei);
    }

    function test_CollectionDeployFromCollectionOwnershipNFT() public {
        vm.startPrank(bob);
        CollectionOwnershipNFT collectionOwnershipNFT = new CollectionOwnershipNFT("Test NFT", "TEST", 1 ether);
        vm.stopPrank();

        vm.startPrank(address(collectionOwnershipNFT));
        sokushuuMintSale.deploy(address(collectionOwnershipNFT), 1 ether);
        vm.stopPrank();

        assertEq(sokushuuMintSale.NFTCollectionOwner(address(collectionOwnershipNFT)), bob);
    }

    function test_MintFromAuthorizedContract() public {
        vm.startPrank(bob);
        CollectionOwnershipNFT collectionOwnershipNFT = new CollectionOwnershipNFT("Test NFT", "TEST", 1 ether);
        vm.stopPrank();

        vm.deal(address(collectionOwnershipNFT), 1 ether);

        vm.startPrank(address(collectionOwnershipNFT));
        sokushuuMintSale.deploy(address(collectionOwnershipNFT), 1 ether);
        sokushuuMintSale.mint{value: 1 ether}(address(collectionOwnershipNFT), alice);
        vm.stopPrank();

        assertEq(sokushuuMintSale.mintSaleBalance(bob), 1 ether);
        assertEq(address(sokushuuMintSale).balance, 1 ether);
        assertEq(address(collectionOwnershipNFT).balance, 0);
    }

    function test_Withdraw() public {
        uint256 mintPrice = 100 ether;

        vm.startPrank(bob);
        CollectionOwnershipNFT collectionOwnershipNFT = new CollectionOwnershipNFT("Test NFT", "TEST", mintPrice);
        vm.stopPrank();

        vm.deal(address(collectionOwnershipNFT), mintPrice);

        vm.startPrank(address(collectionOwnershipNFT));
        sokushuuMintSale.deploy(address(collectionOwnershipNFT), mintPrice);
        sokushuuMintSale.mint{value: mintPrice}(address(collectionOwnershipNFT), alice);
        vm.stopPrank();

        vm.startPrank(bob);
        sokushuuMintSale.withdraw(mintPrice);
        vm.stopPrank();

        uint256 fee = sokushuuMintSale.getFeeSimulation(mintPrice, WITHDRAW_FEE_PERCENTAGE);

        assertEq(sokushuuMintSale.mintSaleBalance(bob), 0);
        assertEq(address(sokushuuMintSale).balance, fee);
        assertEq(bob.balance, mintPrice - fee);
        assertEq(address(collectionOwnershipNFT).balance, 0);
    }

    function test_ClaimFee() public {  
        test_Withdraw();

        assertEq(sokushuuMintSale.i_feeRecipientAddress(), feeRecipient);

        uint256 claimableFee = sokushuuMintSale.getClaimableFee();
        assertEq(address(sokushuuMintSale).balance, claimableFee);

        vm.startPrank(feeRecipient);
        sokushuuMintSale.claimFee();
        vm.stopPrank();

        assertEq(address(sokushuuMintSale).balance, 0);
        assertEq(feeRecipient.balance, claimableFee);
    }

    /**
        =============
        View Functions
        =============
     */

    function test_getFeeSimulation() public view {
        uint256 fee = sokushuuMintSale.getFeeSimulation(10 ether, 10000);
        assertEq(fee, 1 ether);
    }

    function test_getClaimableFee() public {
        assertEq(sokushuuMintSale.getClaimableFee(), 0);

        vm.startPrank(bob);
        CollectionOwnershipNFT collectionOwnershipNFT = new CollectionOwnershipNFT("Test NFT", "TEST", 1 ether);
        vm.stopPrank();

        vm.deal(address(collectionOwnershipNFT), 1 ether);

        vm.startPrank(address(collectionOwnershipNFT));
        sokushuuMintSale.deploy(address(collectionOwnershipNFT), 1 ether);
        sokushuuMintSale.mint{value: 1 ether}(address(collectionOwnershipNFT), alice);
        vm.stopPrank();
        
        assertEq(sokushuuMintSale.getClaimableFee(), 0);

        vm.startPrank(bob);
        sokushuuMintSale.withdraw(1 ether);
        vm.stopPrank();

        uint256 claimableFee = sokushuuMintSale.getFeeSimulation(1 ether, WITHDRAW_FEE_PERCENTAGE);
        assertEq(sokushuuMintSale.getClaimableFee(), claimableFee);
    }
    
    

    /**
        =============
        Errors
        =============
     */

    function test_CollectionDeployFromStandardContract() public {
        vm.startPrank(bob);
        SampleContractTest standardContract = new SampleContractTest();
        vm.stopPrank();

        vm.startPrank(address(standardContract));
        vm.expectRevert();
        sokushuuMintSale.deploy(address(standardContract), 1 ether);
        vm.stopPrank();

        vm.startPrank(bob);
        CollectionOwnershipNFT collectionOwnershipNFT = new CollectionOwnershipNFT("Test NFT", "TEST", 1 ether);
        vm.stopPrank();

        vm.startPrank(alice);
        vm.expectRevert();
        sokushuuMintSale.deploy(address(collectionOwnershipNFT), 1 ether);
        vm.stopPrank();
    }

    function test_MintFromUnauthorizedContract() public {
        vm.deal(bob, 1 ether);

        CollectionOwnershipNFT collectionOwnershipNFT = new CollectionOwnershipNFT("Test NFT", "TEST", 1 ether);

        vm.startPrank(bob);
        vm.expectRevert(SokushuuMintSale.error_InvalidNFTCollection.selector);
        sokushuuMintSale.mint{value: 1 ether}(address(collectionOwnershipNFT), alice);
        vm.stopPrank();
    }
}
