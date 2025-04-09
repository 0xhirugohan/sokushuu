// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {CollectionOwnershipNFT} from "../src/CollectionOwnershipNFT.sol";

contract CollectionOwnershipNFTScript is Script {
    CollectionOwnershipNFT public collectionOwnershipNFT;

    function setUp() public {}
    
    function run() public {
        // get sokushuu mint sale address from env
        address sokushuuMintSaleAddress = vm.envAddress("SOKUSHUU_MINT_SALE_ADDRESS");

        vm.createSelectFork("educhain-testnet");
        vm.startBroadcast();
        collectionOwnershipNFT = new CollectionOwnershipNFT("Sokushuu Collection Ownership NFT", "SCON", 0.01 ether, sokushuuMintSaleAddress);
        vm.stopBroadcast();
    }
}
