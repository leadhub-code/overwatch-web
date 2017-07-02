import React, { Component } from 'react'
import { Container, Grid, Icon } from 'semantic-ui-react'

import CustomHead from '../../components/CustomHead'
import TopMenu from '../../components/TopMenu'
import ConfigurationMenu from '../../components/ConfigurationMenu'

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      configurationLoading: true,
      configurationError: null,
      configurationData: null,
    };
  }

  componentDidMount() {
    this.fetchConfiguration();
  }

  fetchConfiguration() {
    fetch('/api/configuration').then((res) => res.json()).then((data) => {
      this.setState({
        configurationLoading: false,
        configurationError: null,
        configurationData: data,
      });
    }).catch((err) => {
      this.setState({
        configurationLoading: false,
        configurationError: err.toString(),
      });
    });
  }

  render() {
    const { configurationLoading, configurationError, configurationData } = this.state;

    var configurationInfo = null;
    if (configurationLoading) {
      configurationInfo = (
        <p><em>Loading...</em></p>
      );
    } else if (configurationError) {
      configurationInfo = (
        <p style={{ color: 'red' }}>
          Failed loading configuration: {configurationError}
        </p>
      );
    } else if (configurationData) {
      configurationInfo = (
        <div>
          <p>
            Configured hub URL: &nbsp;
            <code>{configurationData['hubUrl']}</code>
          </p>
        </div>
      );
    }

    return (
      <div>
        <CustomHead />
        <TopMenu activeItem="configuration" />
        <Container>
          <Grid>
            <Grid.Column width={3}>
              <ConfigurationMenu activeItem="about" />
            </Grid.Column>
            <Grid.Column width={12}>

              <h1>About</h1>

              {configurationInfo}

              <br />

              <p>
                <Icon name='github' size="large" />
                <a href="https://github.com/messa/overwatch-web">github.com/messa/overwatch-web</a>
              </p>

            </Grid.Column>
          </Grid>

        </Container>

      </div>
    )
  }

}

export default IndexPage;
