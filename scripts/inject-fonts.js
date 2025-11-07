#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const fontsDir = path.join(distDir, 'fonts');
const fontsCssPath = path.join(distDir, 'fonts.css');
const indexHtmlPath = path.join(distDir, 'index.html');

// Create fonts directory
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Copy MaterialCommunityIcons font file to a cleaner path
// gh-pages filters out paths with "node_modules" in them
const sourceFontPath = path.join(
  distDir,
  'assets/node_modules/expo/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.6e435534bd35da5fef04168860a9b8fa.ttf'
);
const destFontPath = path.join(fontsDir, 'MaterialCommunityIcons.ttf');

if (fs.existsSync(sourceFontPath)) {
  fs.copyFileSync(sourceFontPath, destFontPath);
  console.log('✓ Copied MaterialCommunityIcons font to /fonts/');
} else {
  console.warn('⚠ Warning: MaterialCommunityIcons font not found at expected location');
}

// Create fonts.css file with the new path
const fontsCss = `@font-face {
  font-family: 'MaterialCommunityIcons';
  src: url('./fonts/MaterialCommunityIcons.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;

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
