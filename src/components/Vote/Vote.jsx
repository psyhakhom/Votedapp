import React, { Component } from 'react';
import { Grid, Form, Button, Header, Image } from 'semantic-ui-react';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  changeHandler = evt => {
    this.setState({ selected: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.func(this.state.selected);
  };

  render() {
    return (
      <div>
        <Header textAlign="center" size="huge">
          Vote Dapp
        </Header>
        <Grid centered columns={2}>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <select
                  onChange={this.changeHandler}
                  style={{
                    marginRight: '10px'
                  }}
                >
                  <option placeholder="Select your candidate">
                    Select your candidate
                  </option>
                  {this.props.candidates.map(candidate => {
                    return (
                      <option key={candidate.name} value={candidate.name}>
                        {candidate.name}
                      </option>
                    );
                  })}
                </select>
                <Button
                  disabled={!this.state.selected ? true : false}
                  type="submit"
                  positive
                >
                  Vote
                </Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
        <Grid textAlign="center" centered columns={3}>
          <Grid.Column>
            {this.state.selected === 'Ian Wang' ? (
              <div className="img-container">
                <Image
                  src="https://media.licdn.com/dms/image/C4E03AQFYLnnLTZEkTw/profile-displayphoto-shrink_800_800/0?e=1534982400&amp;v=beta&amp;t=aYuwJC3BmTOQd24rS0Ftf-n6dIJjJzne-kDFTff4lfY"
                  circular
                />
              </div>
            ) : null}

            {this.state.selected === 'Michael Mcdevitt' ? (
              <div className="img-container">
                <Image
                  src="https://media.licdn.com/dms/image/C5603AQEXRikwj4Eslw/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=6iuQviE_fRejTkDzmhqkEM6KYNINuFjiKSikGmdZeCk"
                  circular
                />
              </div>
            ) : null}

            {this.state.selected === 'Kenneth Zhu' ? (
              <div className="img-container">
                <Image
                  src="https://media.licdn.com/dms/image/C5603AQG_AGHWKpWAZg/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=Kv2NETZLdRbvmhPpV-TeDaFSXLLAf_g9NVZEXevcA0A"
                  circular
                />
              </div>
            ) : null}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
