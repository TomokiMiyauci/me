import React from "react";
import { GatsbySSR } from "gatsby";

const onRenderBody: GatsbySSR["onRenderBody"] = ({
  pathname,
  setHeadComponents,
  pluginOptions,
}) => {
  console.log(pathname, pluginOptions);
};

const config: GatsbySSR = {
  onRenderBody,
};

export default config;
