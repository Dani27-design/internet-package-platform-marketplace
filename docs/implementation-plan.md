# Overview

This implementation plan is based only on `docs/prd.md`.

The product is a modern multi-provider internet package marketplace that allows customers to discover, compare, and purchase internet packages from supported telecommunications providers in one platform. It also includes a seller portal for business partners to monitor customers, transactions, and business performance through analytics dashboards.

The product strategy is customer-centric. The Customer Portal receives the majority of effort because the PRD identifies package discovery, customer engagement, and page-per-visit as the primary drivers of success. The Seller Portal remains intentionally limited to monitoring, transaction visibility, customer visibility, and analytics.

# PRD Understanding

## Product Summary

The platform provides two role-based experiences:

- Customers can register, log in, browse internet packages, view package details, purchase a package, see purchase success, monitor an active package, review transactions, and view profile information.
- Sellers can log in, review business KPIs, monitor customers, inspect customer details, and review transactions.

The marketplace supports multiple internet package providers: Telkomsel, XL, Indosat, Tri, and Smartfren.

The product intentionally avoids shopping-cart behavior because internet packages are expected to be purchased immediately.

## Business Goals

- Increase page-per-visit.
- Improve engagement.
- Improve package discovery.
- Improve purchase completion rate.
- Improve business visibility.

## User Goals

Customer goals:

- Discover internet packages.
- Compare package options.
- Purchase packages quickly.
- Monitor active packages.
- Review transaction history.

Seller goals:

- Monitor customers.
- Monitor transactions.
- Monitor business performance.
- Identify top-performing products.

## Success Metrics

Customer metrics:

- Page per visit: users should naturally move through dashboard, package catalog, package detail, checkout, and transaction detail.
- Package discovery: users should explore multiple package offerings before purchase.
- Checkout completion rate: users should complete purchases with minimal friction.

Seller metrics:

- Monitoring efficiency: reduce time needed to review customers and transactions.
- Business visibility: provide quick access to business insights.

## Product Scope

In-scope features:

- Mock authentication.
- Role-based access.
- Customer registration.
- Customer login.
- Seller login.
- Customer dashboard.
- Active package widget.
- Popular packages.
- Featured packages.
- Best value packages.
- Explore by provider.
- Recent customer transactions.
- Package catalog.
- Package search.
- Package provider filter.
- Package cards.
- Package detail.
- Checkout.
- Purchase success.
- Customer transaction list.
- Customer transaction detail, as required by the success flow.
- Customer profile view.
- Seller dashboard.
- Seller KPI summary.
- Top providers.
- Top packages.
- Seller recent transactions.
- Seller customers list.
- Seller customer detail.
- Seller transactions list.
- Simulated quota tracking.
- JSON Server mock API.
- Frontend deployment to Vercel.
- JSON Server mock API deployment.

Out-of-scope features:

- Shopping cart.
- Wishlist.
- Coupons.
- Notification center.
- Chat system.
- Payment gateway integration.
- Package CRUD.
- Customer CRUD.
- Report export.
- Multi-language support.
- Real quota consumption tracking.
- Real telecom integration.
- Customer profile editing.

## Assumptions

- The marketplace sells packages from multiple providers.
- Supported providers are Telkomsel, XL, Indosat, Tri, and Smartfren.
- The platform supports two user roles: customer and seller.
- Customers purchase internet packages.
- Sellers are business partners who monitor customers and transactions.
- Customer experience is the primary focus.
- Effort allocation is Customer Portal 70% and Seller Portal 30%.
- Page-per-visit primarily comes from customer behavior.
- Package detail uses a modal on desktop.
- Package detail uses a bottom sheet on mobile.
- Checkout uses a modal on desktop.
- Checkout uses a bottom sheet on mobile.
- Seller Portal is desktop-first.
- Seller Portal uses pages and drawer on desktop.
- Quota tracking is simulated and not real time.
- Authentication is mocked.
- Role-based access is required.
- JSON Server is the backend.
- The frontend uses React, TypeScript, MUI, React Query, and React Router.

# Requirement Audit

| Feature | User | Purpose | Dependencies | Complexity | Risks |
|---|---|---|---|---|---|
| Mock authentication | Customer, Seller | Allow role-based access without real auth integration | Users data, role field, routing | Medium | Ambiguous auth states if session persistence is not defined |
| Customer registration | Customer | Allow new customer account creation | Users data, mock auth | Medium | Seller registration is not specified and must not be added |
| Login | Customer, Seller | Provide entry into role-specific portals | Users data, role-based redirects | Medium | Incorrect role routing can expose wrong portal |
| Role-based access | Customer, Seller | Restrict portal access by role | Auth state, route guards | Medium | Incomplete route protection can break the role model |
| Customer dashboard | Customer | Show active package, discovery modules, and recent transactions | Active packages, packages, transactions | High | Dashboard can become overloaded if discovery sections are not prioritized |
| Active package widget | Customer | Display subscription state and quota usage | Active package, package data | Medium | Simulated quota may be mistaken for real-time usage |
| Popular packages | Customer | Encourage package discovery | Package flags | Low | Empty state if no packages have `isPopular` |
| Featured packages | Customer | Promote package exploration | Package flags | Low | Empty state if no packages have `isFeatured` |
| Best value packages | Customer | Surface value-oriented options | Package flags | Low | Criteria for best value is represented only by flag |
| Explore by provider | Customer | Encourage browsing by provider | Provider list, package provider field | Medium | Provider taxonomy must stay limited to PRD providers |
| Recent customer transactions | Customer | Provide quick transaction visibility | Transactions, packages | Medium | Missing transaction detail route could interrupt expected flow |
| Package catalog | Customer | Support browsing and discovery | Packages data | Medium | Large lists are not specified, so pagination should not be invented |
| Search package | Customer | Help customers find packages | Packages data | Medium | Search fields are not specified beyond package search |
| Filter provider | Customer | Narrow catalog by provider | Supported provider list | Low | Adding filters beyond provider would exceed PRD |
| Package cards | Customer | Summarize package options | Packages data | Low | Benefits are not listed on cards in PRD |
| Package detail | Customer | Provide package information before purchase | Selected package, modal or bottom sheet | Medium | Benefits exist in detail display but are absent from package data model |
| Checkout | Customer | Confirm package, customer info, payment method, and total | Selected package, user data | High | Payment method is specified but payment gateway is excluded |
| Purchase success | Customer | Confirm purchase and guide next action | Created transaction | Medium | Success should not imply real payment processing |
| View transaction action | Customer | Continue from success to transaction view | Transaction created from checkout | Medium | Transaction detail is in flow but not separately detailed in screen list |
| Continue browsing action | Customer | Return to package exploration | Package catalog | Low | Must support page-per-visit without adding wishlist/cart |
| Return to dashboard action | Customer | Return to subscription overview | Customer dashboard | Low | None |
| Customer transactions | Customer | Show transaction list and statuses | Transactions, packages | Medium | Status values must stay pending, success, failed |
| Customer transaction detail | Customer | Complete expected success-metric flow | Transaction, package, customer | Medium | Detail fields are inferred from transaction summary and transaction view |
| Profile view | Customer | Show customer account information | User data | Low | Profile editing is explicitly excluded |
| Seller dashboard | Seller | Provide business visibility | Users, packages, transactions | High | Analytics must remain within available mock data |
| KPI summary | Seller | Show total customers, transactions, revenue, and success rate | Users, transactions | Medium | Revenue and success rate calculations must be clearly derived |
| Top providers | Seller | Identify high-performing providers | Transactions, packages | Medium | Ranking method is not specified |
| Top packages | Seller | Identify top-performing products | Transactions, packages | Medium | Ranking method is not specified |
| Seller recent transactions | Seller | Provide quick transaction monitoring | Transactions, users, packages | Medium | Must avoid adding export or management actions |
| Seller customers list | Seller | Monitor customers | Users, active packages, transactions | Medium | Customer CRUD is excluded |
| Seller customer detail | Seller | Inspect customer information, active package, quota, and history | User, active package, transactions | High | Transaction history must be read-only |
| Seller transactions | Seller | Monitor all transactions | Transactions, users, packages | Medium | Must avoid operational actions not in PRD |
| Simulated quota tracking | Customer, Seller | Make active package state realistic | Active package data | Medium | Users may expect real-time quota updates |
| JSON Server mock API | System | Provide mock backend data | Data models | Medium | Backend behavior is limited to mock data |

