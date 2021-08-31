import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  padding: var(--spacing-6) var(--spacing-16);
  background: var(--color-footer-bg);
  color: #fff;
  display: grid;

  @media (max-width: 56rem) {
    padding: var(--spacing-6) var(--spacing-5);
  }

  .site-title {
    grid-column: 1/3;

    a {
      background: #fff;
      color: var(--color-footer-bg);
      font-weight: var(--fontWeight-black);
      font-size: var(--fontSize-4);
      padding: var(--spacing-0) var(--spacing-1);
      text-decoration: none;
    }
  }

  .copyright {
    grid-column: 1/3;
    padding: var(--spacing-2) var(--spacing-0);
    border-top: 1px solid #fff;
  }

  .footer-title {
    font-weight: var(--fontWeight-bold);
    margin-bottom: var(--spacing-4);
  }

  .footer-col {
    padding: var(--spacing-8) var(--spacing-0);

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style: none;
      margin-bottom: var(--spacing-2);

      a {
        color: #fff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            gitRepo
            author {
              name
              link
              socialLinks {
                name
                link
              }
            }
          }
        }
      }
    `
  );

  return (
    <StyledFooter>
      <div className="site-title">
        <Link to="/">{site.siteMetadata.title}</Link>
      </div>
      <div className="footer-col" style={{ gridColumn: '1/2' }}>
        <div className="footer-title">More</div>
        <ul>
          {site.siteMetadata.author.socialLinks.map(item => {
            return (
              <li key={item.name}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
          <li>
            <Link to="/rss.xml">Rss</Link>
          </li>
        </ul>
      </div>
      <div className="footer-col" style={{ gridColumn: '2/3' }}>
        <div className="footer-title">Contribute</div>
        <ul>
          <li>
            <Link to={site.siteMetadata.gitRepo}>Github Repo</Link>
          </li>
        </ul>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} ♥︎{' '}
        <Link to={site.siteMetadata.author.link}>{site.siteMetadata.author.name}</Link>
      </div>
    </StyledFooter>
  );
};

export default Footer;
