import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import HeaderNav from './header-nav';

const Layout = ({ location, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              link
            }
          }
        }
      }
    `
  );

  const header = (
    <Link className="header-link-home" to="/">
      {title}
    </Link>
  );

  return (
    <div className="global-wrapper">
      <HeaderNav />
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} ♥︎ <a href={site.siteMetadata.author.link}>YuZhou</a>
      </footer>
    </div>
  );
};

export default Layout;
