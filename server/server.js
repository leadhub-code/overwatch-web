import express from 'express'
import next from 'next'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

import configuration from './configuration'
import { setupServer, authRouter } from './auth'

// make it easily stoppable if running inside Docker container
Array.from(["SIGINT", "SIGTERM"]).map((sig) => {
  process.on(sig, () => {
    process.exit();
  })
});

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(cookieParser())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
  server.use(session({
    secret: configuration.get('session_secret'),
    resave: false,
    saveUninitialized: true,
  }))

  setupServer(server);

  server.use((req, res, next) => {
    req.siteTitle = configuration.get('site_title') || 'Gatekeeper';
    console.info('req:', req.user || '-', req.method, req.url);
    next();
  })

  //server.get('/debug', (req, res) => res.json(req.user))

  server.use(authRouter);

  server.get('/', (req, res) => {
    if (req.user) {
      return app.render(req, res, '/dashboard', req.query);
    } else {
      return app.render(req, res, '/login', req.query);
    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:3000 (pid ${process.pid})`)
  })
})
