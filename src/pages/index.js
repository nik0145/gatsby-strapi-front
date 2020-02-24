import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Img from 'gatsby-image'
import SEO from "../components/seo";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
            <Img fixed={document.node.image.childImageSharp.fixed} />
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
export const query = graphql`
query IndexQuery  {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 900, height: 500) {
                base64
                width
                height
                src
                srcSet
              }
            }
          }
          title
          content
        }
      }
    }
  }
`;
