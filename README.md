# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

[View the published site](https://lib-port.github.io/papers/).

The separate landing page is disabled. The paper index in [`docs/index.md`](docs/index.md) is served at `/papers/`; the site title, logo and Home navigation link there. Other documentation URLs omit the `/docs/` prefix. Keep this index when adding or removing papers so links to the site root remain valid.

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

With dependencies installed, run `./preview.sh` from the repository root for a
live preview at <http://localhost:3000/papers/>. Press Ctrl+C to stop it.
The script accepts Docusaurus options such as `./preview.sh --port 3001` and
`./preview.sh --no-open`.

Check that `node --version` reports version 24 or later. Standalone pnpm does
not install Node.js automatically. If you use standalone pnpm 12, run
`pnpm setup`, open a new terminal, then run `pnpm runtime set node lts -g`.
Install npm separately with `pnpm add -g npm` if needed.

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
