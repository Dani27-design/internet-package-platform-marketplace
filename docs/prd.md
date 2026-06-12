# Internet Package Marketplace Platform

## Product Requirements Document (PRD)

Version: 1.0

---

# 1. Executive Summary

Internet Package Marketplace Platform is a modern multi-provider internet package marketplace that enables customers to discover, compare, and purchase internet packages from multiple telecommunications providers through a single platform.

The platform also provides a dedicated Seller Portal that allows business partners to monitor customers, transactions, and overall business performance through analytics dashboards.

The primary focus of this project is improving user experience and increasing page-per-visit through package discovery and customer engagement.

---

# 2. Background

The existing internet package e-commerce experience requires UI/UX refreshment and improvements.

The original requirements mention:

* Internet package e-commerce
* Customer menu
* Transaction menu per customer
* UI/UX improvements
* Increase page-per-visit

Because the requirements are intentionally broad, several product assumptions are required to create a realistic and valuable user experience.

---

# 3. Product Assumptions

## Assumption 1: Multi-Provider Marketplace

The platform sells internet packages from multiple providers.

Supported providers:

* Telkomsel
* XL
* Indosat
* Tri
* Smartfren

Reasoning:

* Increases product discovery
* Increases page-per-visit
* Creates a richer browsing experience

---

## Assumption 2: Two User Roles

The platform supports:

### Customer

Users who purchase internet packages.

### Seller

Business partners who monitor customers and transactions.

---

## Assumption 3: Customer-Centric Product

The platform prioritizes customer experience because page-per-visit metrics primarily apply to customer activities.

Effort allocation:

```text
Customer Portal  : 70%
Seller Portal    : 30%
```

---

# 4. Problem Statement

Current internet package purchasing experiences often suffer from:

* Limited package discovery
* Low engagement
* Generic purchasing experience
* Lack of customer visibility
* Lack of business visibility

Consequences:

* Users leave the platform quickly
* Low page-per-visit
* Low engagement
* Poor product exploration

---

# 5. Product Vision

Create a modern internet package marketplace that helps customers discover and purchase internet packages while enabling sellers to monitor customer activity and business performance.

---

# 6. Product Goals

## Business Goals

* Increase page-per-visit
* Improve engagement
* Improve package discovery
* Improve purchase completion rate
* Improve business visibility

---

## Customer Goals

* Discover internet packages
* Compare package options
* Purchase packages quickly
* Monitor active packages
* Review transaction history

---

## Seller Goals

* Monitor customers
* Monitor transactions
* Monitor business performance
* Identify top-performing products

---

# 7. Success Metrics

## Customer Metrics

### Page Per Visit

Users should naturally navigate through multiple screens.

Expected flow:

```text
Dashboard
    ↓
Package Catalog
    ↓
Package Detail
    ↓
Checkout
    ↓
Transaction Detail
```

---

### Package Discovery

Users should explore multiple package offerings before making decisions.

---

### Checkout Completion Rate

Users should complete purchases with minimal friction.

---

## Seller Metrics

### Monitoring Efficiency

Reduce time needed to review customers and transactions.

### Business Visibility

Provide quick access to business insights.

---

# 8. Product Architecture

```text
Internet Package Marketplace
│
├── Customer Portal (70%)
│   │
│   ├── Authentication
│   ├── Dashboard
│   ├── Packages
│   ├── Transactions
│   └── Profile
│
└── Seller Portal (30%)
    │
    ├── Dashboard
    ├── Customers
    └── Transactions
```

---

# 9. User Roles

## Customer

Responsibilities:

* Register account
* Login
* Browse packages
* Purchase packages
* View transactions

Permissions:

* View packages
* Create transactions
* View active package
* View transaction history

---

## Seller

Responsibilities:

* Monitor customers
* Monitor transactions
* Review analytics

Permissions:

* View customers
* View transactions
* View analytics

---

# 10. Customer Journey

```text
┌──────────┐
│ Register │
└────┬─────┘
     │
     ▼
┌────────┐
│ Login  │
└────┬───┘
     │
     ▼
┌─────────────┐
│ Dashboard   │
└────┬────────┘
     │
     ▼
┌─────────────┐
│ Packages    │
└────┬────────┘
     │
     ▼
┌─────────────┐
│ Detail      │
└────┬────────┘
     │
     ▼
┌─────────────┐
│ Checkout    │
└────┬────────┘
     │
     ▼
┌─────────────┐
│ Success     │
└────┬────────┘
     │
     ▼
┌──────────────────┐
│ Transaction View │
└──────────────────┘
```

---

# 11. Seller Journey

```text
┌────────┐
│ Login  │
└────┬───┘
     │
     ▼
┌─────────────┐
│ Dashboard   │
└────┬────────┘
     │
     ▼
┌─────────────┐
│ Customers   │
└────┬────────┘
     │
     ▼
┌────────────────┐
│ Customer Detail│
└────┬───────────┘
     │
     ▼
┌─────────────┐
│Transactions │
└─────────────┘
```

---

# 12. Customer Portal

## Dashboard

Dashboard is the primary landing page after login.

Goals:

* Display subscription information
* Encourage package discovery
* Increase page-per-visit

### Dashboard Structure

```text
Dashboard
│
├── Active Package
│   ├── Package Name
│   ├── Remaining Quota
│   └── Expiry Date
│
├── Popular Packages
│
├── Featured Packages
│
├── Best Value Packages
│
├── Explore By Provider
│
└── Recent Transactions
```

---

## Active Package Widget

