const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../public/articles');
const outputFile = path.join(__dirname, '../lib/articlesContent.json');

const articles = {};

function loadArticles() {
  const slugs = fs.readdirSync(articlesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const slug of slugs) {
    const mdPath = path.join(articlesDir, slug, 'page.md');
    if (fs.existsSync(mdPath)) {
      try {
        articles[slug] = fs.readFileSync(mdPath, 'utf-8');
        console.log(`Loaded: ${slug}`);
      } catch (error) {
        console.error(`Failed to load ${slug}:`, error);
      }
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
  console.log(`\nSuccessfully bundled ${Object.keys(articles).length} articles to ${outputFile}`);
}

loadArticles();
