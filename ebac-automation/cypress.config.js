const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'tusn4q',
  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.{js,ts}", // Atualizado
    experimentalRunAllSpecs: true, // Adicione esta linha
    setupNodeEvents(on, config) {
      return config;
    }
  }
});