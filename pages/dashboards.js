import React from 'react'
import Link from 'next/link'
import { Container, Menu, List } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'

export default class OverviewPage extends React.Component {

  static async getInitialProps({ req }) {
    if (req) {
      return await req.getPageInfo();
    } else {
      const res = await fetch('/api/page-info', { credentials: 'same-origin' })
      return await res.json();
    }
  }

  componentDidMount() {
    if (!this.props.user) {
      window.location = '/login';
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className='OverviewPage'>
        <CustomHead />
        <TopMenu activeItem='dashboards' user={user} />

        <Container>
          <h1>Dashboards</h1>

        </Container>

        <br />
        <br />
      </div>
    );
  }

}
