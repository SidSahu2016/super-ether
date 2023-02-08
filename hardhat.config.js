/** @type import('hardhat/config').HardhatUserConfig */
require ("@nomiclabs/hardhat-waffle"); 

const ALCHEMY_API_KEY = "wzFS1tDieouVyr0p8Lk2lkN4NEyLx1Qw";
const GOERLI_PRIVATE_KEY = "f0feae30c6e3ccdc5faa0c80dc97ea4e39deb026ffb257cbe781eb7670a6c9af";
module.exports = {
  solidity: "0.8.17",
  networks :{
    goerli :{
    url : `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    accounts : [`${GOERLI_PRIVATE_KEY}`]
    }

  }
};
 