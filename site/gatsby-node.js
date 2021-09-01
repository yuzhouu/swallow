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

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type PostNav {
      newer: Mdx
      older: Mdx
    }
  `;
  createTypes(typeDefs);
};

exports.createSchemaCustomization = createSchemaCustomization;

const createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      postNav: {
        type: `PostNav`,
        resolve: (source, args, context, info) => {
          const postList = context.nodeModel.getAllNodes({ type: `Mdx` }).sort((a, b) => {
            return new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf();
          });
          let index = 0;

          for (let i = 0; i < postList.length; i++) {
            if (postList[i].id === source.id) {
              index = i;
              break;
            }
          }

          return {
            newer: postList[index - 1] || null,
            older: postList[index + 1] || null,
          };
        },
      },
    },
  };

  createResolvers(resolvers);
};

exports.createResolvers = createResolvers;
