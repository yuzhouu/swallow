import * as React from 'react';
import styled from '@emotion/styled';
import HeaderNav from './header-nav';
import Footer from './footer';

const GlobalWrapper = styled.div`
  display: grid;
  grid-template-rows: 80px minmax(200px, 1fr) auto;
  min-height: 100vh;
  max-width: var(--maxWidth-wrapper);
`;

const Layout = ({ children, full = true }) => {
  return (
    <GlobalWrapper className="global-wrapper">
      <HeaderNav />
      <main className="main-wrapper container">{children}</main>
      <Footer />
    </GlobalWrapper>
  );
};

export default Layout;
