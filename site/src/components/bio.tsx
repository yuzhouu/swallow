/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';

let hasLocalAvatar = true;
try {
  require('../../../data/images/avatar.png');
} catch (err) {
  hasLocalAvatar = false;
}

const Avatar = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          githubRepo
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
  const githubUsername = data.site.siteMetadata.githubRepo.split('/')[0];

  return (
    <div className="bio">
      {hasLocalAvatar ? (
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../../../data/images/avatar.png"
          width={50}
          height={50}
          quality={100}
          alt="Profile picture"
        />
      ) : (
        <Avatar
          src={`https://avatars.githubusercontent.com/${githubUsername}`}
          alt="author avatar"
        />
      )}
      {author?.name && (
        <div>
          <a href={author.link} target="_blank">
            <strong>{author.name}</strong>
          </a>
          <p>{author?.bio || null}</p>
        </div>
      )}
    </div>
  );
};

export default Bio;
