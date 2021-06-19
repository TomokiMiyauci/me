import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";
import Article from "../components/Article";
import { BlogPostBySlugQuery } from "../../graphql-types";
import ArticleHeadline from "../components/ArticleHeadline";
import Layout from "../components/Layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
import { useLocalization } from "gatsby-theme-i18n";

const BlogPostTemplate: FC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  location,
  pageContext,
}) => {
  const {
    previous,
    next,
    mdx,
    site: { siteMetadata },
  } = data;

  const { frontmatter, body, timeToRead } = mdx || {
    frontmatter: { hero: {} },
  };
  const { title, description, hero, date } = frontmatter;
  const { publicURL, childImageSharp } = hero;
  const fullpath = new URL(location.pathname, siteMetadata.siteUrl).toString();
  const { locale } = useLocalization();

  return (
    <Layout originalPath={pageContext.originalPath}>
      <Seo
        title={title}
        description={description}
        fullpath={fullpath}
        imgUrl={publicURL}
      />

      <Helmet>
        <meta name="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {body ? (
        <>
          <Article
            title={title}
            description={description}
            hero={childImageSharp.gatsbyImageData}
            timeToRead={timeToRead}
            relativePath={location.pathname}
            date={new Date(date).toLocaleDateString(locale)}
          >
            <section className="prose mx-auto" itemProp="articleBody">
              <MDXRenderer>{body}</MDXRenderer>
            </section>
          </Article>

          <hr className="prose mx-auto mt-4" />

          <div className=" max-w-prose mx-auto my-10">
            <h3 className="text-3xl mb-6">Other Article</h3>

            <nav>
              <ul className="space-y-2 -mx-2">
                {previous && (
                  <li>
                    <ArticleHeadline
                      title={previous.frontmatter.title}
                      description={previous.frontmatter.description}
                      img={
                        previous.frontmatter.thumbnail.childImageSharp
                          .gatsbyImageData
                      }
                      to={previous.frontmatter.slug}
                      readingTime={previous.timeToRead}
                      lastUpdated={previous.frontmatter.date}
                      alt="previous article thumbnail"
                    />
                  </li>
                )}
                {next && (
                  <li>
                    <ArticleHeadline
                      title={next.frontmatter.title}
                      description={next.frontmatter.description}
                      img={
                        next.frontmatter.thumbnail.childImageSharp
                          .gatsbyImageData
                      }
                      to={next.frontmatter.slug}
                      readingTime={next.timeToRead}
                      lastUpdated={next.frontmatter.date}
                      alt="next article thumbnail"
                    />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <div className="container mx-auto">This page is not yet complete.</div>
      )}
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $locale: String!
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      frontmatter {
        title
        description
        date
        hero {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        date
        slug
      }
      body
      timeToRead
    }
    previous: mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $previousPostSlug } }
    ) {
      timeToRead
      frontmatter {
        title
        description
        date
        thumbnail {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
          }
        }
        slug
      }
    }
    next: mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $nextPostSlug } }
    ) {
      timeToRead
      frontmatter {
        title
        description
        date
        thumbnail {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
          }
        }
        slug
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
