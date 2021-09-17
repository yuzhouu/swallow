import { Link } from 'gatsby';
import styled from '@emotion/styled';

const HeroWrapper = styled.div`
  padding: var(--spacing-12) var(--spacing-6);

  .hero__hey {
    font-size: var(--fontSize-2);
    font-weight: var(--fontWeight-bold);
  }

  .hero__about {
    font-weight: var(--fontWeight-medium);
  }
`;

const Hero = () => {
  return (
    <HeroWrapper>
      <h1 className="hero__hey">Hi! I'm Yuzhou</h1>
      <h2 className="hero__about-title">I'm a developer, writter</h2>
      <p className="hero__about">
        Welcome! It's great to have you here. I'm curious about the things under the nut, and I
        write some post about javascript and golang.
      </p>
      <Link to="/blog">Blog</Link>
    </HeroWrapper>
  );
};

export default Hero;
