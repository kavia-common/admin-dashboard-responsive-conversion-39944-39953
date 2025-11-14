import { render, screen, waitFor } from '@testing-library/react';
import OverviewPage from './OverviewPage';

// Mock the chart components
jest.mock('../components/Charts/LineChart', () => {
  return function MockLineChart() {
    return <div data-testid="line-chart">Line Chart</div>;
  };
});

jest.mock('../components/Charts/BarChart', () => {
  return function MockBarChart() {
    return <div data-testid="bar-chart">Bar Chart</div>;
  };
});

jest.mock('../components/Charts/PieChart', () => {
  return function MockPieChart() {
    return <div data-testid="pie-chart">Pie Chart</div>;
  };
});

describe('OverviewPage Component', () => {
  test('shows loading skeletons initially', () => {
    render(<OverviewPage />);
    
    // Should show skeleton loaders while loading
    const skeletons = document.querySelectorAll('[aria-busy="true"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('renders stats cards after loading', async () => {
    render(<OverviewPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
      expect(screen.getByText('Total Customers')).toBeInTheDocument();
      expect(screen.getByText('Total Orders')).toBeInTheDocument();
      expect(screen.getByText('Avg Order Value')).toBeInTheDocument();
    });
  });

  test('renders charts after loading', async () => {
    render(<OverviewPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  test('displays revenue growth indicator', async () => {
    render(<OverviewPage />);
    
    // Use findByText which automatically waits for the element
    const growthIndicator = await screen.findByText(/from last month/i, {}, { timeout: 3000 });
    expect(growthIndicator).toBeInTheDocument();
  });
});