Displays:

* Package Name
* Total Quota
* Remaining Quota
* Usage Percentage
* Expiry Date

Example:

```text
Internet 25GB

Remaining:
12.5GB / 25GB

██████░░░░░░ 50%

Expires In:
7 Days
```

---

## Package Catalog

Goals:

* Encourage discovery
* Promote package exploration

Features:

* Search Package
* Filter Provider
* Browse Package Cards

Package Card:

```text
Provider
Package Name
Quota
Validity
Price
```

---

## Package Detail

Displays:

* Provider
* Package Name
* Quota
* Validity
* Benefits
* Price

Interaction Pattern:

```text
Desktop  → Modal
Mobile   → Bottom Sheet
```

---

## Checkout

Displays:

* Package Summary
* Customer Information
* Payment Method
* Total Price

Interaction Pattern:

```text
Desktop  → Modal
Mobile   → Bottom Sheet
```

---

## Purchase Success

Displays:

* Success Message
* Transaction Summary

Actions:

* View Transaction
* Continue Browsing
* Return to Dashboard

---

## Transactions

Displays:

* Transaction List
* Transaction Status
* Purchase Date
* Package
* Amount

---

## Profile

Displays:

* Name
* Email
* Phone Number
* Role

Profile editing is intentionally excluded from project scope.

---

# 13. Seller Portal

## Dashboard

Goal:

Provide business visibility through analytics.

### Dashboard Structure

```text
Dashboard
│
├── KPI Summary
│   ├── Total Customers
│   ├── Total Transactions
│   ├── Revenue
│   └── Success Rate
│
├── Top Providers
│
├── Top Packages
│
└── Recent Transactions
```

---

## KPI Cards

Displays:

```text
Total Customers

Total Transactions

Total Revenue

Transaction Success Rate
```

---

## Customers

Displays:

* Name
* Phone Number
* Active Package
* Total Transactions

---

## Customer Detail

Displays:

* Customer Information
* Active Package
* Remaining Quota
* Transaction History

---

## Transactions

Displays:

* Customer
* Package
* Provider
* Status
* Amount
* Purchase Date

---

# 14. Information Architecture

## Customer Portal

```text
Dashboard
│
├── Active Package
├── Popular Packages
├── Featured Packages
├── Best Value Packages
└── Recent Transactions

Packages

Transactions

Profile
```

---

## Seller Portal

```text
Dashboard
│
├── KPI Summary
├── Top Providers
├── Top Packages
└── Recent Transactions

Customers

Transactions
```

---

# 15. Data Model

## Users

```text
id
role
name
email
phoneNumber
password
```

Roles:

```text
customer
seller
```

---

## Packages

```text
id
provider
name
quota
validityDays
price
isPopular
isFeatured
isBestValue
```

---

## Transactions

```text
id
customerId
packageId
amount
status
createdAt
```

Status:

```text
pending
success
failed
```

---

## Active Packages

```text
id
customerId
packageId
totalQuota
remainingQuota
expiryDate
```

---

# 16. Entity Relationship Diagram

```text
┌─────────────┐
│    Users    │
├─────────────┤
│ id          │
│ role        │
│ name        │
│ email       │
│ phoneNumber │
└──────┬──────┘
       │
       │ 1
       │
       │ N
┌──────▼────────────┐
│   Transactions    │
├───────────────────┤
│ id                │
│ customerId        │
│ packageId         │
│ amount            │
│ status            │
│ createdAt         │
└──────┬────────────┘
       │
       │ N
       │
       │ 1
┌──────▼─────────┐
│   Packages     │
├────────────────┤
│ id             │
│ provider       │
│ name           │
│ quota          │
│ validityDays   │
│ price          │
└────────────────┘


┌─────────────────┐
│ Active Packages │
├─────────────────┤
│ customerId      │
│ packageId       │
│ totalQuota      │
│ remainingQuota  │
│ expiryDate      │
└─────────────────┘
```

---

# 17. Responsive Strategy

## Customer Portal

```text
Priority:
Mobile First

Desktop:
Modal

Mobile:
Bottom Sheet
```

---

## Seller Portal

```text
Priority:
Desktop First

Desktop:
Pages + Drawer

Mobile:
Responsive Layout
```

---

# 18. Product Decisions & Trade-Offs

## Decision: Multi-Provider Marketplace

Reason:

* Better package discovery
* Higher page-per-visit
* More engaging browsing experience

Trade-off:

* Slightly larger data model

---

## Decision: No Shopping Cart

Reason:

Internet packages are typically purchased immediately.

Trade-off:

Cannot support batch purchases.

---

## Decision: Customer-Centric Experience

Reason:

Page-per-visit metrics primarily originate from customer behavior.

Trade-off:

Seller functionality remains intentionally limited.

---

## Decision: Simulated Quota Tracking

Reason:

Improves dashboard realism and UX.

Trade-off:

Quota consumption is not updated in real time.

---

# 19. Non Goals

The following features are intentionally excluded:

* Shopping Cart
* Wishlist
* Coupons
* Notification Center
* Chat System
* Payment Gateway Integration
* Package CRUD
* Customer CRUD
* Report Export
* Multi Language
* Real Quota Consumption Tracking
* Real Telecom Integration

---

# 20. Technical Scope

## Frontend

* React
* TypeScript
* MUI
* React Query
* React Router

## Backend

* JSON Server

## Authentication

* Mock Authentication
* Role-Based Access

## Deployment

* Vercel (Frontend)
* JSON Server Mock API

```
```
