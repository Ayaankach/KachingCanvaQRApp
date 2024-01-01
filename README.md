# Kaching Canva QR Code App 

## Overview

This repository contains the source code for a Canva application developed in TypeScript. The application is designed to create **QR Code** for kaching on the Canva platform.

## Deployment

To deploy this Canva application for production, follow the steps outlined below:

### Prerequisites

Make sure you have the following prerequisites installed and configured:

- Node.js and npm: [Node.js](https://nodejs.org/)
- TypeScript: Install TypeScript globally using npm with the command `npm install -g typescript`
- Node.js `v18`
- npm `v9`

**Note:** To make sure you're running the correct version of Node.js, we recommend using a version manager, such as [nvm](https://github.com/nvm-sh/nvm#intro). The .nvmrc file in the root directory of this repo will ensure the correct version is used.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/canva-application.git
   ```

2. Navigate to the project directory:

   ```bash
   cd canva-application
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

[Include any configuration steps or environment variables that need to be set up.]

### Build

Build the TypeScript code:

```bash
npm run build
```

### Deployment to Production

By default, every time you make a change to an app, you have to reload the entire app to see the results of those changes. If you enable [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR), changes will be reflected without a full reload, which significantly speeds up the development loop.

**Note:** HMR does **not** work while running the development server in a Docker container.

HMR is enabled. 

The `.env` file of the app is:

   ```bash
   CANVA_FRONTEND_PORT=8080
   CANVA_BACKEND_PORT=3001
   CANVA_BACKEND_HOST=http://localhost:3001 # TODO: replace this with your production URL before submitting your app
   CANVA_APP_ID=AAFwT19fspQ 
   CANVA_HMR_ENABLED=TRUE 
   ```
I need the production URL to be changed before exposing the sever to the public domain

The backend is defined in the  `backend/server.ts` file, automatically starts when the `npm start` command is run, and becomes available at http://localhost:3001.

The ID of the app must be explicitly defined because it's required to [send and verify HTTP requests](https://www.canva.dev/docs/apps/verifying-http-requests/). If you don't set up the ID in the `.env` file, an error will be thrown when attempting to run the example.

If your app has a backend, the URL of the server likely depends on whether it's a development or production build. For example, during development, the backend is probably running on a localhost URL, but once the app's in production, the backend needs to be exposed to the internet.

To more easily customize the URL of the server:

1. Open the `.env` file in the text editor of your choice.
2. Set the `CANVA_BACKEND_HOST` environment variable to the URL of the server.
3. When sending a request, use `BACKEND_HOST` as the base URL:

   ```ts
   const response = await fetch(`${BACKEND_HOST}/custom-route`);
   ```

   **Note:** `BACKEND_HOST` is a global constant that contains the value of the `CANVA_BACKEND_HOST` environment variable. The variable is made available to the app via webpack and does not need to be imported.

4. Before bundling the app for production, update `CANVA_BACKEND_HOST` to point to the production backend.

[Include steps or scripts for deploying the application to production. If it needs to be hosted on an existing domain, provide information on how to configure the domain settings.]

### Usage

The `src` directory contains the boilerplate of the app written in typescript.

The server frontend is exposed on port 8080 and the backend runs on ports 3001 development url upon runnig the server is http://localhost:3001.

The app's source code is in the `src/app.tsx` file.

The local development server only exposes a JavaScript bundle, so you can't preview an app by visiting http://localhost:8080. The app can only be previewed via the Canva editor.

## Contributing

If you would like to contribute to the development of this Canva application, please follow the guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This Canva application is licensed under the [LICENSE](LICENSE) - [Specify the license type].

## Acknowledgments

[Include any acknowledgments or credits for third-party libraries, resources, or inspiration.]

## Contact

For any questions or concerns, feel free to reach out to [Your Name] at [your.email@example.com].

Happy coding!









