// PUBLIC_INTERFACE
/**
 * Mock data for development and testing
 * Used when backend API is not available
 */

export const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', joinDate: '2023-12-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active', joinDate: '2024-03-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'pending', joinDate: '2024-03-15' },
];

export const mockProducts = [
  { id: 1, name: 'Product A', category: 'Electronics', price: 299.99, stock: 45, image: '/assets/figmaimages/figma_image_14_54.png' },
  { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 120, image: '/assets/figmaimages/figma_image_14_62.png' },
  { id: 3, name: 'Product C', category: 'Electronics', price: 599.99, stock: 23, image: '/assets/figmaimages/figma_image_14_78.png' },
  { id: 4, name: 'Product D', category: 'Home', price: 89.99, stock: 67, image: '/assets/figmaimages/figma_image_14_86.png' },
  { id: 5, name: 'Product E', category: 'Electronics', price: 399.99, stock: 15, image: '/assets/figmaimages/figma_image_14_94.png' },
];

export const mockTransactions = [
  { id: 1, customer: 'John Doe', product: 'Product A', amount: 299.99, date: '2024-03-20', status: 'completed' },
  { id: 2, customer: 'Jane Smith', product: 'Product B', amount: 49.99, date: '2024-03-19', status: 'completed' },
  { id: 3, customer: 'Bob Johnson', product: 'Product C', amount: 599.99, date: '2024-03-18', status: 'pending' },
  { id: 4, customer: 'Alice Brown', product: 'Product D', amount: 89.99, date: '2024-03-17', status: 'completed' },
  { id: 5, customer: 'Charlie Wilson', product: 'Product E', amount: 399.99, date: '2024-03-16', status: 'failed' },
];

export const mockChartData = {
  revenue: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [12000, 19000, 15000, 25000, 22000, 30000],
  },
  users: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [450, 520, 480, 610],
  },
  categories: {
    labels: ['Electronics', 'Clothing', 'Home', 'Sports'],
    data: [45, 25, 20, 10],
  },
};

export const mockStats = {
  totalRevenue: 125000,
  totalCustomers: 1250,
  totalOrders: 3450,
  averageOrderValue: 36.23,
  revenueGrowth: 12.5,
  customerGrowth: 8.3,
};
