import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { IconBrandGithub, IconRss, IconHeart } from '@tabler/icons';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: var(--spacing-12);

  .footer-bg {
    background: #f8f8fc;
    color: #4f4b63;
    padding-top: var(--spacing-16);
    padding-bottom: var(--spacing-16);
  }

  .copyright {
    padding: var(--spacing-2) var(--spacing-0);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer__wave {
    width: 100%;
    flex-shrink: 0;
    overflow: visible;

    path {
      fill: #f8f8fc;
    }
  }

  .footer-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    margin: 0;
  }

  ul li {
    list-style: none;
    a {
      padding: 10px;
      color: #4f4b63;
    }
  }
`;

const PowerBy = styled.div`
  margin-left: 24px;
  position: relative;
  font-size: 14px;
  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 13px;
    background: #4f4b63;
    border-radius: 1px;
    left: -11px;
    top: 4px;
  }
`;

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            githubRepo
            footerLinks {
              name
              link
            }
            author {
              name
              link
            }
          }
        }
      }
    `
  );

  const renderIcon = (name: string) => {
    switch (name) {
      case 'github':
        return <IconBrandGithub />;
      case 'rss':
        return <IconRss />;
    }
  };

  return (
    <StyledFooter>
      <svg
        width="1440"
        height="120"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="footer__wave"
      >
        <path
          d="M0 0L48 8.875C96 17.9167 192 35.4167 288 53.3333C384 71.25 480 88.75 576 82.2083C672 75.4167 768 44.5833 864 26.6667C960 8.75 1056 4.58333 1152 11.125C1248 17.9167 1344 35.4167 1392 44.4583L1440 53.3333V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
          fill="black"
        ></path>
      </svg>
      <div className="footer-bg container">
        <ul className="footer-row">
          {site.siteMetadata.footerLinks.map(item => {
            return (
              <li key={item.name}>
                <a href={item.link}>{renderIcon(item.name)}</a>
              </li>
            );
          })}
        </ul>
        <div className="copyright">
          <span>
            © {new Date().getFullYear()}, <IconHeart size={14} />{' '}
            <a href={site.siteMetadata.author.link}>{site.siteMetadata.author.name}</a>
          </span>
          <PowerBy className="powered-by">
            Powered by <a href="https://github.com/yuzhouu/swallow">Swallow</a>
          </PowerBy>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
