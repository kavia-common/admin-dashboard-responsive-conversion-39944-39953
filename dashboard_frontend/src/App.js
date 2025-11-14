import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Skeleton from './components/Skeleton/Skeleton';
import './App.css';

// Lazy load all page components for better performance
const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const ComponentsPage = lazy(() => import('./pages/ComponentsPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Legacy screen wrappers for backward compatibility
const OverviewMobileScreen = lazy(() => import('./screens/OverviewMobileScreen'));
const TabletScreen = lazy(() => import('./screens/TabletScreen'));
const MobileScreen = lazy(() => import('./screens/MobileScreen'));
const ColorsScreen = lazy(() => import('./screens/ColorsScreen'));
const TypographyScreen = lazy(() => import('./screens/TypographyScreen'));
const SpacersScreen = lazy(() => import('./screens/SpacersScreen'));

// Loading fallback component
const PageLoader = () => (
  <div style={{ padding: '24px' }}>
    <Skeleton variant="text" width="200px" height={32} />
    <div style={{ marginTop: '24px' }}>
      <Skeleton variant="rectangular" width="100%" height={400} />
    </div>
  </div>
);

// PUBLIC_INTERFACE
/**
 * Main App component with routing and layout
 * Provides dashboard shell with sidebar navigation and lazy-loaded page routing
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Main dashboard routes with layout and Suspense */}
        <Route path="/" element={
          <Layout>
            <Navigate to="/overview" replace />
          </Layout>
        } />
        
        <Route path="/overview" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <OverviewPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/customers" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <CustomersPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/products" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ProductsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/transactions" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <TransactionsPage />
            </Suspense>
          </Layout>
        } />
        
        {/* Components routes */}
        <Route path="/components" element={
          <Layout>
            <Navigate to="/components/buttons" replace />
          </Layout>
        } />
        
        <Route path="/components/buttons" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ComponentsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/components/badges" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ComponentsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/components/footers" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ComponentsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/components/icons" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ComponentsPage />
            </Suspense>
          </Layout>
        } />
        
        {/* Documentation routes */}
        <Route path="/docs" element={
          <Layout>
            <Navigate to="/docs/introduction" replace />
          </Layout>
        } />
        
        <Route path="/docs/introduction" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <DocsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/docs/support" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <DocsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/support" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <DocsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/docs/license" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <DocsPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/license" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <DocsPage />
            </Suspense>
          </Layout>
        } />
        
        {/* Error routes */}
        <Route path="/errors/404" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/errors/404-mobile" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          </Layout>
        } />
        
        {/* Legacy/reference routes (kept for backward compatibility) */}
        <Route path="/overview-mobile" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <OverviewMobileScreen />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/mobile" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <MobileScreen />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/tablet" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <TabletScreen />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/colors" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ColorsScreen />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/typography" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <TypographyScreen />
            </Suspense>
          </Layout>
        } />
        
        <Route path="/spacers" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <SpacersScreen />
            </Suspense>
          </Layout>
        } />
        
        {/* Catch-all 404 route */}
        <Route path="*" element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
