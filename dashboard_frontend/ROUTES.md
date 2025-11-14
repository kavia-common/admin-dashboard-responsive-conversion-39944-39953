# Admin Dashboard Routes

This document provides an overview of all available routes in the Admin Dashboard React application.

## Architecture

The application uses a **persistent layout shell** with:
- **Sidebar**: Collapsible navigation with active route highlighting
- **Topbar**: Search, notifications, and user avatar
- **Main Content Area**: Dynamic page content

All routes render within this shell, providing a cohesive single-page application experience. Asset screens are rendered via `IframeScreen` component to preserve their exact HTML/CSS/JS without modifications.

---

## Primary Dashboard Routes

### Home & Overview
- **Path:** `/`
- **Redirects to:** `/overview`
- **Description:** Default landing page, automatically navigates to Overview

- **Path:** `/overview`
- **Component:** `OverviewPage`
- **Description:** Main dashboard with key metrics and charts (Native React implementation)

### Data Management Pages

- **Path:** `/customers`
- **Component:** `CustomersPage`
- **Description:** Customer list and management interface with sortable DataTable

- **Path:** `/products`
- **Component:** `ProductsPage`
- **Description:** Product catalog with grid layout and ProductCard components

- **Path:** `/transactions`
- **Component:** `TransactionsPage`
- **Description:** Transaction history with filtering and sorting capabilities

---

## UI Components Gallery

### Components Hub
- **Path:** `/components`
- **Redirects to:** `/components/buttons`
- **Description:** Default components page

### Component Categories
All components render in a tabbed interface within `ComponentsPage`:

- **Path:** `/components/buttons`
- **Asset:** `/assets/buttons-11-32.html`
- **Description:** Button component variants (sizes, states)

- **Path:** `/components/badges`
- **Asset:** `/assets/badges-11-31.html`
- **Description:** Badge component color variants

- **Path:** `/components/footers`
- **Asset:** `/assets/footers-11-33.html`
- **Description:** Footer component layouts

- **Path:** `/components/icons`
- **Asset:** `/assets/heroicons-4-2561.html`
- **Description:** Heroicons icon library

**Implementation Note:** Components are displayed via iframe from refined assets to preserve pixel-perfect HTML/CSS/JS.

---

## Documentation Routes

### Docs Hub
- **Path:** `/docs`
- **Redirects to:** `/docs/introduction`
- **Description:** Default documentation page

### Documentation Pages
All documentation pages render via `IframeScreen`:

- **Path:** `/docs/introduction`
- **Asset:** `/assets/introduction-1-20.html`
- **Description:** Getting started guide

- **Path:** `/docs/how-to-use`
- **Asset:** `/assets/how-to-use-1-70.html`
- **Description:** How to use the dashboard

- **Path:** `/docs/support`
- **Alias:** `/support`
- **Asset:** `/assets/support-1-74.html`
- **Description:** Support information and contact

- **Path:** `/docs/license`
- **Alias:** `/license`
- **Asset:** `/assets/license-1-78.html`
- **Description:** License terms and conditions

---

## Design System Routes

### Style Guide & Reference Pages

- **Path:** `/colors`
- **Asset:** `/assets/colors-2-220.html`
- **Description:** Color palette reference

- **Path:** `/typography`
- **Asset:** `/assets/typography-2-135.html`
- **Description:** Typography system reference

- **Path:** `/spacers`
- **Asset:** `/assets/spacers-2-596.html`
- **Description:** Spacing system reference

- **Path:** `/fonts`
- **Asset:** `/assets/fonts-35-738.html`
- **Description:** Font documentation and examples

- **Path:** `/illustrations`
- **Asset:** `/assets/illustrations-903-0.html`
- **Description:** Illustration assets gallery

- **Path:** `/sidebars-topbars`
- **Asset:** `/assets/sidebars-topbars-3-65.html`
- **Description:** Navigation component examples

- **Path:** `/cover`
- **Asset:** `/assets/cover-900-737.html`
- **Description:** Cover page design

---

## Device-Specific Reference Routes

- **Path:** `/overview-mobile`
- **Asset:** `/assets/overview-mobile-14-1.html`
- **Description:** Mobile overview design reference

- **Path:** `/mobile`
- **Asset:** `/assets/mobile-18-808.html`
- **Description:** Mobile layout example

