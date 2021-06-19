import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import oceanicNext from "prism-react-renderer/themes/oceanicNext";
import { head } from "fonction";
import cust from "@iconify-icons/mdi-light/content-cut";
import { Icon } from "@iconify/react";
const languageMap = (ext: string): Language => {
  switch (ext) {
    case "ts": {
      return "typescript";
    }
    case "js": {
      return "javascript";
    }

    case "md": {
      return "markdown";
    }

    default: {
      return ext as Language;
    }
  }
};

export default ({ children, className }) => {
  const block = className.replace(/language-/, "");

  const [_, ext, filePath] = /^([a-z]+):?(.*)/.exec(block) || [];

  return (
    <Highlight
      {...defaultProps}
      code={children}
      theme={oceanicNext}
      language={languageMap(ext)}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative my-6 text-sm">
          <div
            className=" flex -mx-4 md:rounded-md   overflow-x-auto"
            style={{ backgroundColor: "rgb(40, 44, 52)" }}
          >
            <div
              className="text-right sticky left-0 border-r border-gray-600 px-2 py-4 text-gray-600 "
              style={{ backgroundColor: "rgb(40, 44, 52)" }}
            >
              {head(tokens).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <div className="p-4">
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

          {filePath && (
            <span className="absolute bg-gray-700 text-gray-200 -top-4 py-1 px-2 rounded-sm md:rounded-md">
              {filePath}
            </span>
          )}

          <span className="absolute -right-2 top-1 text-gray-400">{ext}</span>

          {/* <button className="absolute bottom-0 right-0">
            <Icon
              width="1.2rem"
              height="1.2rem"
              className="rounded-md w-6 flex shadow bg-gray-600"
              icon={cust}
            />
          </button> */}
        </div>
      )}
    </Highlight>
  );
};
