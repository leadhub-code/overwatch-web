import React from 'react'
import Link from 'next/link'
import { Label, Table } from 'semantic-ui-react'

import StreamLabel from './StreamLabel'

const ago = (timestamp) => (Math.round((new Date() * 1 - timestamp) / 1000) + ' s ago');

const StreamRow = ({ stream }) => {
  const totalCount = stream.check_count + stream.watchdog_count;
  const alertCount = stream.check_alert_count + stream.watchdog_alert_count;
  const okCount = totalCount - alertCount;
  return (
    <Table.Row>
      <Table.Cell>
        <Link href={{ pathname: '/stream', query: { id: stream.id } }}><a>
          {stream.id.substr(0, 9)}
        </a></Link>
      </Table.Cell>
      <Table.Cell>
        <StreamLabel label={stream.label} />
        {!alertCount ? null : (
          <Label size='tiny' circular color='red'>{alertCount}</Label>
        )}
        {!okCount ? null : (
          <Label size='tiny' circular color='green'>{okCount}</Label>
        )}
      </Table.Cell>
      <Table.Cell>
        {ago(stream.last_date)}
      </Table.Cell>
    </Table.Row>
  );
};

export default class StreamList extends React.Component {

  fetchStreamsTimeoutHandle = null;

  state = {
    streamsLoading: true,
    streams: null,
  }

  componentDidMount() {
    this.fetchStreamsPeriodically();
  }

  componentWillUnmount() {
    if (this.fetchStreamsTimeoutHandle) {
      clearTimeout(this.fetchStreamsTimeoutHandle);
      this.fetchStreamsTimeoutHandle = null;
    }
  }

  fetchStreamsPeriodically = async () => {
    await this.fetchStreams();
    this.fetchStreamsTimeoutHandle = setTimeout(this.fetchStreamsPeriodically, 3 * 1000);
  }

  async fetchStreams() {
    this.setState({ streamsLoading: true });
    const r = await fetch('/api/streams', { credentials: 'same-origin' });
    const { streams } = await r.json();
    this.setState({ streamsLoading: false, streams });
  }

  render() {
    return (
      <div className='StreamList'>
        {!this.state.streams ? null : (
          <Table basic='very' compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Label</Table.HeaderCell>
                <Table.HeaderCell>Last report</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.streams.map(stream => (
                <StreamRow key={stream.id} stream={stream} />
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }

}
