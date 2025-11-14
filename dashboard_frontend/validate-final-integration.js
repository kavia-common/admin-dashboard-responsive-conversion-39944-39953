#!/usr/bin/env node

/**
 * Final Integration Validation Script
 * Verifies all screens, routes, navigation, and assets are properly integrated
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`)
};

let errorCount = 0;
let warningCount = 0;
let successCount = 0;

console.log('\n' + '='.repeat(70));
console.log('Final Integration Validation - All Refined Screens');
console.log('='.repeat(70));

// Expected HTML files
const expectedHtmlFiles = [
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

// Expected routes and their corresponding HTML files
const expectedRoutes = {
  '/overview': 'overview-3-3111.html',
  '/components/buttons': 'buttons-11-32.html',
  '/components/badges': 'badges-11-31.html',
  '/components/footers': 'footers-11-33.html',
  '/heroicons': 'heroicons-4-2561.html',
  '/docs/introduction': 'introduction-1-20.html',
  '/docs/support': 'support-1-74.html',
  '/support': 'support-1-74.html',
  '/docs/license': 'license-1-78.html',
  '/license': 'license-1-78.html',
  '/docs/how-to-use': 'how-to-use-1-70.html',
  '/colors': 'colors-2-220.html',
  '/typography': 'typography-2-135.html',
  '/spacers': 'spacers-2-596.html',
  '/cover': 'cover-900-737.html',
  '/fonts': 'fonts-35-738.html',
  '/illustrations': 'illustrations-903-0.html',
  '/sidebars-topbars': 'sidebars-topbars-3-65.html',
  '/mobile': 'mobile-18-808.html',
  '/tablet': 'tablet-18-778.html',
  '/overview-mobile': 'overview-mobile-14-1.html',
  '/404': '404-3-4143.html',
  '/404-mobile': '404mobile-15-803.html',
  '/errors/404': '404-3-4143.html',
  '/errors/404-mobile': '404mobile-15-803.html'
};

// Expected sidebar navigation items
const expectedSidebarItems = [
  'Overview',
  'Docs',
  'Introduction',
  'How to Use',
  'Support',
  'License',
  'Components',
  'Buttons',
  'Badges',
  'Footers',
  'Heroicons',
  'Colors',
  'Typography',
  'Spacers',
  'Fonts',
  'Navigation',
  'Illustrations',
  'Cover',
  'Error Pages',
  '404',
  '404 Mobile',
  'Device Galleries',
  'Tablet',
  'Mobile',
  'Overview Mobile'
];

// 1. Verify all HTML files exist
log.section('1. Verifying HTML Asset Files');
const assetsDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(assetsDir)) {
  log.error(`Assets directory not found: ${assetsDir}`);
  errorCount++;
} else {
  log.success('Assets directory exists');
  successCount++;

  expectedHtmlFiles.forEach(file => {
    const filePath = path.join(assetsDir, file);
    if (fs.existsSync(filePath)) {
      log.success(`Found ${file}`);
      successCount++;

      // Check companion CSS and JS files
      const cssPath = filePath.replace('.html', '.css');
      const jsPath = filePath.replace('.html', '.js');

      if (!fs.existsSync(cssPath)) {
        log.warning(`  Missing CSS: ${file.replace('.html', '.css')}`);
        warningCount++;
      }
      if (!fs.existsSync(jsPath)) {
        log.warning(`  Missing JS: ${file.replace('.html', '.js')}`);
        warningCount++;
      }
    } else {
      log.error(`Missing ${file}`);
      errorCount++;
    }
  });
}

// 2. Verify figmaimages directory
log.section('2. Verifying Image Assets');
const figmaimagesDir = path.join(assetsDir, 'figmaimages');

if (!fs.existsSync(figmaimagesDir)) {
  log.error(`figmaimages directory not found: ${figmaimagesDir}`);
  errorCount++;
} else {
  log.success('figmaimages directory exists');
  successCount++;

  const pngFiles = fs.readdirSync(figmaimagesDir).filter(f => f.endsWith('.png'));
  const svgFiles = fs.readdirSync(figmaimagesDir).filter(f => f.endsWith('.svg'));

  log.info(`  PNG files: ${pngFiles.length}`);
  log.info(`  SVG files: ${svgFiles.length}`);
  log.info(`  Total images: ${pngFiles.length + svgFiles.length}`);

  if (pngFiles.length > 0 && svgFiles.length > 0) {
    log.success(`Found ${pngFiles.length + svgFiles.length} images`);
    successCount++;
  } else {
    log.error('No images found');
    errorCount++;
  }
}

// 3. Verify App.js routes
log.section('3. Verifying Route Configuration');
const appJsPath = path.join(__dirname, 'src', 'App.js');

if (!fs.existsSync(appJsPath)) {
  log.error('App.js not found');
  errorCount++;
} else {
  const appJsContent = fs.readFileSync(appJsPath, 'utf8');
  log.success('App.js found');
  successCount++;

  let routesFound = 0;
  let routesMissing = 0;

  Object.entries(expectedRoutes).forEach(([route, htmlFile]) => {
    if (appJsContent.includes(`path="${route}"`) && appJsContent.includes(htmlFile)) {
      log.success(`Route configured: ${route} → ${htmlFile}`);
      routesFound++;
      successCount++;
    } else if (appJsContent.includes(`path="${route}"`)) {
      log.warning(`Route found but HTML mismatch: ${route}`);
      warningCount++;
    } else {
      log.error(`Route missing: ${route}`);
      routesMissing++;
      errorCount++;
    }
  });

  log.info(`\n  Routes found: ${routesFound}/${Object.keys(expectedRoutes).length}`);

  // Check for catch-all route
  if (appJsContent.includes('path="*"')) {
    log.success('Catch-all 404 route configured');
    successCount++;
  } else {
    log.error('Catch-all 404 route missing');
    errorCount++;
  }

  // Check for IframeScreen usage
  if (appJsContent.includes('IframeScreen')) {
    log.success('IframeScreen component used');
    successCount++;
  } else {
    log.error('IframeScreen component not found');
    errorCount++;
  }
}

// 4. Verify Sidebar navigation
log.section('4. Verifying Sidebar Navigation');
const sidebarPath = path.join(__dirname, 'src', 'components', 'Layout', 'Sidebar.js');

if (!fs.existsSync(sidebarPath)) {
  log.error('Sidebar.js not found');
  errorCount++;
} else {
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  log.success('Sidebar.js found');
  successCount++;

  let navItemsFound = 0;
  let navItemsMissing = 0;

  expectedSidebarItems.forEach(item => {
    if (sidebarContent.includes(`label: '${item}'`)) {
      log.success(`Nav item: ${item}`);
      navItemsFound++;
      successCount++;
    } else {
      log.warning(`Nav item not found in sidebar: ${item}`);
      navItemsMissing++;
      warningCount++;
    }
  });

  log.info(`\n  Nav items found: ${navItemsFound}/${expectedSidebarItems.length}`);
}

// 5. Verify IframeScreen component
log.section('5. Verifying IframeScreen Component');
const iframeScreenPath = path.join(__dirname, 'src', 'components', 'IframeScreen.js');

if (!fs.existsSync(iframeScreenPath)) {
  log.error('IframeScreen.js not found');
  errorCount++;
} else {
  const iframeContent = fs.readFileSync(iframeScreenPath, 'utf8');
  log.success('IframeScreen.js found');
  successCount++;

  // Check for key features
  const features = {
    'sandbox attribute': iframeContent.includes('sandbox='),
    'lazy loading': iframeContent.includes('loading="lazy"'),
    'title prop': iframeContent.includes('title={'),
    'src prop': iframeContent.includes('src={')
  };

  Object.entries(features).forEach(([feature, present]) => {
    if (present) {
      log.success(`IframeScreen has ${feature}`);
      successCount++;
    } else {
      log.warning(`IframeScreen missing ${feature}`);
      warningCount++;
    }
  });
}

// 6. Verify Layout component
log.section('6. Verifying Layout Component');
const layoutPath = path.join(__dirname, 'src', 'components', 'Layout', 'Layout.js');

if (!fs.existsSync(layoutPath)) {
  log.error('Layout.js not found');
  errorCount++;
} else {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  log.success('Layout.js found');
  successCount++;

  // Check for key features
  const features = {
    'Sidebar component': layoutContent.includes('<Sidebar'),
    'Topbar component': layoutContent.includes('<Topbar'),
    'mobile drawer state': layoutContent.includes('mobileSidebarOpen'),
    'overlay element': layoutContent.includes('overlay'),
    'inert attribute': layoutContent.includes('inert')
  };

  Object.entries(features).forEach(([feature, present]) => {
    if (present) {
      log.success(`Layout has ${feature}`);
      successCount++;
    } else {
      log.warning(`Layout missing ${feature}`);
      warningCount++;
    }
  });
}

// 7. Check build readiness
log.section('7. Checking Build Files');
const packageJsonPath = path.join(__dirname, 'package.json');

if (fs.existsSync(packageJsonPath)) {
  log.success('package.json exists');
  successCount++;

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (packageJson.dependencies && packageJson.dependencies['react-router-dom']) {
    log.success('react-router-dom dependency present');
    successCount++;
  } else {
    log.error('react-router-dom dependency missing');
    errorCount++;
  }
} else {
  log.error('package.json not found');
  errorCount++;
}

// 8. Summary
log.section('Validation Summary');
console.log('='.repeat(70));

const total = successCount + errorCount + warningCount;
const successRate = ((successCount / total) * 100).toFixed(1);

console.log(`${colors.green}✓ Successes: ${successCount}${colors.reset}`);
console.log(`${colors.red}✗ Errors: ${errorCount}${colors.reset}`);
console.log(`${colors.yellow}⚠ Warnings: ${warningCount}${colors.reset}`);
console.log(`${colors.cyan}Success Rate: ${successRate}%${colors.reset}`);
console.log('='.repeat(70));

// Final status
if (errorCount === 0 && warningCount === 0) {
  log.success('\n🎉 INTEGRATION AUDIT: PERFECT - All checks passed!');
  process.exit(0);
} else if (errorCount === 0) {
  log.warning(`\n⚠️  INTEGRATION AUDIT: PASSED WITH WARNINGS (${warningCount})`);
  process.exit(0);
} else {
  log.error(`\n❌ INTEGRATION AUDIT: FAILED (${errorCount} errors, ${warningCount} warnings)`);
  process.exit(1);
}
