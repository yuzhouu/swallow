import * as React from 'react';
import styled from '@emotion/styled';
import HeaderNav from './header-nav';
import Footer from './footer';

const GlobalWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px minmax(200px, 1fr) auto;
  min-height: 100vh;
  max-width: var(--maxWidth-wrapper);

  .main-wrapper {
    padding: var(--spacing-0) var(--spacing-16);

    @media (max-width: 66.8rem) {
      padding: var(--spacing-0) var(--spacing-5);
    }
  }
`;

const Layout = ({ children, full = true }) => {
  return (
    <GlobalWrapper className="global-wrapper">
      <HeaderNav />
      <main className="main-wrapper">{children}</main>
      <Footer />
    </GlobalWrapper>
  );
};

export default Layout;
