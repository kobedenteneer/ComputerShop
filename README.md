## ComputerShop – Vue 3/Vite demo-applicatie

Korte, werkgever-vriendelijke samenvatting van het project. ComputerShop is een Single Page Application die het beheer en de verkoop van computerproducten simuleert. De app toont productlijsten en details, winkelmandje en checkout-flow, eenvoudige login/rollen en een admin-scherm voor stockbeheer. Data wordt lokaal geserveerd via een mock-API (json-server).

### Belangrijkste features
- Productcatalogus met filters en sortering
- Productdetail met reviews
- Winkelmandje en bestelling plaatsen
- Authenticatie-simulatie met rollen (gebruiker/admin) en routebescherming
- Admin: stock aanpassen en beheer
- Persistente state via Pinia (met localStorage)

### Tech stack
- Vue 3 + TypeScript, Vite
- UI: Vuetify 3
- State management: Pinia (+ persisted state)
- Router: Vue Router 4
- Tests: Vitest (unit) en Playwright (e2e)
- Mock backend: json-server

### Snel starten
```sh
npm install
npm run dev
```
Dit start tegelijk de Vite dev-server en de json-server op poort 3000.

### Scripts
- `npm run dev`: start Vite en json-server samen
- `npm run build`: type-check en productiebuild
- `npm run preview`: serve productiebuild lokaal
- `npm run test:unit`: unit tests met Vitest
- `npm run test:e2e`: end-to-end tests met Playwright
- `npm run lint` / `npm run format`: codekwaliteit en formattering

### Testen
Unit tests staan onder `src/unit`. E2E tests staan onder `e2e` en gebruiken Playwright. Voor de eerste e2e-run:
```sh
npx playwright install
npm run test:e2e
```

### Architectuur en mappen
- `src/Components`: herbruikbare Vue componenten (lijst/detail, navigatie, login-knop, reviews)
- `src/views`: pagina’s (Home, About, Cart, Checkout, Admin, Contact, Unauthorized)
- `src/stores`: Pinia stores (`productStore`, `cart`, `orderStore`, `userStore`, `categoryStore`)
- `src/router`: routeconfiguratie met rollen/guards
- `src/types`: TypeScript types (Product, Category, Order, User, …)
- `json-server`: `products.json` dataset en `get-products.mjs`

### Mock-API
De app praat met `json-server` op `http://localhost:3000`. Voorbeelden:
- `GET /products` — lijst van producten
- `GET /products/:id` — detail
- Extra bewerkingen voor reviews/orders/stock afhankelijk van scenario

### Waarom relevant voor werkgevers
- Moderne frontend stack met duidelijke architectuur (Vue 3, TS, Pinia, Vuetify)
- State management, routing en role-based access toegepast
- Teststrategie met unit en e2e tests
- Mock-API maakt lokale ontwikkeling en demo eenvoudig

### Licentie
Vrij te gebruiken voor evaluatie en demonstratie.
