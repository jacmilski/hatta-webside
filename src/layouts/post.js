import React from 'react';
//import Image from 'gatsby-image';
import { GatsbyImage } from 'gatsby-plugin-image';
//import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

export const query = graphql`
  query querySingleArticle($id: String!) {
  datoCmsArticle(id: {eq: $id}) {
    title
    featuredImage {
      gatsbyImageData(
        width: 500,
        placeholder: TRACED_SVG,
      )
    }
    author
    articleContent {
      ... on DatoCmsHeading {
        headingContent
        id
      }
      ... on DatoCmsParagraph {
        paragraphContent
        id
      }
      ... on DatoCmsArticleImage {
        imageData {
          gatsbyImageData(
          width: 400,
          placeholder: TRACED_SVG,
          )
        }
        id
      }
    }
  }
}
`;

const PostLayout = ({ data }) => {
  return (
    <div>
      <h1>{data.datoCmsArticle.title}</h1>
      <p>{data.datoCmsArticle.author}</p>
      <GatsbyImage image={data.datoCmsArticle.featuredImage.gatsbyImageData} />
      <div>
        {data.datoCmsArticle.articleContent.map(item => {
          const itemKey = Object.keys(item)[0];
          
          switch (itemKey) {
            case 'paragraphContent':
              return <p key={item.id}>{item[itemKey]}</p>;
            case 'headingContent':
              return <h2 key={item.id}>{item[itemKey]}</h2>;
            case 'imageData':
              return <GatsbyImage key={item.id} image={item[itemKey].gatsbyImageData} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default PostLayout;
