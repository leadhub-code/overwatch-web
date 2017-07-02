import Head from 'next/head'

export default (props) => (
  <Head>
    {/*
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous" />
    */}
    <link href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,600" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:200,300,400,500,600" rel="stylesheet" />
    <style>{`
      body {
        font-family: Roboto, sans-serif;
        font-size: 13px;
        font-weight: 400;
      }
      .siteTitle {
        font-family: Roboto, sans-serif;
        font-weight: 600;
      }
      .topMenu {
        margin-bottom: 1.5rem;
      }
      .topMenu .ui.menu {
        border-radius: 0;
      }

      pre, code {
        font-family: Terminus, monospace;
        font-size: 11px;
      }

      pre.debug {
        color: #666;
        font-family: Terminus, monospace;
        font-size: 10px;
        line-height: 1.1rem;
        margin-top: 0;
        margin-bottom: 0;
      }

      h1 {
        font-family: Roboto condensed, sans-serif;
        font-weight: 600;
        font-size: 19px;
        /* color: #2185D0; */
        color: #000;
        letter-spacing: 1px;
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
      }

      .loginPage h1 {
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        font-size: 37px;
        font-weight: 300;
      }

      h2 {
        font-size: 24px;
        font-weight: 300;
      }
      h3 {
        font-family: Roboto, sans-serif;
        font-size: 17px;
        font-weight: 500;
        margin-top: 1.5rem;
        margin-bottom: .66rem;
      }
      .cellTitle {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        font-size: 11px;
        text-transform: uppercase;
      }

      p {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      a {
        color: #06c;
      }

    `}</style>
  </Head>
);
