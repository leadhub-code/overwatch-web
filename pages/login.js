import CustomHead from '../components/CustomHead'
import { Menu, Container, Button, Icon } from 'semantic-ui-react'

class IndexPage extends React.Component {

  render() {
    return (
      <div className="loginPage">
        <CustomHead />

        <Menu inverted stackable size="small">
          <Menu.Item header>
            <span className="siteTitle">Overwatch</span>
          </Menu.Item>
        </Menu>

        <Container text>

          <h1>Hello!</h1>

          <Button primary icon="sign in" content="Sign in with Google" labelPosition='left'
            onClick={(event, data) => { window.location = '/auth/google'; } }/>

          <br />
          <br />
          <br />

          <p style={{ textAlign: 'right' }}>
            <a href="https://github.com/messa/overwatch-web" style={{ color: "gray" }}>
              <Icon name='github' size="large" />
            </a>
          </p>

        </Container>
      </div>
    )
  }

}

export default IndexPage;
