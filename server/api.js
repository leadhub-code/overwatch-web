import { Router } from 'express'
import 'isomorphic-fetch'

import configuration from './configuration'

const trimSlash = s => s.replace(/\/$/, '');

const hubUrl = trimSlash(configuration.get('overwatch_hub:api_url'));
const hubToken = configuration.get('overwatch_hub:client_token');

const router = Router();
export default router;

const getFromHub = async path => {
  const url = hubUrl + path;
  const options = {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `token ${hubToken}`,
    }),
  };
  const r = await fetch(url, options);
  if (r.status !== 200) {
    throw new Error(`Request to ${url} failed with status ${r.status}`);
  }
  return await r.json();
};

const asyncWrapper = fn => (req, res, next) => {
  // https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
  Promise.resolve(fn(req, res, next)).catch(next);
};

const jsonWrapper = fn => asyncWrapper(async (req, res, next) => {
  const result = await fn(req);
  if (result) res.json(result);
});

const userRequired = fn => (req, res, next) => {
  if (!req.user) {
    console.info('No req.user:', req.path);
    res.sendStatus(403);
  }
  else fn(req, res, next);
};

router.get('/', jsonWrapper(async req => ({ok: true})));

router.get('/page-info', jsonWrapper(async req => {
  return await req.getPageInfo();
}));

router.get('/streams', userRequired(jsonWrapper(async req => {
  const { streams } = await getFromHub('/streams/');
  return { streams };
})));

router.get('/streams/:streamId', userRequired(jsonWrapper(async req => {
  const { streamId } = req.params;
  const data = await getFromHub(`/streams/${streamId}`);
  const { stream, current_datapoint, current_alerts } = data;
  stream.currentDatapoint = current_datapoint;
  stream.currentAlerts = current_alerts;
  return { stream };
})));

router.get('/alerts/current', userRequired(jsonWrapper(async req => {
  const { alerts } = await getFromHub('/alerts/current');
  return { alerts };
})));

router.get('/alerts/closed', userRequired(jsonWrapper(async req => {
  const { alerts } = await getFromHub('/alerts/closed');
  return { alerts };
})));

router.use((req, res) => res.sendStatus(404));
