import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  projectId: 'o9u948',
  chromeWebSecurity: false,
  // TODO
  // videoUploadOnPasses: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  viewportWidth: 1400,
  viewportHeight: 660,
  env: {
    API_URL: process.env.API_URL,
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
