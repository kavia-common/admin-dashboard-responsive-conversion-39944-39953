# Admin Dashboard Routes

This document provides an overview of all available routes in the Admin Dashboard React application.

## Architecture

The application now uses a **persistent layout shell** with:
- **Sidebar**: Collapsible navigation with active route highlighting
- **Topbar**: Search, notifications, and user avatar
- **Main Content Area**: Dynamic page content

All routes (except legacy reference pages) render within this shell, providing a cohesive single-page application experience.

---

## Primary Dashboard Routes

### Home & Overview
- **Path:** `/`
- **Redirects to:** `/overview`
- **Description:** Default landing page, automatically navigates to Overview

- **Path:** `/overview`
- **Component:** `OverviewPage`
- **Description:** Main dashboard with key metrics and charts
- **Asset:** Renders `overview-3-3111.html` via iframe (TODO: Convert to native React)

### Data Management Pages

- **Path:** `/customers`
- **Component:** `CustomersPage`
- **Description:** Customer list and management interface
- **Status:** Placeholder (TODO: Implement native table components)

- **Path:** `/products`
- **Component:** `ProductsPage`
- **Description:** Product catalog and inventory management
- **Status:** Placeholder (TODO: Implement native grid/table)

- **Path:** `/transactions`
- **Component:** `TransactionsPage`
- **Description:** Transaction history with filtering capabilities
- **Status:** Placeholder (TODO: Implement native table with sorting)

---

## UI Components Gallery

### Components Hub
- **Path:** `/components`
- **Redirects to:** `/components/buttons`
- **Description:** Default components page

### Component Categories
All components render in a tabbed interface within `ComponentsPage`:

- **Path:** `/components/buttons`
- **Asset:** `buttons-11-32.html`
- **Description:** Button component variants (sizes, states)

- **Path:** `/components/badges`
- **Asset:** `badges-11-31.html`
- **Description:** Badge component color variants

- **Path:** `/components/footers`
- **Asset:** `footers-11-33.html`
- **Description:** Footer component layouts

- **Path:** `/components/icons`
- **Asset:** `heroicons-4-2561.html`
- **Description:** Heroicons icon library

**Implementation Note:** Components are currently displayed via iframe from Figma assets. Future enhancement should convert these to interactive React components.

---

## Documentation

### Docs Hub
- **Path:** `/docs`
- **Redirects to:** `/docs/introduction`
- **Description:** Default documentation page

### Documentation Pages
All documentation pages render via `DocsPage` component:

- **Path:** `/docs/introduction`
- **Asset:** `introduction-1-20.html`
- **Description:** Getting started guide

- **Path:** `/docs/support`
- **Alias:** `/support`
- **Asset:** `support-1-74.html`
- **Description:** Support information and contact

- **Path:** `/docs/license`
- **Alias:** `/license`
- **Asset:** `license-1-78.html`
- **Description:** License terms and conditions

---

## Error Pages

### 404 Not Found
- **Path:** `/errors/404`
- **Component:** `NotFoundPage`
- **Asset:** `404-3-4143.html` (desktop) or `404mobile-15-803.html` (mobile)
- **Description:** Page not found error with responsive design

- **Path:** `/errors/404-mobile`
- **Component:** `NotFoundPage`
- **Description:** Mobile-specific 404 page

### Catch-All Route
- **Path:** `*` (any unmatched route)
- **Component:** `NotFoundPage`
- **Description:** Fallback for undefined routes

---

## Legacy/Reference Routes

These routes are preserved for backward compatibility and design reference:

- **Path:** `/overview-mobile`
- **Asset:** `overview-mobile-14-1.html`
- **Description:** Mobile overview design reference

- **Path:** `/mobile`
- **Asset:** `mobile-18-808.html`
- **Description:** Mobile layout example

- **Path:** `/tablet`
- **Asset:** `tablet-18-778.html`
- **Description:** Tablet layout example

- **Path:** `/colors`
- **Asset:** `colors-2-220.html`
- **Description:** Color palette reference

- **Path:** `/typography`
- **Asset:** `typography-2-135.html`
- **Description:** Typography system reference

- **Path:** `/spacers`
- **Asset:** `spacers-2-596.html`
- **Description:** Spacing system reference

---

## Navigation Structure

### Sidebar Navigation
The sidebar provides hierarchical navigation:

```
📊 Overview
👥 Customers
📦 Products
💳 Transactions
🧩 Components
   ├─ Buttons
   ├─ Badges
   ├─ Footers
   └─ Icons
📄 Documentation
   ├─ Introduction
   ├─ Support
   └─ License
```

### Navigation Features
- **Active State Highlighting**: Current route is highlighted in sidebar
- **Keyboard Navigation**: Full keyboard support with arrow keys and tab order
- **Collapsible Sidebar**: Toggle button to collapse/expand (desktop)
- **Mobile Menu**: Hamburger menu with overlay on mobile devices
- **Nested Navigation**: Component and docs sections expand to show sub-items
- **ARIA Labels**: Full accessibility support with `aria-current` and labels

---

## Asset Organization

