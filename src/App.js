import React, {Component} from 'react'
import VoteContract from '../build/contracts/Vote.json'
import getWeb3 from './utils/getWeb3'
import Navbar from './components/Navbar/Navbar'
import Vote from './components/Vote/Vote'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      voteContract: null,
      candidates: [],
      web3: null
    }
  }

  componentDidMount() {
    setInterval(() => {
      let tally = this
        .state
        .candidates
        .map((candidate, index) => {
          return this
            .state
            .voteContract
            .getVotes(index)
        })
      Promise
        .all(tally)
        .then(res => res.map((number, index) => {
          let candidates = this.state.candidates;
          candidates[index].total = number.toNumber();
          this.setState(candidates);
        }))
    }, 5000)
  }

  componentWillMount() {
    // Get network provider and web3 instance. See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const vote = contract(VoteContract)
    vote.setProvider(this.state.web3.currentProvider)

    vote
      .deployed()
      .then(contract => {
        contract.newCandidate({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).get((err, logs) => {
          let candidates = logs.map(candidate => {
            return {
              name: candidate.args.name,
              party: candidate
                .args
                .party
                .toNumber()
            }
          });
          console.log('Updated contract in state');

          this.setState({voteContract: contract, candidates})
        });
      })
  }

  getVote = (name) => {
    const address = this.state.web3.eth.accounts[0]
    this
      .state
      .voteContract
      .castVote(name, {
        from: address,
        gas: 100000
      })
      .then(result => console.log(result))
  }

  render() {
    console.log(this.state.candidates)
    return (
      <div className="App">
        <Navbar/>

        <main className="container">
          <Vote candidates={this.state.candidates} func={this.getVote}/>
        </main>
      </div>
    );
  }
}

export default App
