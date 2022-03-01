// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {
  constructor() {
    owner == msg.sender;
  }

  address payable public owner;

  struct Donators{
    uint amount;
    address from;
  }

  struct Balance {
    uint allAmountUser;
    mapping(uint => Donators) donations;
  }

  uint allAmount;
  address [] public  donatorsAll; 

  mapping(address => Balance) public balances;

  //Совершить пожертвование
  function makeDonation() public payable{
    
    uint donationsNum = balances[msg.sender].allAmountUser;
    balances[msg.sender].allAmountUser += msg.value;

    donatorsAll.push(msg.sender);

    Donators memory newDonators = Donators(
      msg.value,
      msg.sender
    );

    balances[msg.sender].donations[donationsNum] = newDonators;

    allAmount = msg.value + allAmount;
  }
 
  //Выполняет вывод из фонда на счет создателя
  function transferToOwner() external{ 
    require(msg.sender == owner);
    owner.transfer(address(this).balance);
  }

  //Функция показывает список всех сделавших пожертвования
  function getDonators() public view returns (address[] memory){
    return donatorsAll;
  }
}
