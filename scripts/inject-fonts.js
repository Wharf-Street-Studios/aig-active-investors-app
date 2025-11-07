#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create fonts.css file
const fontsCss = `@font-face {
  font-family: 'MaterialCommunityIcons';
  src: url('./assets/node_modules/expo/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.6e435534bd35da5fef04168860a9b8fa.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;

const distDir = path.join(__dirname, '..', 'dist');
const fontsCssPath = path.join(distDir, 'fonts.css');
const indexHtmlPath = path.join(distDir, 'index.html');

// Write fonts.css
fs.writeFileSync(fontsCssPath, fontsCss);
console.log('✓ Created fonts.css');

// Read index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Inject fonts.css link if not already present
const fontsLink = '<link rel="stylesheet" href="/aig-active-investors-app/fonts.css" />';
if (!indexHtml.includes(fontsLink)) {
  indexHtml = indexHtml.replace(
    '</style>',
    `</style>\n  ${fontsLink}`
  );
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log('✓ Injected fonts.css link into index.html');
} else {
  console.log('✓ fonts.css link already present in index.html');
}
