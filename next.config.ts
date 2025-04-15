import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "cdn.builder.io",
        protocol: "https",
      },
    ],
  },
  // Removed the SVGR webpack configuration as we are using manual components
  /*
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule | '...') =>
      rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test(".svg")
    ) as RuleSetRule | undefined; // Type assertion and check for object

    if (fileLoaderRule) {
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] }, // exclude if *.svg?url, handle potential undefined 'not'
          use: ["@svgr/webpack"],
        }
      );

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
    } else {
      // Handle case where default SVG rule was not found (less likely but good practice)
      config.module.rules.push({
        test: /\.svg$/i,
        // A common issuer condition, adjust if needed based on your project structure
        issuer: { not: /\.(css|scss|sass)$/i },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      });
    }

    return config;
  },
  */
};

export default nextConfig;
