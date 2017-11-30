import nconf from 'nconf'
import yaml from 'js-yaml'

const confPath = process.env.OVERWATCH_WEB_CONF;

if (!confPath) {
  throw new Error("Path to configuration file must be defined in env OVERWATCH_WEB_CONF");
} else {
  nconf.file({
    file: confPath,
    format: {
      parse: (obj, options) => yaml.safeLoad(obj),
      stringify: (obj, options) => yaml.safeDump(obj),
    }
  });
}

if (nconf.get('session_secret') == 'topsecretstringhere' && process.env.NODE_ENV === 'production') {
  throw new Error("You are supposed to change the value of session_secret");
}

export default nconf;
