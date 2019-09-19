const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: [
          '>0.25%',
          'not ie 11',
          'not op_mini all',
          'safari >= 11',
          'not safari 5.1'
        ],
        node: 'current'
      },
      modules: false
    }
  ],
  '@babel/preset-react'
];

const plugins = ['@babel/plugin-proposal-class-properties'];

module.exports = function(api) {
  api.cache.invalidate(() => process.env.NODE_ENV);
  const isTest = api.env('test');

  if (isTest) {
    plugins.push('@babel/plugin-transform-modules-commonjs');
  }

  return {
    presets,
    plugins
  };
};
