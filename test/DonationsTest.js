const { expect, should } = require("chai");
const { ethers } = require("hardhat");
//const {isCallTrace} = require("hardhat/internal/hardhat-network/stack/traces/message")

describe("Donations", function () {
  let donations
  let acc1
  let acc2
  //Разворачиваем контракт
  beforeEach(async function() {
    [acc1, acc2] = await ethers.getSigners() //от какого имени 
    const Donations  = await ethers.getContractFactory("Donations", acc1)
    donations = await  Donations.deploy()
    await donations.deployed()
    console.log(donations.address)
  })

  //Является ли адрес корректным
  it("Should be deployed", async function () {
    expect(donations.address).to.be.properAddress
  });

  it("should have 0 ether by default", async function(){
    const balance =  await donations.getBalanceFund()
    expect(balance).to.eq(0)
  })
  
  // можно ли получать пожертвования 
  it("should be possible to receive funds", async function() {
    const sum = 10;
    const tx = await donations.connect(acc2).makeDonation({value: sum})

    await expect (()=> tx)
      .to.changeEtherBalances([acc2,donations],[-sum , sum])
    await tx.wait()
  })
  
  //можно ли выводить средства с фонда
  it("should be possible to withdraw funds from the fund to the creator", async function() {
    
  })
});
