import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Hero from '../components/hero';
import RecentlyPublished from '../components/recently-published';
import ExploreTags from '../components/explore-tags';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: var(--spacing-10);
  padding: var(--spacing-24) 0;

  @media (max-width: 64rem) {
    grid-template-columns: 1fr;
  }
`;

const Home = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <Hero />
      <Wrapper>
        <RecentlyPublished />
        <ExploreTags />
      </Wrapper>
    </Layout>
  );
};

export default Home;
