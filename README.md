# Demo Cypress – Ejecución Local con JavaScript y TypeScript

Este laboratorio muestra cómo instalar y ejecutar **Cypress de forma local**, usando **JavaScript** y **TypeScript**, orientado a un curso práctico de automatización Front-End.

---

## 1️⃣ Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

- **Node.js (LTS recomendado)**
  - Incluye `npm`
  - Verificar instalación:
    ```bash
    node -v
    npm -v
    ```

- **Navegador Firefox Development Edition** (o Chromium)

---

## 2️⃣ Crear el proyecto base

```bash
mkdir demo-cypress
cd demo-cypress
npm init -y
```

Esto generará el archivo `package.json`.

---

## 3️⃣ Instalación de Cypress

```bash
npm install cypress --save-dev
```

Abrir Cypress por primera vez:

```bash
npx cypress open
```

Esto creará automáticamente la estructura:

```
cypress/
 ├── e2e/
 ├── fixtures/
 ├── support/
cypress.config.js
```

---

## 4️⃣ Demo con JavaScript

### 📄 Estructura

```
cypress/e2e/login_js.cy.js
```

### 🧪 Test de ejemplo (JavaScript)

```javascript
describe('Login exitoso - JavaScript', () => {
  it('Debe autenticar correctamente', () => {
    cy.visit('https://the-internet.herokuapp.com/login')

    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.contains('Login').click()

    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!')
  })
})
```

---

## 5️⃣ Demo con Demoblaze

### 📄 Estructura

```
cypress/e2e/demoblaze.cy.js
```

### 🧪 Casos de prueba incluidos

- Agregar un producto al carrito desde la categoría `Phones`
- Validar la lista de productos en `Laptops`
- Abrir el detalle de producto `Apple monitor 24`
- Completar una orden y verificar la confirmación de compra

### ▶️ Ejecutar pruebas Demoblaze

```bash
npm run test
```

O para ejecutar desde Cypress UI:

```bash
npm run cypress:open
```

---

## 6️⃣ Integración de Allure Report

### 📦 Dependencias instaladas

- `@shelex/cypress-allure-plugin`
- `allure-commandline`

### 🔧 Configuración

- `cypress.config.js`: se habilita el plugin Allure en `setupNodeEvents`
- `cypress/support/e2e.js`: se importa `@shelex/cypress-allure-plugin`

### 📊 Generar reporte Allure

Ejecuta primero las pruebas y luego genera el reporte:

```bash
npm run test
npm run allure:generate
```

Abrir el reporte:

```bash
npm run allure:open
```

---

## 7️⃣ Configuración para TypeScript

### 📦 Instalar dependencias adicionales

```bash
npm install typescript @types/node --save-dev
```

### 🧾 Inicializar TypeScript

```bash
npx tsc --init
```

### 📄 Archivo de configuración Cypress + TS

Cypress detecta automáticamente TypeScript si usas extensión `.cy.ts`.

---

