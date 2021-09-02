import * as React from 'react';
import { graphql } from 'gatsby';
import PostLayout from '../../../components/post/post-layout';
import Seo from '../../../components/seo';
import Bio from '../../../components/bio';
import PostTags from '../../../components/post/post-tags';

const TagIndex = ({ data }) => {
  const tags = data.allTag.nodes.map(item => item.name);

  if (tags.length === 0) {
    return (
      <PostLayout>
        <Seo title="All tags" />
        <Bio />
        <p>No Tags found. Add tags filed to post's frontmatter.</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <Seo title="All posts" />
      <Bio />
      <PostTags tags={tags} />
    </PostLayout>
  );
};

export default TagIndex;

export const pageQuery = graphql`
  query {
    allTag {
      nodes {
        name
        id
      }
    }
  }
`;
