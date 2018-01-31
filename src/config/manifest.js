import Confidence from 'confidence';
import Config from './config';
import Pack from '../../package.json';

const defaultCriteria = {
  env: process.env.NODE_ENV || 'development',
};

const manifest = {
  $meta: 'hapi server plugin config',
  server: {
    port: Config.defaultGet('/port'),
  },
  register: {
    plugins: [
      {
        plugin: 'inert',
      },
      {
        plugin: 'vision',
      },
      {
        plugin: 'hapi-swagger',
        options: {
          info: {
            version: Pack.version,
            title: 'feather-blog api document',
            description: '',
          },
          tags: [
            {
              name: 'blog',
              description: 'blog api',
            },
            {
              name: 'management',
              description: 'management api',
            },
          ],
        },
      },
    ],
  },
};

const store = new Confidence.Store(manifest);

store.defaultGet = (key, criteria = defaultCriteria) => store.get(key, criteria);
store.defaultMeta = (key, criteria = defaultCriteria) => store.meta(key, criteria);

export default store;
