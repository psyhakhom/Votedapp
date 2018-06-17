import React, {Component} from 'react'

export default class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  changeHandler = (evt) => {
    this.setState({selected: evt.target.value})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this
      .props
      .func(this.state.selected)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.changeHandler}>
            <option value="default-value"/> {this
              .props
              .candidates
              .map(candidate => {
                return (
                  <option key={candidate.name} value={candidate.name}>{candidate.name}</option>
                )
              })}
          </select>

          <button>Vote</button>
        </form>
      </div>
    )
  }
}
