// .eslintrc.js
module.exports = {
    // Entornos donde corre tu código
    env: {
      browser: true,    // Para poder usar APIs del navegador
      es2021: true       // Reconoce las características de ES2021
    },
    // Extensiones que usará ESLint
    extends: [
      "eslint:recommended",              // Reglas base de ESLint
      "plugin:react/recommended",        // Reglas recomendadas para React
      "plugin:react-hooks/recommended",  // Reglas recomendadas para Hooks
      "plugin:@typescript-eslint/recommended" // Reglas recomendadas para TS
    ],
    // Parser de TypeScript
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true  // Soporte para JSX
      },
      ecmaVersion: "latest",   // Soporte de sintaxis moderna
      sourceType: "module",    // Import/export
      // Conecta ESLint con tu tsconfig.json para referencias
      project: "./tsconfig.json"
    },
    // Plugins adicionales
    plugins: ["react", "@typescript-eslint"],
    // Reglas opcionales. Puedes personalizar
    rules: {
      // Ejemplo: desactivar prop-types en React (TS ya lo cubre)
      "react/prop-types": "off"
    },
    // Detecta automáticamente la versión de React
    settings: {
      react: {
        version: "detect"
      }
    }
  };
  