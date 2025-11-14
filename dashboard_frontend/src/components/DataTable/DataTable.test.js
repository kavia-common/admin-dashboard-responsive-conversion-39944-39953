import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable Component', () => {
  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const mockColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
  ];

  test('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('filters data based on search input', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('sorts data when clicking sortable column', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    const rows = screen.getAllByRole('row');
    // First row is header, check data rows
    expect(rows[1]).toHaveTextContent('Jane Smith');
    expect(rows[2]).toHaveTextContent('John Doe');
  });

  test('shows "No data found" when filtered results are empty', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });
});
