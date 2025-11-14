# Testing Guide

## Overview

This guide covers all testing approaches, patterns, and best practices for the dashboard application.

## Test Structure

```
src/
├── components/
│   ├── Charts/
│   │   ├── LineChart.js
│   │   └── LineChart.test.js      ← Unit tests
│   ├── DataTable/
│   │   └── DataTable.test.js      ← Unit tests
│   └── ProductCard/
│       └── ProductCard.test.js    ← Unit tests
├── pages/
│   └── OverviewPage.test.js       ← Integration tests
└── App.test.js                    ← App-level tests
```

## Running Tests

### Development Mode
```bash
# Run tests in watch mode
npm test

# Run specific test file
npm test -- LineChart.test.js

# Run tests matching pattern
npm test -- --testNamePattern="renders chart"
```

### CI Mode
```bash
# Run all tests once
CI=true npm test

# With coverage report
CI=true npm test -- --coverage

# Verbose output
CI=true npm test -- --verbose
```

### Coverage Reports
```bash
# Generate coverage report
npm test -- --coverage --watchAll=false

# Open HTML coverage report
open coverage/lcov-report/index.html
```

## Test Patterns

### Component Testing

**Basic Rendering Test:**
```javascript
test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

**Props Testing:**
```javascript
test('renders with custom props', () => {
  render(<MyComponent title="Test Title" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});
```

**User Interaction:**
```javascript
test('handles click event', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**Async Testing:**
```javascript
test('loads data asynchronously', async () => {
  render(<DataComponent />);
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

### Accessibility Testing

**ARIA Attributes:**
```javascript
test('has correct ARIA labels', () => {
  render(<IconButton />);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', 'Close');
});
```

**Keyboard Navigation:**
```javascript
test('is keyboard accessible', () => {
  render(<NavigationMenu />);
  const firstItem = screen.getByRole('link', { name: 'Home' });
  
  firstItem.focus();
  expect(firstItem).toHaveFocus();
  
  fireEvent.keyDown(firstItem, { key: 'Tab' });
  // Test tab navigation
});
```

**Screen Reader Support:**
```javascript
test('announces loading state', () => {
  const { container } = render(<LoadingComponent />);
  const loader = container.querySelector('[aria-busy="true"]');
  expect(loader).toBeInTheDocument();
});
```

### Mocking

**Mock Components:**
```javascript
// Mock expensive chart component
jest.mock('../components/Charts/LineChart', () => {
  return function MockLineChart() {
    return <div data-testid="line-chart">Chart</div>;
  };
});
```

**Mock API Calls:**
```javascript
// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' }),
  })
);

test('fetches data', async () => {
  render(<DataComponent />);
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('/api/data');
  });
});
```

**Mock Context:**
```javascript
import { AppProvider } from '../context/AppContext';

