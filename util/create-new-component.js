const fs = require('fs');
const templates = require('./templates');

// 1. get component name
const componentName = process.argv[2];
if (!componentName) {
    console.error('\x1b[31m%s\x1b[0m', `Please supply a valid component name`);
    process.exit(1);
}

// 2. create component
console.info('\x1b[32m%s\x1b[0m', 'Creating component template with name', componentName, '...');
const componentDirectory = `./src/${componentName}`;

if (fs.existsSync(componentDirectory)) {
    console.error('\x1b[31m%s\x1b[0m', `Component ${componentName} already exists`);
    process.exit(1);
}

fs.mkdirSync(componentDirectory);

const generatedTemplates = templates.map(template => template(componentName));
generatedTemplates.forEach(template => {
    fs.writeFileSync(
        `${componentDirectory}/${componentName}${template.extension}`,
        template.content
    );
});

console.info('\x1b[32m%s\x1b[0m', 'Successfully created component under: ', componentDirectory);
