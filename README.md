# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

[View the published site](https://lib-port.github.io/papers/).

The separate landing page is disabled. The introductory document is served at `/papers/`; the site title and logo link there. Other documentation URLs omit the `/docs/` prefix.

## Installation

Use **Node.js 24**, as specified in [.node-version](.node-version), and npm.

```bash
npm ci
```

This installs the dependency versions recorded in `package-lock.json`.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run typecheck
npm run build
```

The build generates static content in the `build` directory. To preview it locally:

```bash
npm run serve
```

## Deployment

The [GitHub Pages workflow](.github/workflows/deploy-pages.yml) type-checks, builds and deploys pushes to `main` that change its listed site, dependency or workflow paths. A README-only push skips deployment.

To deploy manually, open **Actions → Deploy Docusaurus to GitHub Pages → Run workflow** and select `main`. Other branches can be built manually, but deployment is restricted to `main`.

CI resolves the latest Docusaurus release at build time and installs all direct Docusaurus packages at that version. Local installation with `npm ci` uses the checked-in lockfile, so local and published builds can use different Docusaurus versions.

The workflow uploads `build/` as a Pages artefact and deploys it through the `github-pages` environment. GitHub Pages is configured to use GitHub Actions and serves the site at <https://lib-port.github.io/papers/>.
