// @ts-check
import { defineConfig } from '@playwright/test';

const now = new Date();

const timestamp =
  `${now.getFullYear()}-` +
  `${String(now.getMonth() + 1).padStart(2, '0')}-` +
  `${String(now.getDate()).padStart(2, '0')}_` +
  `${String(now.getHours()).padStart(2, '0')}-` +
  `${String(now.getMinutes()).padStart(2, '0')}-` +
  `${String(now.getSeconds()).padStart(2, '0')}`;

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [
    ['html', {
      outputFolder: `report/${timestamp}`,
      open: 'never'
    }]
  ],

  use: {
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },
});