# Product Architecture

```text
Internet Package Marketplace
│
├── Mock Authentication
│   ├── Register Customer
│   ├── Login
│   └── Role-Based Access
│
├── Customer Portal (70%)
│   ├── Dashboard
│   │   ├── Active Package
│   │   ├── Popular Packages
│   │   ├── Featured Packages
│   │   ├── Best Value Packages
│   │   ├── Explore By Provider
│   │   └── Recent Transactions
│   ├── Packages
│   │   ├── Search Package
│   │   ├── Filter Provider
│   │   ├── Package Cards
│   │   ├── Package Detail
│   │   └── Checkout
│   ├── Purchase Success
│   ├── Transactions
│   └── Profile
│
└── Seller Portal (30%)
    ├── Dashboard
    │   ├── KPI Summary
    │   ├── Top Providers
    │   ├── Top Packages
    │   └── Recent Transactions
    ├── Customers
    │   └── Customer Detail
    └── Transactions
```

# Information Architecture

```text
Root
│
├── Authentication
│   ├── Register
│   └── Login
│
├── Customer Portal
│   ├── Dashboard
│   │   ├── Active Package
│   │   ├── Popular Packages
│   │   ├── Featured Packages
│   │   ├── Best Value Packages
│   │   ├── Explore By Provider
│   │   └── Recent Transactions
│   ├── Packages
│   │   ├── Package Catalog
│   │   ├── Package Detail
│   │   ├── Checkout
│   │   └── Purchase Success
│   ├── Transactions
│   │   └── Transaction View
│   └── Profile
│
└── Seller Portal
    ├── Dashboard
    │   ├── KPI Summary
    │   ├── Top Providers
    │   ├── Top Packages
    │   └── Recent Transactions
    ├── Customers
    │   └── Customer Detail
    └── Transactions
```

# Navigation Architecture

```text
Unauthenticated
│
├── Register
└── Login
    │
    ├── Customer Role
    │   └── Customer Portal Navigation
    │       ├── Dashboard
    │       ├── Packages
    │       ├── Transactions
    │       └── Profile
    │
    └── Seller Role
        └── Seller Portal Navigation
            ├── Dashboard
            ├── Customers
            └── Transactions
```

# User Flow Architecture

## Customer Flow

```text
Register
   │
   ▼
Login
   │
   ▼
Dashboard
   │
   ├── View Active Package
   │
   ├── View Recent Transactions
   │
   └── Explore Packages
          │
          ▼
Package Catalog
   │
   ├── Search Package
   ├── Filter Provider
   └── Select Package
          │
          ▼
Package Detail
   │
   ▼
Checkout
   │
   ▼
Purchase Success
   │
   ├── View Transaction
   │      │
   │      ▼
   │   Transaction View
   ├── Continue Browsing
   │      │
   │      ▼
   │   Package Catalog
   └── Return To Dashboard
          │
          ▼
       Dashboard
```

## Seller Flow

```text
Login
   │
   ▼
Seller Dashboard
   │
   ├── Review KPI Summary
   ├── Review Top Providers
   ├── Review Top Packages
   └── Review Recent Transactions
   │
   ├── Customers
   │      │
   │      ▼
   │   Customer Detail
   │      │
   │      ▼
   │   Customer Transaction History
   │
   └── Transactions
          │
          ▼
       Transaction Monitoring
```

# UX Strategy

## Customer Experience Strategy

Discovery strategy:

- Use the dashboard as the primary discovery entry point after login.
- Expose package groups directly on the dashboard: popular, featured, best value, and provider exploration.
- Support catalog search and provider filtering to help customers compare available packages.
- Use package cards to show provider, package name, quota, validity, and price.

Engagement strategy:

- Keep the active package visible on the dashboard to make the experience personal and useful.
- Surface recent transactions to connect past activity with current discovery.
- Provide multiple return paths after purchase success: view transaction, continue browsing, or return to dashboard.
- Use provider exploration and categorized package sections to support natural multi-page navigation.

Checkout strategy:

- Keep checkout focused on package summary, customer information, payment method, and total price.
- Preserve the no-cart model and direct-purchase behavior.
- Treat payment method as mock checkout data only because payment gateway integration is excluded.
- Use modal on desktop and bottom sheet on mobile as defined in the PRD.

Page-per-visit strategy:

- Design the customer journey around the required path: dashboard, package catalog, package detail, checkout, transaction view.
- Use dashboard sections to create multiple package discovery entry points.
- Use purchase success actions to continue navigation without adding out-of-scope features.

## Seller Experience Strategy

Monitoring strategy:

- Make the seller dashboard the entry point for business visibility.
- Provide direct access to customers and transactions.
- Keep customer detail focused on information, active package, remaining quota, and transaction history.
- Keep all seller views read-only because package CRUD, customer CRUD, and report export are excluded.

Analytics strategy:

