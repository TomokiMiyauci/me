import React, { FC } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import oceanicNext from 'prism-react-renderer/themes/oceanicNext'
import { head } from 'fonction'
import contentCopy from '@iconify-icons/mdi/content-copy'
import { Icon } from '@iconify/react'
import confetti from 'canvas-confetti'
import { languageMap, parseCodeBlockHeader } from '../utils/code_block'

const CodeBlock: FC<{ children: string; className: string }> = ({
  children,
  className
}) => {
  const { ext, filePath, highlights } = parseCodeBlockHeader(className)
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
        const _tokens = head(tokens)
        return (
          <div className="relative group my-6 text-sm">
            <div className="flex -mx-4 md:mx-0 md:rounded-md overflow-x-auto bg-grey">
              <div className="text-right select-none sticky left-0 border-r border-gray-600 px-2 py-4 text-gray-600 bg-grey">
                {_tokens.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <div className="py-4 flex-1 overflow-x-scroll scrollbar-thin scrollbar-track-grey scrollbar-thumb-accent md:scrollbar-thumb-rounded">
                <pre
                  className={`${className} float-left min-w-full`}
                  style={style}
                >
                  {head(tokens).map((line, i) => {
                    const { className, ...rest } = getLineProps({
                      line,
                      key: i
                    })
                    return (
                      <div
                        className={`px-3 md:px-4 ${className} ${
                          highlights.includes(i + 1)
                            ? 'border-l-[3px] border-accent bg-true-gray-400 bg-opacity-30'
                            : ''
                        }`}
                        key={i}
                        {...rest}
                      >
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    )
                  })}
                </pre>
              </div>
            </div>

            {filePath && (
              <span className="absolute bg-blue-gray-700 text-gray-200 -top-4 py-1 px-2 md:left-4 rounded-sm md:rounded-md">
                {filePath}
              </span>
            )}

            <span className="absolute select-none -right-2 md:right-2 top-0 text-gray-400">
              {ext}
            </span>

            <button
              title="Copy to clipboard"
              onClick={copy2Clipboard}
              className="rounded
              absolute
              opacity-40
              transition-opacity
              duration-300
              group-hover:opacity-100
              -right-2
              md:right-2
              bottom-2
              bg-blue-gray-700
              flex
              items-center
              text-accent
              p-1
              md:p-2"
            >
              <Icon className={`rounded-md flex w-6 h-6`} icon={contentCopy} />
            </button>
          </div>
        )
      }}
    </Highlight>
  )
}

export default CodeBlock
