# Quick Start Guide

Get the dashboard running in 5 minutes!

## Prerequisites

- Node.js 16+ and npm 7+
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## Installation

```bash
# Navigate to the project directory
cd dashboard_frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
dashboard_frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Charts/       # Line, Bar, Pie charts
│   │   ├── DataTable/    # Sortable data table
│   │   ├── ProductCard/  # Product display card
│   │   ├── Skeleton/     # Loading placeholders
│   │   └── Layout/       # App shell (Sidebar, Topbar)
│   ├── pages/            # Main page components
│   │   ├── OverviewPage.js
│   │   ├── CustomersPage.js
│   │   ├── ProductsPage.js
│   │   └── TransactionsPage.js
│   ├── context/          # Global state (AppContext)
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utilities & mock data
├── public/
│   └── assets/           # Static assets (Figma HTML/images)
└── build/                # Production build output
```

## Available Scripts

### Development

```bash
# Start development server with hot reload
npm start
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
CI=true npm test

# Run tests with coverage
npm test -- --coverage
```

### Production

```bash
# Create optimized production build
npm run build

# Serve production build locally
npx serve -s build
```

## Key Features

### 1. Native React Pages

All main pages use native React components (no iframes):

- **Overview** - Stats cards + 3 charts (Revenue, Users, Categories)
- **Customers** - Sortable table with search and pagination
- **Products** - Grid of product cards with low stock indicators
- **Transactions** - Transaction history with status badges

### 2. Lazy Loading

Pages are automatically code-split and loaded on-demand:

```javascript
const OverviewPage = lazy(() => import('./pages/OverviewPage'));
```

Reduces initial bundle from 180KB to 58KB!

### 3. Skeleton Loaders

Loading states show skeleton placeholders instead of spinners:

```javascript
<Skeleton variant="rectangular" width="100%" height={400} />
```

### 4. Global State

Access app state anywhere with the `useApp()` hook:

```javascript
import { useApp } from './context/AppContext';

function MyComponent() {
  const { preferences, updatePreferences, user } = useApp();
  // Use global state
}
```

### 5. Mock Data

All pages use mock data from `src/utils/mockData.js`:

- `mockCustomers` - Customer records
- `mockProducts` - Product catalog
- `mockTransactions` - Transaction history
- `mockChartData` - Chart data points
- `mockStats` - Dashboard statistics

**Replace with real API:**
```javascript
// Before
import { mockCustomers } from '../utils/mockData';
setCustomers(mockCustomers);

// After
import { dashboardAPI } from '../services/api';
const data = await dashboardAPI.getCustomers();
setCustomers(data);
```

## Quick Examples

### Creating a New Page

1. **Create page component:**
```javascript
// src/pages/MyNewPage.js
import React from 'react';
import styles from './Page.module.css';

function MyNewPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>My New Page</h1>
      <div className={styles.pageContent}>
        {/* Your content */}
      </div>
    </div>
  );
}

export default MyNewPage;
```

2. **Add route in App.js:**
```javascript
const MyNewPage = lazy(() => import('./pages/MyNewPage'));

// In Routes:
<Route path="/my-page" element={
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <MyNewPage />
    </Suspense>
  </Layout>
} />
```

3. **Add to sidebar navigation:**
```javascript
// src/components/Layout/Sidebar.js
const navItems = [
  // ... existing items
  { path: '/my-page', label: 'My Page', icon: '📄' }
];
```

### Using Components

**DataTable:**
```javascript
import DataTable from '../components/DataTable/DataTable';

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => <span className="badge">{value}</span>
  }
];

<DataTable data={myData} columns={columns} pageSize={10} />
```

**Charts:**
```javascript
import LineChart from '../components/Charts/LineChart';

<LineChart 
  data={[10, 20, 30, 40]} 
  labels={['Jan', 'Feb', 'Mar', 'Apr']}
  color="#2563EB"
  height={250}
/>
```

**ProductCard:**
```javascript
import ProductCard from '../components/ProductCard/ProductCard';

<ProductCard 
  product={{
    name: 'Product Name',
    category: 'Electronics',
    price: 99.99,
    stock: 15,
    image: '/path/to/image.jpg'
  }}
  onClick={(product) => console.log('Clicked:', product)}
/>
```

**Skeleton Loader:**
```javascript
import Skeleton from '../components/Skeleton/Skeleton';

{loading ? (
  <Skeleton variant="rectangular" width="100%" height={400} />
) : (
  <ActualContent />
)}
```

## Environment Variables

Create a `.env` file in the project root:

```bash
# API Configuration
REACT_APP_API_BASE=http://localhost:8000
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_FRONTEND_URL=http://localhost:3000

# WebSocket (optional)
REACT_APP_WS_URL=ws://localhost:8000/ws

# Environment
REACT_APP_NODE_ENV=development
```

**Important:** All variables must be prefixed with `REACT_APP_`

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm start
```

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tests Fail

```bash
# Update snapshots
npm test -- -u

# Clear Jest cache
npm test -- --clearCache
```

### Module Not Found

```bash
# Install missing dependency
npm install <package-name>

# For testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

## Browser DevTools

### React Developer Tools

Install the [React DevTools](https://react.dev/learn/react-developer-tools) browser extension to:
- Inspect component tree
- View props and state
- Profile performance
- Debug hooks

### Performance Profiling

1. Open DevTools (F12)
2. Go to "Performance" tab
3. Record interaction
4. Analyze flame graph

### Network Inspection

1. Open DevTools (F12)
2. Go to "Network" tab
3. Filter by "JS" to see code splitting in action
4. Observe chunks loading on route navigation

## VS Code Setup (Optional)

Recommended extensions:

- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Path Intellisense

**Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact"]
}
```

## Next Steps

1. **Read Full Documentation:**
   - [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Complete guide
   - [TESTING.md](./TESTING.md) - Testing practices
   - [ROUTES.md](./ROUTES.md) - Route documentation

2. **Replace Mock Data:**
   - Update API endpoints in `.env`
   - Implement API service in `src/services/api.js`
   - Replace mock imports with API calls

3. **Customize Styling:**
   - Update CSS variables in `src/App.css`
   - Modify component styles in `*.module.css` files
   - Add custom themes

4. **Add Features:**
   - Implement user authentication
   - Add real-time WebSocket updates
   - Create custom dashboard widgets
   - Implement dark mode

## Common Tasks

### Add a New Chart

```javascript
// 1. Import chart component
import { LineChart } from '../components/Charts/LineChart';

// 2. Prepare data
const chartData = [10, 20, 30, 40];
const labels = ['Q1', 'Q2', 'Q3', 'Q4'];

// 3. Render with Suspense
<Suspense fallback={<Skeleton variant="rectangular" height={300} />}>
  <LineChart data={chartData} labels={labels} color="#2563EB" />
</Suspense>
```

### Add Search Functionality

```javascript
const [searchTerm, setSearchTerm] = useState('');

const filteredData = data.filter(item =>
  Object.values(item).some(value =>
    String(value).toLowerCase().includes(searchTerm.toLowerCase())
  )
);

<input
  type="search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search..."
/>
```

### Handle Loading States

```javascript
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      setData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);

if (loading) return <Skeleton variant="rectangular" height={400} />;
```

## Getting Help

- **Documentation:** Check `IMPLEMENTATION.md` for detailed info
- **Tests:** Look at `*.test.js` files for usage examples
- **Console:** Check browser console for errors and warnings
- **Network:** Inspect network tab for failed requests

---

**Need more help?** See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for comprehensive documentation.

**Ready to deploy?** Check deployment checklist in [RELEASE_NOTES.md](./RELEASE_NOTES.md).
