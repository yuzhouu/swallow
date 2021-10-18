import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Hero from '../components/hero';
import RecentlyPublished from '../components/recently-published';

const Home = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <Hero />
      <RecentlyPublished />
    </Layout>
  );
};

export default Home;