- **Path:** `/tablet`
- **Asset:** `/assets/tablet-18-778.html`
- **Description:** Tablet layout example

---

## Error Pages

### 404 Not Found
- **Path:** `/errors/404`
- **Component:** `NotFoundPage`
- **Asset:** `/assets/404-3-4143.html` (desktop) or `/assets/404mobile-15-803.html` (mobile)
- **Description:** Page not found error with responsive design

- **Path:** `/errors/404-mobile`
- **Component:** `NotFoundPage`
- **Description:** Mobile-specific 404 page

### Catch-All Route
- **Path:** `*` (any unmatched route)
- **Component:** `NotFoundPage`
- **Description:** Fallback for undefined routes

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
   ├─ How to Use
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
│       ├── *.html              # Refined screen HTML files
│       ├── *.css               # Screen stylesheets
│       ├── *.js                # Screen scripts
│       └── figmaimages/        # All image assets
├── src/
│   ├── components/
│   │   ├── IframeScreen.js     # Iframe wrapper for assets
│   │   ├── Layout/
│   │   │   ├── Layout.js       # Main layout wrapper
│   │   │   ├── Sidebar.js      # Navigation sidebar
│   │   │   └── Topbar.js       # Top header bar
│   │   ├── Charts/             # Native React charts
│   │   ├── DataTable/          # Native React table
│   │   └── ProductCard/        # Native React card
│   ├── pages/
│   │   ├── OverviewPage.js     # Native dashboard (stats + charts)
│   │   ├── CustomersPage.js    # Native customer management
│   │   ├── ProductsPage.js     # Native product catalog
│   │   ├── TransactionsPage.js # Native transactions
│   │   ├── ComponentsPage.js   # Tabbed components gallery
│   │   ├── DocsPage.js         # Documentation router
│   │   └── NotFoundPage.js     # 404 error page
│   ├── screens/                # Asset screen wrappers
│   │   ├── CoverScreen.js
│   │   ├── FontsScreen.js
│   │   ├── HowToUseScreen.js
│   │   ├── IllustrationsScreen.js
│   │   ├── SidebarsTopbarsScreen.js
│   │   └── ...more screens
│   └── App.js                  # Main router configuration
```

### Asset Path Resolution
- All HTML files are served from `/assets/`
- CSS and JS files are loaded relative to HTML files
- Images are loaded from `/assets/figmaimages/`
- Paths in HTML files use relative notation that resolves correctly
- IframeScreen preserves exact HTML/CSS/JS without modifications

---

## IframeScreen Implementation

### Why IframeScreen?
The `IframeScreen` component is used for refined asset screens to:
1. **Preserve Exact Markup**: Zero modifications to HTML/CSS/JS from refined assets
2. **Style Isolation**: Prevent CSS conflicts between React app and asset screens
3. **Script Isolation**: Isolated JavaScript execution context
4. **Pixel-Perfect Rendering**: Maintains exact design as created in Figma conversion

### How It Works
```javascript
<IframeScreen 
  src="/assets/buttons-11-32.html" 
  title="Buttons Component Gallery"
/>
```

The component:
- Renders the HTML file in an isolated iframe
- Uses `sandbox` attribute for security
- Automatically adjusts height to content when possible
- Handles lazy loading for performance
- Maintains scroll position on navigation

---

## Implementation Details

### Layout System
- **Grid-based Layout**: CSS Grid for sidebar, topbar, and main content
- **Responsive Breakpoints**: 
  - Desktop: >= 769px (sidebar visible)
  - Mobile: <= 768px (sidebar hidden, hamburger menu)
- **CSS Isolation**: Layout styles use CSS Modules
- **Asset Independence**: Iframe-rendered assets maintain independent styles

### Routing Behavior
- **SPA Navigation**: React Router handles all navigation without page reloads
- **Scroll Restoration**: Pages scroll to top on route change
- **Deep Linking**: All routes support direct URL access
- **Route Guards**: 404 handling for undefined paths
- **Lazy Loading**: Components loaded on-demand for performance

### Accessibility
- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<header>` elements
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper announcements for route changes
- **Iframe Titles**: All iframes have descriptive titles for accessibility

---

## Development Workflow

### Running the Application
```bash
cd dashboard_frontend
npm start
```
Access at: http://localhost:3000

