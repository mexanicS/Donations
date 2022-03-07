// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {
  constructor() {
    owner = msg.sender;
  }

  struct Donation{
    uint sum;
    uint sumAll;
    address from;
    uint timestamp;
  }
  //uint sumFund;
  
  address public owner;
  address [] public donatorsAll;
  
  Donation[] donation; 
  mapping (address => Donation) donations;

  //Проверяем владельца смарт контракта
  modifier requireOwner() {
    require (owner == msg.sender, "No access");
    _;
  }

  //Совершить пожертвование
  function makeDonation() public payable{
    donatorsAll.push(msg.sender);

    donations[msg.sender].sumAll += msg.value;
    Donation memory newDonation = Donation(msg.value,donations[msg.sender].sumAll,msg.sender,block.timestamp);
    donation.push(newDonation);
  }
 
  //TO DO
  //Выполняет вывод из фонда на выбранный счет (только для создателя контракта)
  function transferToOwner(address payable _to) public requireOwner { 
    _to.transfer(getBalanceAnyAddress(address(this)));
  }

  //TO DO (ничего не показывает)
  //Функция показывает информацию о транзакции
  function getDonations(uint _index) public view returns (Donation memory){
    require(_index < donation.length, "Out of range");
    return donation[_index];
  }

  //Показывает список совершивших пожертвования
  function getDonatorsAll() public view returns (address[] memory){
   return donatorsAll;
  }

  //Показать сколько пожертвовал адресс
  function getDonatingAmount(address _addr)public view returns(uint){
    return donations[_addr].sumAll;
  }

  //Посмотреть сколько средств на любом адресе
  function getBalanceAnyAddress(address _addr) public view returns(uint accountBalance){
    return accountBalance = _addr.balance;
  }

} 
