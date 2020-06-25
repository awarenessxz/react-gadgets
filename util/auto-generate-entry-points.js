/*
 * Rollup accepts multiple entry points for code-splitting but these have to be
 * specified manually. This utility function takes in 'src/index.js' file and
 * create entry points based on each export inside 'src/index.js'
 */

const path = require('path');
const fs = require('fs');

// 1. get entry point from argument
const mainEntryPoint = process.argv[2];
if (!fs.existsSync(mainEntryPoint)) {
    console.error('\x1b[31m%s\x1b[0m', `Main Entry Point ${mainEntryPoint} is does not exists`);
    process.exit(1);
}

// 2. read the index.js & extract all entry points
const entryPoints = {
    index: mainEntryPoint,
};
// https://stackoverflow.com/questions/34223065/read-lines-synchronously-from-file-in-node-js
const lines = fs.readFileSync(mainEntryPoint, 'utf-8').split('\n').filter(Boolean);
let line;
for (line of lines) {
    // https://stackoverflow.com/questions/1454913/regular-expression-to-find-a-string-included-between-two-characters-while-exclud
    const entry = String(line.match(/(?<=as)(.*?)(?=\})/g)).trim();
    const entryPath =
        './src/' +
        path.normalize(
            String(line.match(/(?<=from)(.*?)(?=;)/g))
                .trim()
                .replace(/['"]+/g, '')
        );
    entryPoints[entry] = entryPath;
}
console.info('\x1b[32m%s\x1b[0m', 'Generating entry points...');
console.log(JSON.stringify(entryPoints, null, 2));

// 3. write into package.json
const packageName = 'package.json';
const packageJson = require('../' + packageName);
packageJson.source = entryPoints;
fs.writeFile(packageName, JSON.stringify(packageJson, null, 4), {}, function writeJSON(err) {
    if (err) return console.log('\x1b[31m%s\x1b[0m', err);
    console.info('\x1b[32m%s\x1b[0m', 'Updated entry points in ' + packageName);
});
