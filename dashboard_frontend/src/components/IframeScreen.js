import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
/**
 * IframeScreen component for rendering asset HTML files in isolation
 * Uses iframe to prevent CSS/JS conflicts with the React app
 * Ensures zero UI changes to the rendered HTML/CSS/JS from assets
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Path to the HTML file to load (e.g., /assets/buttons-11-32.html)
 * @param {string} props.title - Screen title for accessibility
 */
function IframeScreen({ src, title }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Ensure scroll restoration on route change
    window.scrollTo(0, 0);
  }, [src]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Handle iframe load - adjust height to content if possible
    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc && iframeDoc.body) {
          const contentHeight = iframeDoc.body.scrollHeight;
          if (contentHeight > 0) {
            iframe.style.height = `${contentHeight}px`;
          }
        }
      } catch (e) {
        // Cross-origin restrictions may prevent access - this is expected
        console.debug('Unable to access iframe content for height adjustment (expected if different origin)');
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 140px)',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '0',
      overflow: 'hidden'
    }}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 140px)',
          height: '100%',
          border: 'none',
          display: 'block',
          background: 'white'
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
      />
    </div>
  );
}

export default IframeScreen;
