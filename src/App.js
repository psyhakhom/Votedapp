import React, {Component} from 'react'
import VoteContract from '../build/contracts/Vote.json'
import getWeb3 from './utils/getWeb3'
import Vote from './components/Vote/Vote'
import {Grid, Header} from 'semantic-ui-react'

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
      tx: null,
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
    }, 1000)
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
      .then(result => {
        this.setState({tx: result.tx})
        console.log(result)
      })
  }

  render() {
    console.log(this.state.candidates)
    console.log('tx', this.state.tx)
    return (
      <div className="App">
        <main className="container">
          <Vote candidates={this.state.candidates} func={this.getVote}/>

          <Grid container divided='vertically' textAlign='center'>
            <Grid.Row columns={3}>
              {this
                .state
                .candidates
                .map(candidate => {
                  return (
                    <Grid.Column>{candidate.name}
                      <div>Votes: {candidate.total}</div>
                    </Grid.Column>
                  )
                })}
            </Grid.Row>

          </Grid>
          <Grid centered textAlign='center' columns={2}>
            <Grid.Column>
              {this.state.tx
                ? <div>
                    <Header size='large'>Transaction Id: {this.state.tx}</Header>
                  </div>
                : null
}
            </Grid.Column>
          </Grid>
        </main>
      </div>
    )
  }
}

export default App
