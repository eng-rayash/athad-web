const fs = require('fs');
const path = require('path');

const srcComponents = path.join(__dirname, 'src', 'app', 'components');
const destComponents = path.join(__dirname, 'frontend', 'src', 'app', 'components');

const srcImports = path.join(__dirname, 'src', 'imports');
const destImports = path.join(__dirname, 'frontend', 'src', 'imports');

function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ Source directory does not exist: ${src}`);
    return;
  }
  console.log(`📂 Copying ${src} -> ${dest}...`);
  try {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`✅ Successfully copied to ${dest}`);
  } catch (err) {
    console.error(`❌ Error copying:`, err);
  }
}

console.log('🚀 Starting migration of component and asset files...');
copyFolderRecursive(srcComponents, destComponents);
copyFolderRecursive(srcImports, destImports);
console.log('🎉 Done! You can now delete the root "src" folder if everything is working.');
