// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {

  address payable public owner; //Адрес владельца средств
  uint Amount;
  mapping(address => uint) public donators;
  address [] public donatorsAll;
  
  constructor(){
    owner == msg.sender;  //Определение владельца контракта
  }

  //Функция перевода средств в фонд
  function makeDonation() public payable{
    require(msg.value >= .001 ether);
    Amount = Amount + msg.value;
    donators[msg.sender] += msg.value;
    donatorsAll.push(msg.sender);
  }
  //Функция вывода средств на счет
  function transferToOwner() external{
    require(msg.sender == owner);         //Вывести средства может только владелец
    owner.transfer(address(this).balance);
  }

  //Функция показывает список всех сделавших пожертвования
  function getDonators() public view returns (address[] memory){
    return donatorsAll;
  }

  //Вывод общей суммы всех юзеров
  function getAmount() public view returns (uint){
    return Amount;
  }


}
