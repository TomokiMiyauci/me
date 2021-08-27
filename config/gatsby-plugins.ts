import { GatsbyConfig } from 'gatsby'
import { resolve } from 'path'
import emoji from 'remark-emoji'
import remarkExternalLinks from 'remark-external-links'
import { SITE_URL as siteUrl, SITE_NAME as name } from './constants'

const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-postcss',
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/
      }
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: ['gatsby-remark-autolink-headers']
    }
  },
  {
    resolve: 'gatsby-plugin-use-dark-mode',
    options: {
      storageKey: 'darkMode',
      classNameDark: 'dark',
      classNameLight: 'light',
      minify: true
    }
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      remarkPlugins: [emoji, remarkExternalLinks],
      gatsbyRemarkPlugins: [
        'gatsby-remark-autolink-headers',
        {
          resolve: `gatsby-remark-plantuml-lite`,
          options: {
            // Configuration options
            imageType: `svg`
          }
        },
        {
          resolve: 'gatsby-remark-images'
        }
      ]
    }
  },
  'gatsby-remark-reading-time',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-theme-i18n',
    options: {
      defaultLang: 'en',
      locales: 'en ja',
      configPath: resolve(__dirname, '..', 'i18n', 'config.json')
    }
  },
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl
    }
  },
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  // 'gatsby-plugin-graphql-codegen',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'posts',
      path: resolve(__dirname, '..', 'posts')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'photos',
      path: resolve(__dirname, '..', 'photos')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'media',
      path: resolve(__dirname, '..', 'media')
    }
  },
  // {
  //   resolve: `gatsby-plugin-clarity`,
  //   options: {
  //     clarity_project_id: '5ipdtj3l7s',
  //     enable_on_dev_env: false
  //   }
  // },
  {
    resolve: `gatsby-alias-imports`,
    options: {
      aliases: {
        '@': resolve(__dirname, '..', 'src')
      }
    }
  },
  // {
  //   resolve: `gatsby-plugin-algolia`,
  //   options: {
  //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
  //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
  //     queries
  //   }
  // },
  'gatsby-plugin-robots-txt',
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage(filter: {context: {originalPath: {nin: ["/404/", "/404.html", "/offline-plugin-app-shell-fallback/"]}}}) {
            nodes {
              path
              context {
                locale
                originalPath
              }
            }
            totalCount
          }
        }
      `,
      resolvePages: (data) => {
        const { nodes } = data.allSitePage

        return nodes.map((node) => {
          const links = nodes
            .filter(
              (_node) =>
                _node.context.originalPath === node.context.originalPath
            )
            .map((f) => ({ lang: f.context.locale, url: f.path }))
          return {
            ...node,
            links
          }
        })
      },
      serialize: (data) => {
        return {
          url: data.path,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'hourly',
          priority: 1.0,
          links: data.links
        }
      }
    }
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      feeds: [
        {
          serialize: ({ query: { allMdx } }) => {
            return allMdx.nodes.map(({ frontmatter, excerpt, fields }) => {
              const { title, date } = frontmatter
              const { fullPath } = fields

              return {
                title,
                description: excerpt,
                date,
                url: fullPath,
                guid: fullPath
              }
            })
          },
          query: `
            {
              allMdx(
                filter: {
                  fileAbsolutePath: { regex: "//posts//" }
                }
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  fields {
                    fullPath
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
          title: name,
          match: '^/posts/'
        }
      ]
    }
  },
  'gatsby-plugin-sass',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name,
      short_name: name,
      start_url: `/`,
      background_color: '#06b6d4',
      theme_color: `#e11d48`,
      display: `standalone`,
      icon: resolve(__dirname, '..', 'static', 'favicon.svg'),
      icon_options: {
        purpose: `any maskable`
      }
    }
  },
  process.env.NODE_ENV === 'development'
    ? ''
    : {
        resolve: 'gatsby-plugin-offline',
        options: {
          appendScript: resolve(
            __dirname,
            '..',
            'src',
            'workers',
            'append_script.js'
          )
        }
      },
  'gatsby-plugin-twitter',
  'gatsby-plugin-loadable-components-ssr',
  'gatsby-plugin-preact',
  'gatsby-plugin-webpack-bundle-analyser-v2'
].filter((plugin) => !!plugin)

export default plugins
