// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/access/Ownable.sol";
import {Strings} from "@openzeppelin/utils/Strings.sol";

import {SokushuuMintSale} from "./SokushuuMintSale.sol";

contract CollectionOwnershipNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;
    uint256 immutable public mintPrice;
    SokushuuMintSale immutable public i_sokushuuMintSale;
    string constant public baseURI = "https://api.sokushuu.xyz/nft/";

    error error_InvalidRecipientAddress();
    error error_IncorrectEduAmountForMint();
    error error_NonExistentToken();
    error error_MintFailed();

    event Withdraw(address indexed user, uint256 amount);
    event Register(address indexed user, uint256 mintPrice);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice,
        address _sokushuuMintSaleAddress
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        mintPrice = _mintPrice;
        i_sokushuuMintSale = SokushuuMintSale(payable(_sokushuuMintSaleAddress));
    }

    function register() public {
        i_sokushuuMintSale.register(address(this), mintPrice);
        emit Register(msg.sender, mintPrice);
    }

    function mint(address to) public payable {
        if (msg.value != mintPrice) {
            revert error_IncorrectEduAmountForMint();
        }
        if (to == address(0)) {
            revert error_InvalidRecipientAddress();
        }

        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
    }

    function withdraw() public {
        uint256 balance = address(this).balance;
        i_sokushuuMintSale.depositSale{value: balance}();
        emit Withdraw(msg.sender, balance);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (ownerOf(tokenId) == address(0)) {
            revert error_NonExistentToken();
        }

        return string.concat(
            baseURI,
            Strings.toHexString(address(this)),
            "/",
            tokenId.toString()
        );
    }
}
