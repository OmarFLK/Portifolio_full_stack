import { defineConfig, devices } from '@playwright/test';

const viewports = {
  mobile320: { width: 320, height: 720 },
  mobile375: { width: 375, height: 812 },
  mobile390: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 },
};

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    channel: 'msedge',
  },
  projects: [
    {
      name: 'mobile-320',
      use: { ...devices['Desktop Edge'], viewport: viewports.mobile320, isMobile: true },
    },
    {
      name: 'mobile-375',
      use: { ...devices['Desktop Edge'], viewport: viewports.mobile375, isMobile: true },
    },
    {
      name: 'mobile-390',
      use: { ...devices['Desktop Edge'], viewport: viewports.mobile390, isMobile: true },
    },
    {
      name: 'tablet',
      use: { ...devices['Desktop Edge'], viewport: viewports.tablet },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Edge'], viewport: viewports.desktop },
    },
    {
      name: 'wide',
      use: { ...devices['Desktop Edge'], viewport: viewports.wide },
    },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
});
