import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'

class IndexPage extends Component {

  render() {
    return (
      <div>
        <CustomHead />
        <TopMenu activeItem="dashboard" />

        <Container>
          <h1 className="pageTitle">Dashboard</h1>

          <p>Lorem ipsum</p>
        </Container>

      </div>
    )
  }

}

export default IndexPage;
