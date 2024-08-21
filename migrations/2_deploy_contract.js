let Administrator = artifacts.require("./Administrator.sol");
let StudentFile = artifacts.require("./FileRecord.sol");
let StudentDetail = artifacts.require("./StudentRecord.sol");

// const fs = require('fs');

module.exports = async function (deployer) {
  deployer.deploy(Administrator);
  deployer.deploy(StudentFile);
  deployer.deploy(StudentDetail);


};