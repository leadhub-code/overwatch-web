import Head from 'next/head'

export default (props) => (
  <Head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300" rel="stylesheet" />
    <style>{`
      body {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 16px;
        margin: 1rem 0;
      }
      h1 {
        font-family: Roboto Condensed, sans-serif;
        font-weight: 300;
        font-size: 35px;
        margin-top: 1rem;
        margin-bottom: 2rem;
      }
      li {
        margin-top: .4rem;
      }
      li li {
        margin-top: .1rem;
      }
      strong {
        font-weight: 500;
      }
      a {
        color: #04a;
      }
    `}</style>
  </Head>
);
