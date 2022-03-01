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
    const balance = await donations.getAmount()
    expect(balance).to.eq(0)
  })

  /*it("should be possible to send funds", async function() {
    const tx = await donations.makeDonation({value: 10})

    await expect (()=> tx)
      .to.changeEtherBalances([-10],[10])
    await tx.wait()
    
    //const balance = await donations.getAmount()
    //console.log(donations)
  })*/
});
