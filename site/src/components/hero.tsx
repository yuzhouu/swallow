import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';

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

const HeroWrapper = styled.div`
  padding: var(--spacing-12) 0;
  display: flex;

  .btn-link {
    background: var(--color-primary);
    padding: 10px 38px;
    color: #fff;
    text-decoration: none;
    border-radius: 100px;
    font-weight: bold;
  }

  .left {
    width: 50%;
  }

  .right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero__hey {
    font-size: var(--fontSize-2);
    font-weight: var(--fontWeight-bold);
  }

  .hero__about {
    font-weight: var(--fontWeight-medium);
  }
`;

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          githubRepo
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const githubUsername = data.site.siteMetadata.githubRepo.split('/')[0];

  return (
    <HeroWrapper>
      <div className="left">
        <h1 className="hero__hey">你好呀! 我是 Yuzhou</h1>
        <h2 className="hero__about-title">一个不知名星空摄影师，developer</h2>
        <p className="hero__about">
          Welcome! It's great to have you here. I'm curious about the things under the nut, and I
          write some post about javascript and golang.
        </p>
        <Link className="btn-link" to="/blog">
          Blog
        </Link>
      </div>
      <div className="right">
        {hasLocalAvatar ? (
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={['auto', 'webp', 'avif']}
            src="../../../data/images/avatar.png"
            width={150}
            height={150}
            quality={100}
            alt="Profile picture"
          />
        ) : (
          <Avatar
            src={`https://avatars.githubusercontent.com/${githubUsername}`}
            alt="author avatar"
          />
        )}
      </div>
    </HeroWrapper>
  );
};

export default Hero;
