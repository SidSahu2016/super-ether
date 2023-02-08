//SPDX-LICENSE-IDENTIFIER : MIT 
pragma solidity ^0.8.17 ;
//import "openzeppelin-solidity/contracts/math/SafeMath.sol";
//import "@OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Capped.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Burnable.sol";

import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

 contract SuperEther is ERC20Capped,ERC20Burnable  {
    address payable public  owner;
    uint256 public blockreward ;
   // address public test1 = block.coinbase;
   // address public test2 = address(0);

    constructor (uint256 cap,uint256 initialSupply, uint256 reward) ERC20("SuperEther", "SETH") ERC20Capped(cap /** (10 ** decimals())*/) {
        owner = payable(msg.sender);
        _mint(owner, initialSupply /** (10 ** decimals())*/);
        blockreward = reward ;
    }

    modifier onlyOwner() {
        require(msg.sender == owner , "**Only Owner can execute this transaction **");
        //return owner;
        _;
    }
    function _mint(address account, uint256 amount) internal virtual override(ERC20,ERC20Capped) { 
       //describing this _mint() in this contravt as it is overriding same funtion in its parent contract 
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function _mintMinerreward() internal {
        _mint(block.coinbase, blockreward); //reward will be added to the miner who is adding
        //this block on the blockchain 
    }

    function _beforeTokenTransfer( address from , address to , uint256 value) internal virtual override {
        if (from != address(0) && to != block.coinbase && block.coinbase != address(0)){
            //if statement here check the validity of the to and from addresses 
            //address(0) is an invalid address it refers to no one
            //block.coinbase is the address of the miner , it is not the participating address
       _mintMinerreward;
        }
        super._beforeTokenTransfer(from, to , value);
    }

    function setMinerReward(uint256 reward) public onlyOwner {
        //this function is to modify the miner rewards in future but it can only be done by the owner 
        blockreward = reward ; 
    }

    function destroy() public onlyOwner{
        selfdestruct(owner);
        //this is to destroy smart contract
    }


   }

