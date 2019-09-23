import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: ['react', 'prop-types'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      }),
      postcss({
        extract: true,
        modules: true
      })
    ]
  }
];
