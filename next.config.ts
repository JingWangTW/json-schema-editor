import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: "/json-schema-editor",

  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "react/compiler-runtime": "react-compiler-runtime",
    },
  },
};

export default nextConfig;
