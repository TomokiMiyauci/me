import React, { FC, ReactChild } from "react";
const CodeGroup: FC<{ children: ReactChild; label: string; active?: boolean }> =
  ({ children }) => <>{children}</>;

export default CodeGroup;
