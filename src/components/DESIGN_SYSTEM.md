# Design System Usage Boundaries

This implementation layer exists only to support the PRD-defined Internet Package Marketplace.

## Supported Patterns

- Role-specific shells for Customer Portal and Seller Portal.
- Package card for provider, package name, quota, validity, and price.
- Active package widget for package name, quota, usage percentage, and expiry date.
- Transaction summaries and transaction lists for PRD-defined transaction fields.
- KPI card for seller analytics label and value.
- Provider entry for Telkomsel, XL, Indosat, Tri, and Smartfren.
- Responsive panel for desktop modal and mobile bottom sheet behavior.
- Read-only detail sections for profile, transaction, and customer monitoring pages.
- Loading, empty, and error states for mock API data.

## Excluded Patterns

- Shopping cart.
- Wishlist.
- Coupons.
- Notification center.
- Chat.
- Real payment behavior.
- Package CRUD.
- Customer CRUD.
- Report export.
- Multi-language behavior.
- Real quota tracking.
- Real telecom integration.
