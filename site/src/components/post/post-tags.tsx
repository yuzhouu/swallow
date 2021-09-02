import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { memo } from 'react';
import slugify from '@sindresorhus/slugify';

interface Props {
  tags: string[];
}

const TagList = styled.ul`
  margin: var(--spacing-0);
  padding: var(--spacing-0);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  li {
    list-style: none;
    position: relative;

    & + li {
      margin-left: var(--spacing-2);

      &::before {
        content: '';
        width: 1px;
        height: 10px;
        background: var(--color-border);
        display: inline-block;
        position: absolute;
        top: 9px;
        left: -4px;
      }
    }

    a {
      display: inline-block;
      padding: var(--spacing-0) var(--spacing-2);
      text-decoration: none;
    }
  }
`;

const PostTags = ({ tags }: Props) => {
  return (
    <div className="d-flex">
      Tags: &nbsp;
      <TagList>
        {tags
          .sort((a, b) => {
            return a.localeCompare(b);
          })
          .map(tag => {
            return (
              <li key={tag}>
                <Link to={`/blog/tags/${slugify(tag)}`}>{tag}</Link>
              </li>
            );
          })}
      </TagList>
    </div>
  );
};

export default memo(PostTags);
