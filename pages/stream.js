import React from 'react'
import Link from 'next/link'
import { Container, Menu, List } from 'semantic-ui-react'
import { Breadcrumb } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'
import StreamDetail from '../components/StreamDetail'

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
    const streamId = this.props.url.query.id;
    return (
      <div className='OverviewPage'>
        <CustomHead />
        <TopMenu activeItem='streams' user={user} />

        <Container>

          <Breadcrumb size='huge'>
            <Breadcrumb.Section><Link href='/streams'><a>Streams</a></Link></Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>{streamId.substr(0, 9)}</Breadcrumb.Section>
          </Breadcrumb>

          <br />
          <br />

          <StreamDetail streamId={streamId} />

        </Container>

        <br />
        <br />
      </div>
    );
  }

}
