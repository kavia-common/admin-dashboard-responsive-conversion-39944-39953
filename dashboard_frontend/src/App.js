import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Screen wrapper components
import CoverScreen from './screens/CoverScreen';
import IntroductionScreen from './screens/IntroductionScreen';
import HowToUseScreen from './screens/HowToUseScreen';
import SupportScreen from './screens/SupportScreen';
import LicenseScreen from './screens/LicenseScreen';
import FontsScreen from './screens/FontsScreen';
import TypographyScreen from './screens/TypographyScreen';
import ColorsScreen from './screens/ColorsScreen';
import SpacersScreen from './screens/SpacersScreen';
import SidebarsTopbarsScreen from './screens/SidebarsTopbarsScreen';
import HeroiconsScreen from './screens/HeroiconsScreen';
import BadgesScreen from './screens/BadgesScreen';
import ButtonsScreen from './screens/ButtonsScreen';
import FootersScreen from './screens/FootersScreen';
import IllustrationsScreen from './screens/IllustrationsScreen';
import OverviewScreen from './screens/OverviewScreen';
import OverviewMobileScreen from './screens/OverviewMobileScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import NotFoundMobileScreen from './screens/NotFoundMobileScreen';
import TabletScreen from './screens/TabletScreen';
import MobileScreen from './screens/MobileScreen';

// PUBLIC_INTERFACE
/**
 * Main App component with React Router configuration
 * Provides navigation to all asset screens with proper routing
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home/Index route - shows navigation */}
          <Route path="/" element={<NavigationIndex />} />
          
          {/* Screen routes */}
          <Route path="/cover" element={<CoverScreen />} />
          <Route path="/introduction" element={<IntroductionScreen />} />
          <Route path="/how-to-use" element={<HowToUseScreen />} />
          <Route path="/support" element={<SupportScreen />} />
          <Route path="/license" element={<LicenseScreen />} />
          <Route path="/fonts" element={<FontsScreen />} />
          <Route path="/typography" element={<TypographyScreen />} />
          <Route path="/colors" element={<ColorsScreen />} />
          <Route path="/spacers" element={<SpacersScreen />} />
          <Route path="/sidebars-topbars" element={<SidebarsTopbarsScreen />} />
          <Route path="/heroicons" element={<HeroiconsScreen />} />
          <Route path="/badges" element={<BadgesScreen />} />
          <Route path="/buttons" element={<ButtonsScreen />} />
          <Route path="/footers" element={<FootersScreen />} />
          <Route path="/illustrations" element={<IllustrationsScreen />} />
          <Route path="/overview" element={<OverviewScreen />} />
          <Route path="/overview-mobile" element={<OverviewMobileScreen />} />
          <Route path="/404" element={<NotFoundScreen />} />
          <Route path="/404-mobile" element={<NotFoundMobileScreen />} />
          <Route path="/tablet" element={<TabletScreen />} />
          <Route path="/mobile" element={<MobileScreen />} />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

// PUBLIC_INTERFACE
/**
 * Navigation index page listing all available routes
 * Provides quick access to all screens for QA and preview
 */
function NavigationIndex() {
  const routes = [
    { path: '/cover', name: 'Cover', description: 'Landing page with branding' },
    { path: '/introduction', name: 'Introduction', description: 'Introduction screen' },
    { path: '/how-to-use', name: 'How to Use', description: 'Usage instructions' },
    { path: '/support', name: 'Support', description: 'Support information' },
    { path: '/license', name: 'License', description: 'License details' },
    { path: '/fonts', name: 'Fonts', description: 'Font documentation' },
    { path: '/typography', name: 'Typography', description: 'Typography system' },
    { path: '/colors', name: 'Colors', description: 'Color palette' },
    { path: '/spacers', name: 'Spacers', description: 'Spacing system' },
    { path: '/sidebars-topbars', name: 'Sidebars & Topbars', description: 'Navigation components' },
    { path: '/heroicons', name: 'Heroicons', description: 'Icon library' },
    { path: '/badges', name: 'Badges', description: 'Badge components' },
    { path: '/buttons', name: 'Buttons', description: 'Button components' },
    { path: '/footers', name: 'Footers', description: 'Footer components' },
    { path: '/illustrations', name: 'Illustrations', description: 'Illustration assets' },
    { path: '/overview', name: 'Overview (Desktop)', description: 'Desktop overview' },
    { path: '/overview-mobile', name: 'Overview (Mobile)', description: 'Mobile overview' },
    { path: '/404', name: '404 Error', description: 'Desktop error page' },
    { path: '/404-mobile', name: '404 Mobile', description: 'Mobile error page' },
    { path: '/tablet', name: 'Tablet View', description: 'Tablet layout' },
    { path: '/mobile', name: 'Mobile View', description: 'Mobile layout' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '48px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          color: '#1a202c',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Admin Dashboard Screens
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#718096',
          textAlign: 'center',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          Navigate to any screen below to preview the pixel-perfect implementation
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              style={{
                display: 'block',
                padding: '24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
            >
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'white'
              }}>
                {route.name}
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {route.description}
              </p>
              <div style={{
                marginTop: '16px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace'
              }}>
                {route.path}
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          marginTop: '48px',
          padding: '24px',
          background: '#f7fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '12px' }}>
            Quick Navigation Tips
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', fontSize: '14px', lineHeight: '1.8' }}>
            <li>All screens are pixel-accurate implementations from Figma designs</li>
            <li>Images and assets are served from /assets/ directory</li>
            <li>Each screen maintains its original dimensions and styling</li>
            <li>Use browser back button or navigate via this index to move between screens</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
