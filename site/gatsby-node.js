// const fs = require('fs');
// const path = require('path/posix');

// async function sourceNodes({ actions, createContentDigest }) {
//   const content = fs.readFileSync(path.join(__dirname, '../data/meta.json'), { encoding: 'utf-8' });

//   let parsedContent;
//   try {
//     parsedContent = JSON.parse(content);
//   } catch {
//     const hint = node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`;
//     throw new Error(`Unable to parse JSON: ${hint}`);
//   }

//   const { createNode } = actions;

//   const siteMetaNode = {
//     ...parsedContent,
//     id: 'site-metadata',
//     parent: null,
//     children: [],
//     internal: {
//       type: 'SiteMetadata',
//       mediaType: 'application/json',
//       content,
//       contentDigest: createContentDigest(parsedContent),
//       description: 'site meta data',
//     },
//   };

//   createNode(siteMetaNode);
// }

// exports.sourceNodes = sourceNodes;
