# Papers

A collection of papers published as a [Docusaurus](https://docusaurus.io/) site.

**[Read the papers](https://lib-port.github.io/papers/)**

## Run locally

Use Node.js 24, as specified in [`.node-version`](.node-version), and npm. From the repository root:

```bash
npm ci
./preview.sh
```

Open <http://localhost:3000/papers/> and press Ctrl+C to stop the server. Changes to papers are reflected in the preview. The script also accepts Docusaurus options, for example `./preview.sh --port 3001` or `./preview.sh --no-open`.

To check and build the site, then serve the generated files locally:

```bash
npm run typecheck
npm run build
npm run serve
```

The build writes the static site to `build/`.

## Add or update a paper

Add a Markdown file under [`docs/`](docs/) with a title and description in its front matter. An update date and sidebar label can also be provided:

```markdown
---
title: An Example Paper
description: A short description of the paper.
last_update:
  date: '2026-10-28'
sidebar_label: Example Paper
---

# An Example Paper

The paper begins here.
```

Set `last_update.date` when publishing or revising a paper to display its update date in the paper's footer. The date is optional and comes from front matter, with no Git history fallback. `sidebar_label` is optional; without it, the sidebar uses the title.

The index at [`docs/index.md`](docs/index.md) automatically lists papers by update date, newest first. Papers with the same date are ordered by title; undated papers appear last, ordered by title. It uses each paper’s description and generated URL, so no manual index entry is needed. Keep the index file: it serves the site root at `/papers/`.

Every document under `docs/`, apart from the index, is treated as a paper. Nested documents and custom slugs are supported. To control visibility:

- Set `draft: true` to exclude a paper from production builds.
- Set `unlisted: true` to keep a paper accessible at its URL but exclude it from the production index.

Drafts and unlisted papers may omit `last_update.date`. Both are included in development previews; undated papers appear after dated papers, ordered by title.

## Sidebar order

Home stays first, and papers in subdirectories remain grouped. Within each group, the sidebar orders entries as follows:

1. Papers with a filename number prefix, such as `2-example.md`, in numerical order.
2. Papers with a front-matter `sidebar_position`, in numerical order.
3. Remaining entries alphabetically by their displayed labels.

A filename prefix takes precedence over `sidebar_position` when both are present. Set `parse_number_prefixes: false` in a paper’s front matter to disable prefix parsing for that paper. Within each position group, entries with the same position are ordered by their displayed labels.

## Deployment

The [GitHub Pages workflow](.github/workflows/deploy-pages.yml) type-checks, builds and deploys changes pushed to `main` when they affect one of its configured site, dependency or workflow paths. A README-only push does not trigger deployment.

To run it manually, choose **Actions → Deploy Docusaurus to GitHub Pages → Run workflow**. Other branches can be built manually, but only `main` is deployed.

CI installs the latest Docusaurus release at build time, while `npm ci` uses the checked-in lockfile. Local and published builds can therefore use different Docusaurus versions. The workflow uploads `build/` as a Pages artefact and deploys it through the `github-pages` environment.
