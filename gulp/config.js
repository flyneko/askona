import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const srcFolder = './src';
const buildFolder = './build';

export const path = {
    srcFolder,
    buildFolder,
    rootFolder,
    src: {
        pug       : `${srcFolder}/pug`,
        sass      : `${srcFolder}/sass`,
        js        : `${srcFolder}/js`,
        img       : `${srcFolder}/img`,
        fonts     : `${srcFolder}/fonts`,
        svgIcons  : `${srcFolder}/icons/svg`,
        pngIcons  : `${srcFolder}/icons/png`,
        favicon   : `${srcFolder}/favicon.png`,
        temp      : `${srcFolder}/temp`,

    },
    build: {
        css       : `${buildFolder}/assets/css`,
        js        : `${buildFolder}/assets/js`,
        img       : `${buildFolder}/assets/img`,
        fonts     : `${buildFolder}/assets/fonts`,
        favicon   : `${buildFolder}/assets`,
        temp      : `${buildFolder}/temp`,
    }
};