/** @type import('hardhat/config').HardhatUserConfig */
require ("@nomiclabs/hardhat-waffle"); 
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks :{
    goerli :{
    url :   process.env.ALCHEMY_ENDPOINT_API_KEY ,
    accounts : [process.env.PRIVATE_KEY] 
    }

  }
};
 