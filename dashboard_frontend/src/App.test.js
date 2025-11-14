import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', async () => {
    render(<App />);
    
    // Wait for lazy-loaded components
    await waitFor(() => {
      // Should redirect to /overview and show overview content
      expect(screen.getByText(/overview/i)).toBeInTheDocument();
    });
  });

  test('handles route navigation', async () => {
    const { container } = render(<App />);
    
    await waitFor(() => {
      // Check that router is working
      expect(container.querySelector('.page')).toBeInTheDocument();
    });
  });
});
