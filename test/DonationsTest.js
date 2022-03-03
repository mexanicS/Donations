const { expect, should } = require("chai");
const { ethers } = require("hardhat");

describe("Donations", function () {
  let donations
  let acc1
  let acc2
  let owner
  let Donations
  
  //Разворачиваем контракт
  beforeEach(async function() {
    [owner, acc1, acc2] = await ethers.getSigners() //от какого имени 
    Donations  = await ethers.getContractFactory("Donations")
    donations = await  Donations.deploy()
  })

  //Owner равна адресу подписавшего контракт
  it("Should set the right owner", async function () {
    expect(await donations.owner()).to.equal(owner.address);
  });

  //Является ли адрес корректным
  it("Should be deployed", async function () {
    expect(donations.address).to.be.properAddress
  });

  // Количество средст на фонде изначально равно 0
  it("Should have 0 ether by default", async function(){
    const balance =  await donations.getBalanceFund()
    expect(balance).to.eq(0)
  })
  
  //Можно ли получать пожертвования 
  it("Should be possible to receive funds", async function() {
    const sum = 10;
    const tx = await donations.connect(acc2).makeDonation({value: sum})

    await expect (()=> tx)
      .to.changeEtherBalances([acc2,donations],[-sum , sum])
    await tx.wait()
  })

  it("Should transfer tokens from the fund to accounts", async function () {
    // Перевести с фонда на любой адресс
    await donations.transferToOwner(acc1.address, 10);

    const acc1Balance = await donations.getBalance(acc1.address);
    expect(acc1Balance).to.equal(10);
  });
});