- Use KPI summary for total customers, total transactions, revenue, and success rate.
- Use top providers and top packages to identify product performance.
- Use recent transactions to support quick monitoring.
- Derive all analytics from JSON Server mock data.

# Page Inventory

## P0 (Must Have)

| Page Name | User | Goal | Priority |
|---|---|---|---|
| Register | Customer | Create a customer account | P0 |
| Login | Customer, Seller | Authenticate and route by role | P0 |
| Customer Dashboard | Customer | View subscription state and start package discovery | P0 |
| Package Catalog | Customer | Browse, search, and filter packages | P0 |
| Package Detail | Customer | Review package information before purchase | P0 |
| Checkout | Customer | Complete package purchase flow | P0 |
| Purchase Success | Customer | Confirm purchase and provide next actions | P0 |
| Customer Transactions | Customer | Review transaction history | P0 |
| Transaction View | Customer | Review transaction result after purchase | P0 |
| Seller Dashboard | Seller | Review KPIs and business performance | P0 |
| Seller Customers | Seller | Monitor customers | P0 |
| Seller Customer Detail | Seller | Review customer information and transaction history | P0 |
| Seller Transactions | Seller | Monitor transactions | P0 |

## P1 (Should Have)

| Page Name | User | Goal | Priority |
|---|---|---|---|
| Customer Profile | Customer | View name, email, phone number, and role | P1 |

## P2 (Nice To Have)

No P2 pages are defined in the PRD.

# Screen Breakdown

## Register

### Purpose

Allow customers to create an account for marketplace access.

### Required Sections

- Registration form.

### Required Data

- Name.
- Email.
- Phone number.
- Password.
- Role as customer.

### Required Actions

- Register account.
- Navigate to login.

### Dependencies

- Users data model.
- Mock authentication.

## Login

### Purpose

Allow customers and sellers to access their role-specific portal.

### Required Sections

- Login form.

### Required Data

- Email.
- Password.
- User role from authenticated user.

### Required Actions

- Login.
- Route customer to Customer Dashboard.
- Route seller to Seller Dashboard.

### Dependencies

- Users data model.
- Mock authentication.
- Role-based access.

## Customer Dashboard

### Purpose

Display subscription information, encourage package discovery, and increase page-per-visit.

### Required Sections

- Active Package.
- Popular Packages.
- Featured Packages.
- Best Value Packages.
- Explore By Provider.
- Recent Transactions.

### Required Data

- Package name.
- Total quota.
- Remaining quota.
- Usage percentage.
- Expiry date.
- Package provider.
- Package quota.
- Package validity.
- Package price.
- Recent transaction status.
- Recent transaction purchase date.
- Recent transaction package.
- Recent transaction amount.

### Required Actions

- Open package catalog.
- Select package.
- Explore provider.
- Open recent transaction.

### Dependencies

- Active packages.
- Packages.
- Transactions.
- Authenticated customer.

## Package Catalog

### Purpose

Encourage discovery and package exploration.

### Required Sections

- Search Package.
- Filter Provider.
- Package Cards.

### Required Data

- Provider.
- Package name.
- Quota.
- Validity.
- Price.

### Required Actions

- Search package.
- Filter by provider.
- Select package card.

### Dependencies

- Packages data.
- Supported providers.

## Package Detail

### Purpose

Show package details before checkout.

### Required Sections

- Package information.
- Benefits.
- Price.

### Required Data

- Provider.
- Package name.
- Quota.
- Validity.
- Benefits.
- Price.

### Required Actions

- Continue to checkout.
- Dismiss detail.

### Dependencies

- Selected package.
- Responsive modal or bottom sheet behavior.

## Checkout

### Purpose

Allow the customer to complete immediate package purchase.

### Required Sections

- Package Summary.
- Customer Information.
- Payment Method.
- Total Price.

### Required Data

- Selected package.
- Customer name.
- Customer email.
- Customer phone number.
- Payment method.
- Total price.

### Required Actions

- Confirm purchase.
- Dismiss checkout.

### Dependencies

- Selected package.
- Authenticated customer.
- Transactions data.
- Responsive modal or bottom sheet behavior.

## Purchase Success

### Purpose

Confirm successful purchase and guide the customer to the next step.

### Required Sections

- Success Message.
- Transaction Summary.

### Required Data

- Transaction ID.
- Package.
- Amount.
- Status.
- Purchase date.

### Required Actions

- View Transaction.
- Continue Browsing.
- Return to Dashboard.

### Dependencies

- Created transaction.
- Package data.
- Customer route access.

## Customer Transactions

### Purpose

Allow customers to review transaction history.

### Required Sections

- Transaction List.

### Required Data

- Transaction status.
- Purchase date.
- Package.
- Amount.

### Required Actions

- Open transaction view.

### Dependencies

- Authenticated customer.
- Transactions data.
- Packages data.

## Transaction View

### Purpose

Complete the expected customer purchase flow by showing a transaction after success.

### Required Sections

- Transaction Summary.

### Required Data

- Transaction status.
- Purchase date.
- Package.
- Provider.
- Amount.

### Required Actions

- Return to transactions.
- Return to dashboard.

### Dependencies

- Transaction data.
- Package data.

## Customer Profile

### Purpose

Display customer account information.

### Required Sections

- Profile information.

### Required Data

- Name.
- Email.
- Phone number.
- Role.

### Required Actions

- View profile only.

### Dependencies

- Authenticated customer.
- Users data.

## Seller Dashboard

### Purpose

Provide business visibility through analytics.

### Required Sections

- KPI Summary.
- Top Providers.
- Top Packages.
- Recent Transactions.

### Required Data

- Total customers.
- Total transactions.
- Total revenue.
- Transaction success rate.
- Provider performance.
- Package performance.
- Recent transaction data.

### Required Actions

- Navigate to customers.
- Navigate to transactions.

### Dependencies

- Users data.
- Packages data.
- Transactions data.
- Seller role access.

## Seller Customers

### Purpose

Allow sellers to monitor customers.

### Required Sections

- Customers list.

### Required Data

- Name.
- Phone number.
- Active package.
- Total transactions.

### Required Actions

- Open customer detail.

### Dependencies

- Users data.
- Active packages.
- Transactions data.
- Packages data.

## Seller Customer Detail

### Purpose

Allow sellers to review a customer's information, active package, quota, and transaction history.

### Required Sections

- Customer Information.
- Active Package.
- Remaining Quota.
- Transaction History.

### Required Data

- Customer name.
- Customer email.
- Customer phone number.
- Active package.
- Total quota.
- Remaining quota.
- Transaction status.
- Purchase date.
- Package.
- Amount.

### Required Actions

- Navigate to transactions.
- Return to customers.

### Dependencies

