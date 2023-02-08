async function main() {
    const [deployer] = await ethers.getSigners(); //destructuring is needed
    const Token = await ethers.getContractFactory("SuperEther");
    const hardhatToken = await  Token.deploy();
    console.log("Token Address = ", hardhatToken.address );
}
main()
.then(()=>process.exit(0))
.catch((error)=>{ //try and catching error
    console.error(error)
    process.exit(1)
});
