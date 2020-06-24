// node-resolve will resolve all the node dependencies
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import packageJson from './package.json';

export default {
    input: packageJson.source,
    output: {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
    },
    plugins: [
        peerDepsExternal(),
        resolve({
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs'],
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        postcss({
            extract: 'styles.css',
            modules: true,
            use: ['sass'],
        }),
    ],
};