- Selected customer.
- Users data.
- Active packages.
- Transactions data.
- Packages data.

## Seller Transactions

### Purpose

Allow sellers to monitor transactions.

### Required Sections

- Transactions list.

### Required Data

- Customer.
- Package.
- Provider.
- Status.
- Amount.
- Purchase date.

### Required Actions

- View transaction list.

### Dependencies

- Transactions data.
- Users data.
- Packages data.

# Responsive Strategy

## Customer Portal

Mobile First:

- Prioritize mobile layout decisions before desktop expansion.
- Ensure the customer journey supports dashboard, package catalog, detail, checkout, success, and transaction view on small screens.

Navigation Strategy:

- Provide access to Dashboard, Packages, Transactions, and Profile.
- Keep navigation aligned with the Customer Portal information architecture.

Modal Strategy:

- Use modal behavior for package detail on desktop.
- Use modal behavior for checkout on desktop.

Bottom Sheet Strategy:

- Use bottom sheet behavior for package detail on mobile.
- Use bottom sheet behavior for checkout on mobile.

## Seller Portal

Desktop First:

- Prioritize dashboard analytics, customer monitoring, and transaction monitoring for desktop.
- Preserve responsive access on mobile without expanding scope.

Navigation Strategy:

- Provide access to Dashboard, Customers, and Transactions.
- Keep seller navigation separate from customer navigation through role-based access.

Drawer Strategy:

- Use pages and drawer behavior on desktop as specified in the PRD.
- Use responsive layout on mobile.

# Design Risks

| Risk Type | Risk | Mitigation |
|---|---|---|
| Requirement ambiguity | Transaction detail is required by the customer success flow but is not deeply specified in the screen descriptions. | Limit transaction detail to fields already specified for transactions and purchase success. |
| Requirement ambiguity | Package detail requires benefits, but the package data model does not include a benefits field. | Treat benefits as package display data that must be added to mock package records without creating new feature behavior. |
| Requirement ambiguity | Payment method is required in checkout, but payment gateway integration is excluded. | Implement payment method as mock checkout selection only, with no real payment processing. |
| Requirement ambiguity | Top providers and top packages do not define ranking logic. | Derive ranking from transaction data using simple documented calculations. |
| Requirement ambiguity | Seller registration is not specified. | Do not create seller registration; sellers access through seeded mock users. |
| UX risk | Dashboard may become visually or cognitively crowded because it contains many sections. | Prioritize active package and discovery sections while keeping all PRD sections present. |
| UX risk | Customers may expect quota tracking to update in real time. | Present quota as subscription status from mock data and avoid real-time language. |
| UX risk | Checkout could feel incomplete without real payment. | Keep checkout focused on summary, customer info, mock payment method, and total price. |
| IA risk | Customer and seller portals could be confused if role routing is weak. | Enforce role-based route separation and distinct navigation sets. |
| IA risk | Discovery sections may duplicate catalog behavior. | Use dashboard sections as entry points and catalog as the complete browsing destination. |
| Scalability risk | JSON Server mock data may limit analytics fidelity. | Keep analytics derived from available data models only. |
| Scalability risk | No CRUD means package and customer data cannot be managed in-app. | Seed data outside the app and keep all management actions out of scope. |
| Scalability risk | Provider list is fixed in the PRD. | Use the PRD provider list as the controlled provider set. |

# Milestones

- Phase 1: Foundation.
- Phase 2: Information Architecture.
- Phase 3: Customer Portal UX.
- Phase 4: Seller Portal UX.
- Phase 5: Responsive Optimization.
- Phase 6: Design System.
- Phase 7: Validation.

# Detailed Implementation Task List

This task list translates the PRD into implementation-ready work. It is intentionally limited to the PRD scope and excludes shopping cart, wishlist, coupons, notifications, chat, real payment gateway integration, package CRUD, customer CRUD, report export, multi-language support, real quota tracking, and real telecom integration.

## Phase 1 Task List: Foundation

Status: Done.

| Task ID | Status | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|---|
| F-01 | Done | Confirm application stack | Align implementation with PRD technical scope | PRD technical scope | React, TypeScript, MUI, React Query, React Router, JSON Server confirmed | No unsupported framework or backend is introduced |
| F-02 | Done | Define core TypeScript models | Create shared contracts for PRD entities | PRD data model | `User`, `Package`, `Transaction`, `ActivePackage` types | Models include only PRD fields plus minimal display-only fields required by PRD, such as package benefits |
| F-03 | Done | Define role enum | Support customer and seller access rules | Users model | `customer` and `seller` roles | No additional roles exist |
| F-04 | Done | Define transaction status enum | Keep transaction status aligned to PRD | Transactions model | `pending`, `success`, `failed` statuses | No additional statuses exist |
| F-05 | Done | Define provider constants | Keep provider filtering controlled | PRD provider list | Telkomsel, XL, Indosat, Tri, Smartfren constants | Catalog and dashboard use only supported providers |
| F-06 | Done | Create JSON Server data structure | Provide mock backend collections | PRD data model | Mock `users`, `packages`, `transactions`, `activePackages` collections | All required collections are available through JSON Server |
| F-07 | Done | Seed customer users | Support customer login, dashboard, transactions, and profile | Users model | Customer records with name, email, phone number, password, role | At least one customer can log in and access customer portal |
| F-08 | Done | Seed seller users | Support seller login without seller registration | Users model | Seller records with name, email, phone number, password, role | At least one seller can log in and access seller portal |
| F-09 | Done | Seed packages | Support marketplace discovery | Packages model, provider constants | Package records across supported providers | Packages include provider, name, quota, validityDays, price, and discovery flags |
| F-10 | Done | Seed package discovery flags | Support dashboard package sections | Packages model | `isPopular`, `isFeatured`, `isBestValue` values | Popular, featured, and best value sections can each render data |
| F-11 | Done | Seed package benefits display data | Support package detail requirement | Package Detail PRD | Benefits available for package detail | Benefits appear only as detail display content and do not create new feature behavior |
| F-12 | Done | Seed transactions | Support customer and seller transaction views | Transactions model | Transaction records linked to customers and packages | Transactions use only pending, success, or failed statuses |
| F-13 | Done | Seed active packages | Support active package and quota widgets | Active Packages model | Active package records linked to customers and packages | Active package data supports total quota, remaining quota, and expiry date |
| F-14 | Done | Create API client layer | Centralize JSON Server requests | JSON Server | Typed fetch/query functions | Pages do not duplicate low-level request logic |
| F-15 | Done | Configure React Query provider | Support server-state access | React Query | Query client provider | Customer and seller data can be fetched through query hooks |
| F-16 | Done | Configure router provider | Support page and role navigation | React Router | Application route provider | Routes can be protected by auth and role |
| F-17 | Done | Implement mock login | Enable customer and seller access | Users data | Login function using seeded users | Valid users can authenticate; invalid credentials fail |
| F-18 | Done | Implement customer registration | Support PRD customer responsibility | Users data | Register function creating customer users | Registration creates customer role only |
| F-19 | Done | Implement session persistence | Keep mock login usable across refresh | Mock auth | Stored authenticated user state | Refresh does not immediately lose mock session |
| F-20 | Done | Implement logout | Allow ending authenticated session | Mock auth | Logout function | User returns to unauthenticated state |
| F-21 | Done | Implement role-based route guards | Protect portal boundaries | Auth state, role enum | Customer and seller protected route wrappers | Customer cannot access seller routes; seller cannot access customer routes |
| F-22 | Done | Define shared formatting utilities | Keep package, quota, date, and amount display consistent | Data model | Formatters for price, quota, validity, date, percentage | Values display consistently across dashboard, catalog, checkout, and transactions |
| F-23 | Done | Define analytics utility functions | Support seller dashboard calculations | Users, packages, transactions | Total customers, total transactions, revenue, success rate, top providers, top packages | Calculations are derived only from mock data |
| F-24 | Done | Validate mock data relationships | Prevent broken page states | Seed data | Relationship check between users, packages, transactions, active packages | Every transaction links to an existing customer and package |

