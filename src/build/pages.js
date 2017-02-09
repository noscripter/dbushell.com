'use strict';

const Pages = {
  '/about/': {
    src: '/src/containers/pages/about',
    el: require('../containers/pages/about')
  },
  '/working-with-agencies/': {
    src: '/src/containers/pages/agencies',
    el: require('../containers/pages/agencies')
  },
  '/working-with-clients/': {
    src: '/src/containers/pages/clients',
    el: require('../containers/pages/clients')
  },
  '/table-of-contents/': {
    src: '/src/containers/pages/contents',
    el: require('../containers/pages/contents')
  },
  '/wordpress-and-cms-integration/': {
    src: '/src/containers/services/cms',
    el: require('../containers/services/cms')
  },
  '/responsive-design/': {
    src: '/src/containers/services/design',
    el: require('../containers/services/design')
  },
  '/front-end-development/': {
    src: '/src/containers/services/development',
    el: require('../containers/services/development')
  },
  '/process-and-strategy/': {
    src: '/src/containers/services/strategy',
    el: require('../containers/services/strategy')
  },
  '/services/': {
    src: '/src/containers/services',
    el: require('../containers/services')
  }
};

export default Pages;
