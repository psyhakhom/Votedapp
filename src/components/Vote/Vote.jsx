import React, {Component} from 'react'
import {Grid, Form, Button} from 'semantic-ui-react'

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
        <Grid centered columns={2}>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <select
                  onChange={this.changeHandler}
                  style={{
                  'marginRight': '10px'
                }}>
                  <option placeholder="Select your candidate">Select your candidate</option>
                  {this
                    .props
                    .candidates
                    .map(candidate => {
                      return (
                        <option key={candidate.name} value={candidate.name}>{candidate.name}</option>
                      )
                    })}
                </select>
                <Button
                  disabled={!this.state.selected
                  ? true
                  : false}
                  type='submit'
                  positive>Vote</Button>
              </Form.Group>
            </Form>

          </Grid.Column>
        </Grid>

      </div>
    )
  }
}
