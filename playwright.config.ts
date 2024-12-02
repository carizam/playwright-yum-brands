import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Cambia esta ruta si necesitas ubicar los tests en otro directorio
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Usa un reporte HTML para visualizar resultados
  use: {
    baseURL: 'http://localhost:3000', // Cambia esto a la URL base de tu aplicación si es necesario
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
