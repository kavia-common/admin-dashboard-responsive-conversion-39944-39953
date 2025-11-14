import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
/**
 * IframeScreen component for rendering asset HTML files in isolation
 * Uses iframe to prevent CSS/JS conflicts with the React app
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Path to the HTML file to load
 * @param {string} props.title - Screen title for accessibility
 * @param {string} props.width - Frame width (optional)
 * @param {string} props.height - Frame height (optional)
 */
function IframeScreen({ src, title, width = '100%', height = '100vh' }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Ensure scroll restoration on route change
    window.scrollTo(0, 0);
  }, [src]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Handle iframe load
    const handleLoad = () => {
      try {
        // Adjust iframe height to content if needed
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc && iframeDoc.body) {
          const contentHeight = iframeDoc.body.scrollHeight;
          if (contentHeight > 0) {
            iframe.style.height = `${contentHeight}px`;
          }
        }
      } catch (e) {
        // Cross-origin restrictions may prevent access
        console.log('Unable to access iframe content for height adjustment');
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
      minHeight: '100vh',
      background: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0',
      overflow: 'auto'
    }}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        style={{
          width: width,
          height: height,
          border: 'none',
          display: 'block',
          background: 'white'
        }}
        sandbox="allow-scripts allow-same-origin allow-forms"
        loading="lazy"
      />
    </div>
  );
}

export default IframeScreen;