## Phase 2 Task List: Information Architecture

Status: Done.

| Task ID | Status | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|---|
| IA-01 | Done | Define unauthenticated routes | Support registration and login | Mock auth | `/register`, `/login` routes | Unauthenticated users can reach register and login |
| IA-02 | Done | Define customer route namespace | Separate customer portal | Role-based access | Customer route group | Customer pages are grouped under customer access rules |
| IA-03 | Done | Define seller route namespace | Separate seller portal | Role-based access | Seller route group | Seller pages are grouped under seller access rules |
| IA-04 | Done | Add customer dashboard route | Support post-login customer landing page | Customer IA | Customer Dashboard route | Customer login lands on dashboard |
| IA-05 | Done | Add package catalog route | Support package discovery | Customer IA | Packages route | Customer can navigate to catalog |
| IA-06 | Done | Add package detail route or state contract | Support detail interaction | Package Catalog | Detail addressability or selected package state | Detail can be opened from dashboard or catalog |
| IA-07 | Done | Add checkout route or state contract | Support direct purchase flow | Package Detail | Checkout addressability or selected package state | Checkout can only proceed with a selected package |
| IA-08 | Done | Add purchase success route | Support post-checkout confirmation | Checkout | Success route with transaction reference | Success displays a created transaction summary |
| IA-09 | Done | Add customer transactions route | Support transaction history | Customer IA | Transactions route | Customer can view own transactions |
| IA-10 | Done | Add transaction view route | Support PRD success metric flow | Transactions | Transaction detail route | Customer can open a transaction after purchase success |
| IA-11 | Done | Add profile route | Support customer profile view | Customer IA | Profile route | Customer can view profile information |
| IA-12 | Done | Add seller dashboard route | Support seller landing page | Seller IA | Seller Dashboard route | Seller login lands on seller dashboard |
| IA-13 | Done | Add seller customers route | Support customer monitoring | Seller IA | Customers route | Seller can view customers list |
| IA-14 | Done | Add seller customer detail route | Support seller journey | Customers route | Customer detail route | Seller can open a customer detail page |
| IA-15 | Done | Add seller transactions route | Support transaction monitoring | Seller IA | Transactions route | Seller can view all transactions |
| IA-16 | Done | Define navigation labels | Keep navigation limited to PRD pages | IA | Customer and seller nav item definitions | Customer nav contains Dashboard, Packages, Transactions, Profile; seller nav contains Dashboard, Customers, Transactions |
| IA-17 | Done | Define default redirects | Prevent dead-end states | Auth and roles | Redirect rules | Authenticated users route to correct portal; unauthenticated users route to login |
| IA-18 | Done | Define not-found behavior | Handle invalid paths | Router | Not-found route | Invalid routes do not expose wrong portal content |

## Phase 3 Task List: Customer Portal UX

Status: Done.

