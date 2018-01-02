import React from 'react'
import Link from 'next/link'
import { Icon, Label, Table } from 'semantic-ui-react'

import StreamLabel from './StreamLabel'

const cachedStreamData = {};

const formatValue = (v) => {
  if (typeof v === 'number') {
    if (v > 1073741824) return `${Math.round(100 * v / 1073741824) / 100} G`;
    if (v > 1048576) return `${Math.round(100 * v / 1048576) / 100} M`;
    if (v > 1024) return `${Math.round(100 * v / 1024) / 100} k`;
  }
  return v;
};

const StreamDetailContent = ({ stream, itemTree }) => (
  <div className='StreamDetailContent'>
    <p>Label: <StreamLabel label={stream.label} /></p>
    {!stream.currentDatapoint ? null : (
      <div>
        <h2>Current data</h2>
        <p>Current datapoint: {new Date(stream.currentDatapoint.date) + ''}</p>
        <DatapointTree node={itemTree} />
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

// const getLastItem = arr => arr[arr.length - 1];

const DatapointTree = ({ node }) => {
  const { name, childNodes, item } = node;
  return (
    <div className='DatapointTree'>
      {!name ? null : (<strong>{name}</strong>)}
      {!item ? null : ': '}
      {!item ? null : (<DatapointItemValue name={name} value={item.value} />)}
      {(!item || !item.check || !item.check.state) ? null : (
        <DatapointItemCheck state={item.check.state} />
      )}
      {(!item || !item.watchdog || !item.watchdog.deadline) ? null : (
        <DatapointItemWatchdog deadline={item.watchdog.deadline} />
      )}
      {!childNodes.length ? null : (
        <ul>
          {childNodes.map((childNode, n) => (
            <li key={n}>
              <DatapointTree node={childNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DatapointItemValue = ({ name, value }) => {
  if (name.endsWith('_bytes') && Number.isInteger(value)) {
    return (
      <span>
        {formatBytesValue(value)}{' '}
        <small style={{ color: '#999' }}>(<code>{JSON.stringify(value)}</code>)</small>
      </span>
    );
  }
  return (
    <code>{JSON.stringify(value)}</code>
  );
};

const formatBytesValue = n => {
  if (n >= 1073741824) return `${(n / 1073741824).toFixed(2)} GB`;
  if (n >= 1048576) return `${(n / 1048576).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(2)} kB`;
  return `${n} bytes`;
};

const DatapointItem = ({ item }) => (
  <div>
    <strong>{item.path.join(' > ')}:</strong>{' '}
    <code>{(typeof item.value === 'undefined' || item.value === null) ? null : JSON.stringify(item.value)}</code>
    {(!item.check || !item.check.state) ? null : (
      <DatapointItemCheck state={item.check.state} />
    )}
    {(!item.watchdog || !item.watchdog.deadline) ? null : (
      <DatapointItemWatchdog deadline={item.watchdog.deadline} />
    )}
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

const compare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const itemsToTree = (items) => {
  //const itemsByPath = new Map(items.map(item => [item['path'], item]));
  const nodesByPath = new Map();
  const serializePath = path => JSON.stringify(path);
  const rootNode = { name: null, childNodes: [] };
  nodesByPath.set(serializePath([]), rootNode);
  const getNode = (path) => {
    if (!Array.isArray(path)) {
      throw new Error('path must be Array');
    }
    const serializedPath = serializePath(path);
    if (nodesByPath.has(serializedPath)) {
      return nodesByPath.get(serializedPath);
    }
    if (!path) {
      throw new Error('xxx');
    }
    const parentPath = path.slice(0, -1);
    const parent = getNode(parentPath);
    const node = { name: path[path.length-1], childNodes: [] };
    nodesByPath.set(serializedPath, node);
    parent.childNodes.push(node);
    return node;
  };
  for (const item of items) {
    getNode(item['path']).item = item;
  }
  for (const node of nodesByPath.values()) {
    node.childNodes.sort((n1, n2) => compare(n1.name || '', n2.name || ''));
  }
  return rootNode;
};

export default class StreamDetail extends React.Component {

    fetchStreamTimeoutHandle = null;

    state = {
      mounted: false,
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
      const itemTree = itemsToTree(stream['currentDatapoint']['items']);
      const streamData = { stream, itemTree };
      cachedStreamData[streamId] = streamData;
      this.setState({
        [`streamLoading${streamId}`]: false,
        [`streamData${streamId}`]: streamData,
      });
    }

  render() {
    const { streamId } = this.props;
    const { stream, itemTree } = this.state[`streamData${streamId}`] || cachedStreamData[streamId] || {};
    return (
      <div className='StreamDetail'>
        {(!stream || !stream.label) ? null : (
          <StreamDetailContent stream={stream} itemTree={itemTree} />
        )}
      </div>
    );
  }

}
