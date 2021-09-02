import * as React from 'react';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import Seo from '../components/seo';

const Wrapper = styled.div`
  padding: var(--spacing-0) var(--spacing-16);

  @media (max-width: 56rem) {
    padding: var(--spacing-0) var(--spacing-5);
  }
`;

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout>
      <Seo title="404: Not Found" />
      <Wrapper>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Wrapper>
    </Layout>
  );
};

export default NotFoundPage;
