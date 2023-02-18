async function main() {
  const SmartDoge_NFT = await ethers.getContractFactory("SmartDoge");

  // Start deployment, returning a promise that resolves to a contract object
  const TRUF = await SmartDoge_NFT.deploy();
  console.log("Contract deployed to address:", TRUF.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//0x22906872f9477DCc05Adb7A1d70E9E17e12D36A6