### File Structure
```
dashboard_frontend/
├── public/
│   └── assets/
│       ├── *.html              # Screen HTML files
│       ├── *.css               # Screen stylesheets
│       ├── *.js                # Screen scripts
│       └── figmaimages/        # All image assets
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.js       # Main layout wrapper
│   │   │   ├── Sidebar.js      # Navigation sidebar
│   │   │   ├── Topbar.js       # Top header bar
│   │   │   └── *.module.css    # Component styles
│   │   └── IframeScreen.js     # Iframe wrapper component
│   ├── pages/
│   │   ├── OverviewPage.js     # Dashboard overview
│   │   ├── CustomersPage.js    # Customer management
│   │   ├── ProductsPage.js     # Product catalog
│   │   ├── TransactionsPage.js # Transaction history
│   │   ├── ComponentsPage.js   # UI components gallery
│   │   ├── DocsPage.js         # Documentation pages
│   │   ├── NotFoundPage.js     # 404 error page
│   │   └── Page.module.css     # Shared page styles
│   ├── screens/                # Legacy screen wrappers
│   ├── App.js                  # Main router configuration
│   └── index.js                # Application entry point
```

### Asset Path Resolution
- All HTML files are served from `/assets/`
- CSS and JS files are loaded relative to HTML files
- Images are loaded from `/assets/figmaimages/`
- Paths in HTML files use `./` relative notation

---

## Implementation Details

### Layout System
- **Grid-based Layout**: CSS Grid for sidebar, topbar, and main content
- **Responsive Breakpoints**: 
  - Desktop: >= 769px (sidebar visible)
  - Mobile: <= 768px (sidebar hidden, hamburger menu)
- **CSS Isolation**: Layout styles use CSS Modules to prevent conflicts
- **Asset Styles**: Iframe-rendered assets maintain independent styles

### Routing Behavior
- **SPA Navigation**: React Router handles all navigation without page reloads
- **Scroll Restoration**: Pages scroll to top on route change
- **Deep Linking**: All routes support direct URL access
- **Route Guards**: 404 handling for undefined paths

### Accessibility
- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<header>` elements
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper announcements for route changes
- **Skip Links**: (TODO) Add skip to main content link

---

## Development Workflow

### Running the Application
```bash
npm start
```
Access at: http://localhost:3000

### Adding a New Page
1. Create page component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation item in `src/components/Layout/Sidebar.js`
4. Update this ROUTES.md file

### Converting Iframe Assets to Native React
For better performance and integration:
1. Extract HTML structure from asset file
2. Convert to React component with proper state management
3. Extract CSS to CSS Module
4. Migrate JavaScript logic to React hooks
5. Update route to use new component instead of `IframeScreen`

---

## Testing Routes

### Manual Testing Checklist
- [ ] All routes resolve without 404 errors
- [ ] Sidebar highlights active route correctly
- [ ] Navigation works without page reload
- [ ] Mobile menu opens/closes properly
- [ ] Keyboard navigation works (Tab, Arrow keys)
- [ ] Screen readers announce route changes
- [ ] Deep links work when pasted directly
- [ ] Browser back/forward buttons work
- [ ] 404 page displays for unknown routes

### QA Workflow
1. Navigate through all sidebar items
2. Test nested navigation (Components, Docs)
3. Verify responsive behavior on mobile/tablet
4. Check keyboard accessibility
5. Test direct URL access for each route
6. Verify asset loading in iframe pages
7. Check console for errors

---

## Future Enhancements

### Planned Improvements
1. **Native React Components**: Convert iframe assets to React components
   - Priority: Customers, Products, Transactions tables
   - Use accessible table components with sorting/filtering
   
2. **Breadcrumb Navigation**: Add breadcrumbs for nested routes

3. **Search Functionality**: Implement global search in topbar

4. **User Menu**: Add dropdown menu on avatar click

5. **Notifications Panel**: Implement notifications slide-out

6. **Themes**: Add light/dark mode toggle

7. **Loading States**: Add skeleton loaders for page transitions

8. **Error Boundaries**: Catch and display component errors gracefully

9. **Analytics**: Track page views and user interactions

10. **Progressive Enhancement**: 
    - Add service worker for offline support
    - Implement code splitting for better performance

---

## Troubleshooting

### Common Issues

**Issue: Sidebar not showing**
- Check browser width (hidden on mobile by default)
- Verify Layout component is wrapping the route
- Check CSS Modules are loading

**Issue: Assets not loading in iframe**
- Verify asset files exist in `/public/assets/`
- Check network tab for 404 errors
- Ensure paths use correct `/assets/` prefix

**Issue: Navigation not highlighting**
- Check route paths match exactly
- Verify `NavLink` components use correct `to` prop
- Check `end` prop on parent routes

**Issue: Mobile menu not closing**
- Verify overlay click handler is working
- Check `onMobileClose` prop is passed correctly
- Inspect z-index layering

---

## Support

For issues or questions about routing:
1. Check this documentation first
2. Review browser DevTools console for errors
3. Verify route configuration in `App.js`
4. Test with different screen sizes

---

**Last Updated:** 2024  
**Version:** 2.0 (Dashboard Layout Refactor)  
**Maintained By:** Development Team