| Task ID | Status | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|---|
| C-01 | Done | Build Customer Dashboard data query | Load dashboard data | Authenticated customer, API client | Dashboard query composition | Active package, package groups, and recent transactions are available |
| C-02 | Done | Implement Active Package widget | Display subscription information | Active package, package data | Widget with package name, total quota, remaining quota, usage percentage, expiry date | Widget matches PRD data requirements |
| C-03 | Done | Calculate usage percentage | Support quota display | Active package data | Usage percentage value | Percentage is derived from total quota and remaining quota |
| C-04 | Done | Implement Popular Packages section | Encourage discovery | Package flags | Popular package list | Section renders packages where `isPopular` is true |
| C-05 | Done | Implement Featured Packages section | Encourage exploration | Package flags | Featured package list | Section renders packages where `isFeatured` is true |
| C-06 | Done | Implement Best Value Packages section | Promote value-oriented discovery | Package flags | Best value package list | Section renders packages where `isBestValue` is true |
| C-07 | Done | Implement Explore By Provider section | Support provider browsing | Provider constants | Provider entry points | Only Telkomsel, XL, Indosat, Tri, Smartfren appear |
| C-08 | Done | Implement Recent Transactions section | Provide customer activity visibility | Customer transactions | Recent transaction list | Section shows status, purchase date, package, and amount |
| C-09 | Done | Link dashboard package cards to detail | Support page-per-visit flow | Package sections | Package selection behavior | Selecting a package opens package detail |
| C-10 | Done | Link provider exploration to catalog | Support discovery | Provider constants, catalog | Provider-filtered catalog entry | Selecting a provider opens catalog filtered to that provider |
| C-11 | Done | Build Package Catalog query | Load all packages | API client | Package catalog data | Catalog renders package records |
| C-12 | Done | Implement package search | Help customers find packages | Catalog data | Search input and filtering logic | Search filters packages by package content without adding new filter types |
| C-13 | Done | Implement provider filter | Narrow package catalog | Provider constants | Provider filter control | Filter supports PRD providers only |
| C-14 | Done | Implement package cards | Summarize packages | Packages data | Reusable card pattern | Card displays provider, package name, quota, validity, and price |
| C-15 | Done | Implement catalog empty state | Handle no search/filter results | Search and filter state | Empty result handling | Empty state does not add recommendations outside PRD |
| C-16 | Done | Implement Package Detail content | Show selected package details | Selected package | Detail content | Detail displays provider, package name, quota, validity, benefits, and price |
| C-17 | Done | Implement desktop Package Detail modal behavior | Match responsive PRD | Responsive strategy | Modal on desktop | Desktop opens detail in modal |
| C-18 | Done | Implement mobile Package Detail bottom sheet behavior | Match responsive PRD | Responsive strategy | Bottom sheet on mobile | Mobile opens detail in bottom sheet |
| C-19 | Done | Implement transition from detail to checkout | Support purchase flow | Selected package | Checkout open action | Customer can proceed from package detail to checkout |
| C-20 | Done | Implement Checkout package summary | Confirm selected package | Selected package | Package summary section | Checkout shows selected package information |
| C-21 | Done | Implement Checkout customer information | Confirm purchaser identity | Authenticated customer | Customer information section | Checkout shows customer name, email, and phone number |
| C-22 | Done | Implement Checkout payment method | Satisfy PRD checkout requirement | Mock checkout | Payment method section | Payment method is mock-only and does not integrate payment gateway |
| C-23 | Done | Implement Checkout total price | Confirm purchase amount | Selected package | Total price section | Total equals selected package price |
| C-24 | Done | Implement desktop Checkout modal behavior | Match responsive PRD | Responsive strategy | Checkout modal on desktop | Desktop checkout opens in modal |
| C-25 | Done | Implement mobile Checkout bottom sheet behavior | Match responsive PRD | Responsive strategy | Checkout bottom sheet on mobile | Mobile checkout opens in bottom sheet |
| C-26 | Done | Implement purchase confirmation action | Create transaction | Checkout data | New transaction record | Confirm purchase creates a transaction linked to customer and package |
| C-27 | Done | Define purchase transaction status behavior | Keep mock purchase explicit | Transaction statuses | Status assignment rule | Created transaction uses a PRD-valid status |
| C-28 | Done | Implement Purchase Success content | Confirm purchase | Created transaction | Success screen | Success displays message and transaction summary |
| C-29 | Done | Implement View Transaction action | Complete expected flow | Created transaction | Link to transaction view | Action opens transaction view |
| C-30 | Done | Implement Continue Browsing action | Encourage discovery after purchase | Catalog route | Link to package catalog | Action returns to catalog |
| C-31 | Done | Implement Return to Dashboard action | Return to subscription overview | Dashboard route | Link to dashboard | Action returns to dashboard |
| C-32 | Done | Build Customer Transactions query | Load customer history | Authenticated customer | Customer transaction list data | Only current customer's transactions are shown |
| C-33 | Done | Implement Customer Transactions list | Show transaction history | Transactions and packages | Transaction list | List displays status, purchase date, package, and amount |
| C-34 | Done | Implement Transaction View | Show selected transaction | Transaction and package data | Transaction detail screen | View displays status, purchase date, package, provider, and amount |
| C-35 | Done | Implement Customer Profile | Show customer account details | Authenticated customer | Profile page | Profile displays name, email, phone number, and role |
| C-36 | Done | Exclude profile editing | Preserve PRD non-scope | Profile PRD | Read-only profile | No edit action appears |
| C-37 | Done | Verify customer page-per-visit path | Validate success metric flow | Customer pages | End-to-end flow check | Dashboard to catalog to detail to checkout to transaction view works |

## Phase 4 Task List: Seller Portal UX

Status: Done.

| Task ID | Status | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|---|
| S-01 | Done | Build Seller Dashboard data query | Load analytics data | Users, packages, transactions | Dashboard query composition | KPI, top providers, top packages, and recent transactions data are available |
| S-02 | Done | Implement Total Customers KPI | Show customer count | Users data | KPI value | Counts users with customer role |
| S-03 | Done | Implement Total Transactions KPI | Show transaction volume | Transactions data | KPI value | Counts all transactions |
| S-04 | Done | Implement Total Revenue KPI | Show business revenue | Transactions data | KPI value | Revenue is derived from transaction amount values |
| S-05 | Done | Implement Transaction Success Rate KPI | Show transaction performance | Transactions data | KPI value | Success rate uses transactions with status `success` divided by total transactions |
| S-06 | Done | Implement Top Providers section | Identify provider performance | Transactions and packages | Provider ranking | Ranking is derived from transaction-package-provider relationships |
| S-07 | Done | Implement Top Packages section | Identify package performance | Transactions and packages | Package ranking | Ranking is derived from transaction-package relationships |
| S-08 | Done | Implement Seller Recent Transactions | Support quick monitoring | Transactions, users, packages | Recent transaction list | Displays customer, package, provider, status, amount, and purchase date where applicable |
| S-09 | Done | Build Customers query | Load customer monitoring data | Users, active packages, transactions, packages | Customer list data | Seller can access customer list data |
| S-10 | Done | Implement Customers list | Monitor customers | Customer list data | Customers page | Displays name, phone number, active package, and total transactions |
| S-11 | Done | Link customer row to Customer Detail | Support seller journey | Customers list | Customer detail navigation | Seller can open selected customer detail |
| S-12 | Done | Build Customer Detail query | Load selected customer data | Customer ID, users, active packages, transactions, packages | Detail data | Customer information, active package, quota, and history are available |
| S-13 | Done | Implement Customer Information section | Show selected customer identity | User data | Customer info section | Displays customer information from user record |
| S-14 | Done | Implement Customer Active Package section | Show subscription state | Active package, package data | Active package section | Displays active package and remaining quota |
| S-15 | Done | Implement Customer Transaction History | Show customer purchase history | Transactions, packages | History list | Displays transaction status, purchase date, package, and amount |
| S-16 | Done | Build Seller Transactions query | Load all transaction monitoring data | Transactions, users, packages | Seller transaction list data | All transactions can be listed for seller |
| S-17 | Done | Implement Seller Transactions list | Monitor transactions | Seller transaction list data | Transactions page | Displays customer, package, provider, status, amount, and purchase date |
| S-18 | Done | Exclude seller CRUD actions | Preserve PRD non-scope | Non-goals | Read-only seller pages | No package CRUD, customer CRUD, export, or transaction operation controls appear |
| S-19 | Done | Verify seller monitoring flow | Validate seller journey | Seller pages | End-to-end flow check | Login to dashboard to customers to customer detail to transactions works |

## Phase 5 Task List: Responsive Optimization

Status: Done.

