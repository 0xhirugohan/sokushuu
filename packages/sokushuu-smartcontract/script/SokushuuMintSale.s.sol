//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {SokushuuMintSale} from "../src/SokushuuMintSale.sol";

contract SokushuuMintSaleScript is Script {
    SokushuuMintSale sokushuuMintSale;

    function setUp() public {}

    function run() public {
        vm.createSelectFork("educhain-testnet");
        vm.startBroadcast();
        sokushuuMintSale = new SokushuuMintSale(500, address(this));
        vm.stopBroadcast();
    }
}