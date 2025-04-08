// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {CollectionOwnershipNFT} from "../src/CollectionOwnershipNFT.sol";

contract CollectionOwnershipNFTScript is Script {
    CollectionOwnershipNFT public collectionOwnershipNFT;

    function setUp() public {}
    
    function run() public {
        vm.createSelectFork("educhain-testnet");
        vm.startBroadcast();
        collectionOwnershipNFT = new CollectionOwnershipNFT("Sokushuu Collection Ownership NFT", "SCON", 0.01 ether);
        vm.stopBroadcast();
    }
}
