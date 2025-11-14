const fs = require('fs');
const path = require('path');

/**
 * Script to fix asset paths in HTML files
 * Converts relative paths to absolute paths starting from /assets/
 */

const assetsDir = path.join(__dirname, 'public', 'assets');
const htmlFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to process\n`);

htmlFiles.forEach(filename => {
  const filePath = path.join(assetsDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Extract base name without extension for CSS/JS files
  const baseName = filename.replace('.html', '');
  
  // Fix CSS link - handle both ./ and direct references
  content = content.replace(
    /<link\s+rel="stylesheet"\s+href="\.\/([^"]+\.css)"/gi,
    '<link rel="stylesheet" href="/assets/$1"'
  );
  content = content.replace(
    /<link\s+rel="stylesheet"\s+href="([^/"]+\.css)"/gi,
    '<link rel="stylesheet" href="/assets/$1"'
  );
  
  // Fix script src - handle both ./ and direct references
  content = content.replace(
    /<script\s+src="\.\/([^"]+\.js)"/gi,
    '<script src="/assets/$1"'
  );
  content = content.replace(
    /<script\s+src="([^/"]+\.js)"/gi,
    '<script src="/assets/$1"'
  );
  
  // Fix figmaimages paths - convert relative to absolute
  // Handle: figmaimages/ -> /assets/figmaimages/
  content = content.replace(
    /src="figmaimages\//gi,
    'src="/assets/figmaimages/'
  );
  content = content.replace(
    /src="\.\/figmaimages\//gi,
    'src="/assets/figmaimages/'
  );
  
  // Also fix href for figmaimages if any
  content = content.replace(
    /href="figmaimages\//gi,
    'href="/assets/figmaimages/'
  );
  content = content.replace(
    /href="\.\/figmaimages\//gi,
    'href="/assets/figmaimages/'
  );
  
  // Write back if changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filename}`);
  } else {
    console.log(`  Skipped: ${filename} (already correct or no matches)`);
  }
});

console.log('\n✅ All HTML files processed!');
