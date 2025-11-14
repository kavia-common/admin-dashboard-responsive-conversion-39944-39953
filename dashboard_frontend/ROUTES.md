# Admin Dashboard Routes

This document provides an overview of all available routes in the Admin Dashboard React application.

## Route Structure

All asset screens from the Figma design have been integrated into the React app with proper routing. Each route renders the corresponding HTML/CSS/JS asset in an isolated iframe to prevent style conflicts and maintain pixel-perfect accuracy.

## Available Routes

### Navigation Index
- **Path:** `/`
- **Description:** Home page with links to all screens
- **Usage:** Primary navigation hub for quick access to any screen

### Documentation & Information
- **Path:** `/cover`
- **Asset:** `cover-900-737.html`
- **Description:** Landing page with branding and overview

- **Path:** `/introduction`
- **Asset:** `introduction-1-20.html`
- **Description:** Introduction to the admin dashboard

- **Path:** `/how-to-use`
- **Asset:** `how-to-use-1-70.html`
- **Description:** Usage instructions and guidelines

- **Path:** `/support`
- **Asset:** `support-1-74.html`
- **Description:** Support information and contact

- **Path:** `/license`
- **Asset:** `license-1-78.html`
- **Description:** License details and terms

### Design System
- **Path:** `/fonts`
- **Asset:** `fonts-35-738.html`
- **Description:** Font family documentation

- **Path:** `/typography`
- **Asset:** `typography-2-135.html`
- **Description:** Typography scale and styles

- **Path:** `/colors`
- **Asset:** `colors-2-220.html`
- **Description:** Color palette and tokens

- **Path:** `/spacers`
- **Asset:** `spacers-2-596.html`
- **Description:** Spacing system guidelines

### UI Components
- **Path:** `/sidebars-topbars`
- **Asset:** `sidebars-topbars-3-65.html`
- **Description:** Navigation components (sidebars and topbars)

- **Path:** `/heroicons`
- **Asset:** `heroicons-4-2561.html`
- **Description:** Heroicons icon library

- **Path:** `/badges`
- **Asset:** `badges-11-31.html`
- **Description:** Badge component variants

- **Path:** `/buttons`
- **Asset:** `buttons-11-32.html`
- **Description:** Button component variants

- **Path:** `/footers`
- **Asset:** `footers-11-33.html`
- **Description:** Footer component variants

- **Path:** `/illustrations`
- **Asset:** `illustrations-903-0.html`
- **Description:** Illustration assets and usage

### Page Examples
- **Path:** `/overview`
- **Asset:** `overview-3-3111.html`
- **Description:** Desktop dashboard overview page

- **Path:** `/overview-mobile`
- **Asset:** `overview-mobile-14-1.html`
- **Description:** Mobile dashboard overview page

- **Path:** `/404`
- **Asset:** `404-3-4143.html`
- **Description:** Desktop 404 error page

- **Path:** `/404-mobile`
- **Asset:** `404mobile-15-803.html`
- **Description:** Mobile 404 error page

- **Path:** `/tablet`
- **Asset:** `tablet-18-778.html`
- **Description:** Tablet layout example

- **Path:** `/mobile`
- **Asset:** `mobile-18-808.html`
- **Description:** Mobile layout example

### Fallback
- **Path:** `*` (any unmatched route)
- **Behavior:** Redirects to desktop 404 page

## Asset Organization

### File Structure
```
dashboard_frontend/
├── public/
│   └── assets/
│       ├── *.html           # Screen HTML files
│       ├── *.css            # Screen stylesheets
│       ├── *.js             # Screen scripts
│       └── figmaimages/     # All image assets
├── src/
│   ├── components/
│   │   └── IframeScreen.js  # Reusable iframe wrapper
│   ├── screens/
│   │   ├── CoverScreen.js
│   │   ├── IntroductionScreen.js
│   │   └── ...              # All screen wrappers
│   ├── App.js               # Main router configuration
│   └── index.js             # Application entry point
```

### Asset Path Resolution
- All HTML files are served from `/assets/`
- CSS and JS files are loaded relative to HTML files
- Images are loaded from `/assets/figmaimages/`
- Paths in HTML files use `./` relative notation

## Implementation Details

### Iframe Isolation
Each screen is rendered in an isolated iframe with:
- **Sandbox attributes:** `allow-scripts allow-same-origin allow-forms`
- **No style leakage:** CSS from assets doesn't affect React app
- **Independent scripts:** JavaScript runs in iframe context
- **Scroll restoration:** Page scrolls to top on route change

### Accessibility
- Each iframe has a descriptive `title` attribute
- Focus management is handled automatically
- Keyboard navigation works within iframes
- Screen reader announcements for route changes

### Performance
- Lazy loading of iframe content
- Image assets use `loading="lazy"` where appropriate
- CSS/JS files are not bundled with React app
- Assets are served statically from public directory

## Development

### Running the Application
```bash
npm start
```
Access at: http://localhost:3000

### Preview Workflow
1. Navigate to `/` to see the index
2. Click any screen link to preview
3. Use browser back button or navigate to `/` to return
4. All screens maintain their original dimensions and functionality

### Hot Reload
- Changes to React components hot reload
- Changes to asset HTML/CSS/JS require browser refresh
- Asset files are not watched by React dev server

## Testing Routes

### Manual Testing
1. Visit each route from the navigation index
2. Verify images load correctly
3. Check that CSS styles are applied
4. Test interactive elements (buttons, links)
5. Validate responsive behavior on different viewports

### QA Checklist
- [ ] All routes resolve without 404 errors
- [ ] Images load from `/assets/figmaimages/`
- [ ] CSS styles are scoped to iframe
- [ ] JavaScript functions work correctly
- [ ] No console errors in browser DevTools
- [ ] Navigation index displays all screens
- [ ] Browser back/forward buttons work
- [ ] Scroll position resets on route change

## Troubleshooting

### Images Not Loading
- Verify `/public/assets/figmaimages/` contains all image files
- Check browser DevTools Network tab for 404 errors
- Ensure image paths in HTML use `./figmaimages/` prefix

### CSS Not Applied
- Confirm CSS files are in `/public/assets/`
- Check that HTML `<link>` tags use correct relative paths
- Verify no CORS errors in browser console

### JavaScript Errors
- Ensure JS files are in `/public/assets/`
- Check that HTML `<script>` tags reference correct paths
- Verify sandbox attributes allow script execution

### Routing Issues
- Clear browser cache and hard reload
- Check React Router configuration in `App.js`
- Verify all screen wrapper components are imported

## Future Enhancements

Potential improvements for the routing system:

1. **Loading States:** Add loading spinners while iframes load
2. **Error Boundaries:** Catch and display iframe loading errors
3. **Breadcrumbs:** Add breadcrumb navigation for nested routes
4. **Search:** Implement search functionality on navigation index
5. **Favorites:** Allow users to bookmark frequently accessed screens
6. **Theme Toggle:** Add dark/light mode for navigation index
7. **Analytics:** Track which screens are viewed most often
8. **Direct Links:** Add copy-to-clipboard for direct route URLs

## Support

For issues or questions about routing:
1. Check this documentation first
2. Review browser DevTools console for errors
3. Verify asset files exist in correct locations
4. Test with browser cache disabled

---

**Last Updated:** 2024
**Maintained By:** Development Team
