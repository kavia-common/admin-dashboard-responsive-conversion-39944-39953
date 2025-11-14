import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    category: 'Electronics',
    price: 299.99,
    stock: 45,
    image: '/test-image.jpg'
  };

  const mockOnClick = jest.fn();

  test('renders product information', () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$299.99')).toBeInTheDocument();
    expect(screen.getByText(/45 in stock/i)).toBeInTheDocument();
  });

  test('shows low stock badge when stock is below 20', () => {
    const lowStockProduct = { ...mockProduct, stock: 15 };
    render(<ProductCard product={lowStockProduct} onClick={mockOnClick} />);
    
    expect(screen.getByText(/low stock/i)).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('is keyboard accessible', () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
