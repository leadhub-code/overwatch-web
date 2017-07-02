import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import CustomHead from '../../components/CustomHead'
import TopMenu from '../../components/TopMenu'
import ConfigurationMenu from '../../components/ConfigurationMenu'

class IndexPage extends Component {

  render() {
    return (
      <div>
        <CustomHead />
        <TopMenu activeItem="configuration" />
        <Container>
          <Grid>
            <Grid.Column width={3}>
              <ConfigurationMenu activeItem="integrations" />
            </Grid.Column>
            <Grid.Column width={12}>

              <h1>Integrations</h1>

              <p>Lorem ipsum xa</p>
              <p>Lorem ipsum xa</p>
              <p>Lorem ipsum xa</p>
              <p>Lorem ipsum xa</p>

            </Grid.Column>
          </Grid>

        </Container>

      </div>
    )
  }

}

export default IndexPage;