| Task ID | Status | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|---|
| R-01 | Done | Define responsive breakpoint rules | Standardize mobile and desktop behavior | MUI, PRD responsive strategy | Breakpoint usage convention | Customer mobile and desktop interaction rules are consistent |
| R-02 | Done | Apply mobile-first customer layouts | Match PRD priority | Customer pages | Mobile customer layouts | Customer dashboard, catalog, transactions, and profile are usable on mobile |
| R-03 | Done | Expand customer layouts for desktop | Support larger screens | Customer mobile layouts | Desktop customer layouts | Desktop adds space without changing PRD feature scope |
| R-04 | Done | Validate package detail modal on desktop | Confirm PRD desktop behavior | Package Detail | Desktop modal behavior | Detail opens as modal on desktop viewport |
| R-05 | Done | Validate package detail bottom sheet on mobile | Confirm PRD mobile behavior | Package Detail | Mobile bottom sheet behavior | Detail opens as bottom sheet on mobile viewport |
| R-06 | Done | Validate checkout modal on desktop | Confirm PRD desktop behavior | Checkout | Desktop modal behavior | Checkout opens as modal on desktop viewport |
| R-07 | Done | Validate checkout bottom sheet on mobile | Confirm PRD mobile behavior | Checkout | Mobile bottom sheet behavior | Checkout opens as bottom sheet on mobile viewport |
| R-08 | Done | Apply desktop-first seller layouts | Match PRD priority | Seller pages | Desktop seller layouts | Seller dashboard, customers, customer detail, and transactions prioritize desktop usability |
| R-09 | Done | Implement seller desktop drawer behavior | Match PRD seller strategy | Seller navigation | Drawer navigation | Seller desktop uses pages and drawer behavior |
| R-10 | Done | Adapt seller views to mobile | Preserve access on small screens | Seller layouts | Responsive seller layouts | Seller pages remain usable on mobile |
| R-11 | Done | Check responsive table/list behavior | Prevent unreadable seller monitoring views | Transactions and customers data | Responsive list/table behavior | Required fields remain readable without adding export or CRUD |
| R-12 | Done | Check modal and bottom sheet accessibility basics | Keep interactions operable | Modal and sheet components | Focus and close behavior | Dialogs can be opened, closed, and navigated predictably |

## Phase 6 Task List: Design System

Status: Done.

| Task ID | Status | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|---|
| DS-01 | Done | Define MUI theme baseline | Establish consistent implementation layer | MUI | Theme configuration | Theme supports all PRD pages without adding visual-only scope |
| DS-02 | Done | Create app shell layouts | Support role-specific portals | IA, routing | Customer and seller shells | Shells contain only PRD navigation items |
| DS-03 | Done | Create authentication form pattern | Support register and login | Auth screens | Shared form structure | Register and login use consistent form behavior |
| DS-04 | Done | Create package card component | Reuse package summaries | Package card requirements | Package card | Displays provider, package name, quota, validity, and price |
| DS-05 | Done | Create active package component | Reuse quota display | Active package requirements | Active package widget | Displays required active package fields |
| DS-06 | Done | Create transaction list pattern | Reuse transaction displays | Transaction requirements | Transaction list component | Supports customer and seller required transaction fields |
| DS-07 | Done | Create KPI card pattern | Support seller analytics | Seller KPI requirements | KPI card component | Displays KPI label and value |
| DS-08 | Done | Create provider entry pattern | Support explore by provider | Provider constants | Provider entry component | Uses only supported providers |
| DS-09 | Done | Create modal pattern | Support desktop package detail and checkout | Responsive strategy | Reusable modal component | Desktop modal behavior works for detail and checkout |
| DS-10 | Done | Create bottom sheet pattern | Support mobile package detail and checkout | Responsive strategy | Reusable bottom sheet component | Mobile bottom sheet behavior works for detail and checkout |
| DS-11 | Done | Create read-only detail pattern | Support profile, transaction, and seller customer detail | Screen breakdown | Detail section component | Read-only content does not expose edit controls |
| DS-12 | Done | Create empty/loading/error states | Handle query states | React Query | State components | States do not introduce out-of-scope actions |
| DS-13 | Done | Document component usage boundaries | Prevent scope drift | Non-goals | Usage notes | Components are mapped to PRD pages and features |

## Phase 7 Task List: Validation

| Task ID | Task | Purpose | Dependencies | Output | Acceptance Criteria |
|---|---|---|---|---|---|
| V-01 | Validate PRD feature coverage | Confirm in-scope delivery | Completed implementation | Coverage checklist | Every in-scope feature is accounted for |
| V-02 | Validate non-goal exclusion | Prevent scope creep | Completed implementation | Non-goal checklist | No cart, wishlist, coupons, notifications, chat, real payments, CRUD, export, multi-language, real quota, or telecom integration exists |
| V-03 | Validate customer auth flow | Confirm customer access | Mock auth | Auth test result | Customer can register or log in and access customer portal |
| V-04 | Validate seller auth flow | Confirm seller access | Mock auth | Auth test result | Seller can log in and access seller portal |
| V-05 | Validate role-based access | Confirm portal separation | Route guards | Access control result | Customer cannot access seller pages; seller cannot access customer pages |
| V-06 | Validate customer page-per-visit flow | Confirm primary success metric path | Customer pages | Flow result | Dashboard → package catalog → package detail → checkout → transaction view works |
| V-07 | Validate package discovery | Confirm exploration behavior | Dashboard and catalog | Discovery result | Customers can browse dashboard package sections, explore by provider, search, and filter |
| V-08 | Validate checkout completion | Confirm purchase flow | Checkout and transactions | Checkout result | Confirm purchase creates a transaction and shows success |
| V-09 | Validate customer transactions | Confirm history access | Transactions | Transaction result | Customer sees own transactions and can open transaction view |
| V-10 | Validate customer profile | Confirm profile scope | Profile | Profile result | Profile shows name, email, phone number, and role; no edit action exists |
| V-11 | Validate seller dashboard analytics | Confirm business visibility | Seller dashboard | Analytics result | KPI summary, top providers, top packages, and recent transactions render from mock data |
| V-12 | Validate seller customer monitoring | Confirm monitoring efficiency | Seller customers | Monitoring result | Seller can view customers and open customer detail |
| V-13 | Validate seller transaction monitoring | Confirm transaction visibility | Seller transactions | Monitoring result | Seller can view customer, package, provider, status, amount, and purchase date |
| V-14 | Validate customer responsive behavior | Confirm mobile-first strategy | Customer portal | Responsive result | Detail and checkout use desktop modal and mobile bottom sheet |
| V-15 | Validate seller responsive behavior | Confirm desktop-first strategy | Seller portal | Responsive result | Seller desktop uses pages and drawer, mobile remains responsive |
| V-16 | Validate data integrity | Confirm mock data reliability | JSON Server data | Data integrity result | Users, packages, transactions, and active packages references are valid |
| V-17 | Validate deployment readiness | Confirm technical scope readiness | Frontend and JSON Server | Deployment checklist | Frontend and mock API can be deployed according to PRD technical scope |

# Phase 1

