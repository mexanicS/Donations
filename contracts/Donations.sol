// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {

  address payable public owner;
  constructor() {
    owner == msg.sender;
  }

  struct Donators{
    uint sum;
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
 
  //Выполняет вывод из фонда на выбранный счет (только для создателя контракта)
  function transferToOwner(address receiver, uint sum) external{ 
    //require(msg.sender == owner, "No access");
    require(sum < 1e60,"too much money" );
    balances[receiver].allAmountUser += sum;
  }

  //Функция показывает список всех сделавших пожертвования
  function getDonators() public view returns (address[] memory){
    return donatorsAll;
  }

  //Показать сумму фонда
  function getBalanceFund() public view returns(uint){
    return allAmount;
  }
}
