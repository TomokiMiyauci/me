import React, { FC } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import oceanicNext from 'prism-react-renderer/themes/oceanicNext'
import { head } from 'fonction'
import { replace } from 'core-fn'
import contentCopy from '@iconify-icons/mdi/content-copy'
import { Icon } from '@iconify/react'
import confetti from 'canvas-confetti'

const parseBlock = replace(/language-/, '')

const languageMap = (ext: string): Language => {
  switch (ext) {
    case 'ts': {
      return 'typescript'
    }
    case 'js': {
      return 'javascript'
    }

    case 'md': {
      return 'markdown'
    }

    default: {
      return ext as Language
    }
  }
}

const CodeBlock: FC<{ children: string; className: string }> = ({
  children,
  className
}) => {
  const block = parseBlock(className)
  const { ext, filePath } =
    /^(?<ext>[a-z]+):?(?<filePath>.*)/.exec(block).groups ?? {}

  const copy2Clipboard = (): void => {
    navigator.clipboard.writeText(children)
    confetti()
  }

  return (
    <Highlight
      {...defaultProps}
      code={children}
      theme={oceanicNext}
      language={languageMap(ext)}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <div className="relative group my-6 text-sm">
            <div
              className=" flex -mx-4 md:rounded-md   overflow-x-auto"
              style={{ backgroundColor: 'rgb(40, 44, 52)' }}
            >
              <div
                className="text-right select-none sticky left-0 border-r border-gray-600 px-2 py-4 text-gray-600"
                style={{ backgroundColor: 'rgb(40, 44, 52)' }}
              >
                {head(tokens).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <div className="px-3 md:px-4 overflow-x-scroll">
                <div className="py-4 overflow-x-scroll">
                  <pre className={`${className} `} style={style}>
                    {head(tokens).map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>

            {filePath && (
              <span className="absolute bg-gray-700 text-gray-200 -top-4 py-1 px-2 rounded-sm md:rounded-md">
                {filePath}
              </span>
            )}

            <span className="absolute -right-2 top-0 text-gray-400">{ext}</span>

            <button
              title="Copy to clipboard"
              onClick={copy2Clipboard}
              className="rounded
              absolute
              opacity-50
              transition-opacity
              duration-300
              group-hover:opacity-100
              -right-2
              md:right-2
              bottom-2
              bg-gray-700
              flex
              items-center
              text-cyan-500
              p-2"
            >
              <Icon
                className="rounded-md w-6 h-6 flex shadow bg-gray-600"
                icon={contentCopy}
              />
            </button>
          </div>
        )
      }}
    </Highlight>
  )
}

export default CodeBlock
