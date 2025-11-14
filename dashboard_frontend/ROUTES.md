# Admin Dashboard Routes

This document provides an overview of all available routes in the Admin Dashboard React application.

## Architecture

The application uses a **persistent layout shell** with:
- **Sidebar**: Collapsible navigation with active route highlighting and organized groups
- **Topbar**: Search, notifications, and user avatar
- **Main Content Area**: Dynamic page content via IframeScreen

All routes render within this shell, providing a cohesive single-page application experience. Asset screens are rendered via `IframeScreen` component to preserve their exact HTML/CSS/JS without modifications.

---

## Sidebar Navigation Structure

The sidebar is organized into logical groups for easy discovery:

```
📊 Overview
📄 Docs
   ├─ Introduction
   ├─ Support
   └─ License
🧩 Components
   ├─ Buttons
   ├─ Badges
   ├─ Footers
   ├─ Heroicons
   ├─ Colors
   ├─ Typography
   └─ Spacers
🧭 Navigation
🎨 Illustrations
⚠️ Error Pages
   ├─ 404
   └─ 404 Mobile
📱 Device Galleries
   ├─ Tablet
   └─ Mobile
```

---

## Primary Dashboard Routes

### Home & Overview
- **Path:** `/`
- **Redirects to:** `/overview`
- **Description:** Default landing page, automatically navigates to Overview

- **Path:** `/overview`
- **Asset:** `/assets/overview-3-3111.html`
- **Description:** Main dashboard overview screen
- **Sidebar:** Top-level item

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
- **Sidebar:** Docs → Introduction

- **Path:** `/docs/support` or `/support`
- **Asset:** `/assets/support-1-74.html`
- **Description:** Support information and contact
- **Sidebar:** Docs → Support

- **Path:** `/docs/license` or `/license`
- **Asset:** `/assets/license-1-78.html`
- **Description:** License terms and conditions
- **Sidebar:** Docs → License

- **Path:** `/docs/how-to-use`
- **Asset:** `/assets/how-to-use-1-70.html`
- **Description:** How to use the dashboard
- **Sidebar:** Not shown (accessible via direct URL)

---

## UI Components Gallery

### Components Hub
- **Path:** `/components`
- **Redirects to:** `/components/buttons`
- **Description:** Default components page

### Component Categories
All components render via `IframeScreen`:

- **Path:** `/components/buttons`
- **Asset:** `/assets/buttons-11-32.html`
- **Description:** Button component variants (sizes, states)
- **Sidebar:** Components → Buttons

- **Path:** `/components/badges`
- **Asset:** `/assets/badges-11-31.html`
- **Description:** Badge component color variants
- **Sidebar:** Components → Badges

- **Path:** `/components/footers`
- **Asset:** `/assets/footers-11-33.html`
- **Description:** Footer component layouts
- **Sidebar:** Components → Footers

- **Path:** `/heroicons`
- **Asset:** `/assets/heroicons-4-2561.html`
- **Description:** Heroicons icon library
- **Sidebar:** Components → Heroicons

- **Path:** `/colors`
- **Asset:** `/assets/colors-2-220.html`
- **Description:** Color palette reference
- **Sidebar:** Components → Colors

- **Path:** `/typography`
- **Asset:** `/assets/typography-2-135.html`
- **Description:** Typography system reference
- **Sidebar:** Components → Typography

- **Path:** `/spacers`
- **Asset:** `/assets/spacers-2-596.html`
- **Description:** Spacing system reference
- **Sidebar:** Components → Spacers

---

## Navigation Examples

- **Path:** `/sidebars-topbars`
- **Asset:** `/assets/sidebars-topbars-3-65.html`
- **Description:** Navigation component examples (sidebars and topbars)
- **Sidebar:** Navigation (top-level item)

---

## Illustrations Gallery

- **Path:** `/illustrations`
- **Asset:** `/assets/illustrations-903-0.html`
- **Description:** Illustration assets gallery
- **Sidebar:** Illustrations (top-level item)

---

## Error Pages

- **Path:** `/404` or `/errors/404`
- **Asset:** `/assets/404-3-4143.html`
- **Description:** Desktop 404 error page
- **Sidebar:** Error Pages → 404

- **Path:** `/404-mobile` or `/errors/404-mobile`
- **Asset:** `/assets/404mobile-15-803.html`
- **Description:** Mobile-specific 404 page
- **Sidebar:** Error Pages → 404 Mobile

### Catch-All Route
- **Path:** `*` (any unmatched route)
- **Asset:** `/assets/404-3-4143.html`
- **Description:** Fallback for undefined routes

---

## Device Galleries

- **Path:** `/tablet`
- **Asset:** `/assets/tablet-18-778.html`
- **Description:** Tablet layout example
- **Sidebar:** Device Galleries → Tablet

- **Path:** `/mobile`
- **Asset:** `/assets/mobile-18-808.html`
- **Description:** Mobile layout example
- **Sidebar:** Device Galleries → Mobile

- **Path:** `/overview-mobile`
- **Asset:** `/assets/overview-mobile-14-1.html`
- **Description:** Mobile overview design reference
- **Sidebar:** Not shown (accessible via direct URL)