test('uses context', () => {
  render(
    <AppProvider>
      <ComponentUsingContext />
    </AppProvider>
  );
  // Test component behavior
});
```

## Test Coverage Goals

### Component Coverage
- **Target:** 80%+
- **Critical Components:** 90%+
  - DataTable
  - Charts
  - Layout

### Page Coverage
- **Target:** 70%+
- **Main Pages:** 80%+
  - OverviewPage
  - CustomersPage
  - ProductsPage

### Utility Coverage
- **Target:** 90%+
- All utility functions should be thoroughly tested

## Test Examples

### DataTable Tests

```javascript
describe('DataTable Component', () => {
  test('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('filters data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('sorts data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Jane Smith');
  });

  test('paginates data', () => {
    const largeData = Array(50).fill(null).map((_, i) => ({
      id: i,
      name: `User ${i}`
    }));
    
    render(<DataTable data={largeData} columns={mockColumns} pageSize={10} />);
    
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });
});
```

### Chart Tests

```javascript
describe('LineChart Component', () => {
  test('renders with data', () => {
    render(<LineChart data={[10, 20, 30]} labels={['A', 'B', 'C']} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('shows no data message', () => {
    render(<LineChart data={[]} labels={[]} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  test('uses custom color', () => {
    const { container } = render(
      <LineChart data={[10, 20]} labels={['A', 'B']} color="#FF0000" />
    );
    
    const line = container.querySelector('polyline');
    expect(line).toHaveAttribute('stroke', '#FF0000');
  });

  test('is accessible', () => {
    const { container } = render(
      <LineChart data={[10, 20]} labels={['A', 'B']} />
    );
    
    const chart = container.querySelector('[role="progressbar"]');
    expect(chart).toHaveAttribute('aria-valuenow');
  });
});
```

### Page Integration Tests

```javascript
describe('OverviewPage Integration', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('loads and displays stats', async () => {
    render(<OverviewPage />);
    
    // Should show loading state
    expect(screen.getAllByLabelText(/loading/i).length).toBeGreaterThan(0);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
      expect(screen.getByText(/125,000/)).toBeInTheDocument();
    });
  });

  test('renders all charts', async () => {
    render(<OverviewPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  test('handles loading errors gracefully', async () => {
    // Mock API failure
    global.fetch = jest.fn(() => Promise.reject('API Error'));
    
    render(<OverviewPage />);
    
    await waitFor(() => {
      // Should handle error (error boundary or error message)
      expect(screen.queryByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

## Best Practices

### Do's ✅

1. **Test User Behavior, Not Implementation**
   - Focus on what users see and do
   - Avoid testing internal state directly

2. **Use Semantic Queries**
   - Prefer `getByRole`, `getByLabelText`
   - Avoid `getByTestId` when possible

3. **Test Accessibility**
   - Check ARIA attributes
   - Verify keyboard navigation
   - Test screen reader announcements

4. **Mock External Dependencies**
   - Mock API calls
   - Mock expensive components
   - Mock timers when needed

5. **Clean Up After Tests**
   - Clear mocks in `afterEach`
   - Unmount components properly
   - Reset global state

### Don'ts ❌

1. **Don't Test Implementation Details**
   ```javascript
   // Bad
   expect(component.state.count).toBe(1);
   
   // Good
   expect(screen.getByText('Count: 1')).toBeInTheDocument();
   ```

2. **Don't Use Fragile Selectors**
   ```javascript
   // Bad
   container.querySelector('.button-class');
   
   // Good
   screen.getByRole('button', { name: 'Submit' });
   ```

3. **Don't Forget Async Cleanup**
   ```javascript
   // Bad
   test('async test', async () => {
     render(<Component />);
     // Missing await
   });
   
   // Good
   test('async test', async () => {
     render(<Component />);
     await waitFor(() => {
       expect(screen.getByText('Loaded')).toBeInTheDocument();
     });
   });
   ```

## Debugging Tests

### View Rendered Output
```javascript
test('debug test', () => {
  const { debug } = render(<Component />);
  debug(); // Prints DOM tree
});
```

### Check Queries
```javascript
test('find elements', () => {
  render(<Component />);
  screen.debug(); // Shows entire document
  screen.logTestingPlaygroundURL(); // Get selector suggestions
});
```

### Run Single Test
```bash
npm test -- --testNamePattern="specific test name"
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run tests
  run: CI=true npm test -- --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

### Coverage Thresholds
```json
// package.json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 70,
        "lines": 70,
        "statements": 70
      }
    }
  }
}
```

## Troubleshooting

### Issue: Tests Timeout

**Solution:**
- Increase timeout: `jest.setTimeout(10000)`
- Check for missing `await` statements
- Verify mock implementations

### Issue: Act Warnings

**Solution:**
```javascript
// Wrap state updates in act()
await act(async () => {
  fireEvent.click(button);
});
```

### Issue: Can't Find Element

**Solution:**
- Use `screen.debug()` to see rendered output
- Check if element is in loading state
- Verify correct query method

---

**Last Updated:** 2024
**Maintained By:** Development Team
