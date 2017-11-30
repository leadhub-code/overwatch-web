import nconf from 'nconf'
import yaml from 'js-yaml'
import fs from 'fs'

const confPath = process.env.OVERWATCH_WEB_CONF;

if (!confPath) {
  throw new Error("Path to configuration file must be defined in env OVERWATCH_WEB_CONF");
} else {
  if (!fs.existsSync(confPath)) {
    throw new Error(`Configuration file does not exist: ${confPath}`);
  }
  nconf.file({
    file: confPath,
    format: {
      parse: (obj, options) => yaml.safeLoad(obj),
      stringify: (obj, options) => yaml.safeDump(obj),
    }
  });
}

if (process.env.NODE_ENV === 'production') {
  if (nconf.get('session_secret') === 'topsecretstringhere' && !process.env.INSECURE_SESSION_SECRET_OK) {
    throw new Error("You are supposed to change the value of session_secret");
  }
}

export default nconf;
