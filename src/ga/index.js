import * as prodGA from './analytics/prod';
import * as devGA from './analytics/dev';

const isLocal = () => {
  return location.hostname === 'localhost';
};

const isDev = () => {
  return process.env.NODE_ENV !== 'production';
};

const initGA = (code, Router) => {
  // if local or development env, should not tracking
  const shouldNotTrack = isLocal() || isDev();

  // production or dev ga
  const analytics = shouldNotTrack ? devGA : prodGA;

  analytics.init(code);
  analytics.pageview();

  // save previouseCallback
  const previousCallback = Router.onRouteChangeComplete;

  Router.onRouteChangeComplete = () => {
    if (typeof previousCallback === 'function') {
      previousCallback();
    }
    analytics.pageview();
  };
};

export default initGA;