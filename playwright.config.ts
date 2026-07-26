import { defineConfig, devices } from '@playwright/test';

const viewports = {
  mobile320: { width: 320, height: 720 },
  mobile375: { width: 375, height: 812 },
  mobile390: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  tabletLandscape: { width: 1024, height: 768 },
  desktop1280: { width: 1280, height: 800 },
  desktop1366: { width: 1366, height: 768 },
  desktop: { width: 1440, height: 900 },
  desktop1600: { width: 1600, height: 900 },
  wide: { width: 1920, height: 1080 },
};

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
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
      name: 'tablet-1024',
      use: { ...devices['Desktop Edge'], viewport: viewports.tabletLandscape },
    },
    {
      name: 'desktop-1280',
      use: { ...devices['Desktop Edge'], viewport: viewports.desktop1280 },
    },
    {
      name: 'desktop-1366',
      use: { ...devices['Desktop Edge'], viewport: viewports.desktop1366 },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Edge'], viewport: viewports.desktop },
    },
    {
      name: 'desktop-1600',
      use: { ...devices['Desktop Edge'], viewport: viewports.desktop1600 },
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