Foundation

## Objectives

- Establish the technical foundation from the PRD.
- Set up React, TypeScript, MUI, React Query, React Router, and JSON Server.
- Define mock data for users, packages, transactions, and active packages.
- Implement mock authentication and role-based access.

## Deliverables

- Project routing foundation.
- JSON Server mock API.
- Seed data for users, packages, transactions, and active packages.
- Mock authentication state.
- Role-based route protection.

## Dependencies

- PRD data model.
- User roles: customer and seller.
- Technical scope: React, TypeScript, MUI, React Query, React Router, JSON Server.

## Acceptance Criteria

- Customer and seller users can log in through mock authentication.
- Customer users can access only customer portal routes.
- Seller users can access only seller portal routes.
- Mock API exposes users, packages, transactions, and active packages.
- No out-of-scope features are introduced.

# Phase 2

Information Architecture

## Objectives

- Implement the role-specific navigation and route hierarchy.
- Align navigation with the PRD information architecture.
- Define the customer and seller page structure before screen-level work.

## Deliverables

- Customer route map: Dashboard, Packages, Transactions, Profile.
- Seller route map: Dashboard, Customers, Transactions.
- Authentication routes: Register and Login.
- Transaction view route for the expected customer flow.
- Customer detail route for seller monitoring.

## Dependencies

- Phase 1 authentication and route protection.
- PRD customer and seller journeys.

## Acceptance Criteria

- Customer navigation includes Dashboard, Packages, Transactions, and Profile.
- Seller navigation includes Dashboard, Customers, and Transactions.
- Customer and seller information architectures remain separate.
- Navigation supports the PRD-defined customer and seller flows.

# Phase 3

Customer Portal UX

## Objectives

- Implement the customer-facing experience with emphasis on discovery and page-per-visit.
- Support the full customer journey from dashboard to transaction view.
- Keep checkout direct and cart-free.

## Deliverables

- Customer Dashboard.
- Active Package widget.
- Popular Packages section.
- Featured Packages section.
- Best Value Packages section.
- Explore By Provider section.
- Recent Transactions section.
- Package Catalog with search and provider filter.
- Package Detail interaction.
- Checkout interaction.
- Purchase Success screen.
- Customer Transactions page.
- Transaction View.
- Customer Profile view.

## Dependencies

- Phase 1 mock data and API access.
- Phase 2 customer navigation.
- Package flags: `isPopular`, `isFeatured`, `isBestValue`.
- Authenticated customer data.

## Acceptance Criteria

- Customer can follow the PRD flow: dashboard, catalog, detail, checkout, success, transaction view.
- Package catalog supports package search and provider filtering.
- Package cards show provider, package name, quota, validity, and price.
- Package detail shows provider, package name, quota, validity, benefits, and price.
- Checkout shows package summary, customer information, payment method, and total price.
- Purchase success provides View Transaction, Continue Browsing, and Return to Dashboard actions.
- Profile displays name, email, phone number, and role without editing.

# Phase 4

Seller Portal UX

## Objectives

- Implement seller monitoring and analytics workflows.
- Keep seller functionality read-only and limited to the PRD.
- Support dashboard-level business visibility.

## Deliverables

- Seller Dashboard.
- KPI Summary.
- Top Providers section.
- Top Packages section.
- Recent Transactions section.
- Customers page.
- Customer Detail page.
- Seller Transactions page.

## Dependencies

- Phase 1 mock data and API access.
- Phase 2 seller navigation.
- Users, packages, transactions, and active packages.

## Acceptance Criteria

- Seller Dashboard displays total customers, total transactions, total revenue, and transaction success rate.
- Seller Dashboard displays top providers, top packages, and recent transactions.
- Customers page displays name, phone number, active package, and total transactions.
- Customer Detail displays customer information, active package, remaining quota, and transaction history.
- Seller Transactions displays customer, package, provider, status, amount, and purchase date.
- No package CRUD, customer CRUD, export, or operational transaction actions are present.

# Phase 5

Responsive Optimization

## Objectives

- Apply the PRD responsive strategy.
- Optimize Customer Portal mobile-first behavior.
- Optimize Seller Portal desktop-first behavior with responsive support.

## Deliverables

- Mobile-first Customer Portal layouts.
- Desktop modal behavior for package detail.
- Desktop modal behavior for checkout.
- Mobile bottom sheet behavior for package detail.
- Mobile bottom sheet behavior for checkout.
- Desktop-first Seller Portal layouts.
- Seller pages and drawer behavior on desktop.
- Seller responsive layouts on mobile.

## Dependencies

- Phase 3 customer interactions.
- Phase 4 seller portal screens.
- MUI responsive utilities.

## Acceptance Criteria

- Customer package detail opens as a modal on desktop.
- Customer package detail opens as a bottom sheet on mobile.
- Customer checkout opens as a modal on desktop.
- Customer checkout opens as a bottom sheet on mobile.
- Seller portal supports desktop-first pages and drawer behavior.
- Seller portal remains usable on mobile responsive layouts.

# Phase 6

Design System

## Objectives

- Establish a consistent implementation layer using MUI.
- Define reusable UI patterns only after page and flow requirements are clear.
- Keep components aligned with the PRD feature set.

## Deliverables

- Shared layout primitives.
- Role-specific navigation components.
- Package card component.
- Transaction list pattern.
- KPI card pattern.
- Modal and bottom sheet patterns.
- Form patterns for register, login, and checkout.

## Dependencies

- Phase 2 information architecture.
- Phase 3 customer portal requirements.
- Phase 4 seller portal requirements.
- Phase 5 responsive behavior.

## Acceptance Criteria

- Reusable components support only PRD-defined pages and features.
- Components do not introduce wishlist, cart, coupons, notifications, chat, CRUD, export, or real payment behavior.
- Customer and seller components remain consistent while preserving role-specific needs.
- Responsive modal and bottom sheet patterns are reusable for package detail and checkout.

# Phase 7

Validation

## Objectives

- Validate the implementation against the PRD.
- Confirm all in-scope flows are complete.
- Confirm all non-goals remain excluded.

## Deliverables

- PRD coverage checklist.
- Role-based access validation.
- Customer journey validation.
- Seller journey validation.
- Responsive behavior validation.
- Non-goal exclusion checklist.

## Dependencies

- Completed Phases 1 through 6.
- Seeded mock data.

## Acceptance Criteria

- Customer can complete the full required journey from register/login to transaction view.
- Seller can complete the full required journey from login to dashboard, customers, customer detail, and transactions.
- All PRD in-scope pages are present.
- All PRD required data points are displayed where specified.
- Desktop and mobile interaction patterns match the PRD.
- Out-of-scope features are not present.
