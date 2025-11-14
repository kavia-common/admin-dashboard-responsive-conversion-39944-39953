import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AllScreens.module.css';

// PUBLIC_INTERFACE
/**
 * AllScreens component - displays a gallery of all available asset screens
 * Shows live thumbnail previews in iframes with links to full views
 * Organizes screens by category for easy navigation
 */
function AllScreens() {
  const screens = [
    {
      category: 'Dashboard',
      items: [
        { path: '/overview', title: 'Overview', asset: '/assets/overview-3-3111.html' }
      ]
    },
    {
      category: 'Documentation',
      items: [
        { path: '/docs/introduction', title: 'Introduction', asset: '/assets/introduction-1-20.html' },
        { path: '/docs/how-to-use', title: 'How to Use', asset: '/assets/how-to-use-1-70.html' },
        { path: '/support', title: 'Support', asset: '/assets/support-1-74.html' },
        { path: '/license', title: 'License', asset: '/assets/license-1-78.html' }
      ]
    },
    {
      category: 'Components',
      items: [
        { path: '/components/buttons', title: 'Buttons', asset: '/assets/buttons-11-32.html' },
        { path: '/components/badges', title: 'Badges', asset: '/assets/badges-11-31.html' },
        { path: '/components/footers', title: 'Footers', asset: '/assets/footers-11-33.html' },
        { path: '/heroicons', title: 'Heroicons', asset: '/assets/heroicons-4-2561.html' }
      ]
    },
    {
      category: 'Design System',
      items: [
        { path: '/colors', title: 'Colors', asset: '/assets/colors-2-220.html' },
        { path: '/typography', title: 'Typography', asset: '/assets/typography-2-135.html' },
        { path: '/spacers', title: 'Spacers', asset: '/assets/spacers-2-596.html' },
        { path: '/fonts', title: 'Fonts', asset: '/assets/fonts-35-738.html' },
        { path: '/cover', title: 'Cover', asset: '/assets/cover-900-737.html' },
        { path: '/illustrations', title: 'Illustrations', asset: '/assets/illustrations-903-0.html' },
        { path: '/sidebars-topbars', title: 'Sidebars & Topbars', asset: '/assets/sidebars-topbars-3-65.html' }
      ]
    },
    {
      category: 'Error Pages',
      items: [
        { path: '/404', title: '404 Not Found', asset: '/assets/404-3-4143.html' },
        { path: '/404-mobile', title: '404 Mobile', asset: '/assets/404mobile-15-803.html' }
      ]
    },
    {
      category: 'Device Galleries',
      items: [
        { path: '/tablet', title: 'Tablet View', asset: '/assets/tablet-18-778.html' },
        { path: '/mobile', title: 'Mobile View', asset: '/assets/mobile-18-808.html' },
        { path: '/overview-mobile', title: 'Overview Mobile', asset: '/assets/overview-mobile-14-1.html' }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>All Screens</h1>
        <p className={styles.subtitle}>Browse all available asset screens with live previews</p>
      </header>

      {screens.map((section) => (
        <section key={section.category} className={styles.section}>
          <h2 className={styles.categoryTitle}>{section.category}</h2>
          <div className={styles.grid}>
            {section.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={styles.card}
                aria-label={`View ${item.title}`}
              >
                <div className={styles.thumbnailWrapper}>
                  <iframe
                    src={item.asset}
                    title={`Preview of ${item.title}`}
                    className={styles.thumbnail}
                    sandbox="allow-same-origin"
                    loading="lazy"
                    scrolling="no"
                  />
                  <div className={styles.overlay}>
                    <span className={styles.viewButton}>View Full Screen</span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardPath}>{item.path}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default AllScreens;
