const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure fonts are properly handled for web
config.resolver.assetExts.push('ttf');

module.exports = config;
