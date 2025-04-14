export const mockFiles = [
  'index.html',
  'src/app.js',
  'src/styles.css',
  'README.md',
  'package.json'
];

export const mockFileContents: Record<
  string,
  { content: string; lang: string; readonly?: boolean }
> = {
  'index.html': {
    lang: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mock File</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a mock HTML file.</p>
</body>
</html>`,
    readonly: true // 只读文件
  },
  'src/app.js': {
    lang: 'javascript',
    content: `console.log("Hello World");
function greet(name) {
  return \`Hello, \${name}!\`;
}

greet("User");`
  },
  'src/styles.css': {
    lang: 'css',
    content: `body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}`
  },
  'README.md': {
    lang: 'markdown',
    content: `# Project Title

This is a sample project using Monaco Editor.

## Setup

Install dependencies and start the project.

\`\`\`
npm install
npm start
\`\`\`
`
  },
  'package.json': {
    lang: 'json',
    content: `{
  "name": "monaco-editor-project",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "monaco-editor": "^0.34.0"
  }
}`
  }
};
