var Voting = artifacts.require('./Vote.sol');

let candidates = [
  {
    name: 'Ian Wang',
    party: 0
  },
  {
    name: 'Michael Mcdevitt',
    party: 1
  },
  {
    name: 'Kenneth Zhu',
    party: 2
  }
];

let voters = [
  '0x33f1861d475fF7CB06C533566938Af17885E1C12',
  '0x9acd9fC80a68Bf20f2CaFa7999D19cbD5ff55673',
  '0x782cFCC012D332b2603989a68Db2eBaea1BFaDC0',
  '0xDf2EfFF7DAB58bc06622A5fDcAed34A7BB9557b9',
  '0x3E33Ffac7e0Be45058591b7180DD03429F53e0fd',
  '0xD820b89B3914B7102Dd6979632E21263d0F8872A',
  '0xAAaDB1c01f22832fEb479e25CD876F07C636DB72',
  '0x8719CeEFfb4ADBC29Ea8BA61c060915b306F4e4b',
  '0x955Aa476BCc43effD951Ffd5116FECd718E7FeD1',
  '0x2Bf59793D08f61A65D42dbCAF14D355E889aface'
];

module.exports = function(deployer) {
  deployer.deploy(Voting).then(contract => {
    candidates.map(candidate => {
      contract.addCandidate(candidate.name, candidate.party);
    });
    voters.map(voter => {
      contract.registerVoter(voter);
    });
  });
};
