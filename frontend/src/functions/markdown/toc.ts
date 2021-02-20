import remark from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
type Depth = 1 | 2 | 3 | 4 | 5 | 6

type Children = {
  type: 'heading'
  value: string
  depth: Depth
  children: Children[]
}

type Toc = {
  title: string
  depth: Depth
  hash: string
}

const getToc = (val: string): Toc[] => {
  const ast = remark().use(remarkFrontmatter).parse(val).children as Children[]
  return ast
    .filter(({ type }) => type === 'heading')
    .map(({ children, depth }) => {
      const value = children[0].value

      return {
        title: value,
        depth,
        hash: `#${value.toLowerCase().replace(/ /g, '-')}`
      }
    })
}

export { getToc, Toc }
