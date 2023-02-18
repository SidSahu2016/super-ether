require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY; //getting account details 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/SmartDoge.sol/SmartDoge.json"); //geting json of the smart contract 

//console.log(JSON.stringify(contract));

const contractAddress = "0x22906872f9477DCc05Adb7A1d70E9E17e12D36A6"; 

const nftContract = new web3.eth.Contract(contract.abi, contractAddress); // creating contract for nft by passing smart contract abi and contract address into it 

//process below is to create Tx - we will need Nonce and tx details 

async function  safeMint(tokenURI) {
    const nonce = new web3.eth.getTransactionCount(PUBLIC_KEY , "latest") ; //getting latest nonce 

    const tx = {
        from : PUBLIC_KEY,
        to : contractAddress,
        nonce : nonce,
        gas : 5000000,
        data: nftContract.methods.safeMint(PUBLIC_KEY , tokenURI).encodeABI(),
    }


const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
signPromise
  .then((signedTx) => {
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      }
    );
  })
  .catch((err) => {
    console.log(" Promise failed:", err);
  });
}
safeMint(
"https://gateway.pinata.cloud/ipfs/QmYcXnJTaLGcrqUiBaRRPwrkyKhRZV8FU2GvCeCyuNYkqi"
);
