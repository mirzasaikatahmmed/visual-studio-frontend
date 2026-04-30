const fs = require('fs');
const path = require('path');

const files = [
  'about/page.tsx',
  'contact/page.tsx',
  'events/page.tsx',
  'more-services/page.tsx',
  'store/page.tsx',
  'video-gallery/page.tsx'
].map(f => path.join('src/app/(main-layout)', f));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(
    /text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600/g,
    'text-brand-500'
  );
  fs.writeFileSync(f, content);
  console.log('Updated ' + f);
});
