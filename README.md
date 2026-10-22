# RevoPack

## Overview

RevoPack is a server-rendered e-commerce storefront built with Next.js (App
Router). It sells bags — backpacks, pouches, totes, and crossbody bags — and
fetches live data (products, categories, orders) from a REST API. Beyond
browsing, it supports user authentication, a shopping cart with checkout, and an
admin dashboard for managing the catalog and orders. The app is covered by
Playwright end-to-end tests.

The Next.js app lives in `revopack-project-next/`.

## Features

- **Authentication** — register and login with JWT-based sessions persisted in
  `localStorage` via an `AuthContext`. Public-only, protected, and admin-only
  route guards control access.
- **Product catalog** — home page with featured products, a products page with
  full-text search and category filtering driven by URL query params, and
  dynamic `/products/[id]` detail pages.
- **Categories** — browse categories and jump into a filtered product list.
- **Shopping cart** — add/remove items and adjust quantities through a
  `CartContext`, with a quantity stepper and out-of-stock handling.
- **Checkout** — a checkout flow that turns the cart into an order.
- **Orders** — order history with a dedicated "login required" state on `401`.
- **Admin dashboard** — manage products, categories, and orders from
  `/dashboard`, gated behind an admin route guard.
- **UX polish** — responsive header with a mobile menu, per-route `loading.tsx`
  and `error.tsx` states, toast notifications (`react-hot-toast`), and prices
  formatted as Indonesian Rupiah.

## Technologies

- **Next.js 16** (App Router) with **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **React Hot Toast** for notifications
- **Playwright** for end-to-end testing
- **ESLint** (`eslint-config-next`) for linting

## Live URL

Deployed on Vercel: **https://module-3-heraklosvisha13-red.vercel.app/**

## Folder Structure

```text
.
├── README.md
├── .gitignore
├── screenshots/                        # Screenshots used in this README
└── revopack-project-next/              # Next.js storefront
    ├── app/
    │   ├── layout.tsx                  # Root layout (providers, Header + Footer)
    │   ├── page.tsx                    # Home / featured products
    │   ├── globals.css                 # Global styles / Tailwind
    │   ├── favicon.ico
    │   ├── components/                 # Shared UI components
    │   │   ├── AdminRoute.tsx          # Admin-only route guard
    │   │   ├── Card.tsx
    │   │   ├── CategoryForm.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   ├── Modal.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductForm.tsx
    │   │   ├── ProtectedRoute.tsx      # Auth-required route guard
    │   │   ├── PublicOnlyRoute.tsx     # Guest-only route guard
    │   │   └── SearchBar.tsx
    │   ├── login/                      # Login page
    │   │   └── page.tsx
    │   ├── register/                   # Register page
    │   │   └── page.tsx
    │   ├── products/                   # Product list, filter, detail route
    │   │   ├── CategoryFilter.tsx
    │   │   ├── ProductList.tsx
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── loading.tsx
    │   │   ├── error.tsx
    │   │   └── [id]/                    # Dynamic product detail page
    │   ├── categories/                 # Category grid
    │   │   ├── page.tsx
    │   │   ├── loading.tsx
    │   │   └── error.tsx
    │   ├── cart/                        # Shopping cart
    │   │   └── page.tsx
    │   ├── checkout/                    # Checkout flow
    │   │   └── page.tsx
    │   ├── orders/                      # Order history
    │   │   ├── page.tsx
    │   │   ├── loading.tsx
    │   │   └── error.tsx
    │   └── dashboard/                   # Admin dashboard
    │       ├── layout.tsx
    │       ├── page.tsx
    │       ├── categories/              # Manage categories
    │       │   └── page.tsx
    │       └── orders/                  # Manage orders
    │           └── page.tsx
    ├── context/
    │   ├── AuthContext.tsx              # Auth state (login/logout, current user)
    │   └── CartContext.tsx              # Cart state (items, quantities)
    ├── lib/
    │   ├── api.ts                      # Typed fetch helpers for the REST API
    │   └── types.ts                    # Shared domain types
    ├── tests/                          # Playwright end-to-end tests
    │   ├── auth.spec.ts
    │   ├── e2e-admin.spec.ts
    │   ├── e2e-shopping.spec.ts
    │   └── home.spec.ts
    ├── public/                         # Static assets (svg icons)
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── global-setup.ts                 # Playwright global setup (auth session)
    ├── playwright.config.ts            # Playwright configuration
    ├── user.json                       # Saved login session for tests
    ├── .env.local                      # NEXT_PUBLIC_API_BASE_URL
    ├── next.config.ts                  # Next.js configuration
    ├── next-env.d.ts                   # Next.js TypeScript declarations
    ├── tsconfig.json                   # TypeScript configuration
    ├── eslint.config.mjs               # ESLint configuration
    ├── postcss.config.mjs              # PostCSS / Tailwind configuration
    ├── package.json                    # Dependencies and scripts
    ├── package-lock.json
    └── README.md
```

The `.next/`, `node_modules/`, `playwright-report/`, and `test-results/` folders
are generated and excluded from version control.

## How to Run Locally

The app expects an API base URL. Create `revopack-project-next/.env.local`:

```sh
NEXT_PUBLIC_API_BASE_URL=https://your-api-host.example.com
```

Then install dependencies and start the dev server:

```sh
cd revopack-project-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Available scripts (run from `revopack-project-next/`):

```sh
npm run dev     # Start the development server
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # Run ESLint
```

## How to Run Tests

End-to-end tests use Playwright and live in `revopack-project-next/tests/`.

First time only, install the Playwright browsers:

```sh
cd revopack-project-next
npx playwright install
```

Then run the tests (start the dev server first, since the tests target
`http://localhost:3000`):

```sh
npx playwright test            # Run all tests headless
npx playwright test --headed   # Run with a visible browser
npx playwright show-report     # Open the HTML report
```

### Test Results

Latest run — **5 passed (7.3s)**, using 5 workers on the Chromium project.

| Spec | Test | Status |
| --- | --- | --- |
| `tests/auth.spec.ts` | register form validation | ✅ passed |
| `tests/auth.spec.ts` | complete registration and login flow | ✅ passed |
| `tests/home.spec.ts` | user can view homepage and navigate to products | ✅ passed |
| `tests/e2e-shopping.spec.ts` | customer can add to cart and checkout | ✅ passed |
| `tests/e2e-admin.spec.ts` | admin can create, edit, and delete product | ✅ passed |

```text
Running 5 tests using 5 workers

  ✓  tests/auth.spec.ts:5:5 › register form validation (682ms)
  ✓  tests/home.spec.ts:3:5 › user can view homepage and navigate to products (1.0s)
  ✓  tests/e2e-shopping.spec.ts:3:5 › customer can add to cart and checkout (3.5s)
  ✓  tests/auth.spec.ts:16:5 › complete registration and login flow (3.6s)
  ✓  tests/e2e-admin.spec.ts:6:5 › admin can create, edit, and delete product (4.2s)

  5 passed (7.3s)
```

## Screenshots

### Home

![Home page](screenshots/Screenshot%20home.png)

### Products

![Products list](screenshots/Screenshot%20products%20list.png)

### Product Detail

![Product detail page](screenshots/Screenshot%20product%20detail.png)

### Categories

![Categories menu](screenshots/Screenshot%20categories%20menu.png)

### Login

![Login page](screenshots/Screenshot%20login.png)

### Register

![Register form](screenshots/Screenshot%20register%20form.png)

### Admin Dashboard

![Admin dashboard](screenshots/Screenshot%20dashboard%20admin.png)
