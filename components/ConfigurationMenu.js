import Router from 'next/router'
import { Menu } from 'semantic-ui-react'

export default (props) => {
  const { activeItem } = props;
  const go = (dst) => (event) => { Router.push(dst); };
  return (
    <Menu fluid pointing secondary vertical color="red">
      <Menu.Item name='about' active={activeItem === 'about'} onClick={go('/configuration/')} />
      <Menu.Item name='users' active={activeItem === 'users'} onClick={go('/configuration/users')} />
      <Menu.Item name='integrations' active={activeItem === 'integrations'} onClick={go('/configuration/integrations')} />
    </Menu>
  );
}
