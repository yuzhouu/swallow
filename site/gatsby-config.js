const fs = require('fs');
const path = require('path/posix');
const meta = require('../data/meta.json');

const plugins = [
  {
    resolve: `gatsby-plugin-emotion`,
    options: {
      // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
      // The values for each key in this example are the defaults the plugin uses.
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: `[local]`,
      cssPropOptimization: true,
    },
  },
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/../data/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/../data/images`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 630,
          },
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMdx } }) => {
            return allMdx.nodes.map(node => {
              return Object.assign({}, node.frontmatter, {
                title: node.frontmatter.title + ' | ' + site.siteMetadata.title,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + '/blog/' + node.slug,
                guid: site.siteMetadata.siteUrl + '/blog/' + node.slug,
              });
            });
          },
          query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  slug
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
          match: '^/blog/?$',
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: meta.site.title,
      short_name: meta.site.title,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#25c19f`,
      display: `minimal-ui`,
      icon: `../data/images/favicon.png`, // This path is relative to the root of the site.
    },
  },
  `gatsby-plugin-react-helmet`,
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
];

try {
  const content = fs.readFileSync(path.join(__dirname, '../data/google-tracking-id'), {
    encoding: 'utf-8',
  });
  if (content) {
    plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: content.trim(),
      },
    });
  }
} catch (err) {
  if (err.code !== 'ENOENT') {
    throw err;
  }
}

module.exports = {
  siteMetadata: {
    ...meta.site,
    author: meta.author,
  },
  pathPrefix: meta.pathPrefix || '',
  plugins,
};
