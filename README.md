# Internet Package Marketplace

A React and TypeScript marketplace for discovering, comparing, and purchasing internet packages from multiple providers. The app includes a customer portal for package discovery, checkout, transactions, and profile views, plus a seller portal for monitoring customers, transactions, and business performance.

The backend is mocked with JSON Server using `db.json`.

## Features

- Customer registration and login
- Seller login
- Role-based routing
- Customer dashboard with active package, package discovery, and recent transactions
- Package catalog with search and provider filtering
- Package detail, checkout, and purchase success flow
- Customer transaction list and transaction detail
- Customer profile view
- Seller dashboard with KPI, provider, package, and transaction summaries
- Seller customer list, customer detail, and transaction monitoring

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI
- React Router
- TanStack Query
- JSON Server

## How To Run

Install dependencies:

```bash
npm install
```

Start the mock API:

```bash
npm run api
```

The API runs at:

```text
http://localhost:3101
```

In a second terminal, start the frontend:

```bash
npm run dev
```

Vite will print the local frontend URL, usually:

```text
http://localhost:5173
```

### Demo Accounts

Customer:

```text
Email: dani@example.com
Password: customer123
```

Seller:

```text
Email: seller@example.com
Password: seller123
```

## How To Test

Run TypeScript type checking:

```bash
npm run typecheck
```

Run a production build check:

```bash
npm run build
```

This project does not currently include an automated unit or end-to-end test runner. For manual testing, run the API and frontend, then verify the main flows:

- Customer login
- Customer package browsing and filtering
- Package detail
- Checkout
- Purchase success
- Customer transaction detail
- Seller login
- Seller dashboard
- Seller customer and transaction pages

## Development Timeline

### Initial Planning

- Created the product requirements document in `docs/prd.md`.
- Created the implementation plan in `docs/implementation-plan.md`.
- Defined the product as a multi-provider internet package marketplace with customer and seller portals.

### Phase 1 - Phase 4

- Set up the React, TypeScript, Vite, MUI, React Router, React Query, and JSON Server foundation.
- Added mock data in `db.json`.
- Implemented authentication, role-based routing, and shared layout structure.
- Built the core customer portal screens for dashboard, package discovery, package detail, checkout, and profile/transaction entry points.

### Phase 5 - Phase 6

- Expanded customer transaction flows.
- Added seller dashboard, customer monitoring, customer detail, and transaction monitoring pages.
- Added analytics helpers and reusable seller/customer UI components.
- Improved route coverage and role-based navigation.

### Phase 7

- Polished the marketplace experience and responsive behavior.
- Finalized customer and seller page flows.
- Removed development-only validation scripts that are no longer part of the production codebase.

## Available Scripts

```bash
npm run dev
npm run api
npm run typecheck
npm run build
npm run preview
```
