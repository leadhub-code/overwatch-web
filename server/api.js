import { Router } from 'express'
import proxy from 'http-proxy-middleware'

import configuration from './configuration'

const hubUrl = configuration.get('overwatch_hub:url');

export const router = Router();

const hubProxy = proxy({
  target: hubUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api/hub/': '/',
  },
});

router.use('/api/hub', (req, res, next) => {
  // TODO: auth
  hubProxy(req, res, next);
});

export default router;
