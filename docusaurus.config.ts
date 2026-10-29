import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, Plugin} from '@docusaurus/types';
import type {LoadedContent, Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import path from 'node:path';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const collator = new Intl.Collator('en-GB', {sensitivity: 'base'});

type SidebarGenerator = NonNullable<DocsOptions['sidebarItemsGenerator']>;
const alphabeticalSidebar: SidebarGenerator = async (args) => {
  const items = await args.defaultSidebarItemsGenerator(args);
  const docs = new Map(args.docs.map((doc) => [doc.id, doc]));
  const homeId = args.docs.find((doc) => doc.frontMatter.slug === '/')?.id;

  function sortItems(entries: typeof items): typeof items {
    const sorted = entries.map((item) =>
      item.type === 'category' ? {...item, items: sortItems(item.items)} : item,
    );
    function key(item: (typeof items)[number]) {
      const id = item.type === 'doc' || item.type === 'ref'
        ? item.id
        : item.type === 'category' && item.link?.type === 'doc'
          ? item.link.id
          : undefined;
      const doc = id ? docs.get(id) : undefined;
      const label = item.type === 'category'
        ? item.label
        : doc?.frontMatter.sidebar_label ??
          ('label' in item ? item.label : undefined) ?? doc?.title ?? '';
      const filename = doc && doc.frontMatter.parse_number_prefixes !== false
        ? args.numberPrefixParser(path.parse(doc.source).name).numberPrefix
        : undefined;
      const position = filename ?? doc?.frontMatter.sidebar_position;
      return {
        home: homeId !== undefined && id === homeId,
        group: filename !== undefined ? 0 : position !== undefined ? 1 : 2,
        position: position ?? 0,
        label,
        id: id ?? label,
      };
    }
    return sorted.sort((a, b) => {
      const x = key(a);
      const y = key(b);
      return (
        Number(y.home) - Number(x.home) ||
        x.group - y.group ||
        x.position - y.position ||
        collator.compare(x.label, y.label) ||
        x.id.localeCompare(y.id, 'en-GB')
      );
    });
  }
  return sortItems(items);
};

function paperDatesPlugin(): Plugin {
  return {
    name: 'paper-update-dates',
    allContentLoaded({allContent, actions}) {
      const instances = allContent['docusaurus-plugin-content-docs'] ?? {};
      const dates: Record<string, Record<string, Record<string, number | null>>> = {};
      for (const [pluginId, content] of Object.entries(instances)) {
        const loaded = content as LoadedContent;
        dates[pluginId] = {};
        for (const version of loaded.loadedVersions) {
          const versionDates: Record<string, number | null> = {};
          for (const doc of [...version.docs, ...version.drafts]) {
            if (doc.slug === '/') continue;
            const date = doc.frontMatter.last_update?.date;
            versionDates[doc.id] = date == null ? null : new Date(date).getTime();
          }
          dates[pluginId][version.versionName] = versionDates;
        }
      }
      actions.setGlobalData(dates);
    },
  };
}

const config: Config = {
  title: 'Papers',
  tagline: 'Dinosaurs are cool',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_vcs: false,
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

  plugins: [paperDatesPlugin],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator: alphabeticalSidebar,
          showLastUpdateTime: true,
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
          href: 'https://github.com/lib-port/papers',
          label: 'GitHub',
          target: '_self',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} lib-port. Built with Docusaurus and GitHub Pages.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
