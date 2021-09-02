import * as React from 'react';
import styled from '@emotion/styled';
import HeaderNav from './header-nav';
import Footer from './footer';

const GlobalWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px minmax(200px, 1fr) auto;
  min-height: 100vh;
  max-width: var(--maxWidth-wrapper);
`;

const Layout = ({ children }) => {
  return (
    <GlobalWrapper className="global-wrapper">
      <HeaderNav />
      <main>{children}</main>
      <Footer />
    </GlobalWrapper>
  );
};

export default Layout;
