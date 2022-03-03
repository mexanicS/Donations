// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  struct Donators{
    uint sum;
    address from;
  }

  struct Balance {
    uint money;
    uint allAmountDonation;
    mapping(uint => Donators) donations;
  }
  
  uint allAmount;
  address [] public  donatorsAll; 

  mapping(address => Balance) public balances;

  //Совершить пожертвование
  function makeDonation() public payable{
    
    uint donationsNum = balances[msg.sender].allAmountDonation;
    balances[msg.sender].allAmountDonation += msg.value;
    
    donatorsAll.push(msg.sender);
    
    Donators memory newDonators = Donators(
      msg.value,
      msg.sender
    );

    balances[msg.sender].donations[donationsNum] = newDonators;
    
    allAmount += msg.value;
  }
 
  //Выполняет вывод из фонда на выбранный счет (только для создателя контракта)
  function transferToOwner(address receiver, uint sum) external{ 
    require(msg.sender == owner, "No access");

    allAmount -= sum;
    balances[receiver].money += sum;
  }

  //Функция показывает список всех сделавших пожертвования
  function getDonators() public view returns (address[] memory){
    return donatorsAll;
  }

  //Показать сумму фонда
  function getBalanceFund() public view returns(uint){
    return allAmount;
  }

  //Показать сколько средств на счету
  function getBalance(address _addr) public view returns(uint){
    return balances[_addr].money;
  }
}
