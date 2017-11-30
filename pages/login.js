import React from 'react'
import Link from 'next/link'
import { Container, Menu, List, Icon, Button } from 'semantic-ui-react'

import CustomHead from '../components/CustomHead'
import TopMenu from '../components/TopMenu'

const btnStyle = {
  marginTop: 10,
  marginRight: 10,
};

export default class LoginPage extends React.Component {

  static async getInitialProps({ req }) {
    if (req) {
      return await req.getPageInfo();
    } else {
      const res = await fetch('/api/page-info', { credentials: 'same-origin' })
      return await res.json();
    }
  }

  render() {
    const { allowInsecureDevLogin } = this.props;
    return (
      <div className='LoginPage'>
        <CustomHead />
        <TopMenu notLoggedIn />
        <br />
        <Container text>
          <h1>Sign in</h1>
          <div>
            <Button
              color='google plus'
              icon='google'
              labelPosition='left'
              content='Sign in via Google'
              as='a'
              href='/auth/google/'
              style={btnStyle}
            />
            {!allowInsecureDevLogin ? null : (
              <Button
                color='purple'
                icon='sign in'
                labelPosition='left'
                content='Sign in as dev user'
                as='a'
                href='/auth/dev/'
                style={btnStyle}
              />
            )}
          </div>
        </Container>
        <br />
        <br />
      </div>
    );
  }

}
