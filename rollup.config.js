// node-resolve will resolve all the node dependencies
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import packageJson from './package.json';
import path from 'path';

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
        postcss({
            modules: true,
            extensions: ['css', 'scss'],
            use: [
                [
                    'sass',
                    {
                        includePaths: [path.resolve('node_modules')],
                    },
                ],
            ],
        }),
        babel({
            include: ['src/**/*'],
            exclude: ['node_modules/**', 'dist', 'src/**/*.test.js*', 'src/**/*.stories.*'],
            babelHelpers: 'bundled',
        }),
        resolve({
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.node', '.json'],
        }),
        commonjs(),
        copy({
            targets: [
                {
                    src: 'node_modules/ag-grid-community/dist/styles/**/*',
                    dest: 'dist/styles/agGrid',
                },
                {
                    src: 'node_modules/bootstrap/dist/css/**/*',
                    dest: 'dist/styles/bootstrap',
                },
            ],
        }),
    ],
};
