import React from 'react'
import Link from 'next/link'
import { Icon, Label, Table } from 'semantic-ui-react'

import StreamLabel from './StreamLabel'

const cachedStreams = {};

const formatValue = (v) => {
  if (typeof v === 'number') {
    if (v > 1073741824) return `${Math.round(100 * v / 1073741824) / 100} G`;
    if (v > 1048576) return `${Math.round(100 * v / 1048576) / 100} M`;
    if (v > 1024) return `${Math.round(100 * v / 1024) / 100} k`;
  }
  return v;
};

const StreamDetailContent = ({ stream }) => (
  <div className='StreamDetailContent'>
    <p>Label: <StreamLabel label={stream.label} /></p>
    {!stream.currentDatapoint ? null : (
      <div>
        <h2>Current data</h2>
        <p>Current datapoint: {new Date(stream.currentDatapoint.date) + ''}</p>
        {stream.currentDatapoint.items.map(item => (
          <DatapointItem key={item.path} item={item} />
        ))}
        <h2>Current alerts</h2>
        {stream.currentAlerts.length === 0
          ? (<p><Icon name='check' color='green' />No alerts</p>)
          : stream.currentAlerts.map(alert => (
            <StreamAlert key={alert.id} alert={alert} />
          ))}
      </div>
    )}
  </div>
);

const DatapointItem = ({ item }) => (
  <div>
    <p>
      <strong>{item.path.join(' > ')}:</strong>{' '}
      <code>{(typeof item.value === 'undefined' || item.value === null) ? null : JSON.stringify(item.value)}</code>
      {(!item.check || !item.check.state) ? null : (
        <DatapointItemCheck state={item.check.state} />
      )}
      {(!item.watchdog || !item.watchdog.deadline) ? null : (
        <DatapointItemWatchdog deadline={item.watchdog.deadline} />
      )}
    </p>
  </div>
);

const DatapointItemCheck = ({ state }) => {
  if (state == 'green' || state == 'red') {
    return (
      <span style={{ marginLeft: 7, marginRight: 7 }}>
        <Label tag size='tiny' color={state}>
          CHECK: {state.toUpperCase()}
        </Label>
      </span>
    );
  }
  return JSON.stringify({ state });
};

const DatapointItemWatchdog = ({ deadline }) => {
  const now = new Date() * 1;
  const remaining = deadline - now;
  const state = remaining > 0 ? 'green' : 'red';
  return (
    <span style={{ marginLeft: 7, marginRight: 7 }}>
      <Label tag size='tiny' color={state}>
        WATCHDOG: {state.toUpperCase()} &nbsp;
        {remaining > 0 ? (
          <span>in {Math.round(remaining/1000)} s</span>
        ) : (
          <span>for {Math.round(-remaining/1000)} s</span>
        )}
      </Label>
    </span>
  );
};


const StreamAlert = ({ alert }) => {
  if (alert.type == 'check_alert') {
    return (
      <p>
        {alert.id.substr(0, 9)}:{' '}
        <strong>{alert.path.join(' > ')}</strong>{' '}
        <DatapointItemCheck state={alert.current_state} />
        since {new Date(alert.start_date)+''}
      </p>
    );
  }
  if (alert.type == 'watchdog_alert') {
    return (
      <p>
        {alert.id.substr(0, 9)}:{' '}
        <strong>{alert.path.join(' > ')}</strong>{' '}
        <DatapointItemWatchdog deadline={alert.deadline} />
        since {new Date(alert.start_date)+''}
      </p>
    );
  }
  return (<p>{JSON.stringify(alert)}</p>);
};


export default class StreamDetail extends React.Component {

    fetchStreamTimeoutHandle = null;

    state = {
      mounted: false
    }

    componentDidMount() {
      this.setState({ mounted: true });
      this.fetchStreamPeriodically();
    }

    componentWillUnmount() {
      if (this.fetchStreamTimeoutHandle) {
        clearTimeout(this.fetchStreamTimeoutHandle);
        this.fetchStreamTimeoutHandle = null;
      }
    }

    fetchStreamPeriodically = async () => {
      await this.fetchStream();
      this.fetchStreamTimeoutHandle = setTimeout(this.fetchStreamPeriodically, 3 * 1000);
    }

    async fetchStream() {
      const { streamId } = this.props;
      this.setState({ [`streamLoading${streamId}`]: true });
      const r = await fetch(`/api/streams/${streamId}`, { credentials: 'same-origin' });
      const { stream } = await r.json();
      cachedStreams[streamId] = stream;
      this.setState({
        [`streamLoading${streamId}`]: false,
        [`stream${streamId}`]: stream,
      });
    }


  render() {
    const { streamId } = this.props;
    const stream = this.state[`stream${streamId}`] || cachedStreams[streamId] || {};
    return (
      <div className='StreamDetail'>
        {(!stream || !stream.label) ? null : (
          <StreamDetailContent stream={stream} />
        )}
      </div>
    );
  }

}