### Adding a New Asset Screen
1. Ensure HTML/CSS/JS files are in `public/assets/`
2. Create screen wrapper in `src/screens/`:
   ```javascript
   import React from 'react';
   import IframeScreen from '../components/IframeScreen';
   
   function NewScreen() {
     return <IframeScreen src="/assets/new-screen.html" title="New Screen" />;
   }
   
   export default NewScreen;
   ```
3. Add lazy import in `App.js`:
   ```javascript
   const NewScreen = lazy(() => import('./screens/NewScreen'));
   ```
4. Add route in `App.js`:
   ```javascript
   <Route path="/new-screen" element={
     <Layout>
       <Suspense fallback={<PageLoader />}>
         <NewScreen />
       </Suspense>
     </Layout>
   } />
   ```
5. Update `ROUTES.md` (this file)
6. Optionally add to sidebar navigation in `Sidebar.js`

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
- [ ] Asset screens render without CSS/JS conflicts
- [ ] Images load correctly from figmaimages folder

### QA Workflow
1. Navigate through all sidebar items
2. Test nested navigation (Components, Docs)
3. Verify responsive behavior on mobile/tablet
4. Check keyboard accessibility
5. Test direct URL access for each route
6. Verify asset loading in iframe pages
7. Check browser console for errors
8. Validate image paths are correct

---

## Asset Screen Integrity

### Zero UI Changes Guarantee
All routes using `IframeScreen` render the refined assets exactly as created:
- No React component conversion
- No CSS modifications
- No HTML restructuring
- No JavaScript changes
- Exact pixel-perfect rendering

### Routes Using IframeScreen
- All `/components/*` routes (buttons, badges, footers, icons)
- All `/docs/*` routes (introduction, how-to-use, support, license)
- All design system routes (colors, typography, spacers, fonts, illustrations)
- All device reference routes (mobile, tablet, overview-mobile)
- Error pages (404 desktop and mobile)
- Special pages (cover, sidebars-topbars)

### Routes Using Native React
- `/overview` - OverviewPage with stats cards and charts
- `/customers` - CustomersPage with DataTable
- `/products` - ProductsPage with ProductCard grid
- `/transactions` - TransactionsPage with sortable table

---

## Troubleshooting

### Common Issues

**Issue: Asset screen not displaying**
- Check file exists in `public/assets/`
- Verify path in screen wrapper starts with `/assets/`
- Check browser console for 404 errors
- Ensure CSS/JS files are in same directory as HTML

**Issue: Images not loading in asset screen**
- Verify images exist in `public/assets/figmaimages/`
- Check HTML file uses correct relative path to images
- Ensure image references match actual filenames (case-sensitive)

**Issue: Sidebar not showing**
- Check browser width (hidden on mobile by default)
- Verify Layout component is wrapping the route
- Check CSS Modules are loading

**Issue: CSS conflicts between React app and asset**
- This should NOT happen due to iframe isolation
- If it does, verify IframeScreen is being used (not direct component)

**Issue: Route not found**
- Check route exists in App.js
- Verify lazy import path is correct
- Check component export is default export
- Verify no typos in path string

---

## Performance Optimizations

### Code Splitting
- All pages use `React.lazy()` for automatic code splitting
- Each route loaded on-demand
- Asset screens separated into individual iframe loads

### Lazy Loading
- Iframe `loading="lazy"` attribute for deferred loading
- Components lazy-loaded with React.lazy()
- Suspense boundaries prevent loading waterfalls

### Bundle Analysis
```bash
npm run build
# Check build/static/js/ for chunk sizes
```

---

## Future Enhancements

### Planned Improvements
1. **Search Functionality**: Global search in topbar to find routes
2. **Breadcrumb Navigation**: Add breadcrumbs for nested routes
3. **Route Transitions**: Smooth page transitions with animations
4. **History Management**: Better back/forward button handling
5. **Deep Link Sharing**: Share specific sections of pages

---

## Support

For issues or questions about routing:
1. Check this documentation first
2. Review browser DevTools console for errors
3. Verify route configuration in `App.js`
4. Test with different screen sizes
5. Check that asset files exist in public/assets/

---

**Last Updated:** 2024  
**Version:** 2.1 (Asset Screen Integration)  
**Maintained By:** Development Team
