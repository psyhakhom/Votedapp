pragma solidity ^0.4.20;

contract Vote {
    address public owner;
    
    enum Party { Democrat, Republican, Green, Libertarian, Independant }
    
    struct Candidate {
        string name;
        Party party;
        uint votes;
    }
    
    // candidates stuff
    Candidate[] public Candidates;
    
    constructor () public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(
                owner == msg.sender,
                "Only owner is allowed."
            );
        _;
    }
    
    struct Voter {
        address id;
        bool hasVoted;
    }
    
    // voters stuff
    //address where every address is id and value is bool
    mapping(address => Voter) internal voters;
    
    mapping(string => uint) internal candidateIndex;
        
    modifier isUnregistered(address account) {
        require(
                voters[account].id == 0,
                "This voter exists already."
            );
         _;   
    }
    
    modifier isVoter() {
        require(
            voters[msg.sender].id == msg.sender,
            "You are not a registered voter"
        );
        require(
            voters[msg.sender].hasVoted != true,
            "You have already voted."
        );
        _;   
    }
    
    event newCandidate(string name, Party party);
    
    event newVote(string name, uint voteCount);
    
    function addCandidate (string name, Party party) onlyOwner public returns (uint candidateCount) {
        Candidate memory candidate;
        // bytes32
        candidate.name = name;
        // enum
        candidate.party = party;
        candidate.votes = 0; 
        
        Candidates.push(candidate);
        candidateIndex[name] == Candidates.length - 1;
        emit newCandidate(name, party);
         
        return Candidates.length;
    }
    
     function registerVoter (address accountId) onlyOwner isUnregistered(accountId) public returns (bool) {
        Voter memory voter;
        voter.id = accountId;
        voter.hasVoted = false;
        voters[accountId] = voter;
        return true;
    }
    
    function castVote (uint index) public isVoter returns (bool) {
       Candidates[index].votes++;
        voters[msg.sender].hasVoted = true;
        emit newVote(Candidates[index].name, Candidates[index].votes);
        
        return true;
    }
    
    function getVotes(uint index) public view returns (uint) {
        return Candidates[index].votes;
    }
    
}