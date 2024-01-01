# Kaching Canva QR Code App 

## Overview

This repository contains the source code for a Canva application developed in TypeScript. The application is designed to create **QR Code** for kaching on the Canva platform.

## Prerequisites

Make sure you have the following prerequisites installed and configured:

- Node.js `v18`
- npm `v9`

**Note:** The .nvmrc file in the root directory of this repo will ensure the correct version is used.

## Configuration

- The `src` directory contains the boilerplate of the app written in typescript.
- The server frontend is exposed on port 8080 and the backend runs on ports 3001 development url upon runnig the server is http://localhost:3001.
- The app's source code is in the `src/app.tsx` file.
- The local development server only exposes a JavaScript bundle, so we can't preview an app by visiting the localhost http://localhost:8080. The app can only be previewed via the Canva editor.

## Deployment to Production

### Hot Module Replacement (HMR) and Environment Configuration

By default, changes to the Canva application require a full app reload to see the results. Enabling [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) significantly speeds up the development loop by reflecting changes without a complete reload.

**Note:** HMR does **not** work while running the development server in a Docker container.

For this application, HMR is enabled. The configuration for the app is stored in the `.env` file, which includes essential parameters for development and production settings.

### Environment Configuration

The `.env` file of the app is configured as follows:

```bash
CANVA_FRONTEND_PORT=8080
CANVA_BACKEND_PORT=3001
CANVA_BACKEND_HOST=http://localhost:3001 # TODO: replace this with your production URL before submitting your app
CANVA_APP_ID=AAFwT19fspQ 
CANVA_HMR_ENABLED=TRUE 
```

**Note:** Ensure the `CANVA_BACKEND_HOST` is updated with the production URL before exposing the server to the public domain.

### Backend Configuration

The backend for the application is defined in the `backend/server.ts` file, automatically starting when the `npm start` command is executed. The backend becomes available at http://localhost:3001 during development.

### App ID Requirement

The Canva app requires an explicit definition of the app ID as it is essential for [sending and verifying HTTP requests](https://www.canva.dev/docs/apps/verifying-http-requests/). If the app ID is not set up in the `.env` file, an error will be thrown when attempting to run the example.

### Customizing Backend URL

If your app has a backend, the URL of the server might differ between development and production builds. To easily customize the server URL:

1. Open the `.env` file in a text editor.
2. Set the `CANVA_BACKEND_HOST` environment variable to the desired URL of the server.
3. When sending a request, use `BACKEND_HOST` as the base URL in your code:

   ```ts
   const response = await fetch(`${BACKEND_HOST}/custom-route`);
   ```

   **Note:** `BACKEND_HOST` is a global constant containing the value of the `CANVA_BACKEND_HOST` environment variable. This variable is made available to the app via webpack and does not need to be imported.

## License

This Canva application is licensed under the [LICENSE](LICENSE) - Canva License

## Contact

For any questions or concerns, feel free to reach out to Ayaan Gouse at ayaan@kaching.co.in










