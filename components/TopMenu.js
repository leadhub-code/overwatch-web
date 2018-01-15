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
        <Link key={n} href={item.href}>
          <a className={`item ${activeItem === item.name ? 'active' : ''}`}>
            {item.title || titleCase(item.name)}
          </a>
        </Link>
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
