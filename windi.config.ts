import { defineConfig } from "windicss/helpers";
import typography from "windicss/plugin/typography";
import lineClamp from "windicss/plugin/line-clamp";

export default defineConfig({
  safelist: ["prose", "-left-6"],
  extract: {
    include: ["gatsby-*.js", "src/**/*.{js,tsx}", "config/**/*.ts"],
  },
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: false,
            blockquote: {
              color: false,
            },
            a: {
              color: "rgba(124, 58, 237)",
            },
            "a code": {
              color: "rgba(124, 58, 237)",
            },
            "a:hover": {
              "-webkit-text-decoration-line": "underline",
              "text-decoration-line": "underline",
            },
            pre: false,
            code: {
              backgroundColor: false,
              borderRadius: "0.375rem",
              marginLeft: "0.25rem",
              marginRight: "0.25rem",
              padding: "0.25rem",
              color: "rgb(6, 182, 212)",
            },
            img: {
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);",
              borderRadius: "0.375rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            h2: {
              color: false,
            },
            h3: {
              color: false,
            },
            h4: {
              color: false,
            },
            h5: {
              color: false,
            },
            h6: {
              color: false,
            },

            "code::before": false,
            "code::after": false,
            "pre code": false,
            table: {
              overflow: "hidden",
              borderCollapse: "collapse",
              borderRadius: "0.375rem",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);",
            },
            thead: {
              backgroundColor: false,
              color: false,
              borderBottomColor: false,
            },
            "thead th": {
              padding: "0.25rem 0.5rem",
            },
            "tbody tr": {
              borderBottomColor: false,
            },
            "thead th:first-child": false,
            "tbody td:first-child": false,
            "tbody td:last-child": false,
          },
        },
      },
    },
  },
  plugins: [typography(), lineClamp],
});