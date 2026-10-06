// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 40*1000,
  reporter : 'html',
  expect :{
    timeout: 60*1000
  },
  use: {
    browserName : 'chromium',
    headless: false,
    actionTimeout: 10*1000,
    screenshot: 'on',
    trace: 'retain-on-failure',
    navigationTimeout: 30*1000
    
  },
});

