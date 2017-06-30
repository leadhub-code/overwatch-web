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
      .siteTitle {
        font-family: Roboto, sans-serif;
        font-weight: 600;
      }
      .ui.menu {
        border-radius: 0;
      }
    `}</style>
  </Head>
);
