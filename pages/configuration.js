import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'

class IndexPage extends Component {

  render() {
    const { siteTitle } = this.props;
    const activeItem = 'messages';
    return (
      <div>
        <CustomHead />
        <TopMenu activeItem="configuration" />

        <Container>

          <h1 className="pageTitle">Configuration</h1>

          <p>Lorem ipsum</p>

        </Container>

      </div>
    )
  }

}

export default IndexPage;
