// node-resolve will resolve all the node dependencies
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json";

export default {
    input: 'src/index.js',
    output: {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        babel({
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ],
            plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-arrow-functions',
                '@babel/plugin-transform-template-literals',
                'babel-plugin-transform-react-remove-prop-types',
                'babel-plugin-module-resolver',
            ],
            exclude: 'node_modules/**'
        }),
        commonjs()
    ]
};
