/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            bio
            link
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata.author;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={['AUTO', 'WEBP', 'AVIF']}
        src="../../../data/images/avatar.png"
        width={50}
        height={50}
        quality={100}
        alt="Profile picture"
      />
      {author?.name && (
        <div>
          <Link to={author.link} target="_blank">
            <strong>{author.name}</strong>
          </Link>
          <p>{author?.bio || null}</p>
        </div>
      )}
    </div>
  );
};

export default Bio;
