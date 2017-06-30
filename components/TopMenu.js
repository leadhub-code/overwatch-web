import Router from 'next/router'
import { Menu, Input } from 'semantic-ui-react'

export default (props) => {
  const { activeItem } = props;
  const go = (dst) => (event) => { Router.push(dst); };
  return (
    <Menu inverted stackable size="small">
      <Menu.Item header>
        <span className="siteTitle">Overwatch</span>
      </Menu.Item>
      <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={go('/dashboard')} />
      <Menu.Item name='states' active={activeItem === 'states'} onClick={go('/states')} />
      <Menu.Item name='alerts' active={activeItem === 'alerts'} onClick={go('/alerts')} />
      <Menu.Item name='configuration' active={activeItem === 'configuration'} onClick={go('/configuration')} />
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input className='icon' icon='search' placeholder='Search...' />
        </Menu.Item>
        <Menu.Item name='logout' href='/logout' />
      </Menu.Menu>
    </Menu>
  );
}
