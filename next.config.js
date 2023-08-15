/** @type {import('next').NextConfig} */
// const nextConfig = {};
const removeImports = require("next-remove-imports")();

module.exports = removeImports({
    experimental: { esmExternals: true },
    output: "export",
    basePath: "/json-schema-editor",
});

// module.exports = nextConfig;
