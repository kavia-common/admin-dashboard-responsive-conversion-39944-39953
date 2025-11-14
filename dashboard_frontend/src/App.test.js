import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', async () => {
    render(<App />);
    
    // Wait for lazy-loaded components
    await waitFor(() => {
      // Should redirect to /all-screens and show All Screens content
      expect(screen.getByText(/All Screens/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('handles route navigation', async () => {
    const { container } = render(<App />);
    
    await waitFor(() => {
      // Check that the AllScreens component is rendered
      // Look for the subtitle text that's unique to AllScreens
      expect(screen.getByText(/Browse all available asset screens/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
