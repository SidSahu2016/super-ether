const hre = require("hardhat");

async function main() {
  const SETH_Contract = await hre.ethers.getContractFactory("SuperEther");
  const SETH_TOKEN = await SETH_Contract.deploy(1000,700, 50);

  await SETH_TOKEN.deployed();

  console.log("SuperEther deployed: ", SETH_TOKEN.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});