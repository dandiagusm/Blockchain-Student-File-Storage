let Administrator = artifacts.require("./Administrator.sol");
let Counter = artifacts.require("./Counter.sol");
let StudentFile = artifacts.require("./StudentFile.sol");
let Tickets = artifacts.require("./Tickets.sol");
let StudentDetail = artifacts.require("./StudentDetail.sol");

// const fs = require('fs');

module.exports = async function (deployer) {
  // await deployer.deploy(Certification);
  deployer.deploy(Administrator);
  deployer.deploy(Counter);
  deployer.deploy(StudentFile);
  deployer.deploy(Tickets);
  deployer.deploy(StudentDetail);


  // const deployedCertification = await Certification.deployed();

  // Always start with an empty object for configData
  // let configData = {};

  // Update or add the contract address
  // configData.Certification = deployedCertification.address;

  // Save the updated configuration back to the file
  // fs.writeFileSync('./deployment_config.json', JSON.stringify(configData, null, 2));

  // console.log(`Certification contract deployed at address: ${deployedCertification.address}`);
};