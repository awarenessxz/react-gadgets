// node-resolve will resolve all the node dependencies
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import packageJson from './package.json';

export default {
    input: packageJson.source,
    output: [
        {
            dir: packageJson.target.cjs,
            format: 'cjs',
            sourcemap: true,
        },
        {
            dir: packageJson.target.esm,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve({
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs'],
        }),
        commonjs(),
        babel({
            exclude: ['node_modules/**', 'dist', 'src/**/*.test.js*', 'src/**/*.stories.*'],
            babelHelpers: 'bundled',
        }),
        postcss({
            extract: 'styles.css',
            modules: true,
            use: ['sass'],
        }),
    ],
};
