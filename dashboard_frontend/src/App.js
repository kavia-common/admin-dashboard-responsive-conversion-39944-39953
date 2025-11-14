import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import OverviewPage from './pages/OverviewPage';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import TransactionsPage from './pages/TransactionsPage';
import ComponentsPage from './pages/ComponentsPage';
import DocsPage from './pages/DocsPage';
import NotFoundPage from './pages/NotFoundPage';

// Legacy screen wrappers for backward compatibility
import OverviewMobileScreen from './screens/OverviewMobileScreen';
import TabletScreen from './screens/TabletScreen';
import MobileScreen from './screens/MobileScreen';
import ColorsScreen from './screens/ColorsScreen';
import TypographyScreen from './screens/TypographyScreen';
import SpacersScreen from './screens/SpacersScreen';

import './App.css';

// PUBLIC_INTERFACE
/**
 * Main App component with routing and layout
 * Provides dashboard shell with sidebar navigation and page routing
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Main dashboard routes with layout */}
        <Route path="/" element={<Layout><Navigate to="/overview" replace /></Layout>} />
        <Route path="/overview" element={<Layout><OverviewPage /></Layout>} />
        <Route path="/customers" element={<Layout><CustomersPage /></Layout>} />
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/transactions" element={<Layout><TransactionsPage /></Layout>} />
        
        {/* Components routes */}
        <Route path="/components" element={<Layout><Navigate to="/components/buttons" replace /></Layout>} />
        <Route path="/components/buttons" element={<Layout><ComponentsPage /></Layout>} />
        <Route path="/components/badges" element={<Layout><ComponentsPage /></Layout>} />
        <Route path="/components/footers" element={<Layout><ComponentsPage /></Layout>} />
        <Route path="/components/icons" element={<Layout><ComponentsPage /></Layout>} />
        
        {/* Documentation routes */}
        <Route path="/docs" element={<Layout><Navigate to="/docs/introduction" replace /></Layout>} />
        <Route path="/docs/introduction" element={<Layout><DocsPage /></Layout>} />
        <Route path="/docs/support" element={<Layout><DocsPage /></Layout>} />
        <Route path="/support" element={<Layout><DocsPage /></Layout>} />
        <Route path="/docs/license" element={<Layout><DocsPage /></Layout>} />
        <Route path="/license" element={<Layout><DocsPage /></Layout>} />
        
        {/* Error routes */}
        <Route path="/errors/404" element={<Layout><NotFoundPage /></Layout>} />
        <Route path="/errors/404-mobile" element={<Layout><NotFoundPage /></Layout>} />
        
        {/* Legacy/reference routes (kept for backward compatibility) */}
        <Route path="/overview-mobile" element={<Layout><OverviewMobileScreen /></Layout>} />
        <Route path="/mobile" element={<Layout><MobileScreen /></Layout>} />
        <Route path="/tablet" element={<Layout><TabletScreen /></Layout>} />
        <Route path="/colors" element={<Layout><ColorsScreen /></Layout>} />
        <Route path="/typography" element={<Layout><TypographyScreen /></Layout>} />
        <Route path="/spacers" element={<Layout><SpacersScreen /></Layout>} />
        
        {/* Catch-all 404 route */}
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
