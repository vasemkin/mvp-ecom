# Simple Ecommerce Monorepo

## 🔧 Setting up Local Development

Required:

-   [Node v16](https://nodejs.org/download/release/latest-v16.x/)
-   [Yarn](https://classic.yarnpkg.com/en/docs/install/)
-   [Git](https://git-scm.com/downloads)

This is an Nx based monorepo.
Visit the [Nx Documentation](https://nx.dev) to learn more.

Install project:

```bash
git clone https://github.com/vasemkin/mvp-ecom.git
cd mv-ecom
yarn
```

Launch the apps:

```
yarn dev
```

The backend will generate a swagger file, sync it:

```
yarn ui:gen-api
```

This will generate an RTK Query api client with hooks.
For additional scripts navigate to root `package.json`

The site is running at `http://localhost:3000`.
Reload the page once to see the effects. Hot Reloading supported afterwards.
Open the source code and start editing!

## Architecture

```
./
├── apps/app/            // UI App with React
├── apps/server/         // Server with NestJS
├── libs/products        // Some of the common types
├── envs/                // environment variables
└── public/              // Static assets to serve from the server
```
