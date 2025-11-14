import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IframeScreen from './components/IframeScreen';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main App component with routing and layout
 * All routes now point to IframeScreen instances loading refined asset HTML files
 * Sidebar/Topbar provided by Layout, content from /assets/*.html files only
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Root redirect to overview */}
        <Route path="/" element={
          <Layout>
            <Navigate to="/overview" replace />
          </Layout>
        } />
        
        {/* Main dashboard routes - all using IframeScreen */}
        <Route path="/overview" element={
          <Layout>
            <IframeScreen src="/assets/overview-3-3111.html" title="Overview Dashboard" />
          </Layout>
        } />
        
        <Route path="/customers" element={
          <Layout>
            <IframeScreen src="/assets/overview-3-3111.html" title="Customers" />
          </Layout>
        } />
        
        <Route path="/products" element={
          <Layout>
            <IframeScreen src="/assets/overview-3-3111.html" title="Products" />
          </Layout>
        } />
        
        <Route path="/transactions" element={
          <Layout>
            <IframeScreen src="/assets/overview-3-3111.html" title="Transactions" />
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
            <IframeScreen src="/assets/buttons-11-32.html" title="Buttons Component" />
          </Layout>
        } />
        
        <Route path="/components/badges" element={
          <Layout>
            <IframeScreen src="/assets/badges-11-31.html" title="Badges Component" />
          </Layout>
        } />
        
        <Route path="/components/footers" element={
          <Layout>
            <IframeScreen src="/assets/footers-11-33.html" title="Footers Component" />
          </Layout>
        } />
        
        <Route path="/components/icons" element={
          <Layout>
            <IframeScreen src="/assets/heroicons-4-2561.html" title="Icons Component" />
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
            <IframeScreen src="/assets/introduction-1-20.html" title="Introduction Documentation" />
          </Layout>
        } />
        
        <Route path="/docs/support" element={
          <Layout>
            <IframeScreen src="/assets/support-1-74.html" title="Support Documentation" />
          </Layout>
        } />
        
        <Route path="/support" element={
          <Layout>
            <IframeScreen src="/assets/support-1-74.html" title="Support" />
          </Layout>
        } />
        
        <Route path="/docs/license" element={
          <Layout>
            <IframeScreen src="/assets/license-1-78.html" title="License Documentation" />
          </Layout>
        } />
        
        <Route path="/license" element={
          <Layout>
            <IframeScreen src="/assets/license-1-78.html" title="License" />
          </Layout>
        } />
        
        <Route path="/docs/how-to-use" element={
          <Layout>
            <IframeScreen src="/assets/how-to-use-1-70.html" title="How to Use Documentation" />
          </Layout>
        } />
        
        {/* Design system routes */}
        <Route path="/colors" element={
          <Layout>
            <IframeScreen src="/assets/colors-2-220.html" title="Colors" />
          </Layout>
        } />
        
        <Route path="/typography" element={
          <Layout>
            <IframeScreen src="/assets/typography-2-135.html" title="Typography" />
          </Layout>
        } />
        
        <Route path="/spacers" element={
          <Layout>
            <IframeScreen src="/assets/spacers-2-596.html" title="Spacers" />
          </Layout>
        } />
        
        <Route path="/cover" element={
          <Layout>
            <IframeScreen src="/assets/cover-900-737.html" title="Cover" />
          </Layout>
        } />
        
        <Route path="/fonts" element={
          <Layout>
            <IframeScreen src="/assets/fonts-35-738.html" title="Fonts" />
          </Layout>
        } />
        
        <Route path="/illustrations" element={
          <Layout>
            <IframeScreen src="/assets/illustrations-903-0.html" title="Illustrations" />
          </Layout>
        } />
        
        <Route path="/sidebars-topbars" element={
          <Layout>
            <IframeScreen src="/assets/sidebars-topbars-3-65.html" title="Sidebars & Topbars" />
          </Layout>
        } />
        
        {/* Responsive view routes */}
        <Route path="/overview-mobile" element={
          <Layout>
            <IframeScreen src="/assets/overview-mobile-14-1.html" title="Overview Mobile" />
          </Layout>
        } />
        
        <Route path="/mobile" element={
          <Layout>
            <IframeScreen src="/assets/mobile-18-808.html" title="Mobile View" />
          </Layout>
        } />
        
        <Route path="/tablet" element={
          <Layout>
            <IframeScreen src="/assets/tablet-18-778.html" title="Tablet View" />
          </Layout>
        } />
        
        {/* Error routes */}
        <Route path="/errors/404" element={
          <Layout>
            <IframeScreen src="/assets/404-3-4143.html" title="404 Not Found" />
          </Layout>
        } />
        
        <Route path="/errors/404-mobile" element={
          <Layout>
            <IframeScreen src="/assets/404mobile-15-803.html" title="404 Not Found Mobile" />
          </Layout>
        } />
        
        {/* Catch-all 404 route */}
        <Route path="*" element={
          <Layout>
            <IframeScreen src="/assets/404-3-4143.html" title="404 Not Found" />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
