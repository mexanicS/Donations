// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {

  address payable public owner; //Адрес владельца средств
  uint Amount;
  mapping(address => uint) public donators;
  address [] public donatorsAll; // TO DO: wrong working

  constructor(){
    owner == msg.sender;  //Определение владельца контракта
  }

  //Функция перевода средств в фонд
  function makeDonation() public payable{
    require(msg.value >= .001 ether);
    Amount = Amount + msg.value;
    donators[msg.sender] += msg.value;

    //Добавлять нового юзера только если его раньше не было в donatorsAll
    for (uint256 i = 0; i <= donatorsAll.length; i++) {
      if(msg.sender != donatorsAll[i])
      donatorsAll.push(msg.sender);
    }
    

  }
  //Функция вывода средств на счет
  function transferToOwner() external{
    require(msg.sender == owner);         //Вывести средства может только владелец
    owner.transfer(address(this).balance);
  }
  
  // TO DO: wrong working
  //Функция показывает список всех сделавших пожертвования
  function getDonators() public view returns (address[] memory){
    return donatorsAll;
  }

  //Вывод общей суммы всех юзеров
  function getAmount() public view returns (uint){
    return Amount;
  }


}
