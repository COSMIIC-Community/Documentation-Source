// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'COSMIIC Documentation',
  tagline: 'Community-Driven Open Source Neuromodulation',
  favicon: 'img/Cosmiic_favicon-150x150.png',

  // Set the production url of your site here
  url: 'https://cosmiic-community.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'COSMIIC-Community', // Usually your GitHub org/user name.
  projectName: 'COSMIIC-Community.github.io', // Usually your repo name.
  deploymentBranch: 'main', //  deployment branch on COSMIIC-Community.github.io repo

  // Handling bad links and images
  onBrokenLinks: 'warn',

  /// Updated for deprecation approaching for Docusaurus v4.0. Previously set to 'throw' to allow category/Implantables in Welcome.md 
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',

    },
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve the docs at the site's root example.com/docs/intro becomes example.com with other docs at example.com/other-doc
          editUrl: 'https://github.com/COSMIIC-Community/COSMIIC-Documentation/blob/main/',
          showLastUpdateTime: true,
        },
        blog: false, // optional: disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-LXFTE1J7LY',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-TDS2SC8F',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/COSMIIC-square-logo.svg',

      announcementBar: {
        id: 'support_us',
        content:
          'Announcement: Follow us on LinkedIn at https://www.linkedin.com/company/cosmiic/ for the latest updates!',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },

      navbar: 
      {
        style: 'primary',
        hideOnScroll: true,
        title: 'COSMIIC Documentation',
        logo: 
        {
          alt: 'COSMIIC Logo',
          src: 'img/Cosmiic_favicon-150x150.png',
        },
        items: 
        [
          {
            href: 'https://github.com/COSMIIC-Community',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://cosmiic.org',
            label: 'Main Site',
            position: 'right',
          },
          {
            href: 'https://cosmiic.atlassian.net/servicedesk/customer/portal/1/group/1/create/19',
            label: 'Contact',
            position: 'right',
          },
        ],
      },
      footer: 
      {
        style: 'dark',
        logo: 
        {
          src: 'img/Cosmiic_favicon-150x150.png',
          width: 75,
          height: 75,
        },
        copyright: `Copyright © ${new Date().getFullYear()} COSMIIC`,
      },
      themes: ['@docusaurus/theme-mermaid'],
      prism: 
      {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['matlab'],
      },
      algolia: {
      // The application ID provided by Algolia
      appId: 'GKQORT55LO',

      // Public API key: it is safe to commit it
      apiKey: '5b3acbd17f49a2d2324650e240d123d3',

      indexName: 'COSMIIC Documentation',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,
    },
    }),
};

module.exports = config;
