const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.(js|mdx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-docs',
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
    ],
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        return config;
    },
};
