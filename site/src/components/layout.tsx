import * as React from 'react';
import styled from '@emotion/styled';
import HeaderNav from './header-nav';
import Footer from './footer';
import clsx from 'clsx';

const GlobalWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px minmax(200px, 1fr) auto;
  min-height: 100vh;
  max-width: var(--maxWidth-wrapper);

  .limited-width {
    max-width: var(--maxWidth-post);
    padding: var(--spacing-10) var(--spacing-5);
    margin: var(--spacing-0) auto;

    @media (min-width: 48rem) {
      min-width: var(--maxWidth-post);
    }
  }
`;

const Layout = ({ children, full = true }) => {
  return (
    <GlobalWrapper className="global-wrapper">
      <HeaderNav />
      <main
        className={clsx({
          'limited-width': !full,
        })}
      >
        {children}
      </main>
      <Footer />
    </GlobalWrapper>
  );
};

export default Layout;
