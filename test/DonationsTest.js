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
    Donations  = await ethers.getContractFactory('Donations')
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

  // Количество средств на фонде изначально равно 0
  it("Should have 0 ether by default", async function(){
    const balance =  await donations.getBalanceFund()
    expect(balance).to.eq(0)
  })
  
  //Можно ли получать пожертвования и зачисляются ли они в фонд
  it("Should be possible to receive funds", async function() {
    const sum = 10;
    const tx = await donations.connect(acc2).makeDonation({value: sum})

    await expect (()=> tx)
      .to.changeEtherBalances([acc2,donations],[-sum , sum])
    await tx.wait()

    const fundBalance = await donations.getBalanceFund()
    expect(fundBalance).to.equal(sum)
  })

  // Перевести с фонда на любой адресс
  it("Should transfer tokens from the fund to accounts", async function () {
    const sum = 10;
    
    
    await donations.connect(acc2).makeDonation({value: sum})

    const tx = await donations.connect(donations).transferToOwner(acc1.address)

    await expect (()=> tx)
      .to.changeEtherBalances([donations,acc1],[-sum , sum])
    await tx.wait()
    
  });
});
