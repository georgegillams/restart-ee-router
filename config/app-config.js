require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
      title: 'George Gillams - open source software engineer',
      description: 'George Gillams - open source software engineer',
      head: {
        titleTemplate: 'George Gillams: %s',
        meta: [
          { name: 'description', content: 'My personal website' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'My personal website' },
          {
            property: 'og:image',
            content: 'https://georgegillams.co.uk/favicon.ico',
          },
          {
            property: 'og:logo',
            content: 'https://georgegillams.co.uk/favicon.ico',
          },
          { property: 'og:locale', content: 'en_GB' },
          { property: 'og:title', content: 'My personal website' },
          {
            property: 'og:description',
            content: 'George Gillams - open source software engineer',
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@georgegillams' },
          { property: 'og:creator', content: '@georgeillams' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
        ],
      },
    },
  },
  environment,
);
