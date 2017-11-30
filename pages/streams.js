import React from 'react'
import Link from 'next/link'
import { Container, Menu, List } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'
import StreamList from '../components/StreamList'

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
        <TopMenu activeItem='streams' user={user} />

        <Container>
          <h1>Streams</h1>

          <StreamList />

        </Container>

        <br />
        <br />
      </div>
    );
  }

}
