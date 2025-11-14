#!/usr/bin/env node

/**
 * Integration Validation Script
 * Verifies all asset screens and routes are properly configured
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`)
};

// Expected asset files
const expectedAssets = [
  '404-3-4143.html',
  '404mobile-15-803.html',
  'badges-11-31.html',
  'buttons-11-32.html',
  'colors-2-220.html',
  'cover-900-737.html',
  'fonts-35-738.html',
  'footers-11-33.html',
  'heroicons-4-2561.html',
  'how-to-use-1-70.html',
  'illustrations-903-0.html',
  'introduction-1-20.html',
  'license-1-78.html',
  'mobile-18-808.html',
  'overview-3-3111.html',
  'overview-mobile-14-1.html',
  'sidebars-topbars-3-65.html',
  'spacers-2-596.html',
  'support-1-74.html',
  'tablet-18-778.html',
  'typography-2-135.html'
];

// Expected screen wrappers
const expectedScreens = [
  'BadgesScreen.js',
  'ButtonsScreen.js',
  'ColorsScreen.js',
  'CoverScreen.js',
  'FontsScreen.js',
  'FootersScreen.js',
  'HeroiconsScreen.js',
  'HowToUseScreen.js',
  'IllustrationsScreen.js',
  'IntroductionScreen.js',
  'LicenseScreen.js',
  'MobileScreen.js',
  'NotFoundMobileScreen.js',
  'NotFoundScreen.js',
  'OverviewMobileScreen.js',
  'OverviewScreen.js',
  'SidebarsTopbarsScreen.js',
  'SpacersScreen.js',
  'SupportScreen.js',
  'TabletScreen.js',
  'TypographyScreen.js'
];

// Expected routes in App.js
const expectedRoutes = [
  '/overview',
  '/customers',
  '/products',
  '/transactions',
  '/components/buttons',
  '/components/badges',
  '/components/footers',
  '/components/icons',
  '/docs/introduction',
  '/docs/support',
  '/docs/license',
  '/docs/how-to-use',
  '/colors',
  '/typography',
  '/spacers',
  '/fonts',
  '/illustrations',
  '/sidebars-topbars',
  '/cover',
  '/mobile',
  '/tablet',
  '/overview-mobile',
  '/errors/404',
  '/errors/404-mobile'
];

let errorCount = 0;
let warningCount = 0;

console.log('\n' + '='.repeat(60));
console.log('Asset Screen Integration Validation');
console.log('='.repeat(60) + '\n');

// Check public/assets directory
log.info('Checking public/assets directory...');
const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  log.error(`Directory not found: ${assetsDir}`);
  errorCount++;
} else {
  log.success('public/assets directory exists');
  
  // Check each expected asset HTML file
  log.info('\nVerifying asset HTML files...');
  expectedAssets.forEach(asset => {
    const htmlPath = path.join(assetsDir, asset);
    const cssPath = path.join(assetsDir, asset.replace('.html', '.css'));
    const jsPath = path.join(assetsDir, asset.replace('.html', '.js'));
    
    if (fs.existsSync(htmlPath)) {
      log.success(`Found ${asset}`);
      
      // Check companion CSS and JS files
      if (!fs.existsSync(cssPath)) {
        log.warning(`  Missing companion CSS: ${asset.replace('.html', '.css')}`);
        warningCount++;
      }
      if (!fs.existsSync(jsPath)) {
        log.warning(`  Missing companion JS: ${asset.replace('.html', '.js')}`);
        warningCount++;
      }
    } else {
      log.error(`Missing ${asset}`);
      errorCount++;
    }
  });
}

// Check figmaimages directory
log.info('\nChecking figmaimages directory...');
const figmaimagesDir = path.join(assetsDir, 'figmaimages');
if (!fs.existsSync(figmaimagesDir)) {
  log.error(`Directory not found: ${figmaimagesDir}`);
  errorCount++;
} else {
  const images = fs.readdirSync(figmaimagesDir).filter(f => 
    f.endsWith('.png') || f.endsWith('.svg')
  );
  log.success(`Found ${images.length} images in figmaimages/`);
  if (images.length < 50) {
    log.warning(`Expected 100+ images, found ${images.length}`);
    warningCount++;
  }
}

// Check src/screens directory
log.info('\nChecking screen wrapper components...');
const screensDir = path.join(__dirname, 'src', 'screens');
if (!fs.existsSync(screensDir)) {
  log.error(`Directory not found: ${screensDir}`);
  errorCount++;
} else {
  log.success('src/screens directory exists');
  
  expectedScreens.forEach(screen => {
    const screenPath = path.join(screensDir, screen);
    if (fs.existsSync(screenPath)) {
      log.success(`Found ${screen}`);
    } else {
      log.error(`Missing ${screen}`);
      errorCount++;
    }
  });
}

// Check App.js for routes
log.info('\nVerifying routes in App.js...');
const appJsPath = path.join(__dirname, 'src', 'App.js');
if (!fs.existsSync(appJsPath)) {
  log.error('App.js not found');
  errorCount++;
} else {
  const appJsContent = fs.readFileSync(appJsPath, 'utf8');
  
  expectedRoutes.forEach(route => {
    if (appJsContent.includes(`path="${route}"`)) {
      log.success(`Route configured: ${route}`);
    } else {
      log.error(`Route missing: ${route}`);
      errorCount++;
    }
  });
  
  // Check for lazy imports
  const lazyImportCount = (appJsContent.match(/lazy\(\(\) => import/g) || []).length;
  log.info(`\nFound ${lazyImportCount} lazy-loaded components`);
  
  // Check for IframeScreen usage in screens
  log.info('\nVerifying IframeScreen usage...');
  const screenFiles = fs.readdirSync(screensDir);
  screenFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const content = fs.readFileSync(path.join(screensDir, file), 'utf8');
      if (content.includes('IframeScreen')) {
        log.success(`${file} uses IframeScreen`);
      } else if (!file.includes('test')) {
        log.warning(`${file} does not use IframeScreen`);
        warningCount++;
      }
    }
  });
}

// Check IframeScreen component
log.info('\nVerifying IframeScreen component...');
const iframeScreenPath = path.join(__dirname, 'src', 'components', 'IframeScreen.js');
if (!fs.existsSync(iframeScreenPath)) {
  log.error('IframeScreen.js not found');
  errorCount++;
} else {
  const content = fs.readFileSync(iframeScreenPath, 'utf8');
  if (content.includes('sandbox=')) {
    log.success('IframeScreen has sandbox attribute');
  } else {
    log.warning('IframeScreen missing sandbox attribute');
    warningCount++;
  }
  if (content.includes('loading="lazy"')) {
    log.success('IframeScreen uses lazy loading');
  } else {
    log.warning('IframeScreen missing lazy loading');
    warningCount++;
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('Validation Summary');
console.log('='.repeat(60));
console.log(`Total errors: ${errorCount}`);
console.log(`Total warnings: ${warningCount}`);

if (errorCount === 0 && warningCount === 0) {
  log.success('\n✓ All validations passed!');
  process.exit(0);
} else if (errorCount === 0) {
  log.warning(`\n⚠ Validation passed with ${warningCount} warnings`);
  process.exit(0);
} else {
  log.error(`\n✗ Validation failed with ${errorCount} errors and ${warningCount} warnings`);
  process.exit(1);
}
