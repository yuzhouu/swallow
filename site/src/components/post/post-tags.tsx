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

    & + li {
      margin-left: var(--spacing-2);
    }

    a {
      display: inline-block;
      padding: var(--spacing-0) var(--spacing-2);
      text-decoration: none;
      border: 1px solid var(--color-border);
      border-radius: 3px;
    }
  }
`;

const PostTags = ({ tags }: Props) => {
  return (
    <div className="d-flex">
      Tag: &nbsp;
      <TagList>
        {tags.map(tag => {
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
