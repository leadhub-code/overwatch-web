import CustomHead from '../components/CustomHead'

class IndexPage extends React.Component {

  render() {
    const { siteTitle } = this.props;
    return (
      <div>
        <CustomHead />
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1>Overwatch</h1>
              <a href="/auth/google/">Sign in with Google</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default IndexPage;
