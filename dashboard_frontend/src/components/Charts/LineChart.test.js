import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

describe('LineChart Component', () => {
  test('renders chart with data', () => {
    const data = [10, 20, 30, 40];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr'];
    
    render(<LineChart data={data} labels={labels} />);
    
    // Check if labels are rendered
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('renders "No data" message when data is empty', () => {
    render(<LineChart data={[]} labels={[]} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  test('renders with custom color', () => {
    const { container } = render(
      <LineChart data={[10, 20]} labels={['A', 'B']} color="#FF0000" />
    );
    
    const polyline = container.querySelector('polyline');
    expect(polyline).toHaveAttribute('stroke', '#FF0000');
  });
});
