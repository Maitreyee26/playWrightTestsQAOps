// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  timeout: 40 * 1000,
  reporter: "html",
  workers: 3,
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "retain-on-failure",
        navigationTimeout: 30 * 1000,
        ...devices["iPhone 17 Pro Max"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        actionTimeout: 10 * 1000,
        screenshot: "on",
        trace: "retain-on-failure",
        navigationTimeout: 30 * 1000,
      },
    },
  ],
  expect: {
    timeout: 60 * 1000,
  },
});
