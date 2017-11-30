import React from 'react'
import Link from 'next/link'
import { Label, Table, Icon } from 'semantic-ui-react'

import StreamLabel from './StreamLabel'

const AlertRow = ({ alert }) => (
  <Table.Row>
    <Table.Cell>
      {!alert.end_date ? (
        <Icon name='warning circle' color='red' />
      ) : (
        <Icon name='check circle' color='green' />
      )}
      <small>{alert.id.substr(0, 9)}</small>
    </Table.Cell>
    <Table.Cell>
      <StreamLabel label={alert.stream_label} />
    </Table.Cell>
    <Table.Cell>
      <strong>{alert.path.join(' > ')}</strong>
    </Table.Cell>
    <Table.Cell>
      {new Date(alert.start_date) + ''}
    </Table.Cell>
    {!alert.end_date ? null : (
      <Table.Cell>
        {alert.end_date ? (new Date(alert.end_date) + '') : 'In progress'}
      </Table.Cell>
    )}
    {!alert.end_date ? null : (
      <Table.Cell>
        {Math.round((alert.end_date - alert.start_date) / 1000)} s
      </Table.Cell>
    )}
  </Table.Row>
);

export default class AlertList extends React.Component {

  fetchAlertsTimeoutHandle = null;

  state = {
    alertsLoading: true,
    streams: null,
  }

  componentDidMount() {
    this.fetchAlertsPeriodically();
  }

  componentWillUnmount() {
    if (this.fetchAlertsTimeoutHandle) {
      clearTimeout(this.fetchAlertsTimeoutHandle);
      this.fetchAlertsTimeoutHandle = null;
    }
  }

  fetchAlertsPeriodically = async () => {
    await this.fetchAlerts();
    this.fetchAlertsTimeoutHandle = setTimeout(this.fetchAlertsPeriodically, 3 * 1000);
  }

  async fetchAlerts() {
    this.setState({ alertsLoading: true });
    const r = await fetch(`/api/alerts/${this.props.which}`, { credentials: 'same-origin' });
    const { alerts } = await r.json();
    this.setState({ alertsLoading: false, alerts });
  }

  render() {
    return (
      <div className='AlertList'>
        {!this.state.alerts ? null : (
          <Table basic='very' compact='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Stream</Table.HeaderCell>
                <Table.HeaderCell>Path</Table.HeaderCell>
                <Table.HeaderCell>Start date</Table.HeaderCell>
                {this.props.which == 'current' ? null : (
                  <Table.HeaderCell>End date</Table.HeaderCell>
                )}
                {this.props.which == 'current' ? null : (
                  <Table.HeaderCell>Duration</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.alerts.map(alert => (
                <AlertRow key={alert.id} alert={alert} />
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }

}
