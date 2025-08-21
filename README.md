# Royal Systems - 2TINC - Groep 2

## Gekozen Onderwerp

Stockbeheer Computerwinkel

## Verantwoordelijkheid Per Student

De verantwoordelijkheden worden wekelijks per student in groep besproken, zodat iedereen uiteindelijk met elk onderdeel in aanraking komt.

## Verplichte Requirements

Single Page Application: &check; <br>
REST-interface: ?<br>

- Relatie tussen 2 objecten: &check;
- Minimum 2 andere properties buiten `id` voor één object: &check;

Vue Componenten &check; <br>
Pinia object-store(s): &check; <br>
Vue router &check; <br>
Minstens 6 unit tests &cross;

### GEMEENSCHAPPELIJK

Minimaal een GET-request met filter: &check; `/products/5` performs a GET request which filters on id <br>
Minimaal een GET-request zonder filter: &check; `/products/` performs a GET request

### INDIVIDUEEL (POST, PUT of PATCH-request)

Maikel: `POST` Order in '/cart' en '/order' <br>
Kobe: `PUT` in admin pagina om stock toe te voegen <br>
Jasper: `PATCH` om een review toe te voegen aan een product

### Extra Punten

Cypress/Playwright &cross; <br>
Vuetify &check; <br>
Typescript &check; <br>
LocalStorage &check; <br>
Inloggen: <br>
- Eenvoudig inlogsysteem: &check;
- toon iets verschillend bij een ingelogde gebruiker: &check;

Verdedigen alle oefeningen: &cross;

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Format with Prettier

```sh
npm run format
```