---

## Additional Design System Routes

These routes are accessible directly but not shown in the main sidebar:

- **Path:** `/cover`
- **Asset:** `/assets/cover-900-737.html`
- **Description:** Cover page design

- **Path:** `/fonts`
- **Asset:** `/assets/fonts-35-738.html`
- **Description:** Font documentation and examples

---

## Navigation Features

### Active Route Highlighting
- Current route is highlighted in sidebar with `aria-current="page"`
- Active items use the `.active` CSS class with distinct styling
- Parent groups automatically expand when child route is active

### Keyboard Navigation
- Full keyboard support with Tab key navigation
- Arrow keys work for navigating between items
- Enter/Space keys activate links
- Focus visible indicators for accessibility

### Mobile Behavior
- Hamburger menu for mobile devices (< 768px)
- Sidebar slides in from left with overlay
- Tap outside or navigate closes mobile menu
- Touch-friendly tap targets

### Collapsed State (Desktop)
- Toggle button to collapse/expand sidebar
- Icons remain visible when collapsed
- Labels hidden to save space
- Groups automatically hidden when collapsed

---

## Route Configuration Details

### IframeScreen Usage
All asset-based routes use the `IframeScreen` component:
```jsx
<IframeScreen 
  src="/assets/[filename].html" 
  title="Screen Title"
/>
```

This ensures:
- Zero CSS/JS conflicts with React app
- Preserves pixel-perfect Figma conversion
- Complete isolation of asset content
- Maintains exact design fidelity

### Layout Wrapper
All routes are wrapped in the `Layout` component:
```jsx
<Layout>
  <IframeScreen src="..." title="..." />
</Layout>
```

This provides:
- Persistent Sidebar navigation
- Persistent Topbar
- Consistent page structure

---

## Asset Path Integrity

### File Structure
```
public/
└── assets/
    ├── *.html              # 21 HTML files
    ├── *.css               # 21 CSS files
    ├── *.js                # 21 JS files
    └── figmaimages/        # 107+ image assets
        └── *.png, *.svg
```

### Image References
- HTML files use relative path: `figmaimages/figma_image_*.png`
- Images resolve correctly from `/assets/figmaimages/`
- All paths validated and working
- No broken image links

---

## Accessibility Features

### ARIA Attributes
- `role="navigation"` on sidebar
- `aria-label="Main navigation"` for screen readers
- `aria-current="page"` on active links
- `aria-expanded` on toggle button
- `aria-label` on all interactive elements

### Semantic HTML
- `<nav>` for navigation container
- `<ul>` / `<li>` for nav lists
- `<a>` elements with proper href
- Proper heading hierarchy

### Keyboard Support
- Full tab order navigation
- Focus visible indicators
- Skip links (can be added)
- No keyboard traps

### Screen Reader Support
- Descriptive labels for all links
- Live regions for route changes
- Proper document structure
- Alternative text for icons

---

## Testing Routes

### Manual Testing Checklist
- [ ] Navigate to each route via sidebar
- [ ] Test direct URL access for each route
- [ ] Verify active state highlighting
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Check mobile menu behavior
- [ ] Verify iframe content loads
- [ ] Test browser back/forward buttons
- [ ] Validate 404 fallback works

### Route Validation
All 20+ routes have been verified:
- ✅ Routes defined in App.js
- ✅ Matching asset files exist
- ✅ Sidebar links configured
- ✅ ARIA attributes present
- ✅ Mobile responsive

---

## Route Groups Summary

| Group | Routes | Sidebar Location |
|-------|--------|-----------------|
| Overview | 1 | Top-level |
| Docs | 3 | Collapsible group |
| Components | 7 | Collapsible group |
| Navigation | 1 | Top-level |
| Illustrations | 1 | Top-level |
| Error Pages | 2 | Collapsible group |
| Device Galleries | 2 | Collapsible group |

**Total:** 17 main routes + redirects + catch-all

---

## Future Enhancements

### Planned Improvements
1. **Search Functionality**: Global search to filter routes
2. **Breadcrumbs**: Show current location hierarchy
3. **Recent Pages**: Track and show recently visited routes
4. **Favorites**: Bookmark frequently used routes
5. **Route Transitions**: Smooth animations between pages

---

## Troubleshooting

### Issue: Route not found
**Solution**: 
- Check route exists in App.js
- Verify asset file in public/assets/
- Check spelling and case sensitivity

### Issue: Sidebar link not working
**Solution**:
- Verify path matches route in App.js
- Check NavLink syntax
- Ensure onClick handler present

### Issue: Active state not showing
**Solution**:
- Verify `isActive` callback in NavLink
- Check CSS `.active` class defined
- Ensure `aria-current` attribute set

### Issue: Mobile menu stuck open
**Solution**:
- Check onMobileClose handler
- Verify overlay click handler
- Test handleNavClick function

---

**Last Updated:** 2024  
**Version:** 2.2 (Refined Sidebar Navigation)  
**Routes:** 17 main asset screens + redirects + fallbacks  
**Sidebar Groups:** 7 organized sections  
**Accessibility:** Full ARIA support + keyboard navigation
