const { expect } = require("chai");
//const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");


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
});