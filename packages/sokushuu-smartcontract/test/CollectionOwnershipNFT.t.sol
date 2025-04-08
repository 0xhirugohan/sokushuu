// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CollectionOwnershipNFT} from "../src/CollectionOwnershipNFT.sol";
import {Strings} from "@openzeppelin/utils/Strings.sol";

contract CollectionOwnershipNFTTest is Test {
    CollectionOwnershipNFT public collectionOwnershipNFT;
    string public tokenName = "Test Token";
    string public tokenSymbol = "TEST";
    uint256 public mintPrice = 1 ether;

    address public alice = makeAddr("Alice");
    address public bob = makeAddr("Bob");

    function setUp() public {
        vm.startPrank(alice);
        collectionOwnershipNFT = new CollectionOwnershipNFT(tokenName, tokenSymbol, mintPrice);
        vm.stopPrank();
    }

    function test_Mint() public {
        vm.deal(bob, 1 ether);

        vm.startPrank(bob);
        collectionOwnershipNFT.mint{value: mintPrice}(address(bob));
        vm.stopPrank();

        assertEq(collectionOwnershipNFT.balanceOf(address(bob)), 1);
        assertEq(collectionOwnershipNFT.ownerOf(0), address(bob));
        assertEq(collectionOwnershipNFT.tokenURI(0), string.concat(
            collectionOwnershipNFT.baseURI(),
            Strings.toHexString(address(collectionOwnershipNFT)),
            "/",
            "0"
        ));
    }

    function test_Deploy() public view {
        assertEq(collectionOwnershipNFT.name(), tokenName);
        assertEq(collectionOwnershipNFT.symbol(), tokenSymbol);
        assertEq(collectionOwnershipNFT.owner(), alice);
        assertEq(collectionOwnershipNFT.mintPrice(), mintPrice);
    }

    /**
        ================================================
        Error Tests
        ================================================
     */

    function test_Mint_InsufficientBalance() public {
        uint256 balance = 0.009 ether;
        vm.deal(bob, balance);

        vm.startPrank(bob);
        vm.expectRevert(CollectionOwnershipNFT.error_IncorrectEduAmountForMint.selector);
        collectionOwnershipNFT.mint{value: balance}(address(bob));
    }

    function test_Mint_InvalidRecipientAddress() public {
        vm.deal(bob, mintPrice);

        vm.startPrank(bob);
        vm.expectRevert(CollectionOwnershipNFT.error_InvalidRecipientAddress.selector);
        collectionOwnershipNFT.mint{value: mintPrice}(address(0));
    }

    function test_NonExistentTokenURI() public {
        vm.expectRevert();
        collectionOwnershipNFT.tokenURI(0);
    }
}