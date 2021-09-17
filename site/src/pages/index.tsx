import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Hero from '../components/hero';

const Home = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <Hero />
    </Layout>
  );
};

export default Home;
