import { graphql, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Seo from '../components/seo';

const Bio = styled.div`
  text-align: center;
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-post);
  padding: var(--spacing-10) var(--spacing-5);

  .bio-avatar {
    margin: 0 auto;
  }

  p {
    margin: var(--spacing-8) var(--spacing-0);
  }

  .social-links {
    margin: var(--spacing-10) var(--spacing-0);
  }

  ul {
    padding: var(--spacing-2) 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li {
    list-style: none;
    margin: 0;

    & + li {
      margin-left: 20px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--color-text-light);
        border-radius: 50%;
        left: -11px;
        top: 10px;
      }
    }
  }
`;

const About = ({
  data,
}: PageProps & {
  data: {
    site: {
      siteMetadata: {
        author: {
          name: string;
          bio: string;
          link: string;
          socialLinks: Array<{ name: string; link: string }>;
        };
      };
    };
  };
}) => {
  const author = data.site.siteMetadata.author;

  return (
    <Layout>
      <Seo title="About me" />
      <Bio>
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../../../data/images/avatar.png"
          width={50}
          height={50}
          quality={100}
          alt="Profile picture"
        />
        <p>
          <a href={author.link} target="_blank">
            <strong>{author.name}</strong>
          </a>
        </p>
        <p>{author.bio}</p>

        {author.socialLinks.length && (
          <div className="social-links">
            You can find me here
            <br />
            <ul>
              {author.socialLinks.map(item => {
                return (
                  <li key={item.name}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Bio>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          bio
          link
          socialLinks {
            name
            link
          }
        }
      }
    }
  }
`;
