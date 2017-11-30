import Link from 'next/link'
import { Button, Icon, Menu } from 'semantic-ui-react'

const titleCase = s => s[0].toUpperCase() + s.substr(1);

const menuItems = [
  {
    name: 'overview',
    href: '/overview',
  }, /* {
    name: 'dashboards',
    href: '/dashboards',
  }, */ {
    name: 'streams',
    href: '/streams',
  }, {
    name: 'alerts',
    href: '/alerts',
  },
];

export default (props) => {
  const { activeItem, user } = props;
  return (
    <Menu
      inverted
      borderless
      color='blue'
      attached='bottom'
    >
      <Menu.Item header>Overwatch</Menu.Item>
      {!user ? null : menuItems.map((item, n) => (
        <Menu.Item key={n} active={activeItem === item.name}>
          <Link href={item.href}><a>{item.title || titleCase(item.name)}</a></Link>
        </Menu.Item>
      ))}
      <Menu.Menu position='right'>
        {!user ? null : (
          <Menu.Item>
            <Icon name='user' /> {user.email}
          </Menu.Item>
        )}
        {!user ? null : (
          <Menu.Item>
            <Button
              color='blue'
              size='tiny'
              icon='sign out'
              as='a'
              href='/auth/logout'
              labelPosition='left'
              content='Sign out'
              compact
            />
          </Menu.Item>
        )}
      </Menu.Menu>
     </Menu>
  );
};
