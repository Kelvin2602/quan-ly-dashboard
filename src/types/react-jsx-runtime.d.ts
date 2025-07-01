declare module "react/jsx-runtime" {
  import React from "react";
  export default React;
  export * from "react";
}

// Support for the dev runtime used in development / FastRefresh.
declare module "react/jsx-dev-runtime" {
  import React from "react";
  export default React;
  export * from "react";
}