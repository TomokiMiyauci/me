import { resolve } from "path";
import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const blogPost = resolve(`./src/templates/BlogPost.tsx`);
  const result = await graphql(`
    {
      blog: allMdx(
        filter: { fields: { locale: { eq: "ja" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            slug
          }
          id
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.blog.nodes;

  posts.forEach(({ frontmatter }, index) => {
    const previousPostSlug =
      index === 0 ? null : posts[index - 1].frontmatter.slug;
    const nextPostSlug =
      index === posts.length - 1 ? null : posts[index + 1].frontmatter.slug;

    createPage({
      path: frontmatter.slug,
      component: blogPost,
      context: {
        previousPostSlug,
        nextPostSlug,
        slug: frontmatter.slug,
      },
    });
  });
};
