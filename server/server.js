import express from 'express'
import next from 'next'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

import configuration from './configuration'
import api from './api'
import auth from './auth'

// make it easily stoppable if running inside Docker container
Array.from(["SIGINT", "SIGTERM"]).map((sig) => {
  process.on(sig, () => {
    process.exit();
  });
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const allowInsecureDevLogin = configuration.get('allow_insecure_dev_login') || false;
const port = configuration.get('port') || 3000;

app.prepare()
.then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(session({
    secret: configuration.get('session_secret'),
    resave: false,
    saveUninitialized: true,
  }));

  auth.setupServer(server);

  server.use((req, res, next) => {
    // request logging
    console.info('req:', req.user ? (req.user.email || req.user) : '-', req.method, req.url);
    const allowInsecureDevLogin = configuration.get('allow_insecure_dev_login') || false;
    if (req.user && !allowInsecureDevLogin && req.user.devGuest) {
      req.user = null;
    }
    req.getPageInfo = () => ({
      // this data goes into initial props - via AJAX API or req.getPageInfo()
      user: req.user || null,
      allowInsecureDevLogin,
    });
    next();
  });

  //server.get('/debug', (req, res) => res.json(req.user))

  server.use('/auth', auth.router);
  server.use('/api', api);

  server.get('/', (req, res) => {
    res.redirect(!req.user ? '/login' : '/overview');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port} (pid ${process.pid})`);
  });
});
