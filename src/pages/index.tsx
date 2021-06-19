import React, { FC } from "react";
import Me from "../components/Me";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { PageProps, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { LocalizedLink, useLocalization } from "gatsby-theme-i18n";
const IndexPage: FC<PageProps> = ({
  pageContext: { originalPath },
  data,
  location,
}) => {
  const {
    site: { siteMetadata },
  } = data;
  const { siteUrl } = siteMetadata;
  const { locale } = useLocalization();
  const fullpath = new URL(location.pathname, siteUrl).toString();

  return (
    <Layout originalPath={originalPath}>
      <Seo title="Home" fullpath={fullpath} />

      <Helmet>
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <div className="container max-w-4xl mx-auto md:p-14">
        <Me />

        <div className="mt-10 md:mt-30 md:grid md:grid-cols-2">
          <LocalizedLink
            to="/posts"
            language={locale}
            className="rounded-md block bg-gradient-to-r p-6 md:p-10 from-purple-800 to-pink-700 text-2xl shadow"
          >
            <p className="text-gray-200">
              Technology Information Blog. I write about anything that comes to
              my mind, regardless of the field.
            </p>
            <h2 className="mt-10 text-5xl font-semibold text-white">Blog</h2>
          </LocalizedLink>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query Home {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
