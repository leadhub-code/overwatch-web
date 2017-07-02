import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'

class IndexPage extends Component {

  render() {
    return (
      <div>
        <CustomHead />
        <TopMenu activeItem="alerts" />

        <Container>

          <h1>Active alerts</h1>

          <p>Lorem ipsum</p>

          <h1>Recent alerts</h1>

          <p>Lorem ipsum</p>

        </Container>

      </div>
    )
  }

}

export default IndexPage;
