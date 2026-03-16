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
          // Please change this to your repo.
        },
        blog: false, // optional: disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-M6W11VVRPY',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-N93QS9GJ',
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
          {
            href: 'https://cosmiic.org/join-now/',
            label: 'Join Newsletter',
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
    }),
};

module.exports = config;
