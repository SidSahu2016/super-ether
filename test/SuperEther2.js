const { expect } = require("chai");
//const { ethers } = require("ethers");

describe ("Token Contract ", function (){

    let owner;
    let token;
    let hardhatToken;
    let addr1;
    let addr2;
   // let addrs;

    beforeEach( async function   (){
        token = await ethers.getContractFactory("SuperEther");
        [owner,addr1,addr2] = await ethers.getSigners();
        hardhatToken = await token.deploy();

    });

    describe("1- Deployment",function(){
        it("1.1- Should Set the right owner", async function(){

            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("1.2- Should assign all tokens to owner initially", async function(){
            //
            expect (await hardhatToken.totalSupply()).to.equal(await hardhatToken.getBalance(owner.address));
        })
    })

    describe("2-Transaction ",function(){

        it("2.1- Should transfer tokens between the accounts ",async function(){
            await hardhatToken.transfer(addr1.address, 10);

            expect (await hardhatToken.getBalance(addr1.address)).to.equal(10);

            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            const addr2_bal = await hardhatToken.getBalance(addr2.address);
            console.log("addr2 balance = ",addr2_bal);
            expect (await hardhatToken.getBalance(addr2.address)).to.equal(5);
        })
   

    it ("2.2- Should throw error if account balance is lower than amount top be sent",
    async function(){
        
        const initial_owner_balance = await hardhatToken.getBalance(owner.address);
        console.log("initial_owner_balance balance = ",initial_owner_balance);
        await expect ( hardhatToken.connect(addr1).transfer(owner.address,1))
        .to.be.revertedWith("***Not enough Tokens***");
        expect (await hardhatToken.getBalance(owner.address))
        .to.equal(initial_owner_balance);
    })

    it("2.3- should update balances of acounts after transfers", async function(){

        const initial_owner_balance = await hardhatToken.getBalance(owner.address);
        await hardhatToken.transfer(addr1.address,10);
        await hardhatToken.transfer(addr2.address,5);

        const final_owner_balance = await hardhatToken.getBalance(owner.address);

        expect(final_owner_balance).to.equal(initial_owner_balance -15);

        expect(await hardhatToken.getBalance(addr1.address)).to.equal(10);

        expect(await hardhatToken.getBalance(addr2.address)).to.equal(5);
    })

    
})

});
/*
describe ("1-Token Contract Deployment", function(){

    it("1.After Deployment Initial owner balance should be equal to total supply of the token.", async function(){

        const [owner] = await ethers.getSigners();

        //console.log("Signer's Object = " ,owner);
        const token = await ethers.getContractFactory('SuperEther');
       // console.log("Contract object = ", token);

        const hardhatToken = await token.deploy();

        //console.log("Deployed object = ", hardhatToken);

        const ownerAddress = await owner.address ;
        console.log("ownerAddress = = ", ownerAddress);

        const ownerBalance = await hardhatToken.getBalance(ownerAddress);
        console.log("ownerBalance = = ", ownerBalance);


        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("2.Should be able to transfer tokens withing the addresses.", async function(){

        const [owner,addr1,addr2] = await ethers.getSigners();

        //console.log("Signer's Object = " ,owner);
        const token = await ethers.getContractFactory('SuperEther');
       // console.log("Contract object = ", token);

        const hardhatToken = await token.deploy();

        //console.log("Deployed object = ", hardhatToken);

        const ownerAddress = await owner.address ;
        console.log("ownerAddress = = ", ownerAddress);

        const ownerBalance = await hardhatToken.getBalance(ownerAddress);
        console.log("ownerBalance = = ", ownerBalance);

        await hardhatToken.transfer(addr1.address,10);

        //const addr1Balance = await hardhatToken.getBalance(addr1.address);
        //console.log("ownerBalance = = ", addr1Balance);


        expect(await hardhatToken.getBalance(addr1.address)).to.equal(10);

        await hardhatToken.connect(addr1).transfer(addr2.address,5);
        expect(await hardhatToken.getBalance(addr2.address)).to.equal(5);

    });
});*/