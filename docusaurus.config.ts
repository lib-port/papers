import type {PrismTheme} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

function createGreyscaleCodeTheme(
  foreground: string,
  background: string,
  secondary: string,
  accent: string,
): PrismTheme {
  return {
    plain: {color: foreground, backgroundColor: background},
    styles: [
      {
        types: ['comment', 'prolog', 'doctype', 'cdata'],
        style: {color: secondary, fontStyle: 'italic'},
      },
      {
        types: ['keyword', 'atrule'],
        style: {color: foreground, fontWeight: 'bold'},
      },
      {
        types: ['string', 'char', 'number', 'boolean'],
        style: {color: accent},
      },
      {types: ['bold'], style: {fontWeight: 'bold'}},
      {types: ['italic'], style: {fontStyle: 'italic'}},
    ],
  };
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Papers',
  tagline: 'Dinosaurs are cool',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://lib-port.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/papers/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lib-port', // Usually your GitHub org/user name.
  projectName: 'papers', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Papers',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Home',
        },
        {
          href: 'https://github.com/lib-port/papers',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} lib-port. Built with Docusaurus and GitHub Pages.`,
    },
    prism: {
      theme: createGreyscaleCodeTheme('#242424', '#f0f0f0', '#626262', '#525252'),
      darkTheme: createGreyscaleCodeTheme('#e6e6e6', '#242424', '#b0b0b0', '#d4d4d4'),
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